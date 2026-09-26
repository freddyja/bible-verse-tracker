#!/usr/bin/env python3
"""Render The Living Word home-screen icons.

Bright Bible: soft blue cover, cream page edges, navy title.
Maskable icons keep the book inside the W3C safe circle
(radius 40% of the icon). Text is converted to paths so the
SVG does not depend on a font being installed.

Requires Liberation Serif Bold, cairosvg, fontTools, and Pillow.
Outputs are committed; this script is for regeneration.
"""

from __future__ import annotations

import math
from io import BytesIO
from pathlib import Path

import cairosvg
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
FONT_PATH = Path("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf")

FONT = TTFont(FONT_PATH)
GLYPHS = FONT.getGlyphSet()
CMAP = FONT.getBestCmap()
UPEM = FONT["head"].unitsPerEm

NAVY = "#1A2744"
BG = "#E7F0F7"
PAGE = "#FFFDF8"
PAGE_LINE = "#E4D6C3"
COVER_TOP = "#A8D2EC"
COVER_MID = "#7EB4DA"
COVER_BOTTOM = "#689FCC"
SPINE = "#4E86B6"
HINGE = "#E4F2FB"
BG_RGB = (231, 240, 247)


def glyph_path(char: str) -> tuple[str, int]:
    name = CMAP[ord(char)]
    pen = SVGPathPen(GLYPHS)
    GLYPHS[name].draw(pen)
    return pen.getCommands(), GLYPHS[name].width


def text_width(text: str, size: float, tracking: float) -> float:
    scale = size / UPEM
    width = 0.0
    for i, char in enumerate(text):
        _, advance = glyph_path(char)
        width += advance * scale
        if i < len(text) - 1:
            width += tracking
    return width


def text_paths(text: str, x: float, baseline: float, size: float, tracking: float) -> str:
    scale = size / UPEM
    parts: list[str] = []
    cursor = x
    for i, char in enumerate(text):
        commands, advance = glyph_path(char)
        parts.append(
            f'<g transform="translate({cursor:.2f} {baseline:.2f}) scale({scale:.6f} {-scale:.6f})">'
            f'<path d="{commands}" fill="{NAVY}"/></g>'
        )
        cursor += advance * scale
        if i < len(text) - 1:
            cursor += tracking
    return "".join(parts)


def fit_size(lines: list[str], max_width: float, tracking_em: float) -> tuple[float, float]:
    size = 72.0
    for _ in range(30):
        tracking = size * tracking_em
        widest = max(text_width(line, size, tracking) for line in lines)
        size *= max_width / widest
    return size, size * tracking_em


def bible_svg(*, maskable: bool) -> str:
    """Closed Bible in a 512 viewBox. Maskable art sits inside the safe circle."""
    cover_w, cover_h = 268.0, 392.0
    fore = 78.0
    spine_w = 28.0
    page_inset = 18.0
    overlap = 16.0
    radius = 20.0

    total_w = cover_w + fore - overlap
    total_h = cover_h
    ox = (512 - total_w) / 2
    oy = (512 - total_h) / 2

    center = 256.0
    corners = [
        (ox, oy),
        (ox + total_w, oy),
        (ox, oy + total_h),
        (ox + total_w, oy + total_h),
    ]
    natural_r = max(math.hypot(x - center, y - center) for x, y in corners)
    # W3C maskable safe zone is a circle whose radius is 40% of the icon.
    scale = (512 * 0.40 * 0.96) / natural_r if maskable else 1.0

    def xy(x: float, y: float) -> tuple[float, float]:
        return center + (x - center) * scale, center + (y - center) * scale

    def box(x: float, y: float, w: float, h: float) -> tuple[float, float, float, float]:
        x2, y2 = xy(x, y)
        x3, y3 = xy(x + w, y + h)
        return x2, y2, x3 - x2, y3 - y2

    c_x, c_y, c_w, c_h = box(ox, oy, cover_w, cover_h)
    p_x, p_y, p_w, p_h = box(
        ox + cover_w - overlap,
        oy + page_inset,
        fore,
        cover_h - page_inset * 2,
    )
    rx = radius * scale
    spine = spine_w * scale

    lines = ["The Living", "Word"]
    inner_left = ox + spine_w + 18
    inner_right = ox + cover_w - 18
    inner_w = (inner_right - inner_left) * scale
    size, tracking = fit_size(lines, inner_w * 0.96, 0.012)
    line_h = size * 1.16
    block_h = line_h * len(lines)
    max_title = c_h * 0.36
    if block_h > max_title:
        shrink = max_title / block_h
        size *= shrink
        tracking *= shrink
        line_h = size * 1.16
        block_h = line_h * len(lines)

    title_cx, title_mid = xy((inner_left + inner_right) / 2, oy + cover_h * 0.50)
    title_mid -= size * 0.04
    first_baseline = title_mid - block_h / 2 + size * 0.78
    text_svg = []
    for i, line in enumerate(lines):
        width = text_width(line, size, tracking)
        baseline = first_baseline + i * line_h
        text_svg.append(text_paths(line, title_cx - width / 2, baseline, size, tracking))

    visible_x = c_x + c_w - 1.5 * scale
    visible_w = p_x + p_w - visible_x
    band_colors = ["#F6EFE4", "#FFFCF8", "#F8F1E6", "#FFFEFB", "#F3EBDD", "#FFFDF8"]
    band_w = visible_w / len(band_colors)
    bands = []
    for i, color in enumerate(band_colors):
        bands.append(
            f'<rect x="{visible_x + i * band_w:.2f}" y="{p_y:.2f}" width="{band_w + 0.8:.2f}" '
            f'height="{p_h:.2f}" fill="{color}"/>'
        )
    rules = []
    gap = 6.4 * scale
    y = p_y + gap * 0.6
    stroke = max(1.05 * scale, 0.8)
    while y < p_y + p_h - gap * 0.35:
        rules.append(
            f'<line x1="{visible_x:.2f}" y1="{y:.2f}" x2="{p_x + p_w - 2.2 * scale:.2f}" y2="{y:.2f}" '
            f'stroke="{PAGE_LINE}" stroke-width="{stroke:.2f}"/>'
        )
        y += gap

    shadow_cx, shadow_cy = xy(ox + total_w / 2, oy + total_h + 6)
    shadow_rx = total_w * 0.46 * scale
    shadow_ry = 22 * scale

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="{BG}"/>
  <defs>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{NAVY}" stop-opacity="0.20"/>
      <stop offset="55%" stop-color="{NAVY}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="{NAVY}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cover" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{COVER_TOP}"/>
      <stop offset="48%" stop-color="{COVER_MID}"/>
      <stop offset="100%" stop-color="{COVER_BOTTOM}"/>
    </linearGradient>
    <clipPath id="coverClip">
      <rect x="{c_x:.2f}" y="{c_y:.2f}" width="{c_w:.2f}" height="{c_h:.2f}" rx="{rx:.2f}"/>
    </clipPath>
    <clipPath id="pageClip">
      <rect x="{p_x:.2f}" y="{p_y:.2f}" width="{p_w:.2f}" height="{p_h:.2f}" rx="{max(rx * 0.55, 6):.2f}"/>
    </clipPath>
  </defs>
  <ellipse cx="{shadow_cx:.2f}" cy="{shadow_cy:.2f}" rx="{shadow_rx:.2f}" ry="{shadow_ry:.2f}" fill="url(#shadow)"/>
  <g clip-path="url(#pageClip)">
    <rect x="{p_x:.2f}" y="{p_y:.2f}" width="{p_w:.2f}" height="{p_h:.2f}" fill="{PAGE}"/>
    {"".join(bands)}
    {"".join(rules)}
    <rect x="{visible_x - scale:.2f}" y="{p_y:.2f}" width="{8 * scale:.2f}" height="{p_h:.2f}" fill="{NAVY}" opacity="0.12"/>
  </g>
  <rect x="{p_x:.2f}" y="{p_y:.2f}" width="{p_w:.2f}" height="{p_h:.2f}" rx="{max(rx * 0.55, 6):.2f}" fill="none" stroke="#D9CBB8" stroke-width="{max(1.6 * scale, 1):.2f}"/>
  <g clip-path="url(#coverClip)">
    <rect x="{c_x:.2f}" y="{c_y:.2f}" width="{c_w:.2f}" height="{c_h:.2f}" fill="url(#cover)"/>
    <rect x="{c_x:.2f}" y="{c_y:.2f}" width="{spine:.2f}" height="{c_h:.2f}" fill="{SPINE}"/>
    <rect x="{c_x + spine - 0.6 * scale:.2f}" y="{c_y:.2f}" width="{max(2.4 * scale, 1.5):.2f}" height="{c_h:.2f}" fill="{HINGE}"/>
    <rect x="{c_x + c_w - 5 * scale:.2f}" y="{c_y:.2f}" width="{5 * scale:.2f}" height="{c_h:.2f}" fill="#5C94C0" opacity="0.55"/>
    <rect x="{c_x:.2f}" y="{c_y:.2f}" width="{c_w:.2f}" height="{max(8 * scale, 3):.2f}" fill="#ffffff" opacity="0.20"/>
  </g>
  <rect x="{c_x:.2f}" y="{c_y:.2f}" width="{c_w:.2f}" height="{c_h:.2f}" rx="{rx:.2f}" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="{max(1.6 * scale, 1):.2f}"/>
  {"".join(text_svg)}
</svg>
'''


def raster(svg: str, px: int) -> Image.Image:
    data = cairosvg.svg2png(bytestring=svg.encode(), output_width=px, output_height=px)
    return Image.open(BytesIO(data)).convert("RGBA")


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)


def content_radius(image: Image.Image) -> float:
    width, height = image.size
    cx = cy = (width - 1) / 2
    worst = 0.0
    for y in range(height):
        for x in range(width):
            red, green, blue, _alpha = image.getpixel((x, y))
            if abs(red - BG_RGB[0]) + abs(green - BG_RGB[1]) + abs(blue - BG_RGB[2]) < 18:
                continue
            worst = max(worst, math.hypot(x - cx, y - cy))
    return worst / width


def title_box(image: Image.Image) -> tuple[int, int]:
    xs: list[int] = []
    ys: list[int] = []
    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, _alpha = image.getpixel((x, y))
            if red < 55 and green < 80 and blue < 115:
                xs.append(x)
                ys.append(y)
    if not xs:
        raise SystemExit("title text did not render")
    return max(xs) - min(xs), max(ys) - min(ys)


def main() -> None:
    any_svg = bible_svg(maskable=False)
    mask_svg = bible_svg(maskable=True)
    (PUBLIC / "favicon.svg").write_text(any_svg)
    (PUBLIC / "icons").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "icons" / "icon-maskable.svg").write_text(mask_svg)

    outputs = {
        PUBLIC / "icons" / "icon-512.png": (any_svg, 512),
        PUBLIC / "icons" / "icon-192.png": (any_svg, 192),
        PUBLIC / "icons" / "icon-maskable-512.png": (mask_svg, 512),
        PUBLIC / "icons" / "icon-maskable-192.png": (mask_svg, 192),
        PUBLIC / "apple-touch-icon.png": (any_svg, 180),
        PUBLIC / "favicon-32.png": (any_svg, 32),
    }
    images = {path: raster(svg, px) for path, (svg, px) in outputs.items()}
    for path, image in images.items():
        if image.size != (outputs[path][1], outputs[path][1]):
            raise SystemExit(f"unexpected size for {path}")
        if image.getextrema()[3][0] < 255:
            raise SystemExit(f"{path} has transparent pixels")
        save_png(image, path)

    any_title = title_box(images[PUBLIC / "icons" / "icon-192.png"])
    if any_title[1] < 22:
        raise SystemExit(f"192 title is too small: {any_title}")
    mask_ratio = content_radius(images[PUBLIC / "icons" / "icon-maskable-512.png"])
    if mask_ratio > 0.40:
        raise SystemExit(f"maskable art leaves the safe circle: {mask_ratio:.3f}")
    print(f"192 title box {any_title[0]}x{any_title[1]}")
    print(f"maskable content radius {mask_ratio:.3f} of width")
    for path in images:
        print(path.relative_to(ROOT), images[path].size)


if __name__ == "__main__":
    main()

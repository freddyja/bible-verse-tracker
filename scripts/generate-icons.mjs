import { mkdirSync, writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

function crc32(buffer) {
  let crc = ~0
  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= buffer[index]
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
    }
  }
  return ~crc >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const typeBuffer = Buffer.from(type)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])))
  return Buffer.concat([length, typeBuffer, data, crc])
}

function encodePng(size, paint) {
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1)
    raw[rowStart] = 0
    for (let x = 0; x < size; x += 1) {
      const [red, green, blue, alpha] = paint(x + 0.5, y + 0.5, size)
      const offset = rowStart + 1 + x * 4
      raw[offset] = red
      raw[offset + 1] = green
      raw[offset + 2] = blue
      raw[offset + 3] = alpha
    }
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8
  header[9] = 6

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const lengthSquared = dx * dx + dy * dy
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSquared))
  const x = x1 + t * dx
  const y = y1 + t * dy
  return Math.hypot(px - x, py - y)
}

function paintIcon(x, y, size) {
  const clay = [124, 52, 40, 255]
  const paper = [246, 241, 231, 255]
  const stroke = size * (3.1 / 32)
  const left = distanceToSegment(x, y, size * (8.5 / 32), size * (9.2 / 32), size * 0.5, size * (23.6 / 32))
  const right = distanceToSegment(x, y, size * (23.5 / 32), size * (9.2 / 32), size * 0.5, size * (23.6 / 32))
  return left <= stroke || right <= stroke ? paper : clay
}

mkdirSync(new URL('../public/icons/', import.meta.url), { recursive: true })

const files = [
  ['../public/icons/icon-192.png', 192],
  ['../public/icons/icon-512.png', 512],
  ['../public/apple-touch-icon.png', 180],
]

for (const [relativePath, size] of files) {
  const fileUrl = new URL(relativePath, import.meta.url)
  writeFileSync(fileUrl, encodePng(size, paintIcon))
}

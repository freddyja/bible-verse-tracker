type ArtKind =
  | 'sun'
  | 'sea'
  | 'flame'
  | 'tents'
  | 'tablets'
  | 'river'
  | 'trumpet'
  | 'wheat'
  | 'lamp'
  | 'crown'
  | 'pillars'
  | 'gate'
  | 'scroll'
  | 'star'
  | 'wind'
  | 'harp'
  | 'path'
  | 'vine'
  | 'branch'
  | 'well'
  | 'wall'
  | 'wheel'
  | 'arch'
  | 'sprout'
  | 'rain'
  | 'plumb'
  | 'mountain'
  | 'boat'
  | 'tower'
  | 'house'
  | 'cup'
  | 'road'
  | 'letter'
  | 'olive'
  | 'lamps'
  | 'stone'

const ART: Record<string, ArtKind> = {
  gen: 'sun',
  exo: 'sea',
  lev: 'flame',
  num: 'tents',
  deu: 'tablets',
  jos: 'river',
  jdg: 'trumpet',
  rut: 'wheat',
  '1sa': 'lamp',
  '2sa': 'crown',
  '1ki': 'pillars',
  '2ki': 'wall',
  '1ch': 'scroll',
  '2ch': 'pillars',
  ezr: 'scroll',
  neh: 'gate',
  est: 'star',
  job: 'wind',
  psa: 'harp',
  pro: 'path',
  ecc: 'sun',
  sng: 'vine',
  isa: 'branch',
  jer: 'well',
  lam: 'wall',
  ezk: 'wheel',
  dan: 'arch',
  hos: 'sprout',
  jol: 'rain',
  amo: 'plumb',
  oba: 'mountain',
  jon: 'boat',
  mic: 'mountain',
  nah: 'tower',
  hab: 'tower',
  zep: 'sun',
  hag: 'house',
  zec: 'lamps',
  mal: 'flame',
  mat: 'star',
  mrk: 'path',
  luk: 'cup',
  jhn: 'lamp',
  act: 'road',
  rom: 'letter',
  '1co': 'letter',
  '2co': 'letter',
  gal: 'letter',
  eph: 'letter',
  php: 'letter',
  col: 'letter',
  '1th': 'letter',
  '2th': 'letter',
  '1ti': 'letter',
  '2ti': 'letter',
  tit: 'letter',
  phm: 'letter',
  heb: 'scroll',
  jas: 'olive',
  '1pe': 'stone',
  '2pe': 'path',
  '1jn': 'lamp',
  '2jn': 'letter',
  '3jn': 'letter',
  jud: 'flame',
  rev: 'lamps',
}

function Glyph({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case 'sun':
      return (
        <g>
          <circle cx="24" cy="22" r="7" />
          <path d="M24 8v4M24 32v4M10 22h4M34 22h4M14 12l3 3M31 29l3 3M34 12l-3 3M17 29l-3 3" />
        </g>
      )
    case 'sea':
      return <path d="M6 20c6 6 10 6 16 0s10-6 16 0M6 30c6 6 10 6 16 0s10-6 16 0" />
    case 'flame':
      return <path d="M24 6c2 8-6 10-6 18a8 8 0 0 0 16 0c0-6-4-8-4-14 0 4-2 6-6 4z" />
    case 'tents':
      return <path d="M8 34 18 14l10 20M22 34l10-16 10 16M8 34h32" />
    case 'tablets':
      return (
        <g>
          <rect x="8" y="8" width="14" height="28" rx="2" />
          <rect x="26" y="8" width="14" height="28" rx="2" />
        </g>
      )
    case 'river':
      return <path d="M24 6c8 8 8 12 0 18s-8 10 0 18" />
    case 'trumpet':
      return <path d="M8 28c10-2 16-8 18-16 6 2 12 8 14 14-8 2-16 4-32 2z" />
    case 'wheat':
      return <path d="M16 36V16M24 36V10M32 36V18M16 20c-4-2-6-6-4-8M24 16c-4-2-6-6-4-8M32 22c-4-2-6-6-4-8" />
    case 'lamp':
      return <path d="M16 28h16l-2 6H18zM18 28c0-8 4-12 6-18 2 6 6 10 6 18M24 10c2-4 6-4 8-2" />
    case 'crown':
      return <path d="M8 30 14 14l10 10L34 12l6 18z" />
    case 'pillars':
      return <path d="M10 36V16M22 36V16M34 36V16M8 16h28M12 12h8M26 12h8" />
    case 'gate':
      return <path d="M10 36V18a14 14 0 0 1 28 0v18M24 36V24" />
    case 'scroll':
      return <path d="M14 10h18a6 6 0 0 1 0 12H16M14 22h20v12H14a4 4 0 0 1 0-8" />
    case 'star':
      return <path d="M24 6l4 10h10l-8 6 3 10-9-6-9 6 3-10-8-6h10z" />
    case 'wind':
      return <path d="M8 16h18a6 6 0 1 0-6-6M8 24h24a5 5 0 1 1-5 5M8 32h14" />
    case 'harp':
      return <path d="M16 36V16c0-8 16-10 18-2v22M16 20h18M16 28h18" />
    case 'path':
      return <path d="M8 36c8-8 8-8 16-8s8 0 16-8 8-8 8-14" />
    case 'vine':
      return <path d="M24 36V14M24 26c-8 0-10-6-8-10M24 20c8-2 12-8 8-12" />
    case 'branch':
      return <path d="M12 34c8-6 12-14 12-22M24 24c6 2 10 0 12-4M20 28c-6 0-8 4-10 6" />
    case 'well':
      return (
        <g>
          <ellipse cx="24" cy="28" rx="12" ry="5" />
          <path d="M12 28v6M36 28v6M16 12h16M24 12v10" />
        </g>
      )
    case 'wall':
      return <path d="M8 36V20h6v-6h6v6h6v-6h6v6h6v16" />
    case 'wheel':
      return (
        <g>
          <circle cx="24" cy="24" r="12" />
          <circle cx="24" cy="24" r="3" />
          <path d="M24 12v6M24 30v6M12 24h6M30 24h6" />
        </g>
      )
    case 'arch':
      return <path d="M12 36V20a12 12 0 0 1 24 0v16M18 36V24h12v12" />
    case 'sprout':
      return <path d="M24 36V18M24 22c-8-2-10-8-8-12 6 2 8 6 8 12M24 26c8-2 12-6 10-12-6 2-10 6-10 12" />
    case 'rain':
      return <path d="M10 14h28M16 22v8M24 22v10M32 22v8" />
    case 'plumb':
      return <path d="M24 6v22M18 34h12l-6-8z" />
    case 'mountain':
      return <path d="M6 34 20 12l8 10 6-6 10 18z" />
    case 'boat':
      return <path d="M8 28h32l-4 8H12zM24 28V12M24 16h10" />
    case 'tower':
      return <path d="M16 36V14h16v22M20 20h2M26 20h2M20 26h2M26 26h2M14 14h20" />
    case 'house':
      return <path d="M8 22 24 8l16 14v14H8zM20 36V26h8v10" />
    case 'cup':
      return <path d="M16 10h16v10a8 8 0 0 1-16 0zM24 28v6M16 36h16" />
    case 'road':
      return <path d="M18 36 22 10h4l4 26M24 16v4M24 24v4" />
    case 'letter':
      return <path d="M10 12h28v24H10zM10 12l14 12L38 12" />
    case 'olive':
      return <path d="M24 36c0-14 8-18 12-22M18 20c4 2 6 6 6 10M30 16c4 4 4 8 2 12" />
    case 'lamps':
      return <path d="M10 34h28M16 34V22M24 34V16M32 34V22M16 22c0-4 2-6 0-10M24 16c0-4 2-6 0-8M32 22c0-4 2-6 0-10" />
    case 'stone':
      return (
        <g>
          <ellipse cx="24" cy="28" rx="12" ry="8" />
          <path d="M16 26c4-6 12-6 16 0" />
        </g>
      )
    default:
      return <circle cx="24" cy="24" r="8" />
  }
}

/** An original picture for the opening of a book. The same drawing in every language. */
export function BookArt({ bookId }: { bookId: string }) {
  const kind = ART[bookId] ?? 'lamp'
  return (
    <svg className="book-art" viewBox="0 0 360 118" aria-hidden="true">
      <rect width="360" height="118" fill="var(--paper-deep)" />
      <circle cx="286" cy="36" r="16" fill="var(--clay)" opacity="0.45" />
      <path d="M0 72c70-24 120 8 190-6 48-10 90 8 170-8v60H0z" fill="var(--card)" />
      <path d="M0 92c80-18 130 16 210 0 40-8 80 6 150-4v30H0z" fill="var(--line)" opacity="0.85" />
      <g
        transform="translate(28 34)"
        fill="none"
        stroke="var(--clay)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Glyph kind={kind} />
      </g>
    </svg>
  )
}

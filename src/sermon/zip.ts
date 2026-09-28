function concat(parts: Uint8Array[]): Uint8Array {
  const length = parts.reduce((total, part) => total + part.length, 0)
  const out = new Uint8Array(length)
  let offset = 0
  for (const part of parts) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

function bytes(values: number[]): Uint8Array {
  return Uint8Array.from(values)
}

function le16(value: number): Uint8Array {
  return bytes([value & 255, (value >> 8) & 255])
}

function le32(value: number): Uint8Array {
  return bytes([value & 255, (value >> 8) & 255, (value >> 16) & 255, (value >> 24) & 255])
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff
  for (let index = 0; index < data.length; index += 1) {
    crc ^= data[index] ?? 0
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1)
      crc = (crc >>> 1) ^ (0xedb88320 & mask)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

/** A stored (uncompressed) zip. Word opens it as a .docx when the entries are Office XML. */
export function zipStore(files: readonly { name: string; data: Uint8Array }[]): Blob {
  const encoder = new TextEncoder()
  const locals: Uint8Array[] = []
  const centrals: Uint8Array[] = []
  let offset = 0
  for (const file of files) {
    const name = encoder.encode(file.name)
    const crc = crc32(file.data)
    const local = concat([
      le32(0x04034b50),
      le16(20),
      le16(0),
      le16(0),
      le16(0),
      le16(0),
      le32(crc),
      le32(file.data.length),
      le32(file.data.length),
      le16(name.length),
      le16(0),
      name,
      file.data,
    ])
    const central = concat([
      le32(0x02014b50),
      le16(20),
      le16(20),
      le16(0),
      le16(0),
      le16(0),
      le16(0),
      le32(crc),
      le32(file.data.length),
      le32(file.data.length),
      le16(name.length),
      le16(0),
      le16(0),
      le16(0),
      le16(0),
      le32(0),
      le32(offset),
      name,
    ])
    locals.push(local)
    centrals.push(central)
    offset += local.length
  }
  const centralDirectory = concat(centrals)
  const end = concat([
    le32(0x06054b50),
    le16(0),
    le16(0),
    le16(files.length),
    le16(files.length),
    le32(centralDirectory.length),
    le32(offset),
    le16(0),
  ])
  const packed = concat([...locals, centralDirectory, end])
  const copy = new ArrayBuffer(packed.byteLength)
  new Uint8Array(copy).set(packed)
  return new Blob([copy], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })
}

import type { SermonBlock, SermonHandout, SermonLang } from './types'
import { zipStore } from './zip'

const SECTION: Record<
  SermonLang,
  {
    title: string
    bigIdea: string
    openingHook: string
    passage: string
    context: string
    point: string
    application: string
    invitation: string
    closingPrayer: string
  }
> = {
  en: {
    title: 'Title',
    bigIdea: 'Big idea',
    openingHook: 'Opening hook',
    passage: 'Passage',
    context: 'Context',
    point: 'Point',
    application: 'Application',
    invitation: 'Invitation',
    closingPrayer: 'Closing prayer',
  },
  es: {
    title: 'Título',
    bigIdea: 'Idea central',
    openingHook: 'Gancho de apertura',
    passage: 'Pasaje',
    context: 'Contexto',
    point: 'Punto',
    application: 'Aplicación',
    invitation: 'Invitación',
    closingPrayer: 'Oración final',
  },
  pt: {
    title: 'Título',
    bigIdea: 'Grande ideia',
    openingHook: 'Gancho de abertura',
    passage: 'Passagem',
    context: 'Contexto',
    point: 'Ponto',
    application: 'Aplicação',
    invitation: 'Convite',
    closingPrayer: 'Oração final',
  },
}

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

const LANG: Record<SermonLang, string> = {
  en: 'en-US',
  es: 'es-US',
  pt: 'pt-BR',
}

const NUM_ID: Record<SermonLang, number> = {
  en: 1,
  es: 2,
  pt: 3,
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function run(text: string, language: SermonLang, style?: 'bold' | 'italic'): string {
  const mark = style === 'bold' ? '<w:b/>' : style === 'italic' ? '<w:i/>' : ''
  return `<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>${mark}<w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="${LANG[language]}"/></w:rPr><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r>`
}

function paragraph(inner: string, language: SermonLang, options?: { numbered?: boolean }): string {
  const num = options?.numbered
    ? `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${NUM_ID[language]}"/></w:numPr>`
    : ''
  return `<w:p><w:pPr>${num}<w:spacing w:before="100" w:beforeAutospacing="1" w:after="100" w:afterAutospacing="1" w:line="240" w:lineRule="auto"/><w:rPr><w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:lang w:val="${LANG[language]}"/></w:rPr></w:pPr>${inner}</w:p>`
}

function spacer(): string {
  return `<w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/></w:rPr></w:r></w:p>`
}

function shortBlockXml(block: SermonBlock, language: SermonLang): string {
  return [
    paragraph(run(block.reference, language, 'bold'), language),
    paragraph(run(block.quote, language, 'italic'), language),
    paragraph(run(block.punch, language, 'bold'), language),
    paragraph(run(block.context, language), language),
    paragraph(run(block.application, language), language),
    paragraph(run(block.challenge, language, 'bold'), language),
    paragraph(run(block.charge, language), language),
    paragraph(run(block.questionsLabel, language, 'bold'), language),
    ...block.questions.map((question) => paragraph(run(question, language), language, { numbered: true })),
  ].join('')
}

function fullBlockXml(block: SermonBlock, language: SermonLang): string {
  const L = SECTION[language]
  const points = block.points ?? []
  const pointParts = points.flatMap((point, index) => {
    const heading = `${L.point} ${index + 1}: ${point.heading}`
    const thought = point.crossRef ? `${point.thought} (${point.crossRef})` : point.thought
    return [
      paragraph(run(heading, language, 'bold'), language),
      paragraph(run(thought, language), language),
    ]
  })
  return [
    paragraph(run(`${L.title}: ${block.title ?? ''}`, language, 'bold'), language),
    paragraph(run(`${L.bigIdea}: ${block.bigIdea ?? ''}`, language), language),
    paragraph(run(`${L.openingHook}:`, language, 'bold'), language),
    paragraph(run(block.openingHook ?? '', language), language),
    paragraph(run(`${L.passage}:`, language, 'bold'), language),
    paragraph(run(block.reference, language, 'bold'), language),
    paragraph(run(block.quote, language, 'italic'), language),
    paragraph(run(`${L.context}:`, language, 'bold'), language),
    paragraph(run(block.context, language), language),
    ...pointParts,
    paragraph(run(`${L.application}:`, language, 'bold'), language),
    paragraph(run(block.application, language), language),
    paragraph(run(`${L.invitation}:`, language, 'bold'), language),
    paragraph(run(block.invitation ?? '', language, 'bold'), language),
    paragraph(run(`${L.closingPrayer}:`, language, 'bold'), language),
    paragraph(run(block.closingPrayer ?? '', language), language),
    paragraph(run(block.questionsLabel, language, 'bold'), language),
    ...block.questions.map((question) => paragraph(run(question, language), language, { numbered: true })),
  ].join('')
}

function blockXml(block: SermonBlock, language: SermonLang): string {
  return block.depth === 'full' ? fullBlockXml(block, language) : shortBlockXml(block, language)
}

function documentXml(handout: SermonHandout): string {
  const body = ORDER.map((language, index) => {
    const block = blockXml(handout.blocks[language], language)
    return index < ORDER.length - 1 ? `${block}${spacer()}` : block
  }).join('')
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${body}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="720" w:footer="720" w:gutter="0"/><w:cols w:space="720"/><w:docGrid w:linePitch="360"/></w:sectPr></w:body>
</w:document>`
}

function numberingXml(): string {
  const level = `<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/></w:rPr></w:lvl>`
  const abstracts = [0, 1, 2]
    .map(
      (id) =>
        `<w:abstractNum w:abstractNumId="${id}"><w:multiLevelType w:val="hybridMultilevel"/>${level}</w:abstractNum>`,
    )
    .join('')
  const nums = [0, 1, 2]
    .map((id) => `<w:num w:numId="${id + 1}"><w:abstractNumId w:val="${id}"/></w:num>`)
    .join('')
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">${abstracts}${nums}</w:numbering>`
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>`

const ROOT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`

const DOCUMENT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>`

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="en-US"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
</w:styles>`

export function handoutDocx(handout: SermonHandout): Blob {
  const encoder = new TextEncoder()
  return zipStore([
    { name: '[Content_Types].xml', data: encoder.encode(CONTENT_TYPES) },
    { name: '_rels/.rels', data: encoder.encode(ROOT_RELS) },
    { name: 'word/document.xml', data: encoder.encode(documentXml(handout)) },
    { name: 'word/_rels/document.xml.rels', data: encoder.encode(DOCUMENT_RELS) },
    { name: 'word/styles.xml', data: encoder.encode(STYLES) },
    { name: 'word/numbering.xml', data: encoder.encode(numberingXml()) },
  ])
}

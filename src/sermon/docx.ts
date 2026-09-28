import type { SermonBlock, SermonHandout, SermonLang } from './types'
import { zipStore } from './zip'

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function run(text: string, style?: 'bold' | 'italic'): string {
  const mark = style === 'bold' ? '<w:b/>' : style === 'italic' ? '<w:i/>' : ''
  return `<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>${mark}<w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r>`
}

function paragraph(inner: string): string {
  return `<w:p><w:pPr><w:spacing w:before="120" w:after="120" w:line="276" w:lineRule="auto"/></w:pPr>${inner}</w:p>`
}

function blockXml(block: SermonBlock): string {
  return [
    paragraph(run(block.reference, 'bold')),
    paragraph(run(block.quote, 'italic')),
    paragraph(run(block.punch, 'bold')),
    paragraph(run(block.context)),
    paragraph(run(block.application)),
    paragraph(run(block.challenge)),
    paragraph(run(block.charge)),
    paragraph(run(block.questionsLabel, 'bold')),
    paragraph(run(`1. ${block.questions[0]}`)),
    paragraph(run(`2. ${block.questions[1]}`)),
    paragraph(run('')),
  ].join('')
}

function documentXml(handout: SermonHandout): string {
  const body = ORDER.map((language) => blockXml(handout.blocks[language])).join('')
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${body}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body>
</w:document>`
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`

const ROOT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`

const DOCUMENT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
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
  ])
}

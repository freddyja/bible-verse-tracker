import type { Language } from '../i18n/messages'

export type BibleVersion = {
  id: string
  language: Language
  folder: string
  name: string
  abbr: string
  license: string
}

/** Free texts only. Commercial translations are not part of this list. */
export const VERSIONS: readonly BibleVersion[] = [
  {
    id: 'kjv',
    language: 'en',
    folder: 'en',
    name: 'King James Version (1769)',
    abbr: 'KJV',
    license: 'Public domain',
  },
  {
    id: 'web',
    language: 'en',
    folder: 'web',
    name: 'World English Bible',
    abbr: 'WEB',
    license: 'Public domain',
  },
  {
    id: 'asv',
    language: 'en',
    folder: 'asv',
    name: 'American Standard Version (1901)',
    abbr: 'ASV',
    license: 'Public domain',
  },
  {
    id: 'ylt',
    language: 'en',
    folder: 'ylt',
    name: 'Young’s Literal Translation',
    abbr: 'YLT',
    license: 'Public domain',
  },
  {
    id: 'darby',
    language: 'en',
    folder: 'darby',
    name: 'Darby Translation',
    abbr: 'DARBY',
    license: 'Public domain',
  },
  {
    id: 'webster',
    language: 'en',
    folder: 'webster',
    name: 'Webster Bible (1833)',
    abbr: 'WEBSTER',
    license: 'Public domain',
  },
  {
    id: 'nheb',
    language: 'en',
    folder: 'nheb',
    name: 'New Heart English Bible',
    abbr: 'NHEB',
    license: 'Public domain',
  },
  {
    id: 'bsb',
    language: 'en',
    folder: 'bsb',
    name: 'Berean Standard Bible',
    abbr: 'BSB',
    license: 'CC0',
  },
  {
    id: 'geneva',
    language: 'en',
    folder: 'geneva',
    name: 'Geneva Bible (1599)',
    abbr: 'GNV',
    license: 'Public domain',
  },
  {
    id: 'rv1909',
    language: 'es',
    folder: 'es',
    name: 'Reina-Valera 1909',
    abbr: 'RV1909',
    license: 'Public domain',
  },
  {
    id: 'rv1865',
    language: 'es',
    folder: 'rv1865',
    name: 'Reina-Valera 1865',
    abbr: 'RV1865',
    license: 'Public domain',
  },
  {
    id: 'blivre',
    language: 'pt',
    folder: 'pt',
    name: 'Bíblia Livre',
    abbr: 'BL',
    license: 'CC BY 3.0 Brazil',
  },
  {
    id: 'blivre-tr',
    language: 'pt',
    folder: 'blivre-tr',
    name: 'Bíblia Livre (Textus Receptus)',
    abbr: 'BLTR',
    license: 'CC BY 3.0 Brazil',
  },
  {
    id: 'nva',
    language: 'pt',
    folder: 'nva',
    name: 'Nova Versão de Acesso Livre',
    abbr: 'NVA',
    license: 'CC BY-SA 4.0',
  },
]

const byId = new Map(VERSIONS.map((version) => [version.id, version]))

export function versionById(id: string): BibleVersion | undefined {
  return byId.get(id)
}

export function versionsFor(language: Language): readonly BibleVersion[] {
  return VERSIONS.filter((version) => version.language === language)
}

export function defaultVersionId(language: Language): string {
  return versionsFor(language)[0].id
}

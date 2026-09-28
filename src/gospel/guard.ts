import { normalizeQuestion } from './text.ts'

export type GuardKind = 'care' | 'medical' | 'legal'

const CARE = [
  /suicid/,
  /kill myself/,
  /killing myself/,
  /want to die/,
  /wanna die/,
  /wish i (was|were) dead/,
  /end my life/,
  /take my (own )?life/,
  /self harm/,
  /cut myself/,
  /hurt myself/,
  /no quiero vivir/,
  /quiero morir/,
  /me quiero matar/,
  /quitarme la vida/,
  /nao quero( mais)? viver/,
  /quero morrer/,
  /me matar/,
  /tirar minha vida/,
  /acabar com minha vida/,
  /automutil/,
  /me corto/,
  /me cortar/,
  /being abused/,
  /abusing me/,
  /me abusa/,
  /me estan abusando/,
  /estao me abusando/,
  /he hits me/,
  /she hits me/,
  /me maltrata/,
  /me pega/,
  /me bate/,
]

const MEDICAL = [
  /medical advice/,
  /consejo medico/,
  /conselho medico/,
  /my symptoms/,
  /mis sintomas/,
  /meus sintomas/,
  /chest pain/,
  /dolor de pecho/,
  /dolor en el pecho/,
  /dor no peito/,
  /what medicine/,
  /which medicine/,
  /que medicamento/,
  /que medicina/,
  /qual medicamento/,
  /qual remedio/,
  /que remedio/,
  /should i take (this |the |my |a )?(medicine|medication|pill|drug)/,
  /debo tomar (este |el |la |un |una |ese )?(medicamento|medicina|pastilla|remedio)/,
  /devo tomar (este |o |a |um |uma |esse )?(medicamento|medicina|remedio|comprimido)/,
  /am i sick/,
  /estoy enfermo/,
  /estoy enferma/,
  /estou doente/,
  /diagnose me/,
  /diagnostica/,
  /my diagnosis/,
  /mi diagnostico/,
  /meu diagnostico/,
  /i have cancer/,
  /tengo cancer/,
  /tenho cancer/,
  /my cancer/,
  /mi cancer/,
  /meu cancer/,
  /\bdosage\b/,
  /dosis de/,
  /\bdosagem\b/,
  /receta medica/,
  /receita medica/,
  /side effect/,
  /efecto secundario/,
  /efeito colateral/,
]

const LEGAL = [
  /legal advice/,
  /consejo legal/,
  /asesoria legal/,
  /conselho juridico/,
  /should i sue/,
  /can i sue/,
  /debo demandar/,
  /puedo demandar/,
  /devo processar/,
  /posso processar/,
  /is it legal to/,
  /is this legal/,
  /es legal que/,
  /es esto legal/,
  /isso e legal/,
  /my lawyer/,
  /mi abogado/,
  /meu advogado/,
  /\blawsuit\b/,
  /demanda judicial/,
  /processo judicial/,
]

function hits(text: string, patterns: readonly RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

/** Care comes before a medical or legal refusal. A scripture question that never asks for advice is left alone. */
export function classifyQuestion(value: string): GuardKind | null {
  const text = normalizeQuestion(value)
  if (text.length < 2) return null
  if (hits(text, CARE)) return 'care'
  if (hits(text, MEDICAL)) return 'medical'
  if (hits(text, LEGAL)) return 'legal'
  return null
}

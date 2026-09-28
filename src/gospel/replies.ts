import type { Language } from '../i18n/messages'
import type { VerseRef } from './types'

type Reply = {
  intro: Record<Language, string>
  closing: Record<Language, string>
  refs: readonly VerseRef[]
}

function line(en: string, es: string, pt: string): Record<Language, string> {
  return { en, es, pt }
}

function refs(...rows: readonly (readonly [string, number, number])[]): VerseRef[] {
  return rows.map(([bookId, chapter, verse]) => ({ bookId, chapter, verse }))
}

export const CARE_REPLY: Reply = {
  intro: line(
    'If you are in danger, or you might hurt yourself, please tell someone near you right now. A pastor, a person in your church, or local emergency help can stay with you. I am not a counselor, and a chat on this phone is not a place to carry this alone.',
    'Si estás en peligro, o si podrías hacerte daño, díselo ahora a alguien que esté cerca. Un pastor, una persona de tu iglesia, o la ayuda de emergencia de tu lugar puede acompañarte. No soy un consejero, y un chat en este teléfono no es lugar para cargar esto solo.',
    'Se você está em perigo, ou se poderia se ferir, diga agora a alguém que esteja perto. Um pastor, uma pessoa da sua igreja, ou a ajuda de emergência do seu lugar pode ficar com você. Eu não sou um conselheiro, e um chat neste telefone não é lugar para carregar isso sozinho.',
  ),
  closing: line(
    'These verses are an invitation to the Lord. They are not a substitute for a person who can sit with you. Please reach your local fellowship.',
    'Estos versículos son una invitación al Señor. No sustituyen a una persona que pueda sentarse contigo. Busca a tu congregación local.',
    'Estes versículos são um convite ao Senhor. Eles não substituem uma pessoa que possa sentar-se com você. Procure a sua igreja local.',
  ),
  refs: refs(['psa', 34, 18], ['mat', 11, 28], ['1pe', 5, 7]),
}

export const MEDICAL_REPLY: Reply = {
  intro: line(
    'I can’t give medical advice. I will not guess about a symptom, a medicine, or a diagnosis. Please talk with a doctor.',
    'No puedo dar consejo médico. No voy a adivinar un síntoma, una medicina o un diagnóstico. Habla con un médico.',
    'Não posso dar conselho médico. Não vou adivinhar um sintoma, um remédio ou um diagnóstico. Fale com um médico.',
  ),
  closing: line(
    'The verse below is about asking God for wisdom, and about rest for the weary. It is not a treatment. For the body, see a doctor. For prayer and Scripture, talk with your pastor.',
    'El versículo de abajo habla de pedir sabiduría a Dios, y de descanso para el cansado. No es un tratamiento. Para el cuerpo, ve a un médico. Para la oración y la Escritura, habla con tu pastor.',
    'O versículo abaixo fala de pedir sabedoria a Deus, e de descanso para o cansado. Não é um tratamento. Para o corpo, procure um médico. Para a oração e a Escritura, fale com o seu pastor.',
  ),
  refs: refs(['jas', 1, 5], ['mat', 11, 28]),
}

export const LEGAL_REPLY: Reply = {
  intro: line(
    'I can’t give legal advice. I will not guess about a case, a court, or what the law requires of you. Please talk with a qualified lawyer.',
    'No puedo dar consejo legal. No voy a adivinar un caso, un juzgado, o lo que la ley exige de ti. Habla con un abogado calificado.',
    'Não posso dar conselho jurídico. Não vou adivinhar um caso, um tribunal, ou o que a lei exige de você. Fale com um advogado qualificado.',
  ),
  closing: line(
    'The verse below is about doing justly and walking humbly with God. It is not a legal ruling. For the law, see a lawyer. For prayer and Scripture, talk with your pastor.',
    'El versículo de abajo habla de hacer justicia y caminar humildemente con Dios. No es un fallo legal. Para la ley, ve a un abogado. Para la oración y la Escritura, habla con tu pastor.',
    'O versículo abaixo fala de fazer justiça e andar humildemente com Deus. Não é uma sentença jurídica. Para a lei, procure um advogado. Para a oração e a Escritura, fale com o seu pastor.',
  ),
  refs: refs(['mic', 6, 8]),
}

export const FALLBACK_REPLY: Reply = {
  intro: line(
    'I don’t have a prepared note for that question. Here are a few verses that hold the heart of the gospel. You can also ask about salvation, prayer, forgiveness, fear, or hope, or name a reference such as John 3:16.',
    'No tengo una nota preparada para esa pregunta. Aquí hay unos versículos que guardan el corazón del evangelio. También puedes preguntar por la salvación, la oración, el perdón, el miedo o la esperanza, o nombrar una cita como Juan 3:16.',
    'Não tenho uma nota preparada para essa pergunta. Aqui estão alguns versículos que guardam o coração do evangelho. Você também pode perguntar sobre a salvação, a oração, o perdão, o medo ou a esperança, ou citar uma referência como João 3:16.',
  ),
  closing: line(
    'Read them in their chapters. This note does not replace the passage, and it does not replace your pastor.',
    'Léelos en sus capítulos. Esta nota no reemplaza el pasaje, ni reemplaza a tu pastor.',
    'Leia-os nos seus capítulos. Esta nota não substitui a passagem, nem substitui o seu pastor.',
  ),
  refs: refs(['jhn', 3, 16], ['rom', 5, 8], ['jhn', 14, 6]),
}

export const PASSAGE_REPLY: Reply = {
  intro: line(
    'Here is that verse in the Bible you are reading. The sentences around it in the chapter belong with it.',
    'Aquí está ese versículo en la Biblia que estás leyendo. Las frases de alrededor, en el capítulo, van con él.',
    'Aqui está esse versículo na Bíblia que você está lendo. As frases ao redor, no capítulo, andam com ele.',
  ),
  closing: line(
    'I will not add a meaning this short note cannot carry. Read the chapter, and ask your pastor what it says.',
    'No voy a añadir un sentido que esta nota breve no puede cargar. Lee el capítulo, y pregunta a tu pastor qué dice.',
    'Não vou acrescentar um sentido que esta nota breve não pode carregar. Leia o capítulo, e pergunte ao seu pastor o que ele diz.',
  ),
  refs: [],
}

export const BOOK_REPLY: Reply = {
  intro: line(
    'That names a book of the Bible. Open it from Read when you want the whole book. Here is the first verse.',
    'Eso nombra un libro de la Biblia. Ábrelo en Leer cuando quieras el libro entero. Aquí está el primer versículo.',
    'Isso nomeia um livro da Bíblia. Abra-o em Ler quando quiser o livro inteiro. Aqui está o primeiro versículo.',
  ),
  closing: line(
    'The first verse is a doorway, not a summary of the book.',
    'El primer versículo es una puerta, no un resumen del libro.',
    'O primeiro versículo é uma porta, não um resumo do livro.',
  ),
  refs: [],
}

export const SCRIPTURE_CLOSING: Record<Language, string> = line(
  'Read these verses in their chapters. This is a reading aid, not the last word, and not a pastor.',
  'Lee estos versículos en sus capítulos. Esto es una ayuda de lectura, no la última palabra, ni un pastor.',
  'Leia estes versículos nos seus capítulos. Isto é uma ajuda de leitura, não a última palavra, nem um pastor.',
)

export const FIXED_REFS: readonly VerseRef[] = [
  ...CARE_REPLY.refs,
  ...MEDICAL_REPLY.refs,
  ...LEGAL_REPLY.refs,
  ...FALLBACK_REPLY.refs,
]

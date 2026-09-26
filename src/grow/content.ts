import type { Language } from '../i18n/messages'
import { localDayNumber } from '../scripture/daily'

/** Short original copy, plus public-domain creed and catechism lines where noted. */
export type Copy = { readonly en: string; readonly es: string; readonly pt: string }

export function pickCopy(language: Language, value: Copy): string {
  return value[language]
}

export function forToday<T>(items: readonly T[], date = new Date()): T {
  const item = items[localDayNumber(date) % items.length]
  if (item === undefined) throw new Error('Empty grow list')
  return item
}

export type PracticeItem = { id: string; title: Copy; body: Copy }

export const PRACTICES: readonly PracticeItem[] = [
  {
    id: 'aloud',
    title: { en: 'Read it aloud', es: 'Léelo en voz alta', pt: 'Leia em voz alta' },
    body: {
      en: 'Read today’s verse once, slowly, out loud. Let the sentence finish before you move on.',
      es: 'Lee el versículo de hoy una vez, despacio, en voz alta. Deja que la frase termine antes de seguir.',
      pt: 'Leia o versículo de hoje uma vez, devagar, em voz alta. Deixe a frase terminar antes de seguir.',
    },
  },
  {
    id: 'person',
    title: { en: 'Thank God for one person', es: 'Da gracias por una persona', pt: 'Agradeça por uma pessoa' },
    body: {
      en: 'Before the day gets loud, thank God for one person by name. A long prayer is not required.',
      es: 'Antes de que el día se llene de ruido, da gracias a Dios por una persona, por su nombre. No hace falta una oración larga.',
      pt: 'Antes que o dia fique barulhento, agradeça a Deus por uma pessoa, pelo nome. Uma oração longa não é necessária.',
    },
  },
  {
    id: 'quiet',
    title: { en: 'A few quiet minutes', es: 'Unos minutos en silencio', pt: 'Alguns minutos em silêncio' },
    body: {
      en: 'Sit for a few minutes with nothing in your hands. You do not have to produce a feeling.',
      es: 'Siéntate unos minutos sin nada en las manos. No tienes que sentir algo en especial.',
      pt: 'Sente-se alguns minutos sem nada nas mãos. Você não precisa produzir um sentimento.',
    },
  },
  {
    id: 'sentence',
    title: { en: 'Carry one sentence', es: 'Lleva una frase', pt: 'Leve uma frase' },
    body: {
      en: 'Choose one sentence from today’s verse and keep it with you through the afternoon.',
      es: 'Elige una frase del versículo de hoy y llévala contigo durante la tarde.',
      pt: 'Escolha uma frase do versículo de hoje e leve-a com você durante a tarde.',
    },
  },
  {
    id: 'load',
    title: { en: 'Pray for a hidden load', es: 'Ora por una carga escondida', pt: 'Ore por um peso escondido' },
    body: {
      en: 'Pray for someone who is carrying more than they say. One honest sentence is enough.',
      es: 'Ora por alguien que carga más de lo que dice. Basta una frase honesta.',
      pt: 'Ore por alguém que carrega mais do que diz. Uma frase honesta basta.',
    },
  },
  {
    id: 'worry',
    title: { en: 'Name one worry', es: 'Nombra una preocupación', pt: 'Nomeie uma preocupação' },
    body: {
      en: 'Tell God one worry in plain words, then leave it there.',
      es: 'Di a Dios una preocupación con palabras sencillas, y déjala allí.',
      pt: 'Diga a Deus uma preocupação com palavras simples, e deixe-a ali.',
    },
  },
  {
    id: 'kindness',
    title: { en: 'One hidden kindness', es: 'Una bondad escondida', pt: 'Uma bondade escondida' },
    body: {
      en: 'Do one kindness that no one needs to notice. Let it stay small.',
      es: 'Haz una bondad que nadie tenga que notar. Que siga siendo pequeña.',
      pt: 'Faça uma bondade que ninguém precise notar. Deixe que ela continue pequena.',
    },
  },
  {
    id: 'psalm',
    title: { en: 'A psalm you know', es: 'Un salmo que ya conoces', pt: 'Um salmo que você já conhece' },
    body: {
      en: 'Read the first few lines of a psalm you already know. Stay with those lines.',
      es: 'Lee las primeras líneas de un salmo que ya conoces. Medita un momento en esas líneas.',
      pt: 'Leia as primeiras linhas de um salmo que você já conhece. Fique com essas linhas.',
    },
  },
  {
    id: 'forgive',
    title: { en: 'A word that still sits', es: 'Una palabra que todavía pesa', pt: 'Uma palavra que ainda pesa' },
    body: {
      en: 'If a word from yesterday still sits between you and someone, ask forgiveness if you can.',
      es: 'Si una palabra de ayer todavía pesa entre tú y alguien, pide perdón si puedes.',
      pt: 'Se uma palavra de ontem ainda está entre você e alguém, peça perdão se puder.',
    },
  },
  {
    id: 'evening',
    title: { en: 'Give the evening back', es: 'Entrega la tarde a Dios', pt: 'Devolva o fim do dia' },
    body: {
      en: 'Give the first few minutes of the evening back to God, without a list of achievements.',
      es: 'Entrega a Dios los primeros minutos de la tarde, sin hacer una lista de lo que lograste.',
      pt: 'Devolva a Deus os primeiros minutos da noite, sem uma lista de conquistas.',
    },
  },
  {
    id: 'gift',
    title: { en: 'Notice one ordinary gift', es: 'Un don de cada día', pt: 'Note um dom comum' },
    body: {
      en: 'Thank God for one ordinary gift you would miss if it were gone: bread, light, a safe night.',
      es: 'Da gracias a Dios por un don sencillo que extrañarías si faltara: el pan, la luz, una noche segura.',
      pt: 'Agradeça a Deus por um dom comum de que você sentiria falta: o pão, a luz, uma noite segura.',
    },
  },
]

export type Cornerstone = { id: string; title: Copy; body: Copy; source?: Copy }

export const CORNERSTONES: readonly Cornerstone[] = [
  {
    id: 'god',
    title: { en: 'God', es: 'Dios', pt: 'Deus' },
    body: {
      en: 'There is one God, maker of heaven and earth. He is not a force we manage. He is the Lord who speaks, and the world is his work. The Apostles’ Creed begins, “I believe in God the Father almighty, maker of heaven and earth.”',
      es: 'Hay un solo Dios, creador del cielo y de la tierra. No es una fuerza que podamos manejar. Es el Señor que habla, y el mundo es obra suya. El Credo de los Apóstoles empieza: “Creo en Dios, Padre todopoderoso, creador del cielo y de la tierra.”',
      pt: 'Há um só Deus, criador do céu e da terra. Ele não é uma força que possamos controlar. É o Senhor que fala, e o mundo é obra dele. O Credo Apostólico começa: “Creio em Deus Pai todo-poderoso, criador do céu e da terra.”',
    },
    source: {
      en: 'Apostles’ Creed. Public domain.',
      es: 'Credo de los Apóstoles. Dominio público.',
      pt: 'Credo Apostólico. Domínio público.',
    },
  },
  {
    id: 'scripture',
    title: { en: 'Scripture', es: 'La Escritura', pt: 'A Escritura' },
    body: {
      en: 'The Scriptures are God’s word written, given so we can know him and not invent him. Prophets and apostles spoke, and the church received those writings as the rule for faith. The translations in this app are free to read. The claim is older than any one edition.',
      es: 'Las Escrituras son la palabra de Dios escrita, dada para que lo conozcamos y no lo inventemos. Profetas y apóstoles hablaron, y la iglesia recibió esos escritos como regla de fe. Las traducciones de esta app se pueden leer con libertad. La afirmación es más antigua que cualquier edición.',
      pt: 'As Escrituras são a palavra de Deus escrita, dada para que o conheçamos e não o inventemos. Profetas e apóstolos falaram, e a igreja recebeu esses escritos como regra de fé. As traduções deste app podem ser lidas livremente. A afirmação é mais antiga do que qualquer edição.',
    },
  },
  {
    id: 'christ',
    title: { en: 'Christ', es: 'Cristo', pt: 'Cristo' },
    body: {
      en: 'Jesus Christ is God’s Son, truly God and truly man. He lived, was crucified, and was raised. The Apostles’ Creed says he “was crucified, dead, and buried” and that “the third day he rose again from the dead.”',
      es: 'Jesucristo es el Hijo de Dios, verdaderamente Dios y verdaderamente hombre. Vivió, fue crucificado y resucitó. El Credo dice que “fue crucificado, muerto y sepultado” y que “al tercer día resucitó de entre los muertos.”',
      pt: 'Jesus Cristo é o Filho de Deus, verdadeiramente Deus e verdadeiramente homem. Ele viveu, foi crucificado e ressuscitou. O Credo diz que ele “foi crucificado, morto e sepultado” e que “ao terceiro dia ressuscitou dos mortos.”',
    },
    source: {
      en: 'Apostles’ Creed. Public domain.',
      es: 'Credo de los Apóstoles. Dominio público.',
      pt: 'Credo Apostólico. Domínio público.',
    },
  },
  {
    id: 'faith',
    title: { en: 'Faith', es: 'La fe', pt: 'A fé' },
    body: {
      en: 'Faith is trusting Christ, not collecting a score. The Westminster Shorter Catechism, a public-domain text from 1647, says faith in Jesus Christ is “a saving grace, whereby we receive and rest upon him alone for salvation, as he is offered to us in the gospel.”',
      es: 'La fe es confiar en Cristo, no juntar un puntaje. Es recibirlo y descansar solo en él para la salvación, tal como el evangelio lo ofrece. No es un premio por haber entendido bastante.',
      pt: 'A fé é confiar em Cristo, não juntar uma pontuação. É recebê-lo e descansar só nele para a salvação, como o evangelho o oferece. Não é um prêmio por ter entendido o bastante.',
    },
    source: {
      en: 'Westminster Shorter Catechism, 1647, question 86. Public domain.',
      es: '',
      pt: '',
    },
  },
  {
    id: 'prayer',
    title: { en: 'Prayer', es: 'La oración', pt: 'A oração' },
    body: {
      en: 'Prayer is speaking to God as children speak to a Father, with honesty. It is not a performance. Jesus gave a pattern: God’s name, God’s will, daily bread, forgiveness, and deliverance from evil.',
      es: 'Orar es hablar con Dios como los hijos hablan con un Padre, con honestidad. No es una actuación. Jesús dio un modelo: el nombre de Dios, su voluntad, el pan de cada día, el perdón y la liberación del mal.',
      pt: 'Orar é falar com Deus como os filhos falam com um Pai, com honestidade. Não é uma apresentação. Jesus deu um modelo: o nome de Deus, a vontade dele, o pão de cada dia, o perdão e o livramento do mal.',
    },
  },
  {
    id: 'hope',
    title: { en: 'The life to come', es: 'La vida que viene', pt: 'A vida que vem' },
    body: {
      en: 'Hope is not a mood about the week. The Apostles’ Creed ends with “the resurrection of the body, and the life everlasting.” Death is not the last word.',
      es: 'La esperanza no es un ánimo sobre la semana. El Credo termina con “la resurrección de la carne y la vida eterna.” La muerte no es la última palabra.',
      pt: 'A esperança não é um ânimo sobre a semana. O Credo termina com “a ressurreição da carne e a vida eterna.” A morte não é a última palavra.',
    },
    source: {
      en: 'Apostles’ Creed. Public domain.',
      es: 'Credo de los Apóstoles. Dominio público.',
      pt: 'Credo Apostólico. Domínio público.',
    },
  },
]

export type TriviaItem = {
  id: string
  prompt: Copy
  choices: readonly [Copy, Copy, Copy]
  answer: 0 | 1 | 2
  why: Copy
}

export const TRIVIA: readonly TriviaItem[] = [
  {
    id: 'books',
    prompt: {
      en: 'How many books are in the Protestant Bible used here?',
      es: '¿Cuántos libros tiene la Biblia protestante que usa esta app?',
      pt: 'Quantos livros tem a Bíblia protestante usada aqui?',
    },
    choices: [
      { en: '66', es: '66', pt: '66' },
      { en: '73', es: '73', pt: '73' },
      { en: '39', es: '39', pt: '39' },
    ],
    answer: 0,
    why: {
      en: 'This app follows the Protestant canon: 39 books in the Old Testament and 27 in the New. Some churches count more Old Testament books.',
      es: 'Esta app sigue el canon protestante: 39 libros en el Antiguo Testamento y 27 en el Nuevo. Algunas iglesias cuentan más libros del Antiguo Testamento.',
      pt: 'Este app segue o cânon protestante: 39 livros no Antigo Testamento e 27 no Novo. Algumas igrejas contam mais livros do Antigo Testamento.',
    },
  },
  {
    id: 'first',
    prompt: {
      en: 'Which book comes first?',
      es: '¿Qué libro va primero?',
      pt: 'Qual livro vem primeiro?',
    },
    choices: [
      { en: 'Matthew', es: 'Mateo', pt: 'Mateus' },
      { en: 'Genesis', es: 'Génesis', pt: 'Gênesis' },
      { en: 'Psalms', es: 'Salmos', pt: 'Salmos' },
    ],
    answer: 1,
    why: {
      en: 'Genesis opens the Bible.',
      es: 'Génesis abre la Biblia.',
      pt: 'Gênesis abre a Bíblia.',
    },
  },
  {
    id: 'psalms',
    prompt: {
      en: 'How many psalms are in the book of Psalms?',
      es: '¿Cuántos salmos tiene el libro de los Salmos?',
      pt: 'Quantos salmos tem o livro de Salmos?',
    },
    choices: [
      { en: '100', es: '100', pt: '100' },
      { en: '176', es: '176', pt: '176' },
      { en: '150', es: '150', pt: '150' },
    ],
    answer: 2,
    why: {
      en: 'The book of Psalms has 150 psalms.',
      es: 'El libro de los Salmos tiene 150 salmos.',
      pt: 'O livro de Salmos tem 150 salmos.',
    },
  },
  {
    id: 'matthew',
    prompt: {
      en: 'Which book opens the New Testament?',
      es: '¿Qué libro abre el Nuevo Testamento?',
      pt: 'Qual livro abre o Novo Testamento?',
    },
    choices: [
      { en: 'Matthew', es: 'Mateo', pt: 'Mateus' },
      { en: 'Mark', es: 'Marcos', pt: 'Marcos' },
      { en: 'John', es: 'Juan', pt: 'João' },
    ],
    answer: 0,
    why: {
      en: 'Matthew is the first of the four Gospels, and the first book of the New Testament.',
      es: 'Mateo es el primero de los cuatro Evangelios y el primer libro del Nuevo Testamento.',
      pt: 'Mateus é o primeiro dos quatro Evangelhos e o primeiro livro do Novo Testamento.',
    },
  },
  {
    id: 'last',
    prompt: {
      en: 'Which book comes last in this Bible?',
      es: '¿Qué libro va al final en esta Biblia?',
      pt: 'Qual livro vem por último nesta Bíblia?',
    },
    choices: [
      { en: 'Malachi', es: 'Malaquías', pt: 'Malaquias' },
      { en: 'Revelation', es: 'Apocalipsis', pt: 'Apocalipse' },
      { en: 'Acts', es: 'Hechos', pt: 'Atos' },
    ],
    answer: 1,
    why: {
      en: 'Revelation closes the New Testament. Malachi closes the Old Testament in this order.',
      es: 'Apocalipsis cierra el Nuevo Testamento. Malaquías cierra el Antiguo Testamento en este orden.',
      pt: 'Apocalipse fecha o Novo Testamento. Malaquias fecha o Antigo Testamento nesta ordem.',
    },
  },
  {
    id: 'joshua',
    prompt: {
      en: 'Who led Israel into the land after Moses?',
      es: '¿Quién guió a Israel a la tierra después de Moisés?',
      pt: 'Quem conduziu Israel à terra depois de Moisés?',
    },
    choices: [
      { en: 'Aaron', es: 'Aarón', pt: 'Arão' },
      { en: 'Samuel', es: 'Samuel', pt: 'Samuel' },
      { en: 'Joshua', es: 'Josué', pt: 'Josué' },
    ],
    answer: 2,
    why: {
      en: 'The book of Joshua follows Deuteronomy. Joshua leads the people in after Moses dies.',
      es: 'El libro de Josué sigue a Deuteronomio. Josué guía al pueblo después de la muerte de Moisés.',
      pt: 'O livro de Josué segue Deuteronômio. Josué conduz o povo depois da morte de Moisés.',
    },
  },
  {
    id: 'short-psalm',
    prompt: {
      en: 'Which psalm has only two verses?',
      es: '¿Qué salmo tiene solo dos versículos?',
      pt: 'Qual salmo tem só dois versículos?',
    },
    choices: [
      { en: 'Psalm 117', es: 'Salmo 117', pt: 'Salmo 117' },
      { en: 'Psalm 23', es: 'Salmo 23', pt: 'Salmo 23' },
      { en: 'Psalm 119', es: 'Salmo 119', pt: 'Salmo 119' },
    ],
    answer: 0,
    why: {
      en: 'In this Bible, Psalm 117 has two verses. Psalm 119 has 176, the most in the book.',
      es: 'En esta Biblia, el Salmo 117 tiene dos versículos. El Salmo 119 tiene 176, la mayor cantidad del libro.',
      pt: 'Nesta Bíblia, o Salmo 117 tem dois versículos. O Salmo 119 tem 176, a maior quantidade do livro.',
    },
  },
  {
    id: 'rome',
    prompt: {
      en: 'Paul’s letter to the Romans is written to which city?',
      es: '¿A qué ciudad está dirigida la carta de Pablo a los Romanos?',
      pt: 'A carta de Paulo aos Romanos foi escrita para qual cidade?',
    },
    choices: [
      { en: 'Corinth', es: 'Corinto', pt: 'Corinto' },
      { en: 'Rome', es: 'Roma', pt: 'Roma' },
      { en: 'Ephesus', es: 'Éfeso', pt: 'Éfeso' },
    ],
    answer: 1,
    why: {
      en: 'Romans is addressed to the saints in Rome. Corinth and Ephesus have their own letters.',
      es: 'Romanos está dirigida a los santos que están en Roma. Corinto y Éfeso tienen sus propias cartas.',
      pt: 'Romanos é endereçada aos santos que estão em Roma. Corinto e Éfeso têm as suas próprias cartas.',
    },
  },
  {
    id: 'kjv-year',
    prompt: {
      en: 'Which edition of the King James Version is bundled here?',
      es: '¿Qué edición de la versión King James está incluida aquí?',
      pt: 'Qual edição da versão King James está incluída aqui?',
    },
    choices: [
      { en: '2011', es: '2011', pt: '2011' },
      { en: '1901', es: '1901', pt: '1901' },
      { en: '1769', es: '1769', pt: '1769' },
    ],
    answer: 2,
    why: {
      en: 'The King James text in this app is the 1769 edition, which is in the public domain. The 1901 date belongs to the American Standard Version.',
      es: 'El texto King James de esta app es la edición de 1769, de dominio público. La fecha de 1901 corresponde a la American Standard Version.',
      pt: 'O texto King James deste app é a edição de 1769, em domínio público. A data de 1901 pertence à American Standard Version.',
    },
  },
  {
    id: 'chapters',
    prompt: {
      en: 'How many chapters are in the 66 books of this Bible?',
      es: '¿Cuántos capítulos tienen los 66 libros de esta Biblia?',
      pt: 'Quantos capítulos têm os 66 livros desta Bíblia?',
    },
    choices: [
      { en: '1,189', es: '1.189', pt: '1.189' },
      { en: '929', es: '929', pt: '929' },
      { en: '1,500', es: '1.500', pt: '1.500' },
    ],
    answer: 0,
    why: {
      en: 'The 66 books bundled here total 1,189 chapters. The reading plan walks through all of them.',
      es: 'Los 66 libros incluidos aquí suman 1.189 capítulos. El plan de lectura recorre todos.',
      pt: 'Os 66 livros incluídos aqui somam 1.189 capítulos. O plano de leitura percorre todos.',
    },
  },
]

export type GapPuzzle = {
  id: string
  bookId: string
  chapter: number
  verse: number
  before: string
  after: string
  answer: string
  choices: readonly [string, string, string]
}

/** Gap-fill lines taken from the 1769 King James text bundled in this app. */
export const PUZZLES: readonly GapPuzzle[] = [
  {
    id: 'jhn-3-16',
    bookId: 'jhn',
    chapter: 3,
    verse: 16,
    before: 'For God so loved the',
    after: ', that he gave his only begotten Son',
    answer: 'world',
    choices: ['world', 'temple', 'city'],
  },
  {
    id: 'psa-23-1',
    bookId: 'psa',
    chapter: 23,
    verse: 1,
    before: 'The Lord is my',
    after: '; I shall not want.',
    answer: 'shepherd',
    choices: ['king', 'shepherd', 'light'],
  },
  {
    id: 'gen-1-1',
    bookId: 'gen',
    chapter: 1,
    verse: 1,
    before: 'In the beginning God created the',
    after: 'and the earth.',
    answer: 'heaven',
    choices: ['light', 'sea', 'heaven'],
  },
  {
    id: 'mat-11-28',
    bookId: 'mat',
    chapter: 11,
    verse: 28,
    before: 'Come unto me, all ye that labour and are heavy laden, and I will give you',
    after: '.',
    answer: 'rest',
    choices: ['rest', 'bread', 'gold'],
  },
  {
    id: 'psa-119-105',
    bookId: 'psa',
    chapter: 119,
    verse: 105,
    before: 'Thy word is a lamp unto my feet, and a',
    after: 'unto my path.',
    answer: 'light',
    choices: ['song', 'light', 'sword'],
  },
  {
    id: 'jhn-14-6',
    bookId: 'jhn',
    chapter: 14,
    verse: 6,
    before: 'I am the way, the truth, and the',
    after: ': no man cometh unto the Father, but by me.',
    answer: 'life',
    choices: ['door', 'vine', 'life'],
  },
  {
    id: 'rom-8-28',
    bookId: 'rom',
    chapter: 8,
    verse: 28,
    before: 'And we know that all things work together for',
    after: 'to them that love God',
    answer: 'good',
    choices: ['good', 'glory', 'peace'],
  },
  {
    id: 'php-4-13',
    bookId: 'php',
    chapter: 4,
    verse: 13,
    before: 'I can do all things through',
    after: 'which strengtheneth me.',
    answer: 'Christ',
    choices: ['faith', 'hope', 'Christ'],
  },
]

export const FACTS: readonly Copy[] = [
  {
    en: 'The Protestant Bible in this app has 66 books: 39 in the Old Testament and 27 in the New.',
    es: 'La Biblia protestante de esta app tiene 66 libros: 39 en el Antiguo Testamento y 27 en el Nuevo.',
    pt: 'A Bíblia protestante deste app tem 66 livros: 39 no Antigo Testamento e 27 no Novo.',
  },
  {
    en: 'Those 66 books contain 1,189 chapters. The reading plan on Daily walks through every one of them.',
    es: 'Esos 66 libros contienen 1.189 capítulos. El plan de lectura en Diario recorre cada uno.',
    pt: 'Esses 66 livros contêm 1.189 capítulos. O plano de leitura em Diário percorre cada um.',
  },
  {
    en: 'The book of Psalms has 150 psalms. Psalm 117 has two verses. Psalm 119 has 176.',
    es: 'El libro de los Salmos tiene 150 salmos. El Salmo 117 tiene dos versículos. El Salmo 119 tiene 176.',
    pt: 'O livro de Salmos tem 150 salmos. O Salmo 117 tem dois versículos. O Salmo 119 tem 176.',
  },
  {
    en: 'The four Gospels are Matthew, Mark, Luke, and John. Matthew opens the New Testament.',
    es: 'Los cuatro Evangelios son Mateo, Marcos, Lucas y Juan. Mateo abre el Nuevo Testamento.',
    pt: 'Os quatro Evangelhos são Mateus, Marcos, Lucas e João. Mateus abre o Novo Testamento.',
  },
  {
    en: 'The King James text in this app is the 1769 edition. It is in the public domain.',
    es: 'El texto King James de esta app es la edición de 1769. Es de dominio público.',
    pt: 'O texto King James deste app é a edição de 1769. Está em domínio público.',
  },
  {
    en: 'The Apostles’ Creed is an ancient summary of the faith. It is not a book of the Bible.',
    es: 'El Credo de los Apóstoles es un resumen antiguo de la fe. No es un libro de la Biblia.',
    pt: 'O Credo Apostólico é um resumo antigo da fé. Não é um livro da Bíblia.',
  },
  {
    en: 'Genesis opens the Bible. In this order, Malachi closes the Old Testament and Revelation closes the New.',
    es: 'Génesis abre la Biblia. En este orden, Malaquías cierra el Antiguo Testamento y Apocalipsis cierra el Nuevo.',
    pt: 'Gênesis abre a Bíblia. Nesta ordem, Malaquias fecha o Antigo Testamento e Apocalipse fecha o Novo.',
  },
  {
    en: 'Samuel, Kings, and Chronicles tell the story of Israel’s kings. Each of those names covers two books.',
    es: 'Samuel, Reyes y Crónicas cuentan la historia de los reyes de Israel. Cada uno de esos nombres abarca dos libros.',
    pt: 'Samuel, Reis e Crônicas contam a história dos reis de Israel. Cada um desses nomes cobre dois livros.',
  },
]

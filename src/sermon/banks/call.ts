import type { SermonLang, SermonLines, SermonOutline } from '../types'
import { CALL_FULL } from './call-full'

type ShortLines = Omit<SermonLines, 'full'>

function lines(
  id: string,
  en: ShortLines,
  es: ShortLines,
  pt: ShortLines,
): Record<SermonLang, SermonLines> {
  const pack = CALL_FULL[id]
  if (!pack) throw new Error(`missing full lines for ${id}`)
  return {
    en: { ...en, full: pack.en },
    es: { ...es, full: pack.es },
    pt: { ...pt, full: pack.pt },
  }
}

export const CALL: readonly SermonOutline[] = [
  {
    id: 'obedience',
    keywords: [
      'obey',
      'obedience',
      'commandment',
      'commands',
      'obedecer',
      'obediencia',
      'mandamiento',
      'mandamento',
      'obediencia',
    ],
    bookId: 'jhn',
    chapter: 14,
    verse: 15,
    endVerse: 15,
    lines: lines('obedience',
      {
        punch: ['Love for Jesus shows up as obedience.', 'If ye love me, keep my commandments. He already joined the two.'],
        context: [
          'Jesus is preparing the disciples for his leaving. He doesn’t separate affection from commands. If ye love me, keep my commandments. Love here isn’t a song we feel. It’s a life that does what he said.',
          'John 14 puts love where you can see it. Not in the volume of the singing. In the keeping. He is about to go to the cross, and he tells them what love looks like on this side of it.',
        ],
        application: [
          'Most of us say we love him and then negotiate the verses that cost us. When it’s inconvenient. When nobody will check. When we already have an explanation. Selective obedience is selective love. Keeping his commandments doesn’t earn him. It’s the evidence that we are his.',
          'Admiring a command is not the same as doing it. The verse you explain away is the one that would have made love visible.',
        ],
        challenge: [
          'Brothers, which commandment are you admiring instead of keeping? Forgiveness. Purity. Truth in your speech. Maybe the one you already know and keep postponing.',
          'Brothers, how would this class know that you love him if they watched your week? Not your explanation. Your week.',
        ],
        charge: [
          'Name it. Do it this week. Let love be visible where it has only been a sentence.',
          'Jesus’ message is direct: if ye love me, keep my commandments. Don’t leave love as a feeling.',
        ],
        questions: [
          [
            'What command of Jesus have you explained away?',
            'How would this class know that you love him if they watched your week?',
          ],
          [
            'Where is obedience still waiting until it feels like love?',
            'What one command will you keep before the week is over?',
          ],
        ],
      },
      {
        punch: ['El amor a Jesús se ve en la obediencia.', 'Si me amáis, guardad mis mandamientos. Él ya unió las dos cosas.'],
        context: [
          'Jesús prepara a los discípulos para su partida. No separa el afecto de los mandamientos. Si me amáis, guardad mis mandamientos. El amor aquí no es una canción que sentimos. Es una vida que hace lo que él dijo.',
          'Juan 14 pone el amor donde se puede ver. No en el volumen del canto. En el guardar. Está por ir a la cruz, y les dice cómo se ve el amor de este lado.',
        ],
        application: [
          'Casi todos decimos que lo amamos y luego negociamos los versículos que nos cuestan. Cuando es incómodo. Cuando nadie va a revisar. Cuando ya tenemos una explicación. Una obediencia selectiva es un amor selectivo. Guardar sus mandamientos no lo gana. Es la evidencia de que somos suyos.',
          'Admirar un mandamiento no es lo mismo que hacerlo. El versículo que explicas para no hacerlo es el que habría hecho visible el amor.',
        ],
        challenge: [
          'Hermanos, ¿qué mandamiento estás admirando en vez de guardarlo? El perdón. La pureza. La verdad en tu habla. Quizás el que ya conoces y sigues aplazando.',
          'Hermanos, ¿cómo sabría esta clase que lo amas si mirara tu semana? No tu explicación. Tu semana.',
        ],
        charge: [
          'Nómbralo. Hazlo esta semana. Que el amor se vea donde solo ha sido una frase.',
          'El mensaje de Jesús es directo: si me amáis, guardad mis mandamientos. No dejes el amor como un sentimiento.',
        ],
        questions: [
          [
            '¿Qué mandamiento de Jesús has explicado para no hacerlo?',
            '¿Cómo sabría esta clase que lo amas si mirara tu semana?',
          ],
          [
            '¿Dónde la obediencia sigue esperando hasta que se sienta como amor?',
            '¿Qué mandamiento vas a guardar antes de que acabe la semana?',
          ],
        ],
      },
      {
        punch: ['O amor a Jesus aparece na obediência.', 'Se me amais, guardai os meus mandamentos. Ele já uniu as duas coisas.'],
        context: [
          'Jesus prepara os discípulos para a sua partida. Ele não separa o afeto dos mandamentos. Se me amais, guardai os meus mandamentos. O amor aqui não é uma canção que sentimos. É uma vida que faz o que ele disse.',
          'João 14 põe o amor onde se pode ver. Não no volume do canto. No guardar. Ele está para ir à cruz, e diz como o amor aparece deste lado.',
        ],
        application: [
          'Quase todos dizemos que o amamos e depois negociamos os versículos que nos custam. Quando é incômodo. Quando ninguém vai conferir. Quando já temos uma explicação. Uma obediência seletiva é um amor seletivo. Guardar os mandamentos dele não o ganha. É a evidência de que somos dele.',
          'Admirar um mandamento não é a mesma coisa que cumpri-lo. O versículo que você explica para não cumprir é o que teria feito o amor visível.',
        ],
        challenge: [
          'Irmãos, que mandamento você está admirando em vez de guardar? O perdão. A pureza. A verdade na sua fala. Talvez aquele que você já conhece e continua adiando.',
          'Irmãos, como esta classe saberia que você o ama se olhasse a sua semana? Não a sua explicação. A sua semana.',
        ],
        charge: [
          'Nomeie. Faça nesta semana. Que o amor se veja onde só tem sido uma frase.',
          'A mensagem de Jesus é direta: se me amais, guardai os meus mandamentos. Não deixe o amor como um sentimento.',
        ],
        questions: [
          [
            'Que mandamento de Jesus você explicou para não cumprir?',
            'Como esta classe saberia que você o ama se olhasse a sua semana?',
          ],
          [
            'Onde a obediência ainda espera até parecer amor?',
            'Que mandamento você vai guardar antes de a semana acabar?',
          ],
        ],
      },
    ),
  },
  {
    id: 'word',
    keywords: [
      'bible',
      'scripture',
      'word of god',
      'the word',
      'biblia',
      'escritura',
      'palabra de dios',
      'escrituras',
      'palavra de deus',
    ],
    bookId: 'psa',
    chapter: 119,
    verse: 105,
    endVerse: 105,
    lines: lines('word',
      {
        punch: ['The Word is a lamp, not a souvenir.', 'A closed book cannot light the next step.'],
        context: [
          'Psalm 119 is a long love for what God has said. Thy word is a lamp unto my feet, and a light unto my path. It shows the next step. It is not a floodlight for the whole decade, and it does not flatter the traveler.',
          'The psalm assumes a person who keeps the word near enough to walk by. Light is for obedience. Not for winning an argument and then living unchanged.',
        ],
        application: [
          'Most of us honor the Bible and then walk by instinct. When I already know what I want. When the room agrees. When opening it would slow me down. We put the lamp on the shelf. God doesn’t work that way. The next step is in what he already said.',
          'A verse you will not obey is not yet a lamp. It’s a quote. Take the step it shows. Don’t ask it to shine and then walk in the ditch.',
        ],
        challenge: [
          'Brothers, when did you last let a verse decide your next step? This morning. Last month. You can’t remember. Maybe you wanted the lamp for the argument, not for the feet.',
          'Brothers, where are you walking by your own light? The decision. The grudge. The habit. Open the book before you take the step.',
        ],
        charge: [
          'Open it today. Take the step it shows. Don’t leave the lamp on the shelf.',
          'The psalm’s message is direct: his word is a lamp for the feet. Use it on the road you’re actually walking.',
        ],
        questions: [
          [
            'Where are you walking by your own light?',
            'What verse is already clear, and still unobeyed?',
          ],
          [
            'When did a verse last change what you did the same day?',
            'What step is the lamp already showing that you keep postponing?',
          ],
        ],
      },
      {
        punch: ['La Palabra es lámpara, no un recuerdo.', 'Un libro cerrado no puede alumbrar el siguiente paso.'],
        context: [
          'El Salmo 119 es un amor largo a lo que Dios ha dicho. Lámpara es a mis pies tu palabra, y lumbrera a mi camino. Muestra el siguiente paso. No es un reflector para toda la década, y no adula al que camina.',
          'El salmo supone una persona que tiene la palabra bastante cerca para caminar por ella. La luz es para obedecer. No es para ganar una discusión y seguir igual.',
        ],
        application: [
          'Casi todos honramos la Biblia y luego caminamos por instinto. Cuando ya sé lo que quiero. Cuando el cuarto está de acuerdo. Cuando abrirla me atrasaría. Dejamos la lámpara en el estante. Dios no funciona así. El siguiente paso está en lo que él ya dijo.',
          'Un versículo que no vas a obedecer todavía no es lámpara. Es una cita. Da el paso que muestra. No le pidas que alumbre y luego camines por la zanja.',
        ],
        challenge: [
          'Hermanos, ¿cuándo fue la última vez que un versículo decidió tu siguiente paso? Esta mañana. El mes pasado. No te acuerdas. Quizás querías la lámpara para la discusión, no para los pies.',
          'Hermanos, ¿dónde estás caminando con tu propia luz? La decisión. El rencor. El hábito. Abre el libro antes de dar el paso.',
        ],
        charge: [
          'Ábrela hoy. Da el paso que muestra. No dejes la lámpara en el estante.',
          'El mensaje del salmo es directo: su palabra es lámpara a los pies. Úsala en el camino que de veras estás caminando.',
        ],
        questions: [
          [
            '¿Dónde estás caminando con tu propia luz?',
            '¿Qué versículo ya está claro, y sigue sin obedecerse?',
          ],
          [
            '¿Cuándo un versículo cambió por última vez lo que hiciste el mismo día?',
            '¿Qué paso ya está mostrando la lámpara, y sigues aplazando?',
          ],
        ],
      },
      {
        punch: ['A Palavra é lâmpada, não uma lembrança.', 'Um livro fechado não alumia o próximo passo.'],
        context: [
          'O Salmo 119 é um amor longo ao que Deus disse. Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho. Mostra o próximo passo. Não é um holofote para a década inteira, e não elogia o viajante.',
          'O salmo supõe uma pessoa que mantém a palavra perto o bastante para andar por ela. A luz é para a obediência. Não é para ganhar uma discussão e seguir igual.',
        ],
        application: [
          'Quase todos honramos a Bíblia e depois andamos por instinto. Quando eu já sei o que quero. Quando a sala concorda. Quando abri-la me atrasaria. Deixamos a lâmpada na prateleira. Deus não trabalha assim. O próximo passo está no que ele já disse.',
          'Um versículo que você não vai obedecer ainda não é lâmpada. É uma citação. Dê o passo que ela mostra. Não peça que alumie e depois ande na vala.',
        ],
        challenge: [
          'Irmãos, quando foi a última vez que um versículo decidiu o seu próximo passo? Hoje de manhã. Mês passado. Você não lembra. Talvez você quisesse a lâmpada para a discussão, não para os pés.',
          'Irmãos, onde você está andando com a sua própria luz? A decisão. O rancor. O hábito. Abra o livro antes de dar o passo.',
        ],
        charge: [
          'Abra hoje. Dê o passo que ela mostra. Não deixe a lâmpada na prateleira.',
          'A mensagem do salmo é direta: a palavra dele é lâmpada para os pés. Use-a na estrada que você de fato está andando.',
        ],
        questions: [
          [
            'Onde você está andando com a sua própria luz?',
            'Que versículo já está claro, e continua sem obediência?',
          ],
          [
            'Quando um versículo mudou pela última vez o que você fez no mesmo dia?',
            'Que passo a lâmpada já está mostrando, e você continua adiando?',
          ],
        ],
      },
    ),
  },
  {
    id: 'service',
    keywords: [
      'serve',
      'service',
      'servant',
      'ministry',
      'servir',
      'servicio',
      'siervo',
      'ministerio',
      'servico',
      'servo',
      'diacono',
    ],
    bookId: 'mrk',
    chapter: 10,
    verse: 45,
    endVerse: 45,
    lines: lines('service',
      {
        punch: ['The Son of Man came to serve, and to give his life.', 'Greatness in this room looks like a towel, not a seat.'],
        context: [
          'James and John want seats of glory. Jesus tells the twelve that greatness will not look like the rulers of the Gentiles. Whoever will be great must be a servant. Then he points to himself. The Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.',
          'The request was for thrones. The answer was a ransom. Service in the church is shaped by a cross, not by a platform.',
        ],
        application: [
          'Most of us want the name of ministry and the feel of being needed. When the seat is visible. When the work is thanked. When the towel is somebody else’s. Jesus defines service by a ransom. The church is healthiest when her people take the lower place on purpose.',
          'An unimpressive task is the test. The chairs. The visit nobody posts. The mess. Do it as he did, without announcing it.',
        ],
        challenge: [
          'Brothers, are you asking to be served by this church, or have you come to serve? The seat. The towel. You already know which one you’ve been reaching for.',
          'Brothers, where do you still want the seat more than the towel? Name it. Then take the lower place this week.',
        ],
        charge: [
          'Find one unimpressive task and do it as he did. Don’t announce it.',
          'Jesus’ message is direct: the Son of man came to minister, and to give his life a ransom. Follow that shape.',
        ],
        questions: [
          [
            'Where do you still want the seat more than the towel?',
            'Who would be helped if you took the lower place on purpose?',
          ],
          [
            'What task have you been leaving for someone else because it doesn’t show?',
            'How is a ransom different from a platform?',
          ],
        ],
      },
      {
        punch: ['El Hijo del Hombre vino a servir, y a dar su vida.', 'La grandeza en este cuarto se parece a una toalla, no a un asiento.'],
        context: [
          'Jacobo y Juan quieren asientos de gloria. Jesús dice a los doce que la grandeza no se parecerá a los príncipes de los gentiles. El que quiera ser grande será servidor. Luego se señala. El Hijo del hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos.',
          'El pedido era de tronos. La respuesta fue un rescate. El servicio en la iglesia tiene forma de cruz, no de plataforma.',
        ],
        application: [
          'Casi todos queremos el nombre del ministerio y la sensación de que nos necesitan. Cuando el asiento se ve. Cuando el trabajo se agradece. Cuando la toalla es de otro. Jesús define el servicio por un rescate. La iglesia está más sana cuando su gente toma el lugar bajo a propósito.',
          'Una tarea sin brillo es la prueba. Las sillas. La visita que nadie publica. El desorden. Hazla como él, sin anunciarla.',
        ],
        challenge: [
          'Hermanos, ¿estás pidiendo que esta iglesia te sirva, o viniste a servir? El asiento. La toalla. Ya sabes cuál has estado buscando.',
          'Hermanos, ¿dónde todavía quieres el asiento más que la toalla? Nómbralo. Luego toma el lugar bajo esta semana.',
        ],
        charge: [
          'Halla una tarea sin brillo y hazla como él. No la anuncies.',
          'El mensaje de Jesús es directo: el Hijo del hombre vino para servir, y para dar su vida en rescate. Sigue esa forma.',
        ],
        questions: [
          [
            '¿Dónde todavía quieres el asiento más que la toalla?',
            '¿A quién ayudarías si tomaras el lugar bajo a propósito?',
          ],
          [
            '¿Qué tarea has estado dejando para otro porque no se ve?',
            '¿En qué se diferencia un rescate de una plataforma?',
          ],
        ],
      },
      {
        punch: ['O Filho do Homem veio para servir, e para dar a sua vida.', 'A grandeza nesta sala parece uma toalha, não um assento.'],
        context: [
          'Tiago e João querem assentos de glória. Jesus diz aos doze que a grandeza não vai parecer a dos príncipes dos gentios. Quem quiser ser grande será servo. Depois aponta para si. O Filho do homem não veio para ser servido, mas para servir, e para dar a sua vida em resgate de muitos.',
          'O pedido era de tronos. A resposta foi um resgate. O serviço na igreja tem forma de cruz, não de palco.',
        ],
        application: [
          'Quase todos queremos o nome do ministério e a sensação de ser necessários. Quando o assento aparece. Quando o trabalho é agradecido. Quando a toalha é de outro. Jesus define o serviço por um resgate. A igreja está mais sã quando o seu povo toma o lugar baixo de propósito.',
          'Uma tarefa sem brilho é a prova. As cadeiras. A visita que ninguém publica. A bagunça. Faça-a como ele, sem anunciá-la.',
        ],
        challenge: [
          'Irmãos, você está pedindo que esta igreja o sirva, ou veio para servir? O assento. A toalha. Você já sabe qual tem buscado.',
          'Irmãos, onde você ainda quer o assento mais que a toalha? Nomeie. Depois tome o lugar baixo nesta semana.',
        ],
        charge: [
          'Ache uma tarefa sem brilho e faça-a como ele. Não anuncie.',
          'A mensagem de Jesus é direta: o Filho do homem veio para servir, e para dar a sua vida em resgate. Siga essa forma.',
        ],
        questions: [
          [
            'Onde você ainda quer o assento mais que a toalha?',
            'Quem seria ajudado se você tomasse o lugar baixo de propósito?',
          ],
          [
            'Que tarefa você tem deixado para outro porque não aparece?',
            'Em que um resgate é diferente de um palco?',
          ],
        ],
      },
    ),
  },
  {
    id: 'identity',
    keywords: [
      'identity',
      'new creation',
      'who i am',
      'in christ',
      'identidad',
      'nueva criatura',
      'en cristo',
      'identidade',
      'nova criatura',
      'em cristo',
    ],
    bookId: '2co',
    chapter: 5,
    verse: 17,
    endVerse: 17,
    lines: lines('identity',
      {
        punch: ['In Christ, the old verdict is not the last word.', 'If any man be in Christ, he is a new creature. Old things are passed away.'],
        context: [
          'Paul is explaining why believers no longer live unto themselves. The newness isn’t a personality upgrade. It’s a new standing, because Christ died and rose, and the person is in him. Old things are passed away. Behold, all things are become new.',
          '2 Corinthians 5 ties the new creature to the cross. He died for all, that they which live should not henceforth live unto themselves. The name changes because the standing changed.',
        ],
        application: [
          'Most of us introduce ourselves by the old failure and then wonder why we live there. When I rehearse the old name. When I negotiate with a sin as if Christ had not made me new. The verse doesn’t deny the past. It refuses to let the past be your name. A new creature still repents. He doesn’t move back into the old verdict.',
          'The knock of the old life is real. Answering to it is a choice. Say who you are in Christ before you rehearse who you were.',
        ],
        challenge: [
          'Brothers, what old name are you still answering to? The failure. The label somebody gave you. The sin you’ve started calling your personality. Maybe a verdict you keep reading after Christ tore it up.',
          'Brothers, which old thing are you treating as if it had not passed? Don’t give it the last word.',
        ],
        charge: [
          'Say who you are in Christ, from this verse, before you rehearse who you were. Then live the week as that person.',
          'Paul’s message is direct: in Christ, a new creature. The old verdict is not your name.',
        ],
        questions: [
          [
            'Which old thing are you treating as if it had not passed?',
            'How should a new creature handle the sin that still knocks?',
          ],
          [
            'What name have you been answering to that Christ already replaced?',
            'What would this week look like if the new standing were the one you believed?',
          ],
        ],
      },
      {
        punch: ['En Cristo, el veredicto viejo no es la última palabra.', 'Si alguno está en Cristo, nueva criatura es. Las cosas viejas pasaron.'],
        context: [
          'Pablo explica por qué los creyentes ya no viven para sí. La novedad no es una mejora de personalidad. Es una nueva posición, porque Cristo murió y resucitó, y la persona está en él. Las cosas viejas pasaron. He aquí todas son hechas nuevas.',
          '2 Corintios 5 ata la nueva criatura a la cruz. Murió por todos, para que los que viven ya no vivan para sí. El nombre cambia porque la posición cambió.',
        ],
        application: [
          'Casi todos nos presentamos por el fracaso viejo y luego nos extraña vivir allí. Cuando repaso el nombre viejo. Cuando negocio con un pecado como si Cristo no me hubiera hecho nuevo. El versículo no niega el pasado. Rehúsa dejar que el pasado sea tu nombre. Una nueva criatura todavía se arrepiente. No se muda otra vez al veredicto viejo.',
          'El golpe de la vida vieja es real. Responderle es una elección. Di quién eres en Cristo antes de repasar quién fuiste.',
        ],
        challenge: [
          'Hermanos, ¿a qué nombre viejo sigues respondiendo? El fracaso. La etiqueta que alguien te puso. El pecado que empezaste a llamar tu personalidad. Quizás un veredicto que sigues leyendo después de que Cristo lo rompió.',
          'Hermanos, ¿qué cosa vieja estás tratando como si no hubiera pasado? No le des la última palabra.',
        ],
        charge: [
          'Di quién eres en Cristo, desde este versículo, antes de repasar quién fuiste. Luego vive la semana como esa persona.',
          'El mensaje de Pablo es directo: en Cristo, nueva criatura. El veredicto viejo no es tu nombre.',
        ],
        questions: [
          [
            '¿Qué cosa vieja estás tratando como si no hubiera pasado?',
            '¿Cómo debe manejar una nueva criatura el pecado que todavía llama?',
          ],
          [
            '¿A qué nombre has estado respondiendo que Cristo ya reemplazó?',
            '¿Cómo se vería esta semana si creyeras la posición nueva?',
          ],
        ],
      },
      {
        punch: ['Em Cristo, o veredito velho não é a última palavra.', 'Se alguém está em Cristo, nova criatura é. As coisas velhas já passaram.'],
        context: [
          'Paulo explica por que os crentes já não vivem para si. A novidade não é um upgrade de personalidade. É uma nova posição, porque Cristo morreu e ressuscitou, e a pessoa está nele. As coisas velhas já passaram. Eis que tudo se fez novo.',
          '2 Coríntios 5 ata a nova criatura à cruz. Ele morreu por todos, para que os que vivem não vivam mais para si. O nome muda porque a posição mudou.',
        ],
        application: [
          'Quase todos nos apresentamos pelo fracasso velho e depois estranhamos viver ali. Quando eu repasso o nome velho. Quando negocio com um pecado como se Cristo não me tivesse feito novo. O versículo não nega o passado. Recusa deixar que o passado seja o seu nome. Uma nova criatura ainda se arrepende. Não se muda de volta para o veredito velho.',
          'A batida da vida velha é real. Atender a ela é uma escolha. Diga quem você é em Cristo antes de repassar quem você foi.',
        ],
        challenge: [
          'Irmãos, a que nome velho você ainda atende? O fracasso. O rótulo que alguém lhe pôs. O pecado que você começou a chamar de personalidade. Talvez um veredito que você continua lendo depois que Cristo o rasgou.',
          'Irmãos, que coisa velha você trata como se não tivesse passado? Não lhe dê a última palavra.',
        ],
        charge: [
          'Diga quem você é em Cristo, a partir deste versículo, antes de repassar quem foi. Depois viva a semana como essa pessoa.',
          'A mensagem de Paulo é direta: em Cristo, nova criatura. O veredito velho não é o seu nome.',
        ],
        questions: [
          [
            'Que coisa velha você trata como se não tivesse passado?',
            'Como uma nova criatura deve lidar com o pecado que ainda bate?',
          ],
          [
            'A que nome você tem atendido que Cristo já substituiu?',
            'Como esta semana seria se você cresse na posição nova?',
          ],
        ],
      },
    ),
  },
  {
    id: 'grief',
    keywords: [
      'grief',
      'grieve',
      'mourning',
      'loss',
      'death',
      'widow',
      'funeral',
      'luto',
      'duelo',
      'perdida',
      'muerte',
      'viuda',
      'perda',
      'morte',
      'viuva',
      'enlutado',
    ],
    bookId: 'psa',
    chapter: 34,
    verse: 18,
    endVerse: 18,
    lines: lines('grief',
      {
        punch: ['The Lord is near the brokenhearted. He does not wait at a distance.', 'Grief is not a failure of faith. Hiding it from God is.'],
        context: [
          'David sings of deliverance and then of the crushed. The Lord is nigh unto them that are of a broken heart, and saveth such as be of a contrite spirit. Nearness is the promise. He does not tell the grieving to hurry up and look fine.',
          'Psalm 34 is a song from a man who has been in trouble. The broken heart is not sent to the back of the line. God comes near. He saves the contrite.',
        ],
        application: [
          'Most of us rush a person past a grave. When we don’t know what to say. When the tears make the room uncomfortable. When we quote a verse to end the ache. The church should sit near, because her Lord already does. If the broken heart is yours, come near. He is already there.',
          'A speech is not nearness. Presence is. Don’t fix them. Sit with them. And don’t carry the loss as if God were far.',
        ],
        challenge: [
          'Brothers, who is brokenhearted in this room, or in your house, that you have kept at arm’s length? A widow. A man who just buried someone. Maybe you.',
          'Brothers, what loss have you been carrying as if God were far? Bring it here. He is nigh.',
        ],
        charge: [
          'If it is you, come near. He is already there. If it is someone else, go near them this week and do not fix them with a speech.',
          'David’s message is direct: the Lord is nigh unto the brokenhearted. Don’t stand at a distance from a person he has drawn close.',
        ],
        questions: [
          [
            'What loss have you been carrying as if God were far?',
            'How can this class be near someone who is crushed, without pretending the pain is small?',
          ],
          [
            'Who needs your presence this week more than your explanation?',
            'What have you been hiding from God because grief felt like weak faith?',
          ],
        ],
      },
      {
        punch: ['El Señor está cerca de los quebrantados. No espera a distancia.', 'El luto no es una falta de fe. Esconderlo de Dios sí lo es.'],
        context: [
          'David canta la liberación y luego los quebrantados. Cercano está Jehová a los quebrantados de corazón, y salva a los contritos de espíritu. La cercanía es la promesa. No le dice al que llora que se apure y se vea bien.',
          'El Salmo 34 es un canto de un hombre que ha estado en apuros. Al corazón quebrantado no lo mandan al final de la fila. Dios se acerca. Salva al contrito.',
        ],
        application: [
          'Casi todos empujamos a una persona más allá de una tumba. Cuando no sabemos qué decir. Cuando las lágrimas incomodan el cuarto. Cuando citamos un versículo para acabar el dolor. La iglesia debe sentarse cerca, porque su Señor ya lo hace. Si el corazón quebrantado es el tuyo, acércate. Él ya está allí.',
          'Un discurso no es cercanía. La presencia sí. No los arregles. Siéntate con ellos. Y no cargues la pérdida como si Dios estuviera lejos.',
        ],
        challenge: [
          'Hermanos, ¿quién está quebrantado en este cuarto, o en tu casa, y lo has dejado a un brazo de distancia? Una viuda. Un hombre que acaba de enterrar a alguien. Quizás tú.',
          'Hermanos, ¿qué pérdida has cargado como si Dios estuviera lejos? Tráela aquí. Él está cercano.',
        ],
        charge: [
          'Si eres tú, acércate. Él ya está allí. Si es otro, acércate esta semana y no lo arregles con un discurso.',
          'El mensaje de David es directo: cercano está Jehová a los quebrantados de corazón. No te quedes a distancia de una persona a la que él se acercó.',
        ],
        questions: [
          [
            '¿Qué pérdida has cargado como si Dios estuviera lejos?',
            '¿Cómo puede esta clase estar cerca de alguien quebrantado, sin fingir que el dolor es pequeño?',
          ],
          [
            '¿Quién necesita tu presencia esta semana más que tu explicación?',
            '¿Qué has estado escondiendo de Dios porque el luto te parecía poca fe?',
          ],
        ],
      },
      {
        punch: ['O Senhor está perto dos quebrantados. Ele não espera de longe.', 'O luto não é falta de fé. Escondê-lo de Deus é.'],
        context: [
          'Davi canta o livramento e depois os quebrantados. Perto está o Senhor dos que têm o coração quebrantado, e salva os contritos de espírito. A proximidade é a promessa. Ele não manda o enlutado se apressar e parecer bem.',
          'O Salmo 34 é um cântico de um homem que esteve em aperto. O coração quebrantado não é mandado para o fim da fila. Deus chega perto. Salva o contrito.',
        ],
        application: [
          'Quase todos empurramos uma pessoa para além do túmulo. Quando não sabemos o que dizer. Quando as lágrimas incomodam a sala. Quando citamos um versículo para acabar a dor. A igreja deve sentar-se perto, porque o seu Senhor já faz isso. Se o coração quebrantado é o seu, chegue perto. Ele já está ali.',
          'Um discurso não é proximidade. A presença é. Não os conserte. Sente-se com eles. E não carregue a perda como se Deus estivesse longe.',
        ],
        challenge: [
          'Irmãos, quem está quebrantado nesta sala, ou na sua casa, e você deixou à distância de um braço? Uma viúva. Um homem que acabou de enterrar alguém. Talvez você.',
          'Irmãos, que perda você tem carregado como se Deus estivesse longe? Traga para cá. Ele está perto.',
        ],
        charge: [
          'Se é você, chegue perto. Ele já está ali. Se é outra pessoa, chegue perto nesta semana e não a conserte com um discurso.',
          'A mensagem de Davi é direta: perto está o Senhor dos quebrantados de coração. Não fique longe de uma pessoa de quem ele se aproximou.',
        ],
        questions: [
          [
            'Que perda você tem carregado como se Deus estivesse longe?',
            'Como esta classe pode estar perto de alguém quebrantado, sem fingir que a dor é pequena?',
          ],
          [
            'Quem precisa da sua presença nesta semana mais do que da sua explicação?',
            'O que você tem escondido de Deus porque o luto parecia pouca fé?',
          ],
        ],
      },
    ),
  },
  {
    id: 'unity',
    keywords: [
      'unity',
      'united',
      'division',
      'gossip',
      'unidad',
      'chisme',
      'unidade',
      'divisao',
      'fofoca',
      'rumor',
      'one body',
      'un cuerpo',
      'um corpo',
    ],
    bookId: 'eph',
    chapter: 4,
    verse: 3,
    endVerse: 3,
    lines: lines('unity',
      {
        punch: ['Unity is something you keep, not something you feel into existence.', 'The Spirit already made you one. Your work is to guard it.'],
        context: [
          'Paul begs the Ephesians to walk worthy of their calling, with lowliness and longsuffering. Then he says endeavor to keep the unity of the Spirit in the bond of peace. They don’t invent the unity. They guard what the Spirit has already made.',
          'A bond of peace is not a mood that visits when everyone agrees. Endeavor means effort. Patience when a brother is slow. Silence when a story is not yours to carry.',
        ],
        application: [
          'Most division starts as a sentence we enjoy. When the story is good. When we tell it about a back instead of to a face. When we watch the split like spectators. We loosen the bond and call it honesty. Paul says endeavor. That is work.',
          'Truth spoken to a face can keep the peace. The same truth carried around the room breaks it. Keep what the Spirit already made.',
        ],
        challenge: [
          'Brothers, what sentence have you repeated that loosens the bond? A joke. A suspicion. A story that wasn’t yours. Maybe a silence while others tore a brother down.',
          'Brothers, where have you been a spectator of division instead of a keeper of peace? Stop carrying it.',
        ],
        charge: [
          'If it must be said, say it to the person. Keep what the Spirit has already made.',
          'Paul’s message is direct: endeavor to keep the unity of the Spirit. Don’t wait to feel it. Guard it.',
        ],
        questions: [
          [
            'Where have you been a spectator of division instead of a keeper of peace?',
            'What would endeavor look like with the brother who irritates you?',
          ],
          [
            'What story are you still carrying that is not yours to carry?',
            'Who needs the truth said to their face instead of about their back?',
          ],
        ],
      },
      {
        punch: ['La unidad se guarda. No se siente hasta que aparezca.', 'El Espíritu ya los hizo uno. El trabajo de ustedes es guardarlo.'],
        context: [
          'Pablo ruega a los efesios que anden como es digno de su vocación, con humildad y mansedumbre. Luego dice que solícitos guarden la unidad del Espíritu en el vínculo de la paz. No inventan la unidad. Guardan lo que el Espíritu ya hizo.',
          'Un vínculo de paz no es un ánimo que visita cuando todos están de acuerdo. Solicitud significa esfuerzo. Paciencia cuando un hermano es lento. Silencio cuando una historia no es tuya para cargar.',
        ],
        application: [
          'Casi toda división empieza como una frase que nos gusta. Cuando el chisme está bueno. Cuando lo decimos a la espalda y no a la cara. Cuando miramos la ruptura como espectadores. Aflojamos el vínculo y lo llamamos honestidad. Pablo dice que seamos solícitos. Eso es trabajo.',
          'La verdad dicha a la cara puede guardar la paz. La misma verdad paseada por el cuarto la rompe. Guarda lo que el Espíritu ya hizo.',
        ],
        challenge: [
          'Hermanos, ¿qué frase has repetido que afloja el vínculo? Un chiste. Una sospecha. Una historia que no era tuya. Quizás un silencio mientras otros bajaban a un hermano.',
          'Hermanos, ¿dónde has sido espectador de la división en vez de guardar la paz? Deja de cargarla.',
        ],
        charge: [
          'Si hay que decirla, díganla a la persona. Guarden lo que el Espíritu ya hizo.',
          'El mensaje de Pablo es directo: solícitos en guardar la unidad del Espíritu. No esperes sentirla. Guárdala.',
        ],
        questions: [
          [
            '¿Dónde has sido espectador de la división en vez de guardar la paz?',
            '¿Cómo se vería procurar la unidad con el hermano que te irrita?',
          ],
          [
            '¿Qué historia sigues cargando que no es tuya para cargar?',
            '¿A quién hay que decirle la verdad a la cara y no a la espalda?',
          ],
        ],
      },
      {
        punch: ['A unidade se guarda. Não se espera sentir até ela aparecer.', 'O Espírito já os fez um. O trabalho de vocês é guardá-la.'],
        context: [
          'Paulo roga aos efésios que andem como é digno da vocação, com humildade e mansidão. Depois diz que procureis guardar a unidade do Espírito no vínculo da paz. Eles não inventam a unidade. Guardam o que o Espírito já fez.',
          'Um vínculo de paz não é um humor que visita quando todos concordam. Procurar significa esforço. Paciência quando um irmão é lento. Silêncio quando uma história não é sua para carregar.',
        ],
        application: [
          'Quase toda divisão começa como uma frase de que gostamos. Quando a fofoca está boa. Quando falamos pelas costas e não à face. Quando olhamos a ruptura como espectadores. Afrouxamos o vínculo e chamamos de honestidade. Paulo diz para procurar. Isso é trabalho.',
          'A verdade dita à face pode guardar a paz. A mesma verdade passeada pela sala a quebra. Guardem o que o Espírito já fez.',
        ],
        challenge: [
          'Irmãos, que frase você tem repetido que afrouxa o vínculo? Uma piada. Uma suspeita. Uma história que não era sua. Talvez um silêncio enquanto outros derrubavam um irmão.',
          'Irmãos, onde você tem sido espectador da divisão em vez de guardar a paz? Pare de carregá-la.',
        ],
        charge: [
          'Se precisa ser dita, digam à pessoa. Guardem o que o Espírito já fez.',
          'A mensagem de Paulo é direta: procurai guardar a unidade do Espírito. Não espere sentir. Guarde.',
        ],
        questions: [
          [
            'Onde você tem sido espectador da divisão em vez de guardar a paz?',
            'Como seria procurar a unidade com o irmão que irrita você?',
          ],
          [
            'Que história você ainda carrega que não é sua para carregar?',
            'A quem a verdade precisa ser dita à face e não pelas costas?',
          ],
        ],
      },
    ),
  },
]

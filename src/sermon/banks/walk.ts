import type { SermonLang, SermonLines, SermonOutline } from '../types'

function lines(en: SermonLines, es: SermonLines, pt: SermonLines): Record<SermonLang, SermonLines> {
  return { en, es, pt }
}

export const WALK: readonly SermonOutline[] = [
  {
    id: 'hope',
    keywords: [
      'hope',
      'hopeful',
      'despair',
      'hopeless',
      'esperanza',
      'esperanzado',
      'desesperacion',
      'desesperado',
      'esperanca',
      'desespero',
      'esperancoso',
    ],
    bookId: 'rom',
    chapter: 15,
    verse: 13,
    endVerse: 13,
    lines: lines(
      {
        punch: [
          'Hope isn’t a mood. It’s the God of hope filling the room.',
          'Despair closes the book. Hope names who is still writing.',
        ],
        context: [
          'Paul has just said Jew and Gentile stand by faith in Christ. Then he prays. The God of hope fills them with joy and peace in believing, so they abound in hope by the Holy Ghost. The source has a name. It isn’t the news.',
          'Romans 15 is a prayer, not a slogan. Paul asks the God of hope to fill a church that could have split. Joy and peace come through believing. The Spirit is the one who makes hope overflow.',
        ],
        application: [
          'Most of us live on the headline. When the report is bad. When the prayer looks unanswered. When we quietly decide this will never change. We put hope on the shelf with the things that didn’t work. God doesn’t work that way.',
          'We want a feeling called hope and we skip the God who gives it. Believing is not pretending the week is fine. It’s taking the gospel as true when the room feels thin.',
        ],
        challenge: [
          'Brothers, what have you quietly decided will never change? A body. A prodigal. A church that feels stuck. Maybe a door you stopped knocking on.',
          'Brothers, where has despair been louder than the promise this month? Bring that closed door here. Don’t ask the headlines to do God’s work.',
        ],
        charge: [
          'Paul’s prayer is the line: the God of hope can fill you. Ask him. Don’t ask the week to be your savior.',
          'Leave the closed door with him before you leave this room. Hope is a Person, not a forecast.',
        ],
        questions: [
          [
            'Where has despair been louder than the promise this month?',
            'What would it look like to believe God about that one thing?',
          ],
          [
            'What have you stopped praying because you already wrote the ending?',
            'Who around you needs hope that sounds like God, not like a slogan?',
          ],
        ],
      },
      {
        punch: [
          'La esperanza no es un ánimo. Es el Dios de la esperanza llenando el cuarto.',
          'La desesperación cierra el libro. La esperanza nombra a quien sigue escribiendo.',
        ],
        context: [
          'Pablo acaba de decir que judío y gentil están firmes por la fe en Cristo. Luego ora. El Dios de la esperanza los llena de gozo y paz al creer, para que abunden en esperanza por el Espíritu Santo. La fuente tiene nombre. No son las noticias.',
          'Romanos 15 es una oración, no un lema. Pablo pide al Dios de la esperanza que llene a una iglesia que pudo haberse partido. El gozo y la paz vienen al creer. El Espíritu es quien hace rebosar la esperanza.',
        ],
        application: [
          'Casi todos vivimos del titular. Cuando el informe es malo. Cuando la oración parece sin respuesta. Cuando decidimos en silencio que esto nunca va a cambiar. Dejamos la esperanza en el estante con lo que no funcionó. Dios no funciona así.',
          'Queremos un sentimiento llamado esperanza y nos saltamos al Dios que la da. Creer no es fingir que la semana está bien. Es tomar el evangelio como verdad cuando el cuarto se siente vacío.',
        ],
        challenge: [
          'Hermanos, ¿qué has decidido en silencio que nunca va a cambiar? Un cuerpo. Un hijo pródigo. Una iglesia que se siente trabada. Quizás una puerta a la que dejaste de llamar.',
          'Hermanos, ¿dónde ha sonado más fuerte la desesperación que la promesa este mes? Trae esa puerta cerrada aquí. No le pidas a los titulares que hagan el trabajo de Dios.',
        ],
        charge: [
          'La oración de Pablo es la línea: el Dios de la esperanza puede llenarte. Pídeselo. No le pidas a la semana que sea tu salvador.',
          'Deja la puerta cerrada con él antes de salir de este cuarto. La esperanza es una Persona, no un pronóstico.',
        ],
        questions: [
          [
            '¿Dónde ha sonado más fuerte la desesperación que la promesa este mes?',
            '¿Cómo se vería creer a Dios en esa sola cosa?',
          ],
          [
            '¿Qué dejaste de orar porque ya escribiste el final?',
            '¿Quién cerca de ti necesita una esperanza que suene a Dios, no a un lema?',
          ],
        ],
      },
      {
        punch: [
          'A esperança não é um humor. É o Deus da esperança enchendo a sala.',
          'O desespero fecha o livro. A esperança nomeia quem ainda está escrevendo.',
        ],
        context: [
          'Paulo acabou de dizer que judeu e gentio estão firmes pela fé em Cristo. Depois ele ora. O Deus da esperança os enche de alegria e paz no crer, para que abundem em esperança pelo Espírito Santo. A fonte tem nome. Não são as notícias.',
          'Romanos 15 é uma oração, não um lema. Paulo pede ao Deus da esperança que encha uma igreja que podia ter se partido. A alegria e a paz vêm no crer. O Espírito é quem faz a esperança transbordar.',
        ],
        application: [
          'Quase todos vivemos da manchete. Quando o laudo é ruim. Quando a oração parece sem resposta. Quando decidimos em silêncio que isto nunca vai mudar. Deixamos a esperança na prateleira com o que não funcionou. Deus não trabalha assim.',
          'Queremos um sentimento chamado esperança e pulamos o Deus que a dá. Crer não é fingir que a semana está bem. É tomar o evangelho como verdade quando a sala parece vazia.',
        ],
        challenge: [
          'Irmãos, o que você decidiu em silêncio que nunca vai mudar? Um corpo. Um filho pródigo. Uma igreja que parece travada. Talvez uma porta em que você parou de bater.',
          'Irmãos, onde o desespero falou mais alto que a promessa neste mês? Traga essa porta fechada para cá. Não peça às manchetes que façam o trabalho de Deus.',
        ],
        charge: [
          'A oração de Paulo é a linha: o Deus da esperança pode encher você. Peça a ele. Não peça à semana que seja o seu salvador.',
          'Deixe a porta fechada com ele antes de sair desta sala. Esperança é uma Pessoa, não uma previsão.',
        ],
        questions: [
          [
            'Onde o desespero falou mais alto que a promessa neste mês?',
            'Como seria crer em Deus nessa única coisa?',
          ],
          [
            'O que você parou de orar porque já escreveu o final?',
            'Quem perto de você precisa de uma esperança que soe como Deus, não como um lema?',
          ],
        ],
      },
    ),
  },
  {
    id: 'love',
    keywords: [
      'love',
      'loving',
      'charity',
      'loved',
      'amor',
      'amar',
      'caridad',
      'caridade',
      'amando',
    ],
    bookId: 'jhn',
    chapter: 13,
    verse: 34,
    endVerse: 35,
    lines: lines(
      {
        punch: [
          'He washed their feet. Then he told them to love like that.',
          'The world isn’t reading your opinions first. It’s reading your love.',
        ],
        context: [
          'Jesus has just washed the feet of men who will fail him, including Judas. Then he gives the command. Love one another as I have loved you. The measure isn’t our warmth. It’s his cross, already in view that night.',
          'John 13 is a room with a towel, not a poster. Jesus calls it a new commandment because the pattern is new: as I have loved you. By this, he says, people will know you are my disciples.',
        ],
        application: [
          'Most of us wait to feel love and then call the wait sincerity. When they deserve it. When they apologize. When it’s easy. Jesus makes love a command for the people in the room, including the difficult one.',
          'We love the idea of love and walk past the brother. A text we won’t send. A grudge we enjoy. A kindness that would cost an hour. The command is as concrete as a basin of water.',
        ],
        challenge: [
          'Brothers, who in this church have you decided doesn’t deserve the love Christ gave you? A name. A family. A person who gets on your nerves. Maybe someone in this room.',
          'Brothers, where is your love still waiting to feel like it? The hard person is the test. Not the easy one.',
        ],
        charge: [
          'Name that person before God today. Then do one kindness that costs you something small and real.',
          'Jesus’ message is direct: love one another as I have loved you. Don’t leave it as a song.',
        ],
        questions: [
          [
            'Where is your love still waiting to feel like it, instead of obeying?',
            'What would this class look like if we loved as he loved us?',
          ],
          [
            'Whose feet would you rather not wash?',
            'What costly kindness have you postponed until the feeling shows up?',
          ],
        ],
      },
      {
        punch: [
          'Les lavó los pies. Luego les dijo que amaran así.',
          'El mundo no lee primero tus opiniones. Lee tu amor.',
        ],
        context: [
          'Jesús acaba de lavar los pies de hombres que van a fallarle, incluso Judas. Luego da el mandamiento. Amaos unos a otros como yo os he amado. La medida no es nuestro calor. Es su cruz, ya a la vista esa noche.',
          'Juan 13 es un cuarto con una toalla, no un cartel. Jesús lo llama un mandamiento nuevo porque el modelo es nuevo: como yo os he amado. En esto, dice, conocerán que sois mis discípulos.',
        ],
        application: [
          'Casi todos esperamos sentir el amor y luego llamamos sinceridad a la espera. Cuando lo merezcan. Cuando pidan perdón. Cuando sea fácil. Jesús hace del amor un mandamiento para la gente del cuarto, incluso la difícil.',
          'Amamos la idea del amor y pasamos de largo al hermano. Un mensaje que no enviamos. Un rencor que disfrutamos. Una bondad que costaría una hora. El mandamiento es tan concreto como un lebrillo de agua.',
        ],
        challenge: [
          'Hermanos, ¿a quién en esta iglesia has decidido que no merece el amor que Cristo te dio? Un nombre. Una familia. Alguien que te cae mal. Quizás alguien en este cuarto.',
          'Hermanos, ¿dónde tu amor sigue esperando sentirse así? La persona difícil es la prueba. No la fácil.',
        ],
        charge: [
          'Nombra a esa persona delante de Dios hoy. Luego haz una bondad que te cueste algo pequeño y real.',
          'El mensaje de Jesús es directo: amaos unos a otros como yo os he amado. No lo dejes como una canción.',
        ],
        questions: [
          [
            '¿Dónde tu amor sigue esperando sentirse así, en vez de obedecer?',
            '¿Cómo se vería esta clase si nos amáramos como él nos amó?',
          ],
          [
            '¿Los pies de quién preferirías no lavar?',
            '¿Qué bondad costosa has aplazado hasta que aparezca el sentimiento?',
          ],
        ],
      },
      {
        punch: [
          'Ele lavou os pés deles. Depois mandou que amassem assim.',
          'O mundo não lê primeiro as suas opiniões. Lê o seu amor.',
        ],
        context: [
          'Jesus acabou de lavar os pés de homens que vão falhar com ele, inclusive Judas. Depois dá o mandamento. Amai-vos uns aos outros como eu vos amei. A medida não é o nosso calor. É a cruz dele, já à vista naquela noite.',
          'João 13 é uma sala com uma toalha, não um cartaz. Jesus chama isso de mandamento novo porque o modelo é novo: como eu vos amei. Nisto, diz ele, conhecerão que sois meus discípulos.',
        ],
        application: [
          'Quase todos esperamos sentir o amor e depois chamamos a espera de sinceridade. Quando merecerem. Quando pedirem desculpa. Quando for fácil. Jesus faz do amor um mandamento para as pessoas da sala, inclusive a difícil.',
          'Amamos a ideia do amor e passamos reto pelo irmão. Uma mensagem que não mandamos. Um rancor de que gostamos. Uma bondade que custaria uma hora. O mandamento é tão concreto quanto uma bacia de água.',
        ],
        challenge: [
          'Irmãos, quem nesta igreja você decidiu que não merece o amor que Cristo lhe deu? Um nome. Uma família. Alguém que irrita você. Talvez alguém nesta sala.',
          'Irmãos, onde o seu amor ainda espera sentir vontade? A pessoa difícil é a prova. Não a fácil.',
        ],
        charge: [
          'Nomeie essa pessoa diante de Deus hoje. Depois faça uma bondade que lhe custe algo pequeno e real.',
          'A mensagem de Jesus é direta: amai-vos uns aos outros como eu vos amei. Não deixe isso como uma canção.',
        ],
        questions: [
          [
            'Onde o seu amor ainda espera sentir vontade, em vez de obedecer?',
            'Como esta classe seria se nos amássemos como ele nos amou?',
          ],
          [
            'Os pés de quem você preferiria não lavar?',
            'Que bondade custosa você adiou até o sentimento aparecer?',
          ],
        ],
      },
    ),
  },
  {
    id: 'forgiveness',
    keywords: [
      'forgive',
      'forgiveness',
      'pardon',
      'reconcile',
      'reconciliation',
      'unforgiveness',
      'grudge',
      'perdon',
      'perdonar',
      'reconciliacion',
      'rencor',
      'ofensa',
      'perdao',
      'perdoar',
      'reconciliacao',
      'magoa',
    ],
    bookId: 'eph',
    chapter: 4,
    verse: 32,
    endVerse: 32,
    lines: lines(
      {
        punch: [
          'We forgive because we have already been forgiven.',
          'Unforgiveness feels like justice. It works like a chain.',
        ],
        context: [
          'Paul is telling the church what the new life looks like. Kindness. A tender heart. Forgiveness. The pattern is God in Christ, who already forgave you. The debt you release is smaller than the one he cancelled.',
          'Ephesians 4 puts forgiveness next to the way you speak. Bitterness has a sound. So does kindness. Paul doesn’t call evil good. He points at the cross and says, that is the measure.',
        ],
        application: [
          'Most of us keep a private bill. When they admit it. When they feel what I felt. When it stops hurting. We put peace on layaway and call it integrity. God doesn’t work that way. Christ already took the case.',
          'We replay the injury until it sits in the middle of the week. The kitchen. The group text. The name that tightens your jaw. Forgiveness doesn’t say the wound was nothing. It refuses to stay on the bench as judge.',
        ],
        challenge: [
          'Brothers, whose name still tightens your jaw? A parent. A brother in this church. An ex. Maybe somebody who will never say sorry.',
          'Brothers, who are you still making pay for something Christ already carried? You know the name. Don’t dress it up.',
        ],
        charge: [
          'Bring that name to the cross before you leave it in the parking lot. Ask for the kindness you don’t feel yet, and take one step toward peace.',
          'Paul’s message is direct: forgive, as God for Christ’s sake has forgiven you. Put the bill down.',
        ],
        questions: [
          [
            'Who are you still making pay for something Christ already carried?',
            'What would kindness look like toward that person this week, without pretending the wound was nothing?',
          ],
          [
            'Where has a grudge been pretending to be discernment?',
            'What one step toward peace is actually in your power this week?',
          ],
        ],
      },
      {
        punch: [
          'Perdonamos porque ya fuimos perdonados.',
          'No perdonar se siente como justicia. Funciona como una cadena.',
        ],
        context: [
          'Pablo le dice a la iglesia cómo se ve la vida nueva. Bondad. Corazón tierno. Perdón. El modelo es Dios en Cristo, que ya te perdonó. La deuda que sueltas es menor que la que él canceló.',
          'Efesios 4 pone el perdón al lado de la manera en que hablas. La amargura tiene un sonido. La bondad también. Pablo no llama bueno a lo malo. Señala la cruz y dice: esa es la medida.',
        ],
        application: [
          'Casi todos guardamos una cuenta privada. Cuando lo admitan. Cuando sientan lo que yo sentí. Cuando deje de doler. Ponemos la paz en espera y lo llamamos integridad. Dios no funciona así. Cristo ya tomó el caso.',
          'Repetimos la herida hasta sentarla en el centro de la semana. La cocina. El mensaje del grupo. El nombre que te aprieta la mandíbula. El perdón no dice que la herida no existió. Rehúsa quedarse en el banco como juez.',
        ],
        challenge: [
          'Hermanos, ¿qué nombre todavía te aprieta la mandíbula? Un padre. Un hermano de esta iglesia. Un ex. Quizás alguien que nunca va a pedir perdón.',
          'Hermanos, ¿a quién sigues haciendo pagar por algo que Cristo ya cargó? Sabes el nombre. No lo vistas.',
        ],
        charge: [
          'Trae ese nombre a la cruz antes de dejarlo en el estacionamiento. Pide la bondad que todavía no sientes, y da un paso hacia la paz.',
          'El mensaje de Pablo es directo: perdónense, como Dios también os perdonó en Cristo. Suelta la cuenta.',
        ],
        questions: [
          [
            '¿A quién sigues haciendo pagar por algo que Cristo ya cargó?',
            '¿Cómo se vería la bondad hacia esa persona esta semana, sin fingir que la herida no existió?',
          ],
          [
            '¿Dónde un rencor ha estado fingiendo ser discernimiento?',
            '¿Qué paso hacia la paz sí está en tus manos esta semana?',
          ],
        ],
      },
      {
        punch: [
          'Perdoamos porque já fomos perdoados.',
          'Não perdoar parece justiça. Funciona como uma corrente.',
        ],
        context: [
          'Paulo diz à igreja como a vida nova aparece. Bondade. Coração terno. Perdão. O modelo é Deus em Cristo, que já perdoou você. A dívida que você solta é menor do que a que ele cancelou.',
          'Efésios 4 põe o perdão ao lado do jeito como você fala. A amargura tem um som. A bondade também. Paulo não chama o mal de bem. Aponta a cruz e diz: essa é a medida.',
        ],
        application: [
          'Quase todos guardamos uma conta particular. Quando admitirem. Quando sentirem o que eu senti. Quando parar de doer. Deixamos a paz para depois e chamamos isso de integridade. Deus não trabalha assim. Cristo já tomou a causa.',
          'Repetimos a ferida até sentá-la no centro da semana. A cozinha. A mensagem do grupo. O nome que aperta o queixo. O perdão não diz que a ferida não existiu. Recusa ficar no banco como juiz.',
        ],
        challenge: [
          'Irmãos, que nome ainda aperta o seu queixo? Um pai. Um irmão desta igreja. Um ex. Talvez alguém que nunca vai pedir desculpa.',
          'Irmãos, quem você ainda faz pagar por algo que Cristo já carregou? Você sabe o nome. Não o vista.',
        ],
        charge: [
          'Traga esse nome à cruz antes de deixá-lo no estacionamento. Peça a bondade que você ainda não sente, e dê um passo em direção à paz.',
          'A mensagem de Paulo é direta: perdoem, como também Deus em Cristo os perdoou. Solte a conta.',
        ],
        questions: [
          [
            'Quem você ainda faz pagar por algo que Cristo já carregou?',
            'Como seria a bondade para com essa pessoa nesta semana, sem fingir que a ferida não existiu?',
          ],
          [
            'Onde um rancor tem fingido ser discernimento?',
            'Que passo em direção à paz está de fato nas suas mãos nesta semana?',
          ],
        ],
      },
    ),
  },
  {
    id: 'peace',
    keywords: [
      'peace',
      'calm',
      'shalom',
      'tranquil',
      'paz',
      'calma',
      'tranquilidad',
      'tranquilidade',
      'sosiego',
    ],
    bookId: 'jhn',
    chapter: 14,
    verse: 27,
    endVerse: 27,
    lines: lines(
      {
        punch: [
          'The peace Jesus gives is not the peace the world sells.',
          'He offers peace while the hard thing is still in the room.',
        ],
        context: [
          'Jesus is hours from the cross. The disciples are troubled. He doesn’t offer a quieter empire or a solved calendar. He gives his own peace, and he tells their hearts not to be afraid. The gift and the command belong together.',
          'John 14 is a farewell, not a spa. My peace I give unto you. Not as the world giveth. He is about to leave, and he leaves a peace the arrest can’t confiscate.',
        ],
        application: [
          'Most of us want peace by subtraction. When the conflict ends. When the noise stops. When the week gets easy. The world sells that. Christ gives peace with the trouble still sitting in the chair. We keep hunting a feeling. He already gave a Person.',
          'We call the absence of trouble peace, and we stay troubled when trouble stays. A heart that believes him can rest without having every answer. That’s the gift. Not a blank calendar.',
        ],
        challenge: [
          'Brothers, what are you calling peace that is only the absence of trouble? A quiet phone. A full account. Nobody mad at you. Maybe a week with nothing hard in it.',
          'Brothers, where are you troubled because you wanted the world’s kind of peace? Name the hard thing. Then receive what he left you.',
        ],
        charge: [
          'Lay down the demand that life be easy before your heart is quiet. Receive what he left you.',
          'Jesus’ message is direct: my peace I give unto you. Don’t leave it on the table.',
        ],
        questions: [
          [
            'Where are you troubled because you wanted the world’s kind of peace?',
            'What fear would shrink if you trusted the peace he already gave?',
          ],
          [
            'What hard thing are you waiting to remove before you will rest?',
            'How would this week change if peace is a Person, not a cleared schedule?',
          ],
        ],
      },
      {
        punch: [
          'La paz que Jesús da no es la paz que el mundo vende.',
          'Él ofrece paz mientras lo difícil sigue en el cuarto.',
        ],
        context: [
          'Jesús está a horas de la cruz. Los discípulos están turbados. No ofrece un imperio más quieto ni un calendario resuelto. Da su propia paz, y le dice al corazón que no tema. El don y el mandamiento van juntos.',
          'Juan 14 es una despedida, no un spa. Mi paz os doy. No como el mundo la da. Está por irse, y deja una paz que el arresto no puede confiscar.',
        ],
        application: [
          'Casi todos queremos paz por resta. Cuando se acabe el conflicto. Cuando pare el ruido. Cuando la semana sea fácil. El mundo vende eso. Cristo da paz con el problema todavía sentado en la silla. Nosotros buscamos un sentimiento. Él ya dio una Persona.',
          'Llamamos paz a la ausencia de problemas, y seguimos turbados cuando el problema se queda. Un corazón que le cree puede descansar sin tener todas las respuestas. Ese es el don. No un calendario en blanco.',
        ],
        challenge: [
          'Hermanos, ¿qué estás llamando paz que es solo la ausencia de problemas? Un teléfono quieto. Una cuenta llena. Nadie enojado contigo. Quizás una semana sin nada duro.',
          'Hermanos, ¿dónde estás turbado porque querías la paz del mundo? Nombra lo difícil. Luego recibe lo que él te dejó.',
        ],
        charge: [
          'Suelta la exigencia de que la vida sea fácil antes de que el corazón esté quieto. Recibe lo que él te dejó.',
          'El mensaje de Jesús es directo: mi paz os doy. No la dejes sobre la mesa.',
        ],
        questions: [
          [
            '¿Dónde estás turbado porque querías la paz del mundo?',
            '¿Qué temor se achicaría si confiaras en la paz que él ya dio?',
          ],
          [
            '¿Qué cosa difícil estás esperando quitar antes de descansar?',
            '¿Cómo cambiaría esta semana si la paz es una Persona, no una agenda limpia?',
          ],
        ],
      },
      {
        punch: [
          'A paz que Jesus dá não é a paz que o mundo vende.',
          'Ele oferece paz enquanto o difícil ainda está na sala.',
        ],
        context: [
          'Jesus está a horas da cruz. Os discípulos estão perturbados. Ele não oferece um império mais quieto nem uma agenda resolvida. Dá a sua própria paz, e manda o coração não temer. O dom e o mandamento andam juntos.',
          'João 14 é uma despedida, não um spa. A minha paz vos dou. Não como o mundo a dá. Ele está para partir, e deixa uma paz que a prisão não pode confiscar.',
        ],
        application: [
          'Quase todos queremos paz por subtração. Quando o conflito acabar. Quando o barulho parar. Quando a semana ficar fácil. O mundo vende isso. Cristo dá paz com o problema ainda sentado na cadeira. Nós caçamos um sentimento. Ele já deu uma Pessoa.',
          'Chamamos de paz a ausência de problema, e continuamos perturbados quando o problema fica. Um coração que crê nele pode descansar sem ter todas as respostas. Esse é o dom. Não uma agenda em branco.',
        ],
        challenge: [
          'Irmãos, o que você está chamando de paz que é só a ausência de problema? Um telefone quieto. Uma conta cheia. Ninguém bravo com você. Talvez uma semana sem nada duro.',
          'Irmãos, onde você está perturbado porque queria a paz do mundo? Nomeie o difícil. Depois receba o que ele lhe deixou.',
        ],
        charge: [
          'Largue a exigência de que a vida seja fácil antes de o coração ficar quieto. Receba o que ele lhe deixou.',
          'A mensagem de Jesus é direta: a minha paz vos dou. Não a deixe sobre a mesa.',
        ],
        questions: [
          [
            'Onde você está perturbado porque queria a paz do mundo?',
            'Que temor diminuiria se você confiasse na paz que ele já deu?',
          ],
          [
            'Que coisa difícil você está esperando tirar antes de descansar?',
            'Como esta semana mudaria se a paz é uma Pessoa, não uma agenda limpa?',
          ],
        ],
      },
    ),
  },
]

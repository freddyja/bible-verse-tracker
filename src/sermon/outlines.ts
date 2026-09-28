import type { SermonCopy, SermonLang, SermonOutline } from './types'

function copy(en: SermonCopy, es: SermonCopy, pt: SermonCopy): Record<SermonLang, SermonCopy> {
  return { en, es, pt }
}

export const OUTLINES: readonly SermonOutline[] = [
  {
    id: 'contentment',
    keywords: [
      'content',
      'contentment',
      'satisfied',
      'satisfaction',
      'enough',
      'contento',
      'contentamiento',
      'satisfaccion',
      'contentamento',
      'satisfeito',
    ],
    bookId: 'php',
    chapter: 4,
    verse: 11,
    endVerse: 12,
    copy: copy(
      {
        punch: 'Paul did not wake up content. He learned it.',
        context:
          'Paul wrote these words from prison. He had been beaten, shipwrecked, and left by people he trusted. He knew an empty table and a full one. In both, he found God faithful.',
        application:
          'Most of us put peace on hold. When the money comes. When the house settles. When the news is better. We treat contentment as a prize for a better week. Paul says it is a lesson, and the classroom is the life we already have.',
        challenge:
          'Class, what cell are you sitting in today? Money. A relationship. A body that will not heal. Maybe a weight nobody else can see.',
        charge: 'God is enough inside that cell. You do not have to wait for the door to open before you start to live.',
        questions: [
          'Where are you waiting for life to change before you will be at peace?',
          'Who have you seen stay steady under pressure, and what did you notice in them?',
        ],
      },
      {
        punch: 'Pablo no amaneció contento. Lo aprendió.',
        context:
          'Pablo escribió estas palabras desde la prisión. Había sido golpeado, había naufragado, y personas de su confianza lo habían dejado. Sabía lo que era una mesa vacía y una mesa llena. En las dos encontró a Dios fiel.',
        application:
          'Casi todos ponemos la paz en espera. Cuando llegue el dinero. Cuando la casa se calme. Cuando las noticias mejoren. Tratamos el contentamiento como un premio por una semana mejor. Pablo dice que es una lección, y el aula es la vida que ya tenemos.',
        challenge:
          'Hermanos, ¿en qué celda están sentados hoy? El dinero. Una relación. Un cuerpo que no sana. Tal vez un peso que nadie más ve.',
        charge: 'Dios es suficiente dentro de esa celda. No tienen que esperar a que se abra la puerta para empezar a vivir.',
        questions: [
          '¿En qué parte de tu vida estás esperando que cambien las circunstancias antes de tener paz?',
          '¿A quién has visto firme bajo presión, y qué notaste en esa persona?',
        ],
      },
      {
        punch: 'Paulo não acordou contente. Ele aprendeu.',
        context:
          'Paulo escreveu estas palavras da prisão. Tinha sido espancado, naufragado, e pessoas em quem confiava o deixaram. Ele conhecia a mesa vazia e a mesa cheia. Nas duas, achou Deus fiel.',
        application:
          'Quase todos nós deixamos a paz para depois. Quando o dinheiro chegar. Quando a casa sossegar. Quando as notícias melhorarem. Tratamos o contentamento como prêmio de uma semana melhor. Paulo diz que é uma lição, e a sala de aula é a vida que já temos.',
        challenge:
          'Irmãos, em que cela vocês estão sentados hoje? O dinheiro. Um relacionamento. Um corpo que não sara. Talvez um peso que ninguém mais vê.',
        charge: 'Deus é suficiente dentro dessa cela. Vocês não precisam esperar a porta abrir para começar a viver.',
        questions: [
          'Em que parte da vida você está esperando a circunstância mudar antes de ter paz?',
          'Quem você viu firme debaixo de pressão, e o que notou nessa pessoa?',
        ],
      },
    ),
  },
  {
    id: 'anxiety',
    keywords: ['anxiety', 'anxious', 'worry', 'worried', 'care', 'ansiedad', 'ansioso', 'preocupacion', 'ansiedade', 'preocupacao', 'aflicao'],
    bookId: 'php',
    chapter: 4,
    verse: 6,
    endVerse: 7,
    copy: copy(
      {
        punch: 'Worry is a prayer that never gets addressed.',
        context:
          'Paul is still in chains when he tells the church to pray. He does not say their troubles are small. He says those troubles have a place to go: to God, with thanksgiving, not around the room again.',
        application:
          'Anxiety rehearses the future until the heart is tired. Prayer tells the truth about the same future and leaves it with the Father. Thanksgiving is not denial. It is remembering that God has already kept his word.',
        challenge: 'Class, what are you turning over in the night that you have not yet turned over to God?',
        charge: 'Name it. Thank him for what is already true. Then let his peace guard the door your thoughts keep opening.',
        questions: [
          'Which worry do you keep explaining to people, and not to God?',
          'What would change this week if thanksgiving came before the request?',
        ],
      },
      {
        punch: 'La preocupación es una oración que nunca se dirige.',
        context:
          'Pablo sigue encadenado cuando le dice a la iglesia que ore. No dice que sus problemas sean pequeños. Dice que esos problemas tienen un lugar: Dios, con acción de gracias, y no otra vuelta por el cuarto.',
        application:
          'La ansiedad ensaya el futuro hasta cansar el corazón. La oración dice la verdad sobre ese mismo futuro y lo deja con el Padre. La gratitud no es negar el dolor. Es recordar que Dios ya ha cumplido su palabra.',
        challenge: 'Hermanos, ¿qué están dando vueltas en la noche y todavía no han puesto delante de Dios?',
        charge: 'Nómbrenlo. Denle gracias por lo que ya es verdad. Luego dejen que su paz cuide la puerta que los pensamientos no dejan de abrir.',
        questions: [
          '¿Qué preocupación le explicas a la gente y no a Dios?',
          '¿Qué cambiaría esta semana si la gratitud llegara antes del pedido?',
        ],
      },
      {
        punch: 'A preocupação é uma oração que nunca é endereçada.',
        context:
          'Paulo ainda está preso quando manda a igreja orar. Ele não diz que os problemas são pequenos. Diz que esses problemas têm um lugar: Deus, com ações de graças, e não mais uma volta pela sala.',
        application:
          'A ansiedade ensaia o futuro até cansar o coração. A oração diz a verdade sobre esse mesmo futuro e o deixa com o Pai. A gratidão não é negar a dor. É lembrar que Deus já cumpriu a sua palavra.',
        challenge: 'Irmãos, o que vocês viram e reviram de noite e ainda não colocaram diante de Deus?',
        charge: 'Nomeiem. Agradeçam pelo que já é verdade. Depois deixem a paz dele guardar a porta que os pensamentos não param de abrir.',
        questions: [
          'Qual preocupação você explica às pessoas e não a Deus?',
          'O que mudaria nesta semana se a gratidão viesse antes do pedido?',
        ],
      },
    ),
  },
  {
    id: 'fear',
    keywords: ['fear', 'afraid', 'fearful', 'terror', 'miedo', 'temor', 'temeroso', 'medo', 'temor', 'assustado'],
    bookId: 'isa',
    chapter: 41,
    verse: 10,
    endVerse: 10,
    copy: copy(
      {
        punch: 'God does not tell the fearful to be brave alone.',
        context:
          'Isaiah speaks to a people who will be carried far from home. The fear is real: exile, weakness, enemies. The answer is not a technique. It is a presence. “I am with thee.” The God who called them is the one who holds them.',
        application:
          'Fear grows when we face the week as if we were the strongest person in it. This verse puts God back in the room. His help is not a mood. It is his righteous right hand, the same hand that keeps his promises.',
        challenge: 'Class, where are you acting as if God stepped out and left you to hold the wall up?',
        charge: 'Say the fear out loud, and then say who is with you. Do not leave this room still pretending you are alone.',
        questions: [
          'What fear have you been treating as a fact God cannot touch?',
          'Who needs to hear from you this week that God is with his people?',
        ],
      },
      {
        punch: 'Dios no le dice al temeroso que sea valiente solo.',
        context:
          'Isaías habla a un pueblo que será llevado lejos de casa. El miedo es real: destierro, debilidad, enemigos. La respuesta no es una técnica. Es una presencia. “Yo estoy contigo.” El Dios que los llamó es el que los sostiene.',
        application:
          'El miedo crece cuando enfrentamos la semana como si fuéramos los más fuertes en ella. Este versículo vuelve a poner a Dios en el cuarto. Su ayuda no es un ánimo. Es su diestra justa, la misma mano que cumple sus promesas.',
        challenge: 'Hermanos, ¿dónde están actuando como si Dios se hubiera salido y los dejara sosteniendo la pared?',
        charge: 'Digan el miedo en voz alta, y luego digan quién está con ustedes. No salgan de este cuarto fingiendo que están solos.',
        questions: [
          '¿Qué miedo has tratado como un hecho que Dios no puede tocar?',
          '¿A quién necesitas decirle esta semana que Dios está con su pueblo?',
        ],
      },
      {
        punch: 'Deus não manda o medroso ser corajoso sozinho.',
        context:
          'Isaías fala a um povo que será levado para longe de casa. O medo é real: exílio, fraqueza, inimigos. A resposta não é uma técnica. É uma presença. “Eu sou contigo.” O Deus que os chamou é quem os segura.',
        application:
          'O medo cresce quando enfrentamos a semana como se fôssemos os mais fortes nela. Este versículo põe Deus de volta na sala. A ajuda dele não é um ânimo. É a sua destra justa, a mesma mão que cumpre as promessas.',
        challenge: 'Irmãos, onde vocês estão agindo como se Deus tivesse saído e deixado vocês segurando a parede?',
        charge: 'Digam o medo em voz alta, e depois digam quem está com vocês. Não saiam desta sala fingindo que estão sozinhos.',
        questions: [
          'Que medo você tem tratado como um fato que Deus não pode tocar?',
          'A quem você precisa dizer nesta semana que Deus está com o seu povo?',
        ],
      },
    ),
  },
  {
    id: 'faith',
    keywords: ['faith', 'believe', 'belief', 'trusting god', 'fe', 'creer', 'creencia', 'fe', 'crer', 'crenca'],
    bookId: 'heb',
    chapter: 11,
    verse: 1,
    endVerse: 1,
    copy: copy(
      {
        punch: 'Faith is not a guess. It is taking God at his word.',
        context:
          'Hebrews writes to believers who are tired and tempted to go back. Chapter 11 is not a list of lucky people. It is a list of men and women who acted because God had spoken, before the thing promised could be seen.',
        application:
          'We say we believe and then live by what we can measure. Faith looks at the promise and moves. It does not invent a new word. It holds the one already given, and it shows up in obedience, not in a louder feeling.',
        challenge: 'Class, where is your life waiting for proof before it will obey?',
        charge: 'Pick one clear word of God you already know, and do it this week. Faith that never moves is only a sentence.',
        questions: [
          'What promise of God are you treating as uncertain?',
          'What obedience have you delayed until you feel sure?',
        ],
      },
      {
        punch: 'La fe no es una suposición. Es tomar a Dios en su palabra.',
        context:
          'Hebreos escribe a creyentes cansados y tentados a volver atrás. El capítulo 11 no es una lista de gente con suerte. Es una lista de hombres y mujeres que actuaron porque Dios había hablado, antes de que se viera lo prometido.',
        application:
          'Decimos que creemos y luego vivimos por lo que podemos medir. La fe mira la promesa y se mueve. No inventa una palabra nueva. Se aferra a la que ya fue dada, y se ve en la obediencia, no en un sentimiento más fuerte.',
        challenge: 'Hermanos, ¿dónde está esperando su vida una prueba antes de obedecer?',
        charge: 'Elijan una palabra clara de Dios que ya conocen, y háganla esta semana. Una fe que no se mueve es solo una frase.',
        questions: [
          '¿Qué promesa de Dios estás tratando como incierta?',
          '¿Qué obediencia has retrasado hasta sentirte seguro?',
        ],
      },
      {
        punch: 'A fé não é um palpite. É levar Deus a sério na palavra dele.',
        context:
          'Hebreus escreve a crentes cansados e tentados a voltar atrás. O capítulo 11 não é uma lista de gente de sorte. É uma lista de homens e mulheres que agiram porque Deus tinha falado, antes de a promessa ser vista.',
        application:
          'Dizemos que cremos e depois vivemos pelo que podemos medir. A fé olha a promessa e se move. Ela não inventa uma palavra nova. Segura a que já foi dada, e aparece na obediência, não num sentimento mais alto.',
        challenge: 'Irmãos, onde a vida de vocês está esperando uma prova antes de obedecer?',
        charge: 'Escolham uma palavra clara de Deus que vocês já conhecem, e façam isso nesta semana. Fé que não se move é só uma frase.',
        questions: [
          'Qual promessa de Deus você tem tratado como incerta?',
          'Qual obediência você adiou até se sentir seguro?',
        ],
      },
    ),
  },
  {
    id: 'hope',
    keywords: ['hope', 'hopeful', 'despair', 'esperanza', 'esperanzar', 'desesperacion', 'esperanca', 'desespero'],
    bookId: 'rom',
    chapter: 15,
    verse: 13,
    endVerse: 13,
    copy: copy(
      {
        punch: 'Hope is not a mood. It is God filling what trust opens.',
        context:
          'Paul has been teaching that Jew and Gentile stand by faith in Christ. Then he prays. The God of hope is the one who makes the church abound in hope, through the Holy Spirit. The source is named. It is not the news.',
        application:
          'Despair looks at the week and closes the book. Hope looks at the God who raised Jesus and stays open. Joy and peace in believing are not decorations. They are the fruit of taking the gospel as true when the room feels thin.',
        challenge: 'Class, what have you quietly decided will never change?',
        charge: 'Bring that closed door to the God of hope. Ask him to fill you, and do not ask the headlines to do his work.',
        questions: [
          'Where has despair been louder than the promise this month?',
          'What would it look like to believe God about that one thing?',
        ],
      },
      {
        punch: 'La esperanza no es un ánimo. Es Dios llenando lo que la confianza abre.',
        context:
          'Pablo ha enseñado que judío y gentil están firmes por la fe en Cristo. Luego ora. El Dios de la esperanza es quien hace abundar a la iglesia en esperanza, por el Espíritu Santo. La fuente tiene nombre. No son las noticias.',
        application:
          'La desesperación mira la semana y cierra el libro. La esperanza mira al Dios que resucitó a Jesús y se queda abierta. El gozo y la paz al creer no son adornos. Son el fruto de tomar el evangelio como verdad cuando el cuarto se siente vacío.',
        challenge: 'Hermanos, ¿qué han decidido en silencio que nunca va a cambiar?',
        charge: 'Traigan esa puerta cerrada al Dios de la esperanza. Pídanle que los llene, y no le pidan a los titulares que hagan su trabajo.',
        questions: [
          '¿Dónde ha sonado más fuerte la desesperación que la promesa este mes?',
          '¿Cómo se vería creer a Dios en esa sola cosa?',
        ],
      },
      {
        punch: 'A esperança não é um humor. É Deus enchendo o que a confiança abre.',
        context:
          'Paulo ensinou que judeu e gentio estão firmes pela fé em Cristo. Depois ele ora. O Deus da esperança é quem faz a igreja abundar em esperança, pelo Espírito Santo. A fonte tem nome. Não são as notícias.',
        application:
          'O desespero olha a semana e fecha o livro. A esperança olha o Deus que ressuscitou Jesus e permanece aberta. A alegria e a paz no crer não são enfeite. São o fruto de tomar o evangelho como verdade quando a sala parece vazia.',
        challenge: 'Irmãos, o que vocês decidiram em silêncio que nunca vai mudar?',
        charge: 'Tragam essa porta fechada ao Deus da esperança. Peçam que ele encha vocês, e não peçam às manchetes que façam o trabalho dele.',
        questions: [
          'Onde o desespero falou mais alto que a promessa neste mês?',
          'Como seria crer em Deus nessa única coisa?',
        ],
      },
    ),
  },
  {
    id: 'love',
    keywords: ['love', 'loving', 'charity', 'amor', 'amar', 'caridad', 'amor', 'amar', 'caridade'],
    bookId: 'jhn',
    chapter: 13,
    verse: 34,
    endVerse: 35,
    copy: copy(
      {
        punch: 'The new commandment is an old God loving in a new way.',
        context:
          'Jesus has just washed the feet of the men who will fail him, including Judas. Then he gives the command. Love one another as I have loved you. The measure is not our warmth. It is his cross, already in view that night.',
        application:
          'We like love as a feeling we wait to have. Jesus makes it a command we practice toward the people in the room, including the difficult ones. The world does not read our opinions first. It reads whether we love the brothers.',
        challenge: 'Class, who in this church have you decided does not deserve the love Christ gave you?',
        charge: 'Name that person before God today. Then do one concrete kindness that costs you something small and real.',
        questions: [
          'Where is your love still waiting to feel like it, instead of obeying?',
          'What would this class look like if we loved as he loved us?',
        ],
      },
      {
        punch: 'El mandamiento nuevo es el mismo Dios amando de un modo nuevo.',
        context:
          'Jesús acaba de lavar los pies de los hombres que van a fallarle, incluso Judas. Luego da el mandamiento. Amaos unos a otros como yo os he amado. La medida no es nuestro calor. Es su cruz, ya a la vista esa noche.',
        application:
          'Nos gusta el amor como un sentimiento que esperamos tener. Jesús lo hace un mandamiento que practicamos con la gente del cuarto, incluso la difícil. El mundo no lee primero nuestras opiniones. Lee si nos amamos los hermanos.',
        challenge: 'Hermanos, ¿a quién en esta iglesia han decidido que no merece el amor que Cristo les dio?',
        charge: 'Nombra a esa persona delante de Dios hoy. Luego haz una bondad concreta que te cueste algo pequeño y real.',
        questions: [
          '¿Dónde tu amor sigue esperando sentirse así, en vez de obedecer?',
          '¿Cómo se vería esta clase si nos amáramos como él nos amó?',
        ],
      },
      {
        punch: 'O mandamento novo é o mesmo Deus amando de um modo novo.',
        context:
          'Jesus acabou de lavar os pés dos homens que vão falhar com ele, inclusive Judas. Depois dá o mandamento. Amai-vos uns aos outros como eu vos amei. A medida não é o nosso calor. É a cruz dele, já à vista naquela noite.',
        application:
          'Gostamos do amor como um sentimento que esperamos ter. Jesus faz dele um mandamento que praticamos com as pessoas da sala, inclusive as difíceis. O mundo não lê primeiro as nossas opiniões. Lê se nós nos amamos como irmãos.',
        challenge: 'Irmãos, quem nesta igreja vocês decidiram que não merece o amor que Cristo lhes deu?',
        charge: 'Nomeie essa pessoa diante de Deus hoje. Depois faça uma bondade concreta que lhe custe algo pequeno e real.',
        questions: [
          'Onde o seu amor ainda espera sentir vontade, em vez de obedecer?',
          'Como esta classe seria se nos amássemos como ele nos amou?',
        ],
      },
    ),
  },
  {
    id: 'forgiveness',
    keywords: ['forgive', 'forgiveness', 'pardon', 'reconcile', 'perdon', 'perdonar', 'perdao', 'perdoar', 'reconciliacion', 'reconciliacao'],
    bookId: 'eph',
    chapter: 4,
    verse: 32,
    endVerse: 32,
    copy: copy(
      {
        punch: 'We forgive because we have already been forgiven.',
        context:
          'Paul is telling the church how the new life looks. Kindness and a tender heart are not personality tips. They stand next to forgiveness, and the pattern is God in Christ. The debt we release is smaller than the debt he cancelled.',
        application:
          'Unforgiveness feels like justice and works like a chain. It keeps the injury in the center of the week. Forgiveness does not call evil good. It refuses to make ourselves the judge after Christ has taken the case.',
        challenge: 'Class, whose name still tightens your jaw when it is spoken?',
        charge: 'Bring that name to the cross before you leave it in the parking lot. Ask God for the kindness you do not feel yet, and take one step toward peace.',
        questions: [
          'Who are you still making pay for something Christ already carried?',
          'What would kindness look like toward that person this week, without pretending the wound was nothing?',
        ],
      },
      {
        punch: 'Perdonamos porque ya fuimos perdonados.',
        context:
          'Pablo le dice a la iglesia cómo se ve la vida nueva. La bondad y el corazón tierno no son consejos de carácter. Están junto al perdón, y el modelo es Dios en Cristo. La deuda que soltamos es menor que la que él canceló.',
        application:
          'No perdonar se siente como justicia y funciona como una cadena. Mantiene la herida en el centro de la semana. El perdón no llama bueno a lo malo. Rehúsa hacernos jueces después de que Cristo tomó el caso.',
        challenge: 'Hermanos, ¿qué nombre todavía les aprieta la mandíbula cuando lo dicen?',
        charge: 'Traigan ese nombre a la cruz antes de dejarlo en el estacionamiento. Pidan a Dios la bondad que todavía no sienten, y den un paso hacia la paz.',
        questions: [
          '¿A quién sigues haciendo pagar por algo que Cristo ya cargó?',
          '¿Cómo se vería la bondad hacia esa persona esta semana, sin fingir que la herida no existió?',
        ],
      },
      {
        punch: 'Perdoamos porque já fomos perdoados.',
        context:
          'Paulo diz à igreja como a vida nova aparece. A bondade e o coração terno não são dicas de personalidade. Estão ao lado do perdão, e o modelo é Deus em Cristo. A dívida que soltamos é menor do que a que ele cancelou.',
        application:
          'Não perdoar parece justiça e funciona como uma corrente. Mantém a ferida no centro da semana. O perdão não chama o mal de bem. Recusa fazer de nós juízes depois que Cristo tomou a causa.',
        challenge: 'Irmãos, que nome ainda aperta o queixo de vocês quando é falado?',
        charge: 'Tragam esse nome à cruz antes de deixá-lo no estacionamento. Peçam a Deus a bondade que ainda não sentem, e deem um passo em direção à paz.',
        questions: [
          'Quem você ainda faz pagar por algo que Cristo já carregou?',
          'Como seria a bondade para com essa pessoa nesta semana, sem fingir que a ferida não existiu?',
        ],
      },
    ),
  },
  {
    id: 'peace',
    keywords: ['peace', 'calm', 'shalom', 'paz', 'calma', 'tranquilidad', 'paz', 'calma', 'tranquilidade'],
    bookId: 'jhn',
    chapter: 14,
    verse: 27,
    endVerse: 27,
    copy: copy(
      {
        punch: 'The peace Jesus gives is not the peace the world sells.',
        context:
          'Jesus is hours from the cross. The disciples are troubled. He does not offer a quieter empire or a solved calendar. He gives his own peace, and he tells their hearts not to be afraid. The gift and the command belong together.',
        application:
          'The world offers peace by removing the hard thing. Christ offers peace while the hard thing is still in the room. We keep hunting a feeling. He has already given a Person. A heart that believes him can rest without having every answer.',
        challenge: 'Class, what are you calling peace that is only the absence of trouble?',
        charge: 'Lay down the demand that life be easy before your heart is quiet. Receive what he left you.',
        questions: [
          'Where are you troubled because you wanted the world’s kind of peace?',
          'What fear would shrink if you trusted the peace he already gave?',
        ],
      },
      {
        punch: 'La paz que Jesús da no es la paz que el mundo vende.',
        context:
          'Jesús está a horas de la cruz. Los discípulos están turbados. Él no ofrece un imperio más quieto ni un calendario resuelto. Da su propia paz, y les dice al corazón que no tema. El don y el mandamiento van juntos.',
        application:
          'El mundo ofrece paz quitando lo difícil. Cristo ofrece paz mientras lo difícil sigue en el cuarto. Nosotros buscamos un sentimiento. Él ya dio una Persona. Un corazón que le cree puede descansar sin tener todas las respuestas.',
        challenge: 'Hermanos, ¿qué están llamando paz que es solo la ausencia de problemas?',
        charge: 'Suelten la exigencia de que la vida sea fácil antes de que el corazón esté quieto. Reciban lo que él les dejó.',
        questions: [
          '¿Dónde estás turbado porque querías la paz del mundo?',
          '¿Qué temor se achicaría si confiaras en la paz que él ya dio?',
        ],
      },
      {
        punch: 'A paz que Jesus dá não é a paz que o mundo vende.',
        context:
          'Jesus está a horas da cruz. Os discípulos estão perturbados. Ele não oferece um império mais quieto nem uma agenda resolvida. Dá a sua própria paz, e manda o coração não temer. O dom e o mandamento andam juntos.',
        application:
          'O mundo oferece paz tirando o que é difícil. Cristo oferece paz enquanto o difícil ainda está na sala. Nós caçamos um sentimento. Ele já deu uma Pessoa. Um coração que crê nele pode descansar sem ter todas as respostas.',
        challenge: 'Irmãos, o que vocês estão chamando de paz que é só a ausência de problema?',
        charge: 'Larguem a exigência de que a vida seja fácil antes de o coração ficar quieto. Recebam o que ele deixou.',
        questions: [
          'Onde você está perturbado porque queria a paz do mundo?',
          'Que temor diminuiria se você confiasse na paz que ele já deu?',
        ],
      },
    ),
  },
  {
    id: 'patience',
    keywords: ['patience', 'patient', 'endurance', 'perseverance', 'longsuffering', 'paciencia', 'paciente', 'perseverancia', 'paciencia', 'paciente', 'perseveranca'],
    bookId: 'jas',
    chapter: 1,
    verse: 2,
    endVerse: 4,
    copy: copy(
      {
        punch: 'The trial is not an interruption. It is the workshop.',
        context:
          'James writes to scattered believers under pressure. He does not romanticize pain. He says to count it joy because the testing of faith produces patience, and patience, if it finishes its work, leaves a person whole. God is after maturity, not a smoother week.',
        application:
          'We ask God to remove the very thing he is using to grow us. Patience is not biting your tongue for an hour. It is staying under the hand of God without quitting the faith. Joy here is not a grin. It is agreement that he knows what he is doing.',
        challenge: 'Class, which trial are you treating as proof that God forgot the plan?',
        charge: 'Stay. Ask for wisdom in it. Do not waste the workshop by demanding a shortcut.',
        questions: [
          'What pressure are you trying to escape instead of bringing to God?',
          'Where have you seen patience actually make someone whole?',
        ],
      },
      {
        punch: 'La prueba no es una interrupción. Es el taller.',
        context:
          'Santiago escribe a creyentes dispersos bajo presión. No romantiza el dolor. Dice que lo tengan por gozo porque la prueba de la fe produce paciencia, y la paciencia, si acaba su obra, deja a la persona completa. Dios busca madurez, no una semana más lisa.',
        application:
          'Le pedimos a Dios que quite lo mismo que está usando para hacernos crecer. La paciencia no es callar una hora. Es permanecer bajo la mano de Dios sin dejar la fe. El gozo aquí no es una sonrisa. Es estar de acuerdo en que él sabe lo que hace.',
        challenge: 'Hermanos, ¿qué prueba están tratando como prueba de que Dios olvidó el plan?',
        charge: 'Quédense. Pidan sabiduría dentro de ella. No desperdicien el taller exigiendo un atajo.',
        questions: [
          '¿Qué presión estás tratando de escapar en vez de traerla a Dios?',
          '¿Dónde has visto que la paciencia de veras complete a alguien?',
        ],
      },
      {
        punch: 'A prova não é uma interrupção. É a oficina.',
        context:
          'Tiago escreve a crentes dispersos debaixo de pressão. Ele não romantiza a dor. Diz para ter por alegria, porque a prova da fé produz paciência, e a paciência, se acaba a sua obra, deixa a pessoa inteira. Deus busca maturidade, não uma semana mais lisa.',
        application:
          'Pedimos a Deus que tire a mesma coisa que ele está usando para nos fazer crescer. Paciência não é calar por uma hora. É permanecer debaixo da mão de Deus sem abandonar a fé. A alegria aqui não é um sorriso. É concordar que ele sabe o que faz.',
        challenge: 'Irmãos, que prova vocês estão tratando como prova de que Deus esqueceu o plano?',
        charge: 'Fiquem. Peçam sabedoria dentro dela. Não desperdicem a oficina exigindo um atalho.',
        questions: [
          'Que pressão você está tentando fugir em vez de trazer a Deus?',
          'Onde você viu a paciência de fato completar alguém?',
        ],
      },
    ),
  },
  {
    id: 'courage',
    keywords: ['courage', 'brave', 'bold', 'boldness', 'valor', 'coraje', 'valentia', 'animo', 'coragem', 'valentia', 'ousadia'],
    bookId: 'jos',
    chapter: 1,
    verse: 9,
    endVerse: 9,
    copy: copy(
      {
        punch: 'Courage is commanded because God is already there.',
        context:
          'Moses is dead. Joshua has to lead Israel into a land full of enemies. God does not give him a smaller assignment. He tells him to be strong and of a good courage, because the Lord goes with him. The command rests on the presence.',
        challenge:
          'Class, what good work are you shrinking from because you are counting only your own strength?',
        charge: 'Do the next faithful thing. God did not send Joshua in alone, and he has not sent you in alone.',
        application:
          'We wait to feel brave and then call the delay wisdom. Joshua’s courage was obedience with a promise attached. The church still needs people who will speak, serve, and repent without waiting for a fearless mood.',
        questions: [
          'Where has fear been making your decisions?',
          'What one act of obedience would courage look like this week?',
        ],
      },
      {
        punch: 'El valor se manda porque Dios ya está allí.',
        context:
          'Moisés ha muerto. Josué tiene que llevar a Israel a una tierra llena de enemigos. Dios no le da una tarea más pequeña. Le dice que se esfuerce y sea valiente, porque el Señor va con él. El mandamiento descansa en la presencia.',
        application:
          'Esperamos sentirnos valientes y luego llamamos sabiduría a la demora. El valor de Josué fue obediencia con una promesa pegada. La iglesia todavía necesita gente que hable, sirva y se arrepienta sin esperar un ánimo sin miedo.',
        challenge: 'Hermanos, ¿qué buena obra están evitando porque solo cuentan su propia fuerza?',
        charge: 'Hagan lo siguiente que es fiel. Dios no envió a Josué solo, y no los ha enviado solos.',
        questions: [
          '¿Dónde el miedo ha estado tomando tus decisiones?',
          '¿Qué acto de obediencia sería el valor esta semana?',
        ],
      },
      {
        punch: 'A coragem é ordenada porque Deus já está lá.',
        context:
          'Moisés morreu. Josué tem de levar Israel a uma terra cheia de inimigos. Deus não lhe dá uma tarefa menor. Manda que seja forte e corajoso, porque o Senhor vai com ele. O mandamento descansa na presença.',
        application:
          'Esperamos sentir coragem e depois chamamos a demora de sabedoria. A coragem de Josué foi obediência com uma promessa grudada. A igreja ainda precisa de gente que fale, sirva e se arrependa sem esperar um humor sem medo.',
        challenge: 'Irmãos, que boa obra vocês estão evitando porque só contam a própria força?',
        charge: 'Façam a próxima coisa fiel. Deus não enviou Josué sozinho, e não enviou vocês sozinhos.',
        questions: [
          'Onde o medo tem tomado as suas decisões?',
          'Que ato de obediência seria coragem nesta semana?',
        ],
      },
    ),
  },
  {
    id: 'wisdom',
    keywords: ['wisdom', 'wise', 'discernment', 'sabiduria', 'sabio', 'discernimiento', 'sabedoria', 'sabio', 'discernimento'],
    bookId: 'jas',
    chapter: 1,
    verse: 5,
    endVerse: 5,
    copy: copy(
      {
        punch: 'God does not scold the person who asks for wisdom.',
        context:
          'James has just said that trials need patience. Then he tells the church what to do when they do not know how: ask God. He gives liberally and does not reproach. Wisdom here is not a trick for getting ahead. It is seeing the trial as God sees it.',
        application:
          'We ask friends, we search our own hearts, and we call that seeking counsel. Those can help. This verse puts the first request in the right place. A double-minded ask does not trust the answer. A simple ask expects God to speak by his Word and to give what the week needs.',
        challenge: 'Class, what decision are you making without ever asking him?',
        charge: 'Ask today, in plain words. Then open the Scriptures and obey the wisdom he has already written.',
        questions: [
          'Where are you collecting opinions instead of asking God?',
          'What would you do differently if you believed he gives without scolding?',
        ],
      },
      {
        punch: 'Dios no regaña al que pide sabiduría.',
        context:
          'Santiago acaba de decir que las pruebas necesitan paciencia. Luego le dice a la iglesia qué hacer cuando no saben cómo: pedir a Dios. Él da con liberalidad y no reprocha. La sabiduría aquí no es un truco para salir adelante. Es ver la prueba como Dios la ve.',
        application:
          'Preguntamos a los amigos, rebuscamos el corazón, y llamamos a eso buscar consejo. Eso puede ayudar. Este versículo pone el primer pedido en el lugar correcto. Una petición de doble ánimo no confía en la respuesta. Una petición sencilla espera que Dios hable por su Palabra y dé lo que la semana necesita.',
        challenge: 'Hermanos, ¿qué decisión están tomando sin pedirle nunca a él?',
        charge: 'Pidan hoy, con palabras claras. Luego abran las Escrituras y obedezcan la sabiduría que él ya escribió.',
        questions: [
          '¿Dónde estás juntando opiniones en vez de pedir a Dios?',
          '¿Qué harías distinto si creyeras que él da sin regañar?',
        ],
      },
      {
        punch: 'Deus não repreende quem pede sabedoria.',
        context:
          'Tiago acabou de dizer que as provas precisam de paciência. Depois diz à igreja o que fazer quando não sabem como: pedir a Deus. Ele dá com liberalidade e não censura. A sabedoria aqui não é um truque para vencer. É ver a prova como Deus a vê.',
        application:
          'Perguntamos aos amigos, revolvemos o coração, e chamamos isso de buscar conselho. Isso pode ajudar. Este versículo põe o primeiro pedido no lugar certo. Um pedido de ânimo dobre não confia na resposta. Um pedido simples espera que Deus fale pela Palavra e dê o que a semana precisa.',
        challenge: 'Irmãos, que decisão vocês estão tomando sem nunca pedir a ele?',
        charge: 'Peçam hoje, com palavras claras. Depois abram as Escrituras e obedeçam a sabedoria que ele já escreveu.',
        questions: [
          'Onde você está juntando opiniões em vez de pedir a Deus?',
          'O que você faria diferente se cresse que ele dá sem repreender?',
        ],
      },
    ),
  },
  {
    id: 'grace',
    keywords: ['grace', 'mercy', 'saved by grace', 'gracia', 'misericordia', 'graca', 'misericordia'],
    bookId: 'eph',
    chapter: 2,
    verse: 8,
    endVerse: 9,
    copy: copy(
      {
        punch: 'Grace is God’s gift, and it leaves no room for boasting.',
        context:
          'Paul has described people dead in trespasses. Then God, rich in mercy, makes them alive with Christ. Faith is the open hand. The gift is salvation. Works do not buy it, so nobody walks into the church as a self-made saint.',
        application:
          'We slide from grace back into the scoreboard. We compare. We despair when we fail, or we swell when we do well. Both are a kind of boasting. Grace tells the truth: we were dead, and God made us alive. The works that follow are fruit, not a fee.',
        challenge: 'Class, are you still trying to pay for what he already gave?',
        charge: 'Put the boast down. Thank him. Then do good because you are his workmanship, not because you are earning a seat.',
        questions: [
          'Where are you keeping score with God or with other believers?',
          'How would this week look if you really believed salvation is a gift?',
        ],
      },
      {
        punch: 'La gracia es don de Dios, y no deja lugar para el orgullo.',
        context:
          'Pablo ha descrito a personas muertas en pecados. Luego Dios, rico en misericordia, las vivifica con Cristo. La fe es la mano abierta. El don es la salvación. Las obras no la compran, así que nadie entra en la iglesia como santo hecho por sí mismo.',
        application:
          'Nos deslizamos de la gracia otra vez al marcador. Comparamos. Nos desesperamos cuando fallamos, o nos hinchamos cuando nos va bien. Las dos cosas son una forma de jactancia. La gracia dice la verdad: estábamos muertos, y Dios nos dio vida. Las obras que siguen son fruto, no una cuota.',
        challenge: 'Hermanos, ¿siguen tratando de pagar lo que él ya dio?',
        charge: 'Suelten la jactancia. Denle gracias. Luego hagan el bien porque son hechura suya, no porque estén comprando un lugar.',
        questions: [
          '¿Dónde sigues llevando la cuenta con Dios o con otros creyentes?',
          '¿Cómo se vería esta semana si de veras creyeras que la salvación es un don?',
        ],
      },
      {
        punch: 'A graça é dom de Deus, e não deixa lugar para vanglória.',
        context:
          'Paulo descreveu pessoas mortas nos pecados. Depois Deus, rico em misericórdia, as vivifica com Cristo. A fé é a mão aberta. O dom é a salvação. As obras não a compram, então ninguém entra na igreja como santo feito por si mesmo.',
        application:
          'Escorregamos da graça de volta para o placar. Comparamos. Desesperamos quando falhamos, ou inchamos quando vai bem. As duas coisas são um tipo de vanglória. A graça diz a verdade: estávamos mortos, e Deus nos deu vida. As obras que seguem são fruto, não uma taxa.',
        challenge: 'Irmãos, vocês ainda estão tentando pagar o que ele já deu?',
        charge: 'Larguem a vanglória. Agradeçam. Depois façam o bem porque são feitura dele, não porque estejam comprando um lugar.',
        questions: [
          'Onde você ainda marca pontos com Deus ou com outros crentes?',
          'Como esta semana seria se você cresse de verdade que a salvação é um dom?',
        ],
      },
    ),
  },
  {
    id: 'salvation',
    keywords: ['salvation', 'gospel', 'born again', 'eternal life', 'john 3', 'salvacion', 'evangelio', 'nacer de nuevo', 'vida eterna', 'salvacao', 'evangelho', 'novo nascimento', 'vida eterna'],
    bookId: 'jhn',
    chapter: 3,
    verse: 16,
    endVerse: 16,
    copy: copy(
      {
        punch: 'God loved, and he gave his Son.',
        context:
          'Jesus is speaking with Nicodemus at night. The teacher of Israel needs a new birth he cannot perform. John 3:16 is not a slogan pulled out of the air. It is the explanation of the cross: the Father gives the Son so that believers will not perish but have everlasting life.',
        application:
          'We make the gospel smaller than it is. We treat it as advice for better people. It is rescue for perishing people. Believing is not agreeing that the verse is famous. It is trusting the Son whom God gave, and finding life in him.',
        challenge: 'Class, have you believed, or have you only heard this verse enough times to feel safe?',
        charge: 'If you have believed, say so with your life this week. If you have not, do not leave the love of God as a sentence you never answered.',
        questions: [
          'What does “perish” mean if this verse is true?',
          'Who near you still needs to hear that God gave his Son?',
        ],
      },
      {
        punch: 'Dios amó, y dio a su Hijo.',
        context:
          'Jesús habla con Nicodemo de noche. El maestro de Israel necesita un nuevo nacimiento que él no puede producirse. Juan 3:16 no es un lema sacado del aire. Es la explicación de la cruz: el Padre da al Hijo para que el que cree no se pierda, mas tenga vida eterna.',
        application:
          'Hacemos el evangelio más pequeño de lo que es. Lo tratamos como un consejo para gente mejor. Es rescate para gente que se pierde. Creer no es estar de acuerdo en que el versículo es famoso. Es confiar en el Hijo que Dios dio, y hallar la vida en él.',
        challenge: 'Hermanos, ¿han creído, o solo han oído este versículo las veces suficientes para sentirse a salvo?',
        charge: 'Si han creído, díganlo con la vida esta semana. Si no, no dejen el amor de Dios como una frase que nunca respondieron.',
        questions: [
          '¿Qué significa “perecer” si este versículo es verdad?',
          '¿Quién cerca de ti todavía necesita oír que Dios dio a su Hijo?',
        ],
      },
      {
        punch: 'Deus amou, e deu o seu Filho.',
        context:
          'Jesus fala com Nicodemos de noite. O mestre de Israel precisa de um novo nascimento que ele não pode produzir. João 3:16 não é um lema tirado do ar. É a explicação da cruz: o Pai dá o Filho para que quem crê não pereça, mas tenha a vida eterna.',
        application:
          'Fazemos o evangelho menor do que ele é. Tratamos como conselho para gente melhor. É resgate para gente que se perde. Crer não é concordar que o versículo é famoso. É confiar no Filho que Deus deu, e achar a vida nele.',
        challenge: 'Irmãos, vocês creram, ou só ouviram este versículo vezes bastantes para se sentirem seguros?',
        charge: 'Se creram, digam isso com a vida nesta semana. Se não, não deixem o amor de Deus como uma frase que nunca responderam.',
        questions: [
          'O que significa “perecer” se este versículo é verdade?',
          'Quem perto de você ainda precisa ouvir que Deus deu o seu Filho?',
        ],
      },
    ),
  },
  {
    id: 'humility',
    keywords: ['humble', 'humility', 'pride', 'proud', 'humildad', 'humilde', 'orgullo', 'humildade', 'humilde', 'orgulho'],
    bookId: 'php',
    chapter: 2,
    verse: 3,
    endVerse: 4,
    copy: copy(
      {
        punch: 'Humility looks at others the way Christ looked at us.',
        context:
          'Paul is pleading for unity in Philippi. The path is low: nothing through strife or vainglory, each esteeming others better than himself. He is about to show them Christ, who did not clutch his glory but took the form of a servant.',
        application:
          'Pride keeps a private ranking of the room. Humility closes the ledger. It does not mean lying about your gifts. It means you stop using them to be seen, and you start asking what the person beside you needs.',
        challenge: 'Class, whose good have you walked past because you were busy being noticed?',
        charge: 'This week, let someone else’s name be the one that is helped. Do it where nobody is keeping score.',
        questions: [
          'Where does vainglory still steer your words?',
          'Who in this class needs you to look at their concerns, not your own?',
        ],
      },
      {
        punch: 'La humildad mira a los otros como Cristo nos miró.',
        context:
          'Pablo ruega por la unidad en Filipos. El camino es bajo: nada por contienda o vanagloria, estimando cada uno a los demás como superiores a él mismo. Está a punto de mostrarles a Cristo, que no se aferró a su gloria, sino que tomó forma de siervo.',
        application:
          'El orgullo mantiene un ranking privado del cuarto. La humildad cierra la cuenta. No significa mentir sobre los dones. Significa dejar de usarlos para ser visto, y empezar a preguntar qué necesita la persona de al lado.',
        challenge: 'Hermanos, ¿el bien de quién han pasado de largo porque estaban ocupados en que los notaran?',
        charge: 'Esta semana, dejen que el nombre que reciba ayuda sea el de otro. Háganlo donde nadie lleva la cuenta.',
        questions: [
          '¿Dónde la vanagloria todavía dirige tus palabras?',
          '¿Quién en esta clase necesita que mires sus cosas, no las tuyas?',
        ],
      },
      {
        punch: 'A humildade olha os outros como Cristo nos olhou.',
        context:
          'Paulo pede unidade em Filipos. O caminho é baixo: nada por contenda ou vanglória, cada um estimando os outros como superiores a si mesmo. Ele está prestes a mostrar Cristo, que não se agarrou à glória, mas tomou forma de servo.',
        application:
          'O orgulho mantém um ranking privado da sala. A humildade fecha a conta. Não significa mentir sobre os dons. Significa parar de usá-los para ser visto, e começar a perguntar o que a pessoa ao lado precisa.',
        challenge: 'Irmãos, o bem de quem vocês passaram reto porque estavam ocupados em ser notados?',
        charge: 'Nesta semana, deixem que o nome ajudado seja o de outra pessoa. Façam isso onde ninguém marca ponto.',
        questions: [
          'Onde a vanglória ainda dirige as suas palavras?',
          'Quem nesta classe precisa que você olhe as coisas dela, não as suas?',
        ],
      },
    ),
  },
  {
    id: 'trust',
    keywords: ['trust', 'lean', 'acknowledge', 'confianza', 'confiar', 'apoyarse', 'confianca', 'confiar', 'apoiar'],
    bookId: 'pro',
    chapter: 3,
    verse: 5,
    endVerse: 6,
    copy: copy(
      {
        punch: 'Trust in the Lord is a whole heart, not a spare plan.',
        context:
          'Proverbs speaks as a father to a son. The warning is specific: do not lean on your own understanding. In all your ways acknowledge him. The promise is direction, not a map of every turn. God straightens the path of the person who actually trusts him.',
        application:
          'We pray and then keep a backup plan that ignores what he said. Leaning on our own understanding feels responsible. This proverb calls it a rival support. Acknowledging God in all our ways means the job, the money, and the family are brought under his word.',
        challenge: 'Class, where are you leaning so hard on your own reading of life that prayer is only a courtesy?',
        charge: 'Name that place. Hand him the lean. Walk the next step he has already made plain.',
        questions: [
          'What decision are you making with your understanding in the lead?',
          'What would it mean to acknowledge him in that exact place this week?',
        ],
      },
      {
        punch: 'Confiar en el Señor es el corazón entero, no un plan de repuesto.',
        context:
          'Proverbios habla como un padre a un hijo. La advertencia es concreta: no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos. La promesa es dirección, no un mapa de cada curva. Dios endereza la vereda de quien de veras confía en él.',
        application:
          'Oramos y luego guardamos un plan de respaldo que ignora lo que él dijo. Apoyarnos en nuestro entendimiento se siente responsable. Este proverbio lo llama un apoyo rival. Reconocerlo en todos los caminos significa que el trabajo, el dinero y la familia se ponen bajo su palabra.',
        challenge: 'Hermanos, ¿dónde se apoyan tan fuerte en su propia lectura de la vida que la oración es solo una cortesía?',
        charge: 'Nombren ese lugar. Suéltenle el apoyo. Caminen el siguiente paso que él ya dejó claro.',
        questions: [
          '¿Qué decisión estás tomando con tu prudencia al frente?',
          '¿Qué significaría reconocerlo en ese lugar exacto esta semana?',
        ],
      },
      {
        punch: 'Confiar no Senhor é o coração inteiro, não um plano reserva.',
        context:
          'Provérbios fala como um pai ao filho. O aviso é concreto: não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos. A promessa é direção, não um mapa de cada curva. Deus endireita a vereda de quem de fato confia nele.',
        application:
          'Oramos e depois guardamos um plano reserva que ignora o que ele disse. Apoiar-se no próprio entendimento parece responsabilidade. Este provérbio chama isso de apoio rival. Reconhecê-lo em todos os caminhos significa que o trabalho, o dinheiro e a família ficam debaixo da palavra dele.',
        challenge: 'Irmãos, onde vocês se apoiam tão forte na própria leitura da vida que a oração é só uma cortesia?',
        charge: 'Nomeiem esse lugar. Entreguem o apoio. Andem o próximo passo que ele já deixou claro.',
        questions: [
          'Que decisão você está tomando com o seu entendimento na frente?',
          'O que seria reconhecê-lo nesse lugar exato nesta semana?',
        ],
      },
    ),
  },
  {
    id: 'prayer',
    keywords: ['prayer', 'pray', 'asking', 'intercession', 'oracion', 'orar', 'pedir', 'oracao', 'orar', 'intercessao'],
    bookId: 'mat',
    chapter: 7,
    verse: 7,
    endVerse: 8,
    copy: copy(
      {
        punch: 'Jesus expects his people to ask.',
        context:
          'In the Sermon on the Mount, Jesus has been teaching a righteousness deeper than display. Then he opens the door of prayer: ask, seek, knock. The Father gives good things to those who ask him. Prayer is not a performance for the street. It is a child coming to a Father.',
        application:
          'We worry in detail and pray in general. We knock once and call heaven slow. This saying is an invitation to stay at the door. Asking is faith with words. Seeking is faith that keeps looking in the Word. Knocking is faith that will not treat God as distant.',
        challenge: 'Class, what have you stopped asking because you decided the answer was silence?',
        charge: 'Ask again, in specific words, and keep seeking. The Father is not annoyed by a child who knocks.',
        questions: [
          'What request have you dropped that Jesus would still have you bring?',
          'How is your praying different from rehearsing the problem?',
        ],
      },
      {
        punch: 'Jesús espera que su pueblo pida.',
        context:
          'En el Sermón del Monte, Jesús ha enseñado una justicia más honda que la apariencia. Luego abre la puerta de la oración: pedid, buscad, llamad. El Padre da buenas cosas a los que le piden. La oración no es una actuación para la calle. Es un hijo que viene a un Padre.',
        application:
          'Nos preocupamos con detalle y oramos en general. Llamamos una vez y decimos que el cielo es lento. Este dicho es una invitación a quedarse en la puerta. Pedir es fe con palabras. Buscar es fe que sigue mirando la Palabra. Llamar es fe que no trata a Dios como lejano.',
        challenge: 'Hermanos, ¿qué han dejado de pedir porque decidieron que la respuesta era el silencio?',
        charge: 'Pidan otra vez, con palabras concretas, y sigan buscando. El Padre no se fastidia de un hijo que llama.',
        questions: [
          '¿Qué petición has soltado que Jesús todavía quiere que traigas?',
          '¿En qué se diferencia tu oración de repasar el problema?',
        ],
      },
      {
        punch: 'Jesus espera que o seu povo peça.',
        context:
          'No Sermão do Monte, Jesus ensinou uma justiça mais funda que a aparência. Depois abre a porta da oração: pedi, buscai, batei. O Pai dá boas coisas aos que lhe pedem. A oração não é uma cena para a rua. É um filho que vem a um Pai.',
        application:
          'Nos preocupamos com detalhe e oramos em geral. Batemos uma vez e dizemos que o céu é lento. Este dito é um convite a ficar na porta. Pedir é fé com palavras. Buscar é fé que continua olhando a Palavra. Bater é fé que não trata Deus como distante.',
        challenge: 'Irmãos, o que vocês pararam de pedir porque decidiram que a resposta era o silêncio?',
        charge: 'Peçam de novo, com palavras concretas, e continuem buscando. O Pai não se irrita com um filho que bate.',
        questions: [
          'Que pedido você largou e Jesus ainda quer que você traga?',
          'Em que a sua oração é diferente de repassar o problema?',
        ],
      },
    ),
  },
  {
    id: 'joy',
    keywords: ['joy', 'rejoice', 'gladness', 'gozo', 'alegría', 'regocijo', 'alegria', 'gozo', 'regozijo'],
    bookId: 'php',
    chapter: 4,
    verse: 4,
    endVerse: 4,
    copy: copy(
      {
        punch: 'Joy in the Lord is a command, not a lucky mood.',
        context:
          'Paul says “rejoice in the Lord alway,” and then he says it again. He is not describing a comfortable church. He is a prisoner telling free people where joy lives. It lives in the Lord, so it can be told twice without waiting for better news.',
        application:
          'We hunt joy in outcomes. When they slip, we think joy was fake. Paul ties it to a Person who does not slip. Rejoicing is a decision to name what is true about Christ, out loud, on an ordinary day and on a hard one.',
        challenge: 'Class, when did you last rejoice in the Lord, and not only in a good result?',
        charge: 'Before you leave, name one thing that is true of Christ and thank him for it. Then do it again tomorrow.',
        questions: [
          'What has been stealing your joy because it is not the Lord?',
          'How can this class rejoice together without pretending life is easy?',
        ],
      },
      {
        punch: 'El gozo en el Señor es un mandamiento, no un ánimo de suerte.',
        context:
          'Pablo dice “regocijaos en el Señor siempre”, y luego lo repite. No describe una iglesia cómoda. Es un preso diciéndoles a personas libres dónde vive el gozo. Vive en el Señor, así que se puede decir dos veces sin esperar mejores noticias.',
        application:
          'Buscamos el gozo en los resultados. Cuando se escapan, pensamos que el gozo era falso. Pablo lo ata a una Persona que no se escapa. Regocijarse es decidir nombrar lo que es verdad acerca de Cristo, en voz alta, en un día común y en uno duro.',
        challenge: 'Hermanos, ¿cuándo fue la última vez que se regocijaron en el Señor, y no solo en un buen resultado?',
        charge: 'Antes de irse, nombren una cosa que es verdad de Cristo y denle gracias. Luego háganlo otra vez mañana.',
        questions: [
          '¿Qué te ha estado robando el gozo porque no es el Señor?',
          '¿Cómo puede esta clase regocijarse junta sin fingir que la vida es fácil?',
        ],
      },
      {
        punch: 'A alegria no Senhor é um mandamento, não um humor de sorte.',
        context:
          'Paulo diz “regozijai-vos sempre no Senhor”, e depois repete. Ele não descreve uma igreja confortável. É um preso dizendo a pessoas livres onde a alegria mora. Mora no Senhor, então pode ser dita duas vezes sem esperar notícia melhor.',
        application:
          'Caçamos alegria nos resultados. Quando escapam, pensamos que a alegria era falsa. Paulo a ata a uma Pessoa que não escapa. Regozijar-se é decidir nomear o que é verdade acerca de Cristo, em voz alta, num dia comum e num dia duro.',
        challenge: 'Irmãos, quando foi a última vez que vocês se regozijaram no Senhor, e não só num bom resultado?',
        charge: 'Antes de sair, nomeiem uma coisa que é verdade acerca de Cristo e agradeçam. Depois façam de novo amanhã.',
        questions: [
          'O que tem roubado a sua alegria porque não é o Senhor?',
          'Como esta classe pode se regozijar junta sem fingir que a vida é fácil?',
        ],
      },
    ),
  },
  {
    id: 'suffering',
    keywords: ['suffering', 'suffer', 'pain', 'trial', 'hardship', 'affliction', 'sufrimiento', 'dolor', 'prueba', 'afliccion', 'sofrimento', 'dor', 'prova', 'aflicao'],
    bookId: 'rom',
    chapter: 8,
    verse: 28,
    endVerse: 28,
    copy: copy(
      {
        punch: 'God works all things for good. He does not call all things good.',
        context:
          'Romans 8 has already said the sufferings of this present time are real, and that creation groans. Verse 28 is not a shrug. It is a promise to those who love God and are called according to his purpose. He is at work in the things he did not call good.',
        application:
          'We either deny the pain or we deny the promise. Both are unbelief. The good God is working is conformity to his Son, not a guarantee that the story feels resolved by Friday. Love for God is the posture of the people this verse is talking to.',
        challenge: 'Class, what pain are you using as evidence that God has walked off?',
        charge: 'Tell the truth about the pain. Then tell the truth about the God who is still working. Do not make the class choose one.',
        questions: [
          'Where have you quoted this verse to end a conversation instead of to comfort?',
          'What would it mean to love God in the middle of this particular hardship?',
        ],
      },
      {
        punch: 'Dios dispone todas las cosas para bien. No llama buenas a todas las cosas.',
        context:
          'Romanos 8 ya dijo que los sufrimientos de este tiempo son reales, y que la creación gime. El versículo 28 no es un encogimiento de hombros. Es una promesa para los que aman a Dios y son llamados conforme a su propósito. Él obra en las cosas que no llamó buenas.',
        application:
          'O negamos el dolor o negamos la promesa. Las dos son incredulidad. El bien que Dios obra es conformarnos a su Hijo, no una garantía de que la historia se sienta resuelta para el viernes. Amar a Dios es la postura de las personas de las que habla este versículo.',
        challenge: 'Hermanos, ¿qué dolor están usando como prueba de que Dios se fue?',
        charge: 'Digan la verdad del dolor. Luego digan la verdad del Dios que sigue obrando. No obliguen a la clase a escoger una sola.',
        questions: [
          '¿Dónde has citado este versículo para cerrar una conversación en vez de consolar?',
          '¿Qué significaría amar a Dios en medio de esta aflicción concreta?',
        ],
      },
      {
        punch: 'Deus faz todas as coisas cooperarem para o bem. Ele não chama todas as coisas de boas.',
        context:
          'Romanos 8 já disse que os sofrimentos deste tempo são reais, e que a criação geme. O versículo 28 não é um dar de ombros. É uma promessa para os que amam a Deus e são chamados segundo o seu propósito. Ele opera nas coisas que não chamou boas.',
        application:
          'Ou negamos a dor ou negamos a promessa. As duas são incredulidade. O bem que Deus opera é conformar-nos ao seu Filho, não uma garantia de que a história pareça resolvida até sexta. Amar a Deus é a postura das pessoas de quem este versículo fala.',
        challenge: 'Irmãos, que dor vocês estão usando como prova de que Deus foi embora?',
        charge: 'Digam a verdade da dor. Depois digam a verdade do Deus que continua operando. Não obriguem a classe a escolher só uma.',
        questions: [
          'Onde você citou este versículo para encerrar uma conversa em vez de consolar?',
          'O que seria amar a Deus no meio desta aflição concreta?',
        ],
      },
    ),
  },
  {
    id: 'temptation',
    keywords: ['temptation', 'tempt', 'sin', 'lust', 'tentacion', 'tentar', 'pecado', 'tentacao', 'tentar', 'pecado'],
    bookId: '1co',
    chapter: 10,
    verse: 13,
    endVerse: 13,
    copy: copy(
      {
        punch: 'The way out is as real as the temptation.',
        context:
          'Paul warns Corinth with Israel in the wilderness. They desired evil, and they fell. Then he says the temptation they face is common to man. God is faithful. He will not suffer you to be tempted above what you are able, and he makes a way to escape.',
        application:
          'We talk as if our case is unique and therefore hopeless, or as if a private sin is small because nobody saw it. This verse closes both doors. You are not the exception, and you are not abandoned. The escape is there. Taking it is obedience, not heroism.',
        challenge: 'Class, what temptation have you decided you have to live with?',
        charge: 'Name the way of escape God has already put in front of you: a person, a closed door, a verse, a confession. Take it this week.',
        questions: [
          'Where are you calling a common temptation a special excuse?',
          'What is the way of escape you have been walking past?',
        ],
      },
      {
        punch: 'La salida es tan real como la tentación.',
        context:
          'Pablo advierte a Corinto con Israel en el desierto. Desearon lo malo, y cayeron. Luego dice que la tentación que enfrentan es común al hombre. Dios es fiel. No dejará que sean tentados más de lo que pueden resistir, y da la salida.',
        application:
          'Hablamos como si nuestro caso fuera único y por eso sin esperanza, o como si un pecado privado fuera pequeño porque nadie lo vio. Este versículo cierra las dos puertas. No eres la excepción, y no estás abandonado. La salida está. Tomarla es obediencia, no heroísmo.',
        challenge: 'Hermanos, ¿qué tentación han decidido que tienen que soportar para siempre?',
        charge: 'Nombren la salida que Dios ya puso delante: una persona, una puerta cerrada, un versículo, una confesión. Tómenla esta semana.',
        questions: [
          '¿Dónde estás llamando excusa especial a una tentación común?',
          '¿Cuál es la salida que has estado pasando de largo?',
        ],
      },
      {
        punch: 'A saída é tão real quanto a tentação.',
        context:
          'Paulo avisa Corinto com Israel no deserto. Desejaram o mal, e caíram. Depois diz que a tentação que enfrentam é comum ao homem. Deus é fiel. Não deixará que sejam tentados acima do que podem resistir, e dá o escape.',
        application:
          'Falamos como se o nosso caso fosse único e por isso sem esperança, ou como se um pecado privado fosse pequeno porque ninguém viu. Este versículo fecha as duas portas. Você não é a exceção, e não está abandonado. A saída está. Tomá-la é obediência, não heroísmo.',
        challenge: 'Irmãos, que tentação vocês decidiram que têm de aguentar para sempre?',
        charge: 'Nomeiem a saída que Deus já pôs na frente: uma pessoa, uma porta fechada, um versículo, uma confissão. Tomem-na nesta semana.',
        questions: [
          'Onde você chama de desculpa especial uma tentação comum?',
          'Qual é a saída que você tem passado reto?',
        ],
      },
    ),
  },
  {
    id: 'work',
    keywords: ['work', 'job', 'labor', 'workplace', 'boss', 'trabajo', 'empleo', 'labor', 'jefe', 'trabalho', 'emprego', 'chefe'],
    bookId: 'col',
    chapter: 3,
    verse: 23,
    endVerse: 23,
    copy: copy(
      {
        punch: 'The real Supervisor is not the one who signs the check.',
        context:
          'Paul speaks to servants in Colossae, people with little honor in the room. He tells them to work heartily, as to the Lord and not to men. The daily task is not beneath worship. It is one of the places worship goes.',
        application:
          'We split life into sacred hours and wasted hours. This verse will not allow it. Eye-service works when the boss is watching. Heart-service works because Christ is worthy. A believer can sweep, teach, build, or manage as an offering.',
        challenge: 'Class, whose approval are you actually working for this week?',
        charge: 'Do the next task as unto the Lord. Let the hidden part of the job be as honest as the part people praise.',
        questions: [
          'Where has your work become eye-service?',
          'What would change tomorrow if you believed you were serving Christ in that job?',
        ],
      },
      {
        punch: 'El verdadero Supervisor no es el que firma el cheque.',
        context:
          'Pablo habla a siervos en Colosas, gente con poca honra en el cuarto. Les dice que trabajen de corazón, como para el Señor y no para los hombres. La tarea diaria no está debajo de la adoración. Es uno de los lugares adonde va la adoración.',
        application:
          'Partimos la vida en horas sagradas y horas perdidas. Este versículo no lo permite. El servicio de la vista trabaja cuando el jefe mira. El servicio del corazón trabaja porque Cristo es digno. Un creyente puede barrer, enseñar, construir o administrar como ofrenda.',
        challenge: 'Hermanos, ¿la aprobación de quién están buscando de veras esta semana?',
        charge: 'Hagan la siguiente tarea como para el Señor. Que la parte escondida del trabajo sea tan honesta como la que la gente alaba.',
        questions: [
          '¿Dónde tu trabajo se volvió servicio para ser visto?',
          '¿Qué cambiaría mañana si creyeras que sirves a Cristo en ese empleo?',
        ],
      },
      {
        punch: 'O verdadeiro Supervisor não é quem assina o cheque.',
        context:
          'Paulo fala a servos em Colossos, gente com pouca honra na sala. Manda que trabalhem de coração, como para o Senhor e não para homens. A tarefa diária não está abaixo da adoração. É um dos lugares para onde a adoração vai.',
        application:
          'Dividimos a vida em horas sagradas e horas perdidas. Este versículo não permite. O serviço de aparência trabalha quando o chefe olha. O serviço de coração trabalha porque Cristo é digno. Um crente pode varrer, ensinar, construir ou administrar como oferta.',
        challenge: 'Irmãos, a aprovação de quem vocês estão buscando de fato nesta semana?',
        charge: 'Façam a próxima tarefa como para o Senhor. Que a parte escondida do trabalho seja tão honesta quanto a que as pessoas elogiam.',
        questions: [
          'Onde o seu trabalho virou serviço para ser visto?',
          'O que mudaria amanhã se você cresse que serve a Cristo nesse emprego?',
        ],
      },
    ),
  },
  {
    id: 'family',
    keywords: ['family', 'home', 'household', 'children', 'parent', 'marriage', 'husband', 'wife', 'familia', 'hogar', 'hijos', 'padres', 'matrimonio', 'esposo', 'esposa', 'familia', 'lar', 'filhos', 'pais', 'casamento', 'marido', 'esposa'],
    bookId: 'jos',
    chapter: 24,
    verse: 15,
    endVerse: 15,
    copy: copy(
      {
        punch: 'A household follows the god the leader actually serves.',
        context:
          'Joshua is old. Israel is in the land, and the idols of the nations are still attractive. He draws the line in public: choose you this day whom ye will serve. Then he binds his own house to the choice. As for me and my house, we will serve the Lord.',
        application:
          'A family does not drift into worship. It drifts into whatever is easy. Joshua’s sentence is a decision, said out loud, that covers more than his private quiet time. Parents, husbands, wives, and grown children all live downstream of the god they choose when nobody is taking attendance.',
        challenge: 'Class, if someone watched your house this week, which god would they say you serve?',
        charge: 'Make the choice in words today. Then make it in one habit the whole house can see.',
        questions: [
          'What rival god has been getting the best of your home?',
          'What would “as for me and my house” need to change this month?',
        ],
      },
      {
        punch: 'Una casa sigue al dios que el que guía de veras sirve.',
        context:
          'Josué es viejo. Israel está en la tierra, y los ídolos de las naciones siguen siendo atractivos. Él traza la línea en público: escogeos hoy a quién sirváis. Luego ata su propia casa a la decisión. Yo y mi casa serviremos al Señor.',
        application:
          'Una familia no deriva hacia la adoración. Deriva hacia lo que es fácil. La frase de Josué es una decisión, dicha en voz alta, que cubre más que su tiempo a solas. Padres, esposos, esposas e hijos grandes viven río abajo del dios que eligen cuando nadie pasa lista.',
        challenge: 'Hermanos, si alguien mirara su casa esta semana, ¿a qué dios diría que sirven?',
        charge: 'Hagan la elección con palabras hoy. Luego háganla en un hábito que toda la casa pueda ver.',
        questions: [
          '¿Qué dios rival se ha estado llevando lo mejor de tu hogar?',
          '¿Qué tendría que cambiar este mes el “yo y mi casa”?',
        ],
      },
      {
        punch: 'Uma casa segue o deus que quem guia de fato serve.',
        context:
          'Josué está velho. Israel está na terra, e os ídolos das nações ainda atraem. Ele traça a linha em público: escolhei hoje a quem servireis. Depois ata a própria casa à decisão. Eu e a minha casa serviremos ao Senhor.',
        application:
          'Uma família não deriva para a adoração. Deriva para o que é fácil. A frase de Josué é uma decisão, dita em voz alta, que cobre mais que o seu tempo a sós. Pais, maridos, esposas e filhos grandes vivem rio abaixo do deus que escolhem quando ninguém faz a chamada.',
        challenge: 'Irmãos, se alguém olhasse a casa de vocês nesta semana, a que deus diria que vocês servem?',
        charge: 'Façam a escolha em palavras hoje. Depois façam-na num hábito que a casa inteira possa ver.',
        questions: [
          'Que deus rival tem levado o melhor do seu lar?',
          'O que “eu e a minha casa” precisaria mudar neste mês?',
        ],
      },
    ),
  },
  {
    id: 'generosity',
    keywords: ['money', 'giving', 'generosity', 'generous', 'tithe', 'steward', 'dinero', 'ofrenda', 'generosidad', 'diezmo', 'dinheiro', 'oferta', 'generosidade', 'dizimo'],
    bookId: '2co',
    chapter: 9,
    verse: 7,
    endVerse: 7,
    copy: copy(
      {
        punch: 'God loves a giver whose heart has already decided.',
        context:
          'Paul is gathering a gift for poor believers. He does not want Corinth to give from pressure or from a grudge. Each one is to give as he has purposed in his heart. God loves a cheerful giver. The money is worship before it is math.',
        application:
          'We clutch and call it wisdom, or we give to be seen and call it faith. Cheerful giving is neither. It is a heart that trusts the God who supplies, and a hand that opens because it wants to. A grudging gift can still feed someone. It does not yet look like love.',
        challenge: 'Class, is your hand tight because you do not trust the Supplier?',
        charge: 'Purpose a gift before the plate or the need surprises you. Give it cheerfully, as to the Lord.',
        questions: [
          'Where does fear of not having enough decide what you give?',
          'What would cheerful giving look like in your actual budget this month?',
        ],
      },
      {
        punch: 'Dios ama al dador que ya decidió en el corazón.',
        context:
          'Pablo junta una ofrenda para creyentes pobres. No quiere que Corinto dé por presión ni de mala gana. Cada uno dé como propuso en su corazón. Dios ama al dador alegre. El dinero es adoración antes de ser cuenta.',
        application:
          'Apretamos y lo llamamos prudencia, o damos para que nos vean y lo llamamos fe. Dar con alegría no es ninguna de las dos. Es un corazón que confía en el Dios que provee, y una mano que se abre porque quiere. Una ofrenda de mala gana todavía puede alimentar a alguien. Todavía no parece amor.',
        challenge: 'Hermanos, ¿la mano está cerrada porque no confían en el que provee?',
        charge: 'Propongan una ofrenda antes de que el plato o la necesidad los sorprenda. Denla con alegría, como al Señor.',
        questions: [
          '¿Dónde el miedo de no tener suficiente decide lo que das?',
          '¿Cómo se vería dar con alegría en tu presupuesto real de este mes?',
        ],
      },
      {
        punch: 'Deus ama quem dá com o coração já decidido.',
        context:
          'Paulo junta uma oferta para crentes pobres. Ele não quer que Corinto dê por pressão nem de má vontade. Cada um dê como propôs no coração. Deus ama ao que dá com alegria. O dinheiro é adoração antes de ser conta.',
        application:
          'Apertamos e chamamos de prudência, ou damos para ser vistos e chamamos de fé. Dar com alegria não é nenhuma das duas. É um coração que confia no Deus que supre, e uma mão que abre porque quer. Uma oferta de má vontade ainda pode alimentar alguém. Ainda não parece amor.',
        challenge: 'Irmãos, a mão está fechada porque vocês não confiam em quem supre?',
        charge: 'Proponham uma oferta antes que o prato ou a necessidade surpreenda. Dêem com alegria, como ao Senhor.',
        questions: [
          'Onde o medo de não ter o suficiente decide o que você dá?',
          'Como seria dar com alegria no seu orçamento real deste mês?',
        ],
      },
    ),
  },
  {
    id: 'anger',
    keywords: ['anger', 'angry', 'wrath', 'temper', 'ira', 'enojo', 'enojo', 'ira', 'raiva', 'ira'],
    bookId: 'jas',
    chapter: 1,
    verse: 19,
    endVerse: 20,
    copy: copy(
      {
        punch: 'The anger of man does not work the righteousness of God.',
        context:
          'James tells the brothers to be swift to hear, slow to speak, slow to wrath. He does not say feelings are fake. He says man’s anger does not produce God’s righteousness. A hot word can feel like zeal and still be the flesh.',
        application:
          'We baptize irritation and call it standing for truth. Sometimes truth does need a clear no. This verse asks whether the heat is serving God or serving us. A slow tongue is not weakness. It is room for the Word to be heard before we defend ourselves.',
        challenge: 'Class, whose face tightens your voice before you have heard them?',
        charge: 'Be swift to hear this week. If wrath rises, stop the sentence. God’s righteousness does not need your temper to finish his work.',
        questions: [
          'Where has your anger been pretending to be righteousness?',
          'Who needs you to be slow to speak the next time you meet?',
        ],
      },
      {
        punch: 'La ira del hombre no obra la justicia de Dios.',
        context:
          'Santiago dice a los hermanos que sean prontos para oír, tardos para hablar, tardos para airarse. No dice que los sentimientos sean falsos. Dice que la ira del hombre no produce la justicia de Dios. Una palabra caliente puede sentirse como celo y seguir siendo carne.',
        application:
          'Bautizamos la irritación y la llamamos defender la verdad. A veces la verdad sí necesita un no claro. Este versículo pregunta si el calor sirve a Dios o nos sirve a nosotros. Una lengua lenta no es debilidad. Es espacio para que la Palabra se oiga antes de que nos defendamos.',
        challenge: 'Hermanos, ¿el rostro de quién les aprieta la voz antes de haberlo oído?',
        charge: 'Sean prontos para oír esta semana. Si la ira sube, detengan la frase. La justicia de Dios no necesita su genio para acabar la obra.',
        questions: [
          '¿Dónde tu ira ha estado fingiendo ser justicia?',
          '¿Quién necesita que seas tardo para hablar la próxima vez que se encuentren?',
        ],
      },
      {
        punch: 'A ira do homem não opera a justiça de Deus.',
        context:
          'Tiago diz aos irmãos que sejam prontos para ouvir, tardios para falar, tardios para se irar. Ele não diz que os sentimentos são falsos. Diz que a ira do homem não produz a justiça de Deus. Uma palavra quente pode parecer zelo e ainda ser carne.',
        application:
          'Batizamos a irritação e chamamos de defender a verdade. Às vezes a verdade precisa mesmo de um não claro. Este versículo pergunta se o calor serve a Deus ou serve a nós. Uma língua lenta não é fraqueza. É espaço para a Palavra ser ouvida antes de nos defendermos.',
        challenge: 'Irmãos, o rosto de quem aperta a voz de vocês antes de vocês o ouvirem?',
        charge: 'Sejam prontos para ouvir nesta semana. Se a ira subir, parem a frase. A justiça de Deus não precisa do seu gênio para acabar a obra.',
        questions: [
          'Onde a sua ira tem fingido ser justiça?',
          'Quem precisa que você seja tardio para falar na próxima vez que se encontrarem?',
        ],
      },
    ),
  },
  {
    id: 'obedience',
    keywords: ['obey', 'obedience', 'commandment', 'commands', 'obedecer', 'obediencia', 'mandamiento', 'obediencia', 'mandamento'],
    bookId: 'jhn',
    chapter: 14,
    verse: 15,
    endVerse: 15,
    copy: copy(
      {
        punch: 'Love for Jesus shows up as obedience.',
        context:
          'Jesus is preparing the disciples for his leaving. He does not separate affection from commands. If ye love me, keep my commandments. Love here is not a song we feel. It is a life that does what he said.',
        application:
          'We say we love him and then negotiate the verses that cost us. He already told us what love looks like. Keeping his commandments is not a way to earn him. It is the evidence that we are his. A selective obedience is a selective love.',
        challenge: 'Class, which commandment are you admiring instead of keeping?',
        charge: 'Name it. Do it this week. Let love be visible where it has only been a sentence.',
        questions: [
          'What command of Jesus have you explained away?',
          'How would this class know that you love him if they watched your week?',
        ],
      },
      {
        punch: 'El amor a Jesús se ve en la obediencia.',
        context:
          'Jesús prepara a los discípulos para su partida. No separa el afecto de los mandamientos. Si me amáis, guardad mis mandamientos. El amor aquí no es una canción que sentimos. Es una vida que hace lo que él dijo.',
        application:
          'Decimos que lo amamos y luego negociamos los versículos que nos cuestan. Él ya nos dijo cómo se ve el amor. Guardar sus mandamientos no es una forma de ganarlo. Es la evidencia de que somos suyos. Una obediencia selectiva es un amor selectivo.',
        challenge: 'Hermanos, ¿qué mandamiento están admirando en vez de guardarlo?',
        charge: 'Nómbrenlo. Háganlo esta semana. Que el amor se vea donde solo ha sido una frase.',
        questions: [
          '¿Qué mandamiento de Jesús has explicado para no hacerlo?',
          '¿Cómo sabría esta clase que lo amas si mirara tu semana?',
        ],
      },
      {
        punch: 'O amor a Jesus aparece na obediência.',
        context:
          'Jesus prepara os discípulos para a sua partida. Ele não separa o afeto dos mandamentos. Se me amais, guardai os meus mandamentos. O amor aqui não é uma canção que sentimos. É uma vida que faz o que ele disse.',
        application:
          'Dizemos que o amamos e depois negociamos os versículos que nos custam. Ele já nos disse como o amor aparece. Guardar os seus mandamentos não é um modo de ganhá-lo. É a evidência de que somos dele. Uma obediência seletiva é um amor seletivo.',
        challenge: 'Irmãos, que mandamento vocês estão admirando em vez de guardar?',
        charge: 'Nomeiem. Façam nesta semana. Que o amor se veja onde só tem sido uma frase.',
        questions: [
          'Que mandamento de Jesus você explicou para não cumprir?',
          'Como esta classe saberia que você o ama se olhasse a sua semana?',
        ],
      },
    ),
  },
  {
    id: 'word',
    keywords: ['bible', 'scripture', 'word of god', 'the word', 'biblia', 'escritura', 'palabra', 'biblia', 'escritura', 'palavra'],
    bookId: 'psa',
    chapter: 119,
    verse: 105,
    endVerse: 105,
    copy: copy(
      {
        punch: 'The Word is a lamp, not a souvenir.',
        context:
          'Psalm 119 is a long love for the law of the Lord. Verse 105 is simple enough for a child and strong enough for a dark road. Thy word is a lamp unto my feet, and a light unto my path. It shows the next step, not a floodlight for the whole decade.',
        application:
          'We honor the Bible and then walk by instinct. A closed book cannot light a path. The psalm assumes a person who keeps the word near enough to walk by. Light is for obedience. It is not for winning an argument and then living unchanged.',
        challenge: 'Class, when did you last let a verse decide your next step?',
        charge: 'Open it today. Take the step it shows. Do not ask the lamp to shine and then walk in the ditch.',
        questions: [
          'Where are you walking by your own light?',
          'What verse is already clear, and still unobeyed?',
        ],
      },
      {
        punch: 'La Palabra es lámpara, no un recuerdo.',
        context:
          'El Salmo 119 es un amor largo a la ley del Señor. El versículo 105 es bastante simple para un niño y bastante fuerte para un camino oscuro. Lámpara es a mis pies tu palabra, y lumbrera a mi camino. Muestra el siguiente paso, no un reflector para toda la década.',
        application:
          'Honramos la Biblia y luego caminamos por instinto. Un libro cerrado no puede alumbrar un camino. El salmo supone una persona que tiene la palabra bastante cerca para caminar por ella. La luz es para obedecer. No es para ganar una discusión y seguir igual.',
        challenge: 'Hermanos, ¿cuándo fue la última vez que un versículo decidió su siguiente paso?',
        charge: 'Ábranla hoy. Den el paso que muestra. No le pidan a la lámpara que alumbre y luego caminen por la zanja.',
        questions: [
          '¿Dónde estás caminando con tu propia luz?',
          '¿Qué versículo ya está claro, y sigue sin obedecerse?',
        ],
      },
      {
        punch: 'A Palavra é lâmpada, não uma lembrança.',
        context:
          'O Salmo 119 é um amor longo à lei do Senhor. O versículo 105 é simples o bastante para uma criança e forte o bastante para um caminho escuro. Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho. Mostra o próximo passo, não um holofote para a década inteira.',
        application:
          'Honramos a Bíblia e depois andamos por instinto. Um livro fechado não alumia caminho. O salmo supõe uma pessoa que mantém a palavra perto o bastante para andar por ela. A luz é para a obediência. Não é para ganhar uma discussão e seguir igual.',
        challenge: 'Irmãos, quando foi a última vez que um versículo decidiu o próximo passo de vocês?',
        charge: 'Abram hoje. Deem o passo que ela mostra. Não peçam à lâmpada que alumie e depois andem na vala.',
        questions: [
          'Onde você está andando com a sua própria luz?',
          'Que versículo já está claro, e continua sem obediência?',
        ],
      },
    ),
  },
  {
    id: 'service',
    keywords: ['serve', 'service', 'servant', 'ministry', 'servir', 'servicio', 'siervo', 'ministerio', 'servir', 'servico', 'servo', 'ministerio'],
    bookId: 'mrk',
    chapter: 10,
    verse: 45,
    endVerse: 45,
    copy: copy(
      {
        punch: 'The Son of Man came to serve, and to give his life.',
        context:
          'James and John want seats of glory. Jesus tells the twelve that greatness among them will not look like the rulers of the Gentiles. Whoever will be great must be a servant. Then he points to himself: the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.',
        application:
          'We want the name of ministry and the feel of being needed. Jesus defines service by a ransom, not by a platform. The church is healthiest when her people take the lower place on purpose, because that is the shape of their Lord.',
        challenge: 'Class, are you asking to be served by this church, or have you come to serve?',
        charge: 'Find one unimpressive task this week and do it as he did, without announcing it.',
        questions: [
          'Where do you still want the seat more than the towel?',
          'Who would be helped if you took the lower place on purpose?',
        ],
      },
      {
        punch: 'El Hijo del Hombre vino a servir, y a dar su vida.',
        context:
          'Jacobo y Juan quieren asientos de gloria. Jesús dice a los doce que la grandeza entre ellos no se parecerá a los príncipes de los gentiles. El que quiera ser grande será servidor. Luego se señala: el Hijo del hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos.',
        application:
          'Queremos el nombre del ministerio y la sensación de que nos necesitan. Jesús define el servicio por un rescate, no por una plataforma. La iglesia está más sana cuando su gente toma el lugar bajo a propósito, porque esa es la forma de su Señor.',
        challenge: 'Hermanos, ¿están pidiendo que esta iglesia los sirva, o vinieron a servir?',
        charge: 'Hallen una tarea sin brillo esta semana y háganla como él, sin anunciarla.',
        questions: [
          '¿Dónde todavía quieres el asiento más que la toalla?',
          '¿A quién ayudarías si tomaras el lugar bajo a propósito?',
        ],
      },
      {
        punch: 'O Filho do Homem veio para servir, e para dar a sua vida.',
        context:
          'Tiago e João querem assentos de glória. Jesus diz aos doze que a grandeza entre eles não vai parecer a dos príncipes dos gentios. Quem quiser ser grande será servo. Depois aponta para si: o Filho do homem não veio para ser servido, mas para servir, e para dar a sua vida em resgate de muitos.',
        application:
          'Queremos o nome do ministério e a sensação de ser necessários. Jesus define o serviço por um resgate, não por um palco. A igreja está mais sã quando o seu povo toma o lugar baixo de propósito, porque essa é a forma do seu Senhor.',
        challenge: 'Irmãos, vocês estão pedindo que esta igreja os sirva, ou vieram para servir?',
        charge: 'Achem uma tarefa sem brilho nesta semana e façam-na como ele, sem anunciá-la.',
        questions: [
          'Onde você ainda quer o assento mais que a toalha?',
          'Quem seria ajudado se você tomasse o lugar baixo de propósito?',
        ],
      },
    ),
  },
  {
    id: 'identity',
    keywords: ['identity', 'new creation', 'who i am', 'in christ', 'identidad', 'nueva criatura', 'en cristo', 'identidade', 'nova criatura', 'em cristo'],
    bookId: '2co',
    chapter: 5,
    verse: 17,
    endVerse: 17,
    copy: copy(
      {
        punch: 'In Christ, the old verdict is not the last word.',
        context:
          'Paul is explaining why believers no longer live unto themselves. If any man be in Christ, he is a new creature. Old things are passed away. The newness is not a personality upgrade. It is a new standing, because Christ died and rose, and the person is in him.',
        application:
          'We introduce ourselves by the old failure and then wonder why we live there. This verse does not deny the past. It refuses to let the past be your name. A new creature still repents, still grows, and still tells the truth. He does not negotiate with the old identity as if Christ had not made him new.',
        challenge: 'Class, what old name are you still answering to?',
        charge: 'Say who you are in Christ, from this verse, before you rehearse who you were. Then live the week as that person.',
        questions: [
          'Which old thing are you treating as if it had not passed?',
          'How should a new creature handle the sin that still knocks?',
        ],
      },
      {
        punch: 'En Cristo, el veredicto viejo no es la última palabra.',
        context:
          'Pablo explica por qué los creyentes ya no viven para sí. Si alguno está en Cristo, nueva criatura es. Las cosas viejas pasaron. La novedad no es una mejora de personalidad. Es una nueva posición, porque Cristo murió y resucitó, y la persona está en él.',
        application:
          'Nos presentamos por el fracaso viejo y luego nos extraña vivir allí. Este versículo no niega el pasado. Rehúsa dejar que el pasado sea tu nombre. Una nueva criatura todavía se arrepiente, todavía crece, y todavía dice la verdad. No negocia con la identidad vieja como si Cristo no la hubiera hecho nueva.',
        challenge: 'Hermanos, ¿a qué nombre viejo siguen respondiendo?',
        charge: 'Digan quiénes son en Cristo, desde este versículo, antes de repasar quiénes fueron. Luego vivan la semana como esa persona.',
        questions: [
          '¿Qué cosa vieja estás tratando como si no hubiera pasado?',
          '¿Cómo debe manejar una nueva criatura el pecado que todavía llama?',
        ],
      },
      {
        punch: 'Em Cristo, o veredito velho não é a última palavra.',
        context:
          'Paulo explica por que os crentes já não vivem para si. Se alguém está em Cristo, nova criatura é. As coisas velhas já passaram. A novidade não é um upgrade de personalidade. É uma nova posição, porque Cristo morreu e ressuscitou, e a pessoa está nele.',
        application:
          'Nós nos apresentamos pelo fracasso velho e depois estranhamos viver ali. Este versículo não nega o passado. Recusa deixar que o passado seja o seu nome. Uma nova criatura ainda se arrepende, ainda cresce, e ainda diz a verdade. Não negocia com a identidade velha como se Cristo não a tivesse feito nova.',
        challenge: 'Irmãos, a que nome velho vocês ainda atendem?',
        charge: 'Digam quem vocês são em Cristo, a partir deste versículo, antes de repassar quem foram. Depois vivam a semana como essa pessoa.',
        questions: [
          'Que coisa velha você trata como se não tivesse passado?',
          'Como uma nova criatura deve lidar com o pecado que ainda bate?',
        ],
      },
    ),
  },
  {
    id: 'grief',
    keywords: ['grief', 'grieve', 'mourning', 'loss', 'death', 'widow', 'luto', 'duelo', 'perdida', 'muerte', 'luto', 'perda', 'morte', 'tristeza'],
    bookId: 'psa',
    chapter: 34,
    verse: 18,
    endVerse: 18,
    copy: copy(
      {
        punch: 'The Lord is near the brokenhearted. He does not wait at a distance.',
        context:
          'David sings of deliverance and then of the crushed. The Lord is nigh unto them that are of a broken heart, and saveth such as be of a contrite spirit. Nearness is the promise. He does not tell the grieving to hurry up and look fine.',
        application:
          'Grief is not a failure of faith. Hiding it from God is. This verse gives the crushed a place to stand: close to him. The church should not rush a person past a grave. She should sit near, because her Lord already does.',
        challenge: 'Class, who is brokenhearted in this room, or in your house, that you have kept at arm’s length?',
        charge: 'If it is you, come near. He is already there. If it is someone else, go near them this week and do not fix them with a speech.',
        questions: [
          'What loss have you been carrying as if God were far?',
          'How can this class be near someone who is crushed, without pretending the pain is small?',
        ],
      },
      {
        punch: 'El Señor está cerca de los quebrantados. No espera a distancia.',
        context:
          'David canta la liberación y luego los quebrantados. Cercano está Jehová a los quebrantados de corazón, y salva a los contritos de espíritu. La cercanía es la promesa. No le dice al que llora que se apure y se vea bien.',
        application:
          'El luto no es una falta de fe. Esconderlo de Dios sí lo es. Este versículo le da al quebrantado un lugar donde pararse: cerca de él. La iglesia no debe empujar a una persona más allá de una tumba. Debe sentarse cerca, porque su Señor ya lo hace.',
        challenge: 'Hermanos, ¿quién está quebrantado en este cuarto, o en su casa, y lo han dejado a un brazo de distancia?',
        charge: 'Si eres tú, acércate. Él ya está allí. Si es otro, acércate esta semana y no lo arregles con un discurso.',
        questions: [
          '¿Qué pérdida has cargado como si Dios estuviera lejos?',
          '¿Cómo puede esta clase estar cerca de alguien quebrantado, sin fingir que el dolor es pequeño?',
        ],
      },
      {
        punch: 'O Senhor está perto dos quebrantados. Ele não espera de longe.',
        context:
          'Davi canta o livramento e depois os quebrantados. Perto está o Senhor dos que têm o coração quebrantado, e salva os contritos de espírito. A proximidade é a promessa. Ele não manda o enlutado se apressar e parecer bem.',
        application:
          'O luto não é falta de fé. Escondê-lo de Deus é. Este versículo dá ao quebrantado um lugar para ficar: perto dele. A igreja não deve empurrar uma pessoa para além do túmulo. Deve sentar-se perto, porque o seu Senhor já faz isso.',
        challenge: 'Irmãos, quem está quebrantado nesta sala, ou na sua casa, e vocês deixaram à distância de um braço?',
        charge: 'Se é você, chegue perto. Ele já está ali. Se é outra pessoa, chegue perto nesta semana e não a conserte com um discurso.',
        questions: [
          'Que perda você tem carregado como se Deus estivesse longe?',
          'Como esta classe pode estar perto de alguém quebrantado, sem fingir que a dor é pequena?',
        ],
      },
    ),
  },
  {
    id: 'unity',
    keywords: ['unity', 'united', 'division', 'gossip', 'unidad', 'division', 'chisme', 'unidade', 'divisao', 'fofoca'],
    bookId: 'eph',
    chapter: 4,
    verse: 3,
    endVerse: 3,
    copy: copy(
      {
        punch: 'Unity is something you keep, not something you feel into existence.',
        context:
          'Paul begs the Ephesians to walk worthy of their calling, with lowliness and longsuffering. Then he says to endeavor to keep the unity of the Spirit in the bond of peace. The Spirit has already made them one. Their work is not to invent unity. It is to guard it.',
        application:
          'Division often starts as a sentence we enjoy. Endeavor means effort: patience when a brother is slow, silence when a story is not yours to carry, and truth spoken to a face instead of about a back. Peace is a bond, not a mood that visits when everyone agrees.',
        challenge: 'Class, what sentence have you repeated that loosens the bond?',
        charge: 'Stop carrying it. If it must be said, say it to the person. Keep what the Spirit has already made.',
        questions: [
          'Where have you been a spectator of division instead of a keeper of peace?',
          'What would endeavor look like with the brother who irritates you?',
        ],
      },
      {
        punch: 'La unidad se guarda. No se siente hasta que aparezca.',
        context:
          'Pablo ruega a los efesios que anden como es digno de su vocación, con humildad y paciencia. Luego dice que procuren guardar la unidad del Espíritu en el vínculo de la paz. El Espíritu ya los hizo uno. Su trabajo no es inventar la unidad. Es guardarla.',
        application:
          'La división a menudo empieza como una frase que nos gusta. Procurar significa esfuerzo: paciencia cuando un hermano es lento, silencio cuando una historia no es nuestra para cargar, y la verdad dicha a la cara y no a la espalda. La paz es un vínculo, no un ánimo que visita cuando todos están de acuerdo.',
        challenge: 'Hermanos, ¿qué frase han repetido que afloja el vínculo?',
        charge: 'Dejen de cargarla. Si hay que decirla, díganla a la persona. Guarden lo que el Espíritu ya hizo.',
        questions: [
          '¿Dónde has sido espectador de la división en vez de guardar la paz?',
          '¿Cómo se vería procurar la unidad con el hermano que te irrita?',
        ],
      },
      {
        punch: 'A unidade se guarda. Não se espera sentir até ela aparecer.',
        context:
          'Paulo roga aos efésios que andem como é digno da vocação, com humildade e longanimidade. Depois diz que procurem guardar a unidade do Espírito no vínculo da paz. O Espírito já os fez um. O trabalho deles não é inventar a unidade. É guardá-la.',
        application:
          'A divisão muitas vezes começa como uma frase de que gostamos. Procurar significa esforço: paciência quando um irmão é lento, silêncio quando uma história não é nossa para carregar, e a verdade dita à face e não pelas costas. A paz é um vínculo, não um humor que visita quando todos concordam.',
        challenge: 'Irmãos, que frase vocês têm repetido que afrouxa o vínculo?',
        charge: 'Parem de carregá-la. Se precisa ser dita, digam à pessoa. Guardem o que o Espírito já fez.',
        questions: [
          'Onde você tem sido espectador da divisão em vez de guardar a paz?',
          'Como seria procurar a unidade com o irmão que irrita você?',
        ],
      },
    ),
  },
  {
    id: 'purpose',
    keywords: ['purpose', 'calling', 'vocation', 'why am i here', 'proposito', 'llamado', 'vocacion', 'proposito', 'chamado', 'vocacao'],
    bookId: 'eph',
    chapter: 2,
    verse: 10,
    endVerse: 10,
    copy: copy(
      {
        punch: 'You are not an accident with a busy calendar.',
        context:
          'Paul has just said salvation is by grace through faith, not of works. Then he says we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them. Purpose is not a feeling you discover. It is a path God already prepared.',
        application:
          'We hunt a spectacular calling and ignore the good work in front of us. Workmanship means God made you on purpose. The works are specific enough to walk in: faithfulness at home, truth at work, mercy in the church. Waiting for a vision can be a way of refusing the path already marked.',
        challenge: 'Class, what good work is already in your path that you are calling ordinary?',
        charge: 'Walk in it this week. You do not need a new identity. You need to take the step he prepared.',
        questions: [
          'Where are you bored with a work God already ordained?',
          'What would change if you believed you are his workmanship, not your own project?',
        ],
      },
      {
        punch: 'No eres un accidente con un calendario lleno.',
        context:
          'Pablo acaba de decir que la salvación es por gracia mediante la fe, no por obras. Luego dice que somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas. El propósito no es un sentimiento que descubres. Es un camino que Dios ya preparó.',
        application:
          'Buscamos un llamado espectacular e ignoramos la buena obra que está delante. Hechura significa que Dios te hizo a propósito. Las obras son bastante concretas para caminar en ellas: fidelidad en casa, verdad en el trabajo, misericordia en la iglesia. Esperar una visión puede ser una forma de rehusar el camino ya marcado.',
        challenge: 'Hermanos, ¿qué buena obra ya está en su camino y la están llamando ordinaria?',
        charge: 'Anden en ella esta semana. No necesitan una identidad nueva. Necesitan dar el paso que él preparó.',
        questions: [
          '¿Dónde estás aburrido de una obra que Dios ya preparó?',
          '¿Qué cambiaría si creyeras que eres hechura suya, no tu propio proyecto?',
        ],
      },
      {
        punch: 'Você não é um acidente com a agenda cheia.',
        context:
          'Paulo acabou de dizer que a salvação é pela graça, por meio da fé, não por obras. Depois diz que somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou antes para que andássemos nelas. O propósito não é um sentimento que você descobre. É um caminho que Deus já preparou.',
        application:
          'Caçamos um chamado espetacular e ignoramos a boa obra na frente. Feitura significa que Deus fez você de propósito. As obras são concretas o bastante para andar nelas: fidelidade em casa, verdade no trabalho, misericórdia na igreja. Esperar uma visão pode ser um modo de recusar o caminho já marcado.',
        challenge: 'Irmãos, que boa obra já está no caminho de vocês e vocês estão chamando de ordinária?',
        charge: 'Andem nela nesta semana. Vocês não precisam de uma identidade nova. Precisam dar o passo que ele preparou.',
        questions: [
          'Onde você está entediado de uma obra que Deus já preparou?',
          'O que mudaria se você cresse que é feitura dele, não o seu próprio projeto?',
        ],
      },
    ),
  },
  {
    id: 'rest',
    keywords: ['rest', 'weary', 'burden', 'tired', 'burnout', 'descanso', 'cansancio', 'carga', 'descanso', 'cansaco', 'fardo'],
    bookId: 'mat',
    chapter: 11,
    verse: 28,
    endVerse: 30,
    copy: copy(
      {
        punch: 'Rest is a person who says, Come unto me.',
        context:
          'Jesus has been rejected by cities that saw his works. Then he turns and calls the weary. Come unto me, all ye that labour and are heavy laden, and I will give you rest. His yoke is easy and his burden is light because he carries it with you. The invitation is not to quit faithfulness. It is to quit carrying life without him.',
        application:
          'Weariness often comes from yokes we built: the need to be impressive, the refusal to be helped, the fear of disappointing people. Christ does not add a second religion on top of that. He offers his yoke. Rest is found in coming, not in arranging a quieter week and still staying away.',
        challenge: 'Class, what load are you calling faithfulness that he never asked you to carry alone?',
        charge: 'Come. Put the extra yoke down. Take his. Do one thing this week from rest, not from panic.',
        questions: [
          'What are you weary of that you have not brought to him?',
          'Whose yoke are you wearing besides Christ’s?',
        ],
      },
      {
        punch: 'El descanso es una persona que dice: Venid a mí.',
        context:
          'Jesús ha sido rechazado por ciudades que vieron sus obras. Luego se vuelve y llama a los cansados. Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Su yugo es fácil y su carga ligera porque él la lleva con ustedes. La invitación no es dejar la fidelidad. Es dejar de cargar la vida sin él.',
        application:
          'El cansancio a menudo viene de yugos que nosotros armamos: la necesidad de impresionar, la negativa a ser ayudados, el miedo de decepcionar. Cristo no añade una segunda religión encima de eso. Ofrece su yugo. El descanso se halla viniendo, no arreglando una semana más quieta y siguiendo lejos.',
        challenge: 'Hermanos, ¿qué carga están llamando fidelidad que él nunca les pidió cargar solos?',
        charge: 'Vengan. Suelten el yugo de más. Tomen el suyo. Hagan una cosa esta semana desde el descanso, no desde el pánico.',
        questions: [
          '¿De qué estás cansado y todavía no se lo has traído?',
          '¿El yugo de quién llevas además del de Cristo?',
        ],
      },
      {
        punch: 'O descanso é uma pessoa que diz: Vinde a mim.',
        context:
          'Jesus foi rejeitado por cidades que viram as suas obras. Depois se volta e chama os cansados. Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei. O seu jugo é suave e o seu fardo é leve porque ele o leva com vocês. O convite não é largar a fidelidade. É largar de carregar a vida sem ele.',
        application:
          'O cansaço muitas vezes vem de jugos que nós montamos: a necessidade de impressionar, a recusa de ser ajudado, o medo de decepcionar. Cristo não acrescenta uma segunda religião em cima disso. Oferece o seu jugo. O descanso se acha vindo, não arrumando uma semana mais quieta e continuando longe.',
        challenge: 'Irmãos, que carga vocês estão chamando de fidelidade que ele nunca pediu que carregassem sozinhos?',
        charge: 'Venham. Larguem o jugo a mais. Tomem o dele. Façam uma coisa nesta semana a partir do descanso, não do pânico.',
        questions: [
          'De que você está cansado e ainda não trouxe a ele?',
          'O jugo de quem você está usando além do de Cristo?',
        ],
      },
    ),
  },
  {
    id: 'worship',
    keywords: ['worship', 'praise', 'adoration', 'adorar', 'alabanza', 'adoracion', 'adorar', 'louvor', 'adoracao'],
    bookId: 'jhn',
    chapter: 4,
    verse: 24,
    endVerse: 24,
    copy: copy(
      {
        punch: 'The Father is seeking worshipers, not spectators.',
        context:
          'Jesus speaks with a Samaritan woman at a well. She raises the old argument about the right mountain. He moves the question. The hour has come when true worshipers worship the Father in spirit and in truth. God is a Spirit. Place still matters for the gathered church, but the heart cannot hide behind a location.',
        application:
          'We can sing and stay far. Spirit and truth means the inner person is actually before God, and the words match who he is. Worship is not a mood we wait for on Sunday. It is the honest offering of people who know they need living water.',
        challenge: 'Class, are you worshiping, or are you attending?',
        charge: 'Come in truth this week. Name one false thing you have been singing past, and give the Father the honesty he is seeking.',
        questions: [
          'What part of your worship is only a place and a habit?',
          'What would spirit and truth change in the way you sing, pray, or sit in the room?',
        ],
      },
      {
        punch: 'El Padre busca adoradores, no espectadores.',
        context:
          'Jesús habla con una mujer samaritana junto al pozo. Ella levanta la vieja discusión de cuál es el monte correcto. Él mueve la pregunta. La hora ha llegado en que los verdaderos adoradores adorarán al Padre en espíritu y en verdad. Dios es Espíritu. El lugar sigue importando para la iglesia reunida, pero el corazón no puede esconderse detrás de un sitio.',
        application:
          'Podemos cantar y seguir lejos. Espíritu y verdad significa que la persona interior está de veras delante de Dios, y que las palabras coinciden con quién él es. La adoración no es un ánimo que esperamos el domingo. Es la ofrenda honesta de gente que sabe que necesita agua viva.',
        challenge: 'Hermanos, ¿están adorando, o están asistiendo?',
        charge: 'Vengan en verdad esta semana. Nombren una cosa falsa que han estado cantando de paso, y denle al Padre la honestidad que él busca.',
        questions: [
          '¿Qué parte de tu adoración es solo un lugar y una costumbre?',
          '¿Qué cambiarían el espíritu y la verdad en tu canto, tu oración o tu manera de sentarte en el cuarto?',
        ],
      },
      {
        punch: 'O Pai busca adoradores, não espectadores.',
        context:
          'Jesus fala com uma mulher samaritana junto ao poço. Ela levanta a velha discussão de qual é o monte certo. Ele move a pergunta. A hora chegou em que os verdadeiros adoradores adorarão o Pai em espírito e em verdade. Deus é Espírito. O lugar ainda importa para a igreja reunida, mas o coração não pode se esconder atrás de um sítio.',
        application:
          'Podemos cantar e continuar longe. Espírito e verdade significa que a pessoa interior está de fato diante de Deus, e que as palavras combinam com quem ele é. A adoração não é um humor que esperamos no domingo. É a oferta honesta de gente que sabe que precisa de água viva.',
        challenge: 'Irmãos, vocês estão adorando, ou estão assistindo?',
        charge: 'Venham em verdade nesta semana. Nomeiem uma coisa falsa que vocês têm cantado por cima, e deem ao Pai a honestidade que ele busca.',
        questions: [
          'Que parte da sua adoração é só um lugar e um costume?',
          'O que espírito e verdade mudariam no seu canto, na sua oração ou no modo de sentar na sala?',
        ],
      },
    ),
  },
]

const topicSlot = '{topic}'

export const FALLBACK: SermonOutline = {
  id: 'word-for-the-class',
  keywords: [],
  bookId: 'psa',
  chapter: 119,
  verse: 105,
  endVerse: 105,
  slots: true,
  copy: copy(
    {
      punch: 'Before the class decides, the Word should speak.',
      context:
        'Psalm 119 is one long love for what God has said. Verse 105 is plain: his word is a lamp for the feet and a light for the path. It does not flatter the traveler. It shows the next step so he does not invent a road in the dark.',
      application: `The class came to talk about ${topicSlot}. This verse is not a slogan for that subject. It tells us where to stand while we talk. Bring ${topicSlot} into the light of Scripture. Ask what God has already said, and refuse to let a feeling have the last word.`,
      challenge: `Class, where does ${topicSlot} press on you this week?`,
      charge:
        'Do not leave it in the hallway. Open the Word, and let God speak before the room decides what it already wanted to hear.',
      questions: [
        `What is one hard part of ${topicSlot} that you have been carrying alone?`,
        `Which verse, besides this one, has already spoken to you about ${topicSlot}?`,
      ],
    },
    {
      punch: 'Antes de que la clase decida, debe hablar la Palabra.',
      context:
        'El Salmo 119 es un amor largo a lo que Dios ha dicho. El versículo 105 es claro: su palabra es lámpara a los pies y lumbrera al camino. No adula al que camina. Muestra el siguiente paso para que no invente un camino en la oscuridad.',
      application: `La clase vino a hablar de ${topicSlot}. Este versículo no es un lema para ese tema. Nos dice dónde pararnos mientras hablamos. Traigan ${topicSlot} a la luz de la Escritura. Pregunten qué ha dicho ya Dios, y no dejen que un sentimiento tenga la última palabra.`,
      challenge: `Hermanos, ¿dónde les aprieta ${topicSlot} esta semana?`,
      charge:
        'No lo dejen en el pasillo. Abran la Palabra, y dejen que Dios hable antes de que el cuarto decida lo que ya quería oír.',
      questions: [
        `¿Qué parte difícil de ${topicSlot} has estado cargando solo?`,
        `¿Qué versículo, además de este, ya te ha hablado acerca de ${topicSlot}?`,
      ],
    },
    {
      punch: 'Antes de a classe decidir, a Palavra deve falar.',
      context:
        'O Salmo 119 é um amor longo ao que Deus disse. O versículo 105 é claro: a palavra dele é lâmpada para os pés e luz para o caminho. Ela não elogia o viajante. Mostra o próximo passo para que ele não invente uma estrada no escuro.',
      application: `A classe veio falar de ${topicSlot}. Este versículo não é um lema para esse assunto. Diz onde ficamos enquanto falamos. Tragam ${topicSlot} para a luz da Escritura. Perguntem o que Deus já disse, e não deixem um sentimento ter a última palavra.`,
      challenge: `Irmãos, onde ${topicSlot} aperta vocês nesta semana?`,
      charge:
        'Não deixem isso no corredor. Abram a Palavra, e deixem Deus falar antes de a sala decidir o que já queria ouvir.',
      questions: [
        `Qual parte difícil de ${topicSlot} você tem carregado sozinho?`,
        `Que versículo, além deste, já falou com você acerca de ${topicSlot}?`,
      ],
    },
  ),
}

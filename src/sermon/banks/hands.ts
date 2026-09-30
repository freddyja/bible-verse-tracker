import type { SermonLang, SermonLines, SermonOutline } from '../types'
import { HANDS_FULL } from './hands-full'

type ShortLines = Omit<SermonLines, 'full'>

function lines(
  id: string,
  en: ShortLines,
  es: ShortLines,
  pt: ShortLines,
): Record<SermonLang, SermonLines> {
  const pack = HANDS_FULL[id]
  if (!pack) throw new Error(`missing full lines for ${id}`)
  return {
    en: { ...en, full: pack.en },
    es: { ...es, full: pack.es },
    pt: { ...pt, full: pack.pt },
  }
}

export const HANDS: readonly SermonOutline[] = [
  {
    id: 'humility',
    keywords: [
      'humble',
      'humility',
      'pride',
      'proud',
      'humildad',
      'humilde',
      'orgullo',
      'soberbia',
      'vanagloria',
      'humildade',
      'orgulho',
      'soberba',
      'vangloria',
    ],
    bookId: 'php',
    chapter: 2,
    verse: 3,
    endVerse: 4,
    lines: lines('humility',
      {
        punch: ['Humility looks at others the way Christ looked at us.', 'Pride keeps a private ranking of the room.'],
        context: [
          'Paul is pleading for unity in Philippi. The path is low. Nothing through strife or vainglory. Each esteeming others better than himself. He is about to show them Christ, who did not clutch his glory but took the form of a servant.',
          'Philippians 2 starts with a church that could fracture over importance. Paul points at the mind of Christ. He didn’t grasp. He emptied himself. The cross is the shape of humility, not a personality tip.',
        ],
        application: [
          'Most of us want the lower place in theory. When my name is skipped. When his idea wins. When nobody notices the work. We keep score and call it clarity. Humility closes the ledger. It doesn’t mean lying about your gifts. It means you stop using them to be seen.',
          'Vainglory steers the sentence. The story that makes you the hero. The silence that punishes. Christ looked at our need and came down. That’s the pattern in the room.',
        ],
        challenge: [
          'Brothers, whose good have you walked past because you were busy being noticed? A brother. Your wife. The quiet man who serves. Maybe your own name, still sitting in the center.',
          'Brothers, where does vainglory still steer your words? The joke at his expense. The credit you took. The help you refused.',
        ],
        charge: [
          'This week, let someone else’s name be the one that is helped. Do it where nobody is keeping score.',
          'Paul’s message is direct: look not every man on his own things, but every man also on the things of others.',
        ],
        questions: [
          [
            'Where does vainglory still steer your words?',
            'Who in this class needs you to look at their concerns, not your own?',
          ],
          [
            'What gift are you still using to be seen?',
            'What would esteeming another better than yourself change in this room?',
          ],
        ],
      },
      {
        punch: ['La humildad mira a los otros como Cristo nos miró.', 'El orgullo mantiene un ranking privado del cuarto.'],
        context: [
          'Pablo ruega por la unidad en Filipos. El camino es bajo. Nada por contienda o vanagloria. Cada uno estimando a los demás como superiores a él mismo. Está a punto de mostrarles a Cristo, que no se aferró a su gloria, sino que tomó forma de siervo.',
          'Filipenses 2 empieza con una iglesia que podía partirse por importancia. Pablo señala la mente de Cristo. No se aferró. Se despojó. La cruz es la forma de la humildad, no un consejo de personalidad.',
        ],
        application: [
          'Casi todos queremos el lugar bajo en teoría. Cuando saltan mi nombre. Cuando gana su idea. Cuando nadie nota el trabajo. Llevamos la cuenta y lo llamamos claridad. La humildad cierra la cuenta. No significa mentir sobre los dones. Significa dejar de usarlos para ser visto.',
          'La vanagloria dirige la frase. La historia donde tú eres el héroe. El silencio que castiga. Cristo miró nuestra necesidad y bajó. Ese es el modelo en el cuarto.',
        ],
        challenge: [
          'Hermanos, ¿el bien de quién has pasado de largo porque estabas ocupado en que te notaran? Un hermano. Tu esposa. El hombre callado que sirve. Quizás tu propio nombre, todavía en el centro.',
          'Hermanos, ¿dónde la vanagloria todavía dirige tus palabras? El chiste a costa de él. El crédito que tomaste. La ayuda que rehusaste.',
        ],
        charge: [
          'Esta semana, deja que el nombre que reciba ayuda sea el de otro. Hazlo donde nadie lleva la cuenta.',
          'El mensaje de Pablo es directo: no mirando cada uno por lo suyo, sino cada cual también por lo de los otros.',
        ],
        questions: [
          [
            '¿Dónde la vanagloria todavía dirige tus palabras?',
            '¿Quién en esta clase necesita que mires sus cosas, no las tuyas?',
          ],
          [
            '¿Qué don sigues usando para ser visto?',
            '¿Qué cambiaría en este cuarto estimar al otro como superior a ti?',
          ],
        ],
      },
      {
        punch: ['A humildade olha os outros como Cristo nos olhou.', 'O orgulho mantém um ranking privado da sala.'],
        context: [
          'Paulo pede unidade em Filipos. O caminho é baixo. Nada por contenda ou vanglória. Cada um estimando os outros como superiores a si mesmo. Ele está prestes a mostrar Cristo, que não se agarrou à glória, mas tomou forma de servo.',
          'Filipenses 2 começa com uma igreja que podia rachar por importância. Paulo aponta a mente de Cristo. Ele não se agarrou. Esvaziou-se. A cruz é a forma da humildade, não uma dica de personalidade.',
        ],
        application: [
          'Quase todos queremos o lugar baixo na teoria. Quando pulam o meu nome. Quando a ideia dele ganha. Quando ninguém nota o trabalho. Marcamos pontos e chamamos de clareza. A humildade fecha a conta. Não significa mentir sobre os dons. Significa parar de usá-los para ser visto.',
          'A vanglória dirige a frase. A história em que você é o herói. O silêncio que pune. Cristo olhou a nossa necessidade e desceu. Esse é o modelo na sala.',
        ],
        challenge: [
          'Irmãos, o bem de quem você passou reto porque estava ocupado em ser notado? Um irmão. A sua esposa. O homem quieto que serve. Talvez o seu próprio nome, ainda no centro.',
          'Irmãos, onde a vanglória ainda dirige as suas palavras? A piada à custa dele. O crédito que você tomou. A ajuda que você recusou.',
        ],
        charge: [
          'Nesta semana, deixe que o nome ajudado seja o de outra pessoa. Faça isso onde ninguém marca ponto.',
          'A mensagem de Paulo é direta: não olhe cada um para o que é seu, mas cada um também para o que é dos outros.',
        ],
        questions: [
          [
            'Onde a vanglória ainda dirige as suas palavras?',
            'Quem nesta classe precisa que você olhe as coisas dela, não as suas?',
          ],
          [
            'Que dom você ainda usa para ser visto?',
            'O que mudaria nesta sala estimar o outro como superior a você?',
          ],
        ],
      },
    ),
  },
  {
    id: 'trust',
    keywords: [
      'trust',
      'lean',
      'acknowledge',
      'leaning',
      'confianza',
      'confiar',
      'apoyarse',
      'confia',
      'confianca',
      'apoiar',
      'estribar',
    ],
    bookId: 'pro',
    chapter: 3,
    verse: 5,
    endVerse: 6,
    lines: lines('trust',
      {
        punch: ['Trust in the Lord is a whole heart, not a spare plan.', 'Leaning on your own understanding feels responsible. The proverb calls it a rival support.'],
        context: [
          'Proverbs speaks as a father to a son. Don’t lean on your own understanding. In all thy ways acknowledge him, and he shall direct thy paths. The promise is direction, not a map of every turn. God straightens the path of the person who actually trusts him.',
          'This is a father’s warning, not a poster. Trust with all your heart. The backup plan that ignores what God said is still a lean. Acknowledge him in the job, the money, and the house.',
        ],
        application: [
          'Most of us pray and then keep a plan that doesn’t need him. When I can see the next three steps. When my read of the situation feels smart. When prayer is only a courtesy. We call that maturity. The proverb calls it leaning on the wrong post.',
          'A whole heart doesn’t mean you stop thinking. It means your thinking is not the god of the decision. Acknowledge him, then walk the step he has already made plain.',
        ],
        challenge: [
          'Brothers, where are you leaning so hard on your own reading that prayer is only a courtesy? The deal. The relationship. The fear you’re managing alone. Maybe a path you already picked.',
          'Brothers, what decision has your understanding in the lead? Hand him the lean. Don’t call the backup plan faith.',
        ],
        charge: [
          'Name that place. Trust him with all of it. Walk the next step he has already made plain.',
          'The proverb is direct: trust in the Lord with all thine heart. He will direct the path. You don’t have to invent it.',
        ],
        questions: [
          [
            'What decision are you making with your understanding in the lead?',
            'What would it mean to acknowledge him in that exact place this week?',
          ],
          [
            'Where is prayer a courtesy after you already decided?',
            'What backup plan is competing with what God has said?',
          ],
        ],
      },
      {
        punch: ['Confiar en el Señor es el corazón entero, no un plan de repuesto.', 'Apoyarte en tu prudencia se siente responsable. El proverbio lo llama un apoyo rival.'],
        context: [
          'Proverbios habla como un padre a un hijo. No te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas. La promesa es dirección, no un mapa de cada curva. Dios endereza la vereda de quien de veras confía.',
          'Es una advertencia de padre, no un cartel. Fíate de Jehová de todo tu corazón. El plan de respaldo que ignora lo que Dios dijo sigue siendo un apoyo. Reconócelo en el trabajo, el dinero y la casa.',
        ],
        application: [
          'Casi todos oramos y luego guardamos un plan que no lo necesita. Cuando puedo ver los tres pasos. Cuando mi lectura se siente lista. Cuando la oración es solo una cortesía. Lo llamamos madurez. El proverbio lo llama apoyarse en el poste equivocado.',
          'El corazón entero no significa que dejes de pensar. Significa que tu pensamiento no es el dios de la decisión. Reconócelo, y camina el paso que él ya dejó claro.',
        ],
        challenge: [
          'Hermanos, ¿dónde te apoyas tan fuerte en tu propia lectura que la oración es solo una cortesía? El trato. La relación. El miedo que manejas solo. Quizás un camino que ya escogiste.',
          'Hermanos, ¿qué decisión tiene tu prudencia al frente? Suéltale el apoyo. No llames fe al plan de repuesto.',
        ],
        charge: [
          'Nombra ese lugar. Confía en él con todo. Camina el siguiente paso que él ya dejó claro.',
          'El proverbio es directo: fíate de Jehová de todo tu corazón. Él enderezará la vereda. No tienes que inventarla.',
        ],
        questions: [
          [
            '¿Qué decisión estás tomando con tu prudencia al frente?',
            '¿Qué significaría reconocerlo en ese lugar exacto esta semana?',
          ],
          [
            '¿Dónde la oración es una cortesía después de que ya decidiste?',
            '¿Qué plan de respaldo está compitiendo con lo que Dios ha dicho?',
          ],
        ],
      },
      {
        punch: ['Confiar no Senhor é o coração inteiro, não um plano reserva.', 'Apoiar-se no próprio entendimento parece responsabilidade. O provérbio chama isso de apoio rival.'],
        context: [
          'Provérbios fala como um pai ao filho. Não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas. A promessa é direção, não um mapa de cada curva. Deus endireita a vereda de quem de fato confia.',
          'É um aviso de pai, não um cartaz. Confia no Senhor de todo o teu coração. O plano reserva que ignora o que Deus disse ainda é um apoio. Reconhece-o no trabalho, no dinheiro e na casa.',
        ],
        application: [
          'Quase todos oramos e depois guardamos um plano que não precisa dele. Quando eu consigo ver os três passos. Quando a minha leitura parece esperta. Quando a oração é só uma cortesia. Chamamos isso de maturidade. O provérbio chama de apoiar-se no poste errado.',
          'O coração inteiro não significa parar de pensar. Significa que o seu pensamento não é o deus da decisão. Reconheça-o, e ande o passo que ele já deixou claro.',
        ],
        challenge: [
          'Irmãos, onde você se apoia tão forte na própria leitura que a oração é só uma cortesia? O negócio. O relacionamento. O medo que você administra sozinho. Talvez um caminho que você já escolheu.',
          'Irmãos, que decisão tem o seu entendimento na frente? Entregue o apoio. Não chame de fé o plano reserva.',
        ],
        charge: [
          'Nomeie esse lugar. Confie nele com tudo. Ande o próximo passo que ele já deixou claro.',
          'O provérbio é direto: confia no Senhor de todo o teu coração. Ele endireitará a vereda. Você não precisa inventá-la.',
        ],
        questions: [
          [
            'Que decisão você está tomando com o seu entendimento na frente?',
            'O que seria reconhecê-lo nesse lugar exato nesta semana?',
          ],
          [
            'Onde a oração é uma cortesia depois que você já decidiu?',
            'Que plano reserva está competindo com o que Deus disse?',
          ],
        ],
      },
    ),
  },
  {
    id: 'prayer',
    keywords: [
      'prayer',
      'pray',
      'praying',
      'asking god',
      'intercession',
      'oracion',
      'orar',
      'orando',
      'plegaria',
      'intercesion',
      'oracao',
      'intercessao',
      'clamar',
    ],
    bookId: 'mat',
    chapter: 7,
    verse: 7,
    endVerse: 8,
    lines: lines('prayer',
      {
        punch: ['Jesus expects his people to ask.', 'We worry in detail and pray in general.'],
        context: [
          'In the Sermon on the Mount, Jesus has been teaching a righteousness deeper than display. Then he opens the door. Ask. Seek. Knock. Everyone who asks receives. Prayer isn’t a performance for the street. It’s a child coming to a Father who gives good things.',
          'Matthew 7 isn’t a formula for getting toys. It’s a Father. The door is for knocking, not for one polite tap and a complaint that heaven is slow.',
        ],
        application: [
          'Most of us knock once. When I don’t feel it. When the answer isn’t the one I wrote. When silence feels like a no. We put the request back in our pocket. Jesus says keep coming. Asking is faith with words. Seeking keeps looking in the Word. Knocking refuses to treat God as far.',
          'A vague prayer hides. A specific ask trusts. The Father is not annoyed by a child at the door.',
        ],
        challenge: [
          'Brothers, what have you stopped asking because you decided the answer was silence? The healing. The prodigal. The daily bread. Maybe a request you only rehearse and never pray.',
          'Brothers, how is your praying different from rehearsing the problem? If it isn’t, start over in plain words.',
        ],
        charge: [
          'Ask again, in specific words, and keep seeking. The Father is not tired of a child who knocks.',
          'Jesus’ message is direct: ask, and it shall be given you. Don’t leave the door after one knock.',
        ],
        questions: [
          [
            'What request have you dropped that Jesus would still have you bring?',
            'How is your praying different from rehearsing the problem?',
          ],
          [
            'Where have you treated silence as a closed door?',
            'What good thing will you ask the Father for by name this week?',
          ],
        ],
      },
      {
        punch: ['Jesús espera que su pueblo pida.', 'Nos preocupamos con detalle y oramos en general.'],
        context: [
          'En el Sermón del Monte, Jesús ha enseñado una justicia más honda que la apariencia. Luego abre la puerta. Pedid. Buscad. Llamad. El que pide, recibe. La oración no es una actuación para la calle. Es un hijo que viene a un Padre que da buenas cosas.',
          'Mateo 7 no es una fórmula para conseguir juguetes. Es un Padre. La puerta es para llamar, no para un toque cortés y una queja de que el cielo es lento.',
        ],
        application: [
          'Casi todos llamamos una vez. Cuando no lo siento. Cuando la respuesta no es la que escribí. Cuando el silencio parece un no. Volvemos a guardar el pedido en el bolsillo. Jesús dice que sigas viniendo. Pedir es fe con palabras. Buscar sigue mirando la Palabra. Llamar rehúsa tratar a Dios como lejano.',
          'Una oración vaga se esconde. Un pedido concreto confía. Al Padre no le fastidia un hijo en la puerta.',
        ],
        challenge: [
          'Hermanos, ¿qué has dejado de pedir porque decidiste que la respuesta era el silencio? La sanidad. El pródigo. El pan de cada día. Quizás un pedido que solo ensayas y nunca oras.',
          'Hermanos, ¿en qué se diferencia tu oración de repasar el problema? Si no se diferencia, empieza de nuevo con palabras claras.',
        ],
        charge: [
          'Pide otra vez, con palabras concretas, y sigue buscando. Al Padre no le cansa un hijo que llama.',
          'El mensaje de Jesús es directo: pedid, y se os dará. No dejes la puerta después de un golpe.',
        ],
        questions: [
          [
            '¿Qué petición has soltado que Jesús todavía quiere que traigas?',
            '¿En qué se diferencia tu oración de repasar el problema?',
          ],
          [
            '¿Dónde has tratado el silencio como una puerta cerrada?',
            '¿Qué cosa buena le vas a pedir al Padre por nombre esta semana?',
          ],
        ],
      },
      {
        punch: ['Jesus espera que o seu povo peça.', 'A gente se preocupa com detalhe e ora em geral.'],
        context: [
          'No Sermão do Monte, Jesus ensinou uma justiça mais funda que a aparência. Depois abre a porta. Pedi. Buscai. Batei. Quem pede, recebe. A oração não é uma cena para a rua. É um filho que vem a um Pai que dá boas coisas.',
          'Mateus 7 não é uma fórmula para conseguir brinquedos. É um Pai. A porta é para bater, não para uma batida educada e uma queixa de que o céu é lento.',
        ],
        application: [
          'Quase todos batemos uma vez. Quando eu não sinto. Quando a resposta não é a que eu escrevi. Quando o silêncio parece um não. Guardamos o pedido de novo no bolso. Jesus diz para continuar vindo. Pedir é fé com palavras. Buscar continua olhando a Palavra. Bater recusa tratar Deus como distante.',
          'Uma oração vaga se esconde. Um pedido concreto confia. O Pai não se irrita com um filho na porta.',
        ],
        challenge: [
          'Irmãos, o que você parou de pedir porque decidiu que a resposta era o silêncio? A cura. O pródigo. O pão de cada dia. Talvez um pedido que você só ensaia e nunca ora.',
          'Irmãos, em que a sua oração é diferente de repassar o problema? Se não é, comece de novo com palavras claras.',
        ],
        charge: [
          'Peça de novo, com palavras concretas, e continue buscando. O Pai não se cansa de um filho que bate.',
          'A mensagem de Jesus é direta: pedi, e dar-se-vos-á. Não deixe a porta depois de uma batida.',
        ],
        questions: [
          [
            'Que pedido você largou e Jesus ainda quer que você traga?',
            'Em que a sua oração é diferente de repassar o problema?',
          ],
          [
            'Onde você tratou o silêncio como uma porta fechada?',
            'Que coisa boa você vai pedir ao Pai pelo nome nesta semana?',
          ],
        ],
      },
    ),
  },
  {
    id: 'joy',
    keywords: ['joy', 'rejoice', 'gladness', 'gozo', 'alegria', 'regocijo', 'regozijo', 'regozijar'],
    bookId: 'php',
    chapter: 4,
    verse: 4,
    endVerse: 4,
    lines: lines('joy',
      {
        punch: ['Joy in the Lord is a command, not a lucky mood.', 'He says it twice. Rejoice. And again I say, rejoice.'],
        context: [
          'Paul says rejoice in the Lord alway, and then he says it again. He isn’t describing a comfortable church. He’s a prisoner telling free people where joy lives. It lives in the Lord, so it can be commanded on an ordinary day and on a hard one.',
          'Philippians 4 is not a smile pasted on a bad week. The joy is in the Lord. Not in the outcome. That’s why a man in chains can say always.',
        ],
        application: [
          'Most of us hunt joy in results. When the news is good. When they like me. When the problem clears. If it slips, we think the joy was fake. Paul ties it to a Person who doesn’t slip. Rejoicing is naming what is true about Christ, out loud.',
          'A stolen joy usually has a rival god. The account. The reputation. The control. Rejoice in the Lord is a relocation, not a mood swing.',
        ],
        challenge: [
          'Brothers, when did you last rejoice in the Lord, and not only in a good result? Yesterday. Last month. You can’t remember. Maybe you’ve been rejoicing in a thing that can be taken.',
          'Brothers, what has been stealing your joy because it is not the Lord? Name the thief. Then name Christ.',
        ],
        charge: [
          'Before you leave, name one thing that is true of Christ and thank him. Then do it again tomorrow.',
          'Paul’s message is direct: rejoice in the Lord alway. The always includes the week you actually have.',
        ],
        questions: [
          [
            'What has been stealing your joy because it is not the Lord?',
            'How can this class rejoice together without pretending life is easy?',
          ],
          [
            'What outcome have you been requiring before you will rejoice?',
            'What is true of Christ on a hard Tuesday?',
          ],
        ],
      },
      {
        punch: ['El gozo en el Señor es un mandamiento, no un ánimo de suerte.', 'Lo dice dos veces. Regocijaos. Otra vez digo: regocijaos.'],
        context: [
          'Pablo dice regocijaos en el Señor siempre, y luego lo repite. No describe una iglesia cómoda. Es un preso diciéndoles a personas libres dónde vive el gozo. Vive en el Señor, así que se puede mandar en un día común y en uno duro.',
          'Filipenses 4 no es una sonrisa pegada a una mala semana. El gozo está en el Señor. No en el resultado. Por eso un hombre encadenado puede decir siempre.',
        ],
        application: [
          'Casi todos buscamos el gozo en los resultados. Cuando la noticia es buena. Cuando les caigo bien. Cuando el problema se aclara. Si se escapa, pensamos que el gozo era falso. Pablo lo ata a una Persona que no se escapa. Regocijarse es nombrar lo que es verdad acerca de Cristo, en voz alta.',
          'Un gozo robado casi siempre tiene un dios rival. La cuenta. La reputación. El control. Regocijarse en el Señor es un cambio de lugar, no un cambio de humor.',
        ],
        challenge: [
          'Hermanos, ¿cuándo fue la última vez que te regocijaste en el Señor, y no solo en un buen resultado? Ayer. El mes pasado. No te acuerdas. Quizás has estado gozándote en algo que se puede quitar.',
          'Hermanos, ¿qué te ha estado robando el gozo porque no es el Señor? Nombra al ladrón. Luego nombra a Cristo.',
        ],
        charge: [
          'Antes de irte, nombra una cosa que es verdad de Cristo y dale gracias. Luego hazlo otra vez mañana.',
          'El mensaje de Pablo es directo: regocijaos en el Señor siempre. El siempre incluye la semana que de veras tienes.',
        ],
        questions: [
          [
            '¿Qué te ha estado robando el gozo porque no es el Señor?',
            '¿Cómo puede esta clase regocijarse junta sin fingir que la vida es fácil?',
          ],
          [
            '¿Qué resultado has estado exigiendo antes de regocijarte?',
            '¿Qué es verdad de Cristo en un martes difícil?',
          ],
        ],
      },
      {
        punch: ['A alegria no Senhor é um mandamento, não um humor de sorte.', 'Ele diz duas vezes. Regozijai-vos. Outra vez digo: regozijai-vos.'],
        context: [
          'Paulo diz regozijai-vos sempre no Senhor, e depois repete. Ele não descreve uma igreja confortável. É um preso dizendo a pessoas livres onde a alegria mora. Mora no Senhor, então pode ser ordenada num dia comum e num dia duro.',
          'Filipenses 4 não é um sorriso colado numa semana ruim. A alegria está no Senhor. Não no resultado. Por isso um homem em correntes pode dizer sempre.',
        ],
        application: [
          'Quase todos caçamos alegria nos resultados. Quando a notícia é boa. Quando gostam de mim. Quando o problema esclarece. Se escapa, pensamos que a alegria era falsa. Paulo a ata a uma Pessoa que não escapa. Regozijar-se é nomear o que é verdade acerca de Cristo, em voz alta.',
          'Uma alegria roubada quase sempre tem um deus rival. A conta. A reputação. O controle. Regozijar-se no Senhor é uma mudança de lugar, não uma mudança de humor.',
        ],
        challenge: [
          'Irmãos, quando foi a última vez que você se regozijou no Senhor, e não só num bom resultado? Ontem. Mês passado. Você não lembra. Talvez você tenha se alegrado numa coisa que pode ser tirada.',
          'Irmãos, o que tem roubado a sua alegria porque não é o Senhor? Nomeie o ladrão. Depois nomeie Cristo.',
        ],
        charge: [
          'Antes de sair, nomeie uma coisa que é verdade acerca de Cristo e agradeça. Depois faça de novo amanhã.',
          'A mensagem de Paulo é direta: regozijai-vos sempre no Senhor. O sempre inclui a semana que você de fato tem.',
        ],
        questions: [
          [
            'O que tem roubado a sua alegria porque não é o Senhor?',
            'Como esta classe pode se regozijar junta sem fingir que a vida é fácil?',
          ],
          [
            'Que resultado você tem exigido antes de se regozijar?',
            'O que é verdade acerca de Cristo numa terça difícil?',
          ],
        ],
      },
    ),
  },
  {
    id: 'suffering',
    keywords: [
      'suffering',
      'suffer',
      'pain',
      'trial',
      'hardship',
      'affliction',
      'tribulation',
      'sufrimiento',
      'dolor',
      'prueba',
      'afliccion',
      'tribulacion',
      'sofrimento',
      'dor',
      'prova',
      'aflicao',
      'tribulacao',
    ],
    bookId: 'rom',
    chapter: 8,
    verse: 28,
    endVerse: 28,
    lines: lines('suffering',
      {
        punch: ['God works all things for good. He does not call all things good.', 'Romans 8:28 is not a shrug.'],
        context: [
          'Romans 8 has already said the sufferings of this present time are real, and that creation groans. Verse 28 is a promise to those who love God and are called according to his purpose. He is at work in the things he did not call good.',
          'Paul will go on to say we are predestined to be conformed to the image of his Son. The “good” has a face. It is Christlikeness, not a guarantee that the story feels finished by Friday.',
        ],
        application: [
          'Most of us pick one truth and drop the other. When it hurts, we deny the promise. When we want it tidy, we deny the pain. Both are unbelief. Quote the verse to end a conversation and you have not comforted anybody. Sit in the groan and in the promise.',
          'Love for God is the posture of the people this verse is talking to. It isn’t a lucky charm for people who want a painless week.',
        ],
        challenge: [
          'Brothers, what pain are you using as evidence that God walked off? The diagnosis. The grave. The injustice that still has a name. Maybe a groan you don’t say in church.',
          'Brothers, where have you used this verse to shut someone up instead of to stand with them? Tell the truth about the pain. Then tell the truth about the God who is still working.',
        ],
        charge: [
          'Don’t make the class choose between the groan and the promise. God is working. The thing itself may still be evil.',
          'Paul’s message is direct: he works all things for good to them that love God. The good is his purpose, not your preferred ending.',
        ],
        questions: [
          [
            'Where have you quoted this verse to end a conversation instead of to comfort?',
            'What would it mean to love God in the middle of this particular hardship?',
          ],
          [
            'What pain have you called proof that God left?',
            'How can this class tell the truth about suffering without dropping the promise?',
          ],
        ],
      },
      {
        punch: ['Dios dispone todas las cosas para bien. No llama buenas a todas las cosas.', 'Romanos 8:28 no es un encogimiento de hombros.'],
        context: [
          'Romanos 8 ya dijo que los sufrimientos de este tiempo son reales, y que la creación gime. El versículo 28 es una promesa para los que aman a Dios y son llamados conforme a su propósito. Él obra en las cosas que no llamó buenas.',
          'Pablo sigue y dice que fuimos predestinados para ser conformados a la imagen de su Hijo. El “bien” tiene un rostro. Es parecernos a Cristo, no una garantía de que la historia se sienta terminada para el viernes.',
        ],
        application: [
          'Casi todos escogemos una verdad y soltamos la otra. Cuando duele, negamos la promesa. Cuando lo queremos limpio, negamos el dolor. Las dos son incredulidad. Citar el versículo para cerrar una conversación no consuela a nadie. Siéntate en el gemido y en la promesa.',
          'Amar a Dios es la postura de las personas de las que habla este versículo. No es un amuleto para quien quiere una semana sin dolor.',
        ],
        challenge: [
          'Hermanos, ¿qué dolor estás usando como prueba de que Dios se fue? El diagnóstico. La tumba. La injusticia que todavía tiene nombre. Quizás un gemido que no dices en la iglesia.',
          'Hermanos, ¿dónde has usado este versículo para callar a alguien en vez de ponerte a su lado? Di la verdad del dolor. Luego di la verdad del Dios que sigue obrando.',
        ],
        charge: [
          'No obligues a la clase a escoger entre el gemido y la promesa. Dios está obrando. La cosa misma puede seguir siendo mala.',
          'El mensaje de Pablo es directo: a los que aman a Dios, todas las cosas les ayudan a bien. El bien es su propósito, no el final que tú prefieres.',
        ],
        questions: [
          [
            '¿Dónde has citado este versículo para cerrar una conversación en vez de consolar?',
            '¿Qué significaría amar a Dios en medio de esta aflicción concreta?',
          ],
          [
            '¿Qué dolor has llamado prueba de que Dios se fue?',
            '¿Cómo puede esta clase decir la verdad del sufrimiento sin soltar la promesa?',
          ],
        ],
      },
      {
        punch: ['Deus faz todas as coisas cooperarem para o bem. Ele não chama todas as coisas de boas.', 'Romanos 8:28 não é um dar de ombros.'],
        context: [
          'Romanos 8 já disse que os sofrimentos deste tempo são reais, e que a criação geme. O versículo 28 é uma promessa para os que amam a Deus e são chamados segundo o seu propósito. Ele opera nas coisas que não chamou boas.',
          'Paulo continua e diz que fomos predestinados para ser conformes à imagem do seu Filho. O “bem” tem um rosto. É parecer-se com Cristo, não uma garantia de que a história pareça acabada até sexta.',
        ],
        application: [
          'Quase todos escolhemos uma verdade e largamos a outra. Quando dói, negamos a promessa. Quando queremos tudo limpo, negamos a dor. As duas são incredulidade. Citar o versículo para encerrar uma conversa não consola ninguém. Sente-se no gemido e na promessa.',
          'Amar a Deus é a postura das pessoas de quem este versículo fala. Não é um amuleto para quem quer uma semana sem dor.',
        ],
        challenge: [
          'Irmãos, que dor você está usando como prova de que Deus foi embora? O diagnóstico. O túmulo. A injustiça que ainda tem nome. Talvez um gemido que você não diz na igreja.',
          'Irmãos, onde você usou este versículo para calar alguém em vez de ficar ao lado? Diga a verdade da dor. Depois diga a verdade do Deus que continua operando.',
        ],
        charge: [
          'Não obrigue a classe a escolher entre o gemido e a promessa. Deus está operando. A coisa em si pode continuar sendo má.',
          'A mensagem de Paulo é direta: todas as coisas cooperam para o bem daqueles que amam a Deus. O bem é o propósito dele, não o final que você prefere.',
        ],
        questions: [
          [
            'Onde você citou este versículo para encerrar uma conversa em vez de consolar?',
            'O que seria amar a Deus no meio desta aflição concreta?',
          ],
          [
            'Que dor você chamou de prova de que Deus foi embora?',
            'Como esta classe pode dizer a verdade do sofrimento sem largar a promessa?',
          ],
        ],
      },
    ),
  },
  {
    id: 'temptation',
    keywords: [
      'temptation',
      'tempt',
      'tempting',
      'lust',
      'lusts',
      'sin',
      'pecado',
      'tentacion',
      'tentar',
      'lujuria',
      'tentacao',
      'luxuria',
      'cobica',
      'impureza',
    ],
    bookId: '1co',
    chapter: 10,
    verse: 13,
    endVerse: 13,
    lines: lines('temptation',
      {
        punch: ['The way out is as real as the temptation.', 'Your case is not the exception. God is faithful.'],
        context: [
          'Paul warns Corinth with Israel in the wilderness. They desired evil, and they fell. Then he says the temptation you face is common to man. God is faithful. He will not suffer you to be tempted above that ye are able, and with the temptation he makes a way to escape.',
          'The way of escape is not a theory. Israel had a story of desire, idolatry, and grumbling. Corinth was living a version of it. Paul refuses both lies: “nobody else fights this” and “nobody can get out.”',
        ],
        application: [
          'Most of us pick a lie. When it’s private, we call it small. When it’s strong, we call it special. The phone at midnight. The second look. The rage that feels justified. God already put a door in the room. Taking it is obedience, not heroism.',
          'A common temptation doesn’t need a special excuse. It needs the exit. A person. A closed app. A confession. A verse you actually obey.',
        ],
        challenge: [
          'Brothers, what temptation have you decided you have to live with? Name it without the costume. The lust. The lie. The bitterness. Maybe the one nobody in this room knows.',
          'Brothers, what way of escape have you been walking past? It’s already there. A brother. A locked door. A confession you’ve delayed.',
        ],
        charge: [
          'Take the way out this week. God is faithful. You are not the man who has no exit.',
          'Paul’s message is direct: there hath no temptation taken you but such as is common to man. And there is a way to escape. Take it.',
        ],
        questions: [
          [
            'Where are you calling a common temptation a special excuse?',
            'What is the way of escape you have been walking past?',
          ],
          [
            'Who can you tell this week so the sin stops being only yours?',
            'What door will you close before the temptation gets the evening?',
          ],
        ],
      },
      {
        punch: ['La salida es tan real como la tentación.', 'Tu caso no es la excepción. Dios es fiel.'],
        context: [
          'Pablo advierte a Corinto con Israel en el desierto. Desearon lo malo, y cayeron. Luego dice que la tentación que enfrentan es común al hombre. Dios es fiel. No dejará que seáis tentados más de lo que podéis resistir, y con la tentación da la salida.',
          'La salida no es una teoría. Israel tenía una historia de deseo, idolatría y murmuración. Corinto vivía una versión. Pablo cierra las dos mentiras: “nadie más pelea esto” y “nadie puede salir.”',
        ],
        application: [
          'Casi todos escogemos una mentira. Cuando es privado, lo llamamos pequeño. Cuando es fuerte, lo llamamos especial. El teléfono a medianoche. La segunda mirada. La ira que se siente justificada. Dios ya puso una puerta en el cuarto. Tomarla es obediencia, no heroísmo.',
          'Una tentación común no necesita una excusa especial. Necesita la salida. Una persona. Una aplicación cerrada. Una confesión. Un versículo que de veras obedeces.',
        ],
        challenge: [
          'Hermanos, ¿qué tentación has decidido que tienes que soportar? Nómbrala sin el disfraz. La lujuria. La mentira. La amargura. Quizás la que nadie en este cuarto conoce.',
          'Hermanos, ¿qué salida has estado pasando de largo? Ya está ahí. Un hermano. Una puerta cerrada. Una confesión que has retrasado.',
        ],
        charge: [
          'Toma la salida esta semana. Dios es fiel. No eres el hombre que no tiene salida.',
          'El mensaje de Pablo es directo: no os ha tomado tentación sino la común al hombre. Y hay salida. Tómala.',
        ],
        questions: [
          [
            '¿Dónde estás llamando excusa especial a una tentación común?',
            '¿Cuál es la salida que has estado pasando de largo?',
          ],
          [
            '¿A quién puedes decirle esta semana para que el pecado deje de ser solo tuyo?',
            '¿Qué puerta vas a cerrar antes de que la tentación se quede con la noche?',
          ],
        ],
      },
      {
        punch: ['A saída é tão real quanto a tentação.', 'O seu caso não é a exceção. Deus é fiel.'],
        context: [
          'Paulo avisa Corinto com Israel no deserto. Desejaram o mal, e caíram. Depois diz que a tentação que vocês enfrentam é comum ao homem. Deus é fiel. Não deixará que sejais tentados acima do que podeis resistir, e com a tentação dá o escape.',
          'A saída não é teoria. Israel tinha uma história de desejo, idolatria e murmuração. Corinto vivia uma versão. Paulo fecha as duas mentiras: “ninguém mais luta com isto” e “ninguém consegue sair.”',
        ],
        application: [
          'Quase todos escolhemos uma mentira. Quando é particular, chamamos de pequeno. Quando é forte, chamamos de especial. O telefone à meia-noite. O segundo olhar. A raiva que parece justificada. Deus já pôs uma porta na sala. Tomá-la é obediência, não heroísmo.',
          'Uma tentação comum não precisa de uma desculpa especial. Precisa da saída. Uma pessoa. Um aplicativo fechado. Uma confissão. Um versículo que você de fato obedece.',
        ],
        challenge: [
          'Irmãos, que tentação você decidiu que tem de aguentar? Nomeie sem o disfarce. A luxúria. A mentira. A amargura. Talvez aquela que ninguém nesta sala conhece.',
          'Irmãos, que saída você tem passado reto? Ela já está aí. Um irmão. Uma porta fechada. Uma confissão que você adiou.',
        ],
        charge: [
          'Tome a saída nesta semana. Deus é fiel. Você não é o homem que não tem saída.',
          'A mensagem de Paulo é direta: não vos sobreveio tentação senão humana. E há escape. Tome-o.',
        ],
        questions: [
          [
            'Onde você chama de desculpa especial uma tentação comum?',
            'Qual é a saída que você tem passado reto?',
          ],
          [
            'A quem você pode contar nesta semana para o pecado deixar de ser só seu?',
            'Que porta você vai fechar antes de a tentação ficar com a noite?',
          ],
        ],
      },
    ),
  },
]

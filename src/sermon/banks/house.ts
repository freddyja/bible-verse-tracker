import type { SermonLang, SermonLines, SermonOutline } from '../types'
import { HOUSE_FULL } from './house-full'

type ShortLines = Omit<SermonLines, 'full'>

function lines(
  id: string,
  en: ShortLines,
  es: ShortLines,
  pt: ShortLines,
): Record<SermonLang, SermonLines> {
  const pack = HOUSE_FULL[id]
  if (!pack) throw new Error(`missing full lines for ${id}`)
  return {
    en: { ...en, full: pack.en },
    es: { ...es, full: pack.es },
    pt: { ...pt, full: pack.pt },
  }
}

export const HOUSE: readonly SermonOutline[] = [
  {
    id: 'work',
    keywords: [
      'work',
      'job',
      'labor',
      'workplace',
      'boss',
      'empleo',
      'trabajo',
      'jefe',
      'oficio',
      'trabalho',
      'emprego',
      'chefe',
      'colega',
      'on the job',
    ],
    bookId: 'col',
    chapter: 3,
    verse: 23,
    endVerse: 23,
    lines: lines('work',
      {
        punch: ['The real Supervisor is not the one who signs the check.', 'Eye-service works when the boss is watching. Heart-service works because Christ is worthy.'],
        context: [
          'Paul speaks to servants in Colossae, people with little honor in the room. Work heartily, as to the Lord, and not unto men. The daily task isn’t beneath worship. It’s one of the places worship goes.',
          'Colossians 3 refuses a split life. Whatever you do, do it heartily. The Lord is the one you serve, even when the master in the room is difficult.',
        ],
        application: [
          'Most of us split the week. Sacred hours on Sunday. Wasted hours on the clock. When the boss is looking. When the job feels small. When nobody will know if you cut the corner. Eye-service is for men. Heart-service is for Christ. A believer can sweep, teach, build, or manage as an offering.',
          'The hidden part of the job is the test. The email nobody audits. The tone with the person who can’t fire you. Do that part as unto the Lord.',
        ],
        challenge: [
          'Brothers, whose approval are you actually working for this week? The boss. The client. Your own name. Maybe a fear of being seen as lazy.',
          'Brothers, where has your work become eye-service? The moment he walks in. The moment he walks out. You know the difference.',
        ],
        charge: [
          'Do the next task as unto the Lord. Let the hidden part be as honest as the part people praise.',
          'Paul’s message is direct: ye serve the Lord Christ. The check is not the supervisor.',
        ],
        questions: [
          [
            'Where has your work become eye-service?',
            'What would change tomorrow if you believed you were serving Christ in that job?',
          ],
          [
            'What corner do you cut when nobody is watching?',
            'How can this week’s ordinary task be an offering?',
          ],
        ],
      },
      {
        punch: ['El verdadero Supervisor no es el que firma el cheque.', 'El servicio de la vista trabaja cuando el jefe mira. El del corazón trabaja porque Cristo es digno.'],
        context: [
          'Pablo habla a siervos en Colosas, gente con poca honra en el cuarto. Hacedlo de corazón, como para el Señor y no para los hombres. La tarea diaria no está debajo de la adoración. Es uno de los lugares adonde va la adoración.',
          'Colosenses 3 rehúsa una vida partida. Todo lo que hagáis, hacedlo de corazón. El Señor es a quien sirves, aunque el amo del cuarto sea difícil.',
        ],
        application: [
          'Casi todos partimos la semana. Horas sagradas el domingo. Horas perdidas en el reloj. Cuando el jefe mira. Cuando el trabajo se siente chico. Cuando nadie sabrá si cortaste la esquina. El servicio de la vista es para los hombres. El del corazón es para Cristo. Un creyente puede barrer, enseñar, construir o administrar como ofrenda.',
          'La parte escondida del trabajo es la prueba. El correo que nadie audita. El tono con quien no puede despedirte. Haz esa parte como para el Señor.',
        ],
        challenge: [
          'Hermanos, ¿la aprobación de quién estás buscando de veras esta semana? El jefe. El cliente. Tu propio nombre. Quizás el miedo de que te vean flojo.',
          'Hermanos, ¿dónde tu trabajo se volvió servicio para ser visto? El momento en que él entra. El momento en que sale. Sabes la diferencia.',
        ],
        charge: [
          'Haz la siguiente tarea como para el Señor. Que la parte escondida sea tan honesta como la que la gente alaba.',
          'El mensaje de Pablo es directo: a Cristo el Señor servís. El cheque no es el supervisor.',
        ],
        questions: [
          [
            '¿Dónde tu trabajo se volvió servicio para ser visto?',
            '¿Qué cambiaría mañana si creyeras que sirves a Cristo en ese empleo?',
          ],
          [
            '¿Qué esquina cortas cuando nadie mira?',
            '¿Cómo puede la tarea ordinaria de esta semana ser una ofrenda?',
          ],
        ],
      },
      {
        punch: ['O verdadeiro Supervisor não é quem assina o cheque.', 'O serviço de aparência trabalha quando o chefe olha. O de coração trabalha porque Cristo é digno.'],
        context: [
          'Paulo fala a servos em Colossos, gente com pouca honra na sala. Fazei-o de coração, como para o Senhor e não para homens. A tarefa diária não está abaixo da adoração. É um dos lugares para onde a adoração vai.',
          'Colossenses 3 recusa uma vida partida. Tudo o que fizerdes, fazei-o de coração. O Senhor é a quem você serve, ainda que o senhor da sala seja difícil.',
        ],
        application: [
          'Quase todos partimos a semana. Horas sagradas no domingo. Horas perdidas no relógio. Quando o chefe olha. Quando o trabalho parece pequeno. Quando ninguém vai saber se você cortou o canto. O serviço de aparência é para homens. O de coração é para Cristo. Um crente pode varrer, ensinar, construir ou administrar como oferta.',
          'A parte escondida do trabalho é a prova. O e-mail que ninguém audita. O tom com quem não pode demitir você. Faça essa parte como para o Senhor.',
        ],
        challenge: [
          'Irmãos, a aprovação de quem você está buscando de fato nesta semana? O chefe. O cliente. O seu próprio nome. Talvez o medo de parecer preguiçoso.',
          'Irmãos, onde o seu trabalho virou serviço para ser visto? O momento em que ele entra. O momento em que sai. Você sabe a diferença.',
        ],
        charge: [
          'Faça a próxima tarefa como para o Senhor. Que a parte escondida seja tão honesta quanto a que as pessoas elogiam.',
          'A mensagem de Paulo é direta: servi a Cristo, o Senhor. O cheque não é o supervisor.',
        ],
        questions: [
          [
            'Onde o seu trabalho virou serviço para ser visto?',
            'O que mudaria amanhã se você cresse que serve a Cristo nesse emprego?',
          ],
          [
            'Que canto você corta quando ninguém olha?',
            'Como a tarefa ordinária desta semana pode ser uma oferta?',
          ],
        ],
      },
    ),
  },
  {
    id: 'family',
    keywords: [
      'family',
      'home',
      'household',
      'children',
      'parent',
      'parents',
      'parenting',
      'kids',
      'familia',
      'hogar',
      'hijos',
      'padres',
      'crianza',
      'lar',
      'filhos',
      'pais',
      'casa',
    ],
    bookId: 'jos',
    chapter: 24,
    verse: 15,
    endVerse: 15,
    lines: lines('family',
      {
        punch: ['A household follows the god the leader actually serves.', 'As for me and my house. Joshua says it out loud.'],
        context: [
          'Joshua is old. Israel is in the land, and the idols of the nations are still attractive. Choose you this day whom ye will serve. Then he binds his own house to the choice. As for me and my house, we will serve the Lord.',
          'This is a public line, not a private mood. The gods of the other side of the river are still on offer. Joshua refuses to let his house drift.',
        ],
        application: [
          'Most homes don’t decide. They drift. When we’re tired. When the screen is easier. When nobody is taking attendance. A family drifts into whatever is easy. Joshua’s sentence covers more than his quiet time. Parents and grown children live downstream of the god they choose.',
          'The rival god in a house is often small and daily. The phone at the table. The temper. The silence about the Lord. The choice has to be said, and then it has to be a habit the whole house can see.',
        ],
        challenge: [
          'Brothers, if someone watched your house this week, which god would they say you serve? The screen. The schedule. The Lord. Maybe a god you haven’t named.',
          'Brothers, what rival has been getting the best of your home? Name it. Then say Joshua’s sentence where your house can hear it.',
        ],
        charge: [
          'Make the choice in words today. Then make it in one habit the whole house can see.',
          'Joshua’s message is direct: as for me and my house, we will serve the Lord. Don’t leave the choice implied.',
        ],
        questions: [
          [
            'What rival god has been getting the best of your home?',
            'What would “as for me and my house” need to change this month?',
          ],
          [
            'What does your house learn about God from a normal evening?',
            'Which habit can the whole house see if you actually choose the Lord?',
          ],
        ],
      },
      {
        punch: ['Una casa sigue al dios que el que guía de veras sirve.', 'Yo y mi casa. Josué lo dice en voz alta.'],
        context: [
          'Josué es viejo. Israel está en la tierra, y los ídolos de las naciones siguen siendo atractivos. Escogeos hoy a quién sirváis. Luego ata su propia casa a la decisión. Yo y mi casa serviremos a Jehová.',
          'Es una línea pública, no un ánimo privado. Los dioses del otro lado del río siguen en oferta. Josué rehúsa dejar que su casa derive.',
        ],
        application: [
          'Casi ninguna casa decide. Deriva. Cuando estamos cansados. Cuando la pantalla es más fácil. Cuando nadie pasa lista. Una familia deriva hacia lo fácil. La frase de Josué cubre más que su tiempo a solas. Padres e hijos grandes viven río abajo del dios que eligen.',
          'El dios rival de una casa suele ser chico y diario. El teléfono en la mesa. El genio. El silencio acerca del Señor. La elección tiene que decirse, y luego tiene que ser un hábito que toda la casa vea.',
        ],
        challenge: [
          'Hermanos, si alguien mirara tu casa esta semana, ¿a qué dios diría que sirves? La pantalla. El horario. El Señor. Quizás un dios que no has nombrado.',
          'Hermanos, ¿qué rival se ha estado llevando lo mejor de tu hogar? Nómbralo. Luego di la frase de Josué donde tu casa pueda oírla.',
        ],
        charge: [
          'Haz la elección con palabras hoy. Luego hazla en un hábito que toda la casa pueda ver.',
          'El mensaje de Josué es directo: yo y mi casa serviremos a Jehová. No dejes la elección implícita.',
        ],
        questions: [
          [
            '¿Qué dios rival se ha estado llevando lo mejor de tu hogar?',
            '¿Qué tendría que cambiar este mes el “yo y mi casa”?',
          ],
          [
            '¿Qué aprende tu casa acerca de Dios en una noche normal?',
            '¿Qué hábito puede ver toda la casa si de veras escoges al Señor?',
          ],
        ],
      },
      {
        punch: ['Uma casa segue o deus que quem guia de fato serve.', 'Eu e a minha casa. Josué diz em voz alta.'],
        context: [
          'Josué está velho. Israel está na terra, e os ídolos das nações ainda atraem. Escolhei hoje a quem servireis. Depois ata a própria casa à decisão. Eu e a minha casa serviremos ao Senhor.',
          'É uma linha pública, não um humor particular. Os deuses do outro lado do rio ainda estão em oferta. Josué recusa deixar a casa derivar.',
        ],
        application: [
          'Quase nenhuma casa decide. Deriva. Quando estamos cansados. Quando a tela é mais fácil. Quando ninguém faz a chamada. Uma família deriva para o que é fácil. A frase de Josué cobre mais que o tempo a sós. Pais e filhos grandes vivem rio abaixo do deus que escolhem.',
          'O deus rival de uma casa costuma ser pequeno e diário. O telefone na mesa. O gênio. O silêncio acerca do Senhor. A escolha tem de ser dita, e depois tem de ser um hábito que a casa inteira veja.',
        ],
        challenge: [
          'Irmãos, se alguém olhasse a sua casa nesta semana, a que deus diria que você serve? A tela. A agenda. O Senhor. Talvez um deus que você não nomeou.',
          'Irmãos, que rival tem levado o melhor do seu lar? Nomeie. Depois diga a frase de Josué onde a sua casa possa ouvir.',
        ],
        charge: [
          'Faça a escolha em palavras hoje. Depois faça-a num hábito que a casa inteira possa ver.',
          'A mensagem de Josué é direta: eu e a minha casa serviremos ao Senhor. Não deixe a escolha implícita.',
        ],
        questions: [
          [
            'Que deus rival tem levado o melhor do seu lar?',
            'O que “eu e a minha casa” precisaria mudar neste mês?',
          ],
          [
            'O que a sua casa aprende acerca de Deus numa noite normal?',
            'Que hábito a casa inteira pode ver se você de fato escolher o Senhor?',
          ],
        ],
      },
    ),
  },
  {
    id: 'marriage',
    keywords: [
      'marriage',
      'married',
      'husband',
      'wife',
      'wedding',
      'spouse',
      'matrimonio',
      'esposo',
      'esposa',
      'casados',
      'boda',
      'casamiento',
      'casamento',
      'marido',
      'noivo',
      'noiva',
      'conyuge',
      'conjuge',
    ],
    bookId: 'eph',
    chapter: 5,
    verse: 25,
    endVerse: 25,
    lines: lines('marriage',
      {
        punch: ['Husbands, love your wives. The pattern is a cross, not a mood.', 'Christ loved the church and gave himself. That’s the sentence.'],
        context: [
          'Paul has been talking about walking in love. Then he comes into the house. Husbands, love your wives, even as Christ also loved the church, and gave himself for it. The measure isn’t how she treats you today. It’s how Christ treated a people who did not earn the cross.',
          'Ephesians 5 is not a bargain. Christ gives himself. The husband is pointed at that gift, not at a scoreboard of who did the dishes.',
        ],
        application: [
          'Most of us love on a condition. When she is kind. When he notices. When the house is peaceful. We put love on layaway and call it fairness. Christ didn’t wait for the church to be lovely. He gave himself while we were not.',
          'A marriage dies in the small refusals. The tone. The phone instead of the face. The silence used as a weapon. Love that looks like Christ spends itself.',
        ],
        challenge: [
          'Brothers, where has your love been waiting to be earned? A tone. A week of distance. A kindness you withheld. Maybe a marriage you have reduced to a roommate agreement.',
          'Brothers, what would it look like to give yourself this week, not just your opinion? One concrete act. Not a speech.',
        ],
        charge: [
          'Love like the cross, not like a contract. Do the costly kindness before you feel like a hero.',
          'Paul’s message is direct: love your wives, as Christ loved the church. He gave himself. Start there.',
        ],
        questions: [
          [
            'Where are you waiting for your spouse to deserve love before you give it?',
            'What costly kindness would look like Christ in your house this week?',
          ],
          [
            'What have you been withholding until the other person goes first?',
            'How is your tone at home different from the love you sing about?',
          ],
        ],
      },
      {
        punch: ['Maridos, amad a vuestras mujeres. El modelo es una cruz, no un ánimo.', 'Cristo amó a la iglesia y se entregó. Esa es la frase.'],
        context: [
          'Pablo ha estado hablando de andar en amor. Luego entra en la casa. Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella. La medida no es cómo ella te trata hoy. Es cómo Cristo trató a un pueblo que no se ganó la cruz.',
          'Efesios 5 no es un trato. Cristo se da. Al esposo se le señala ese don, no un marcador de quién lavó los platos.',
        ],
        application: [
          'Casi todos amamos bajo condición. Cuando ella es amable. Cuando él nota. Cuando la casa está en paz. Ponemos el amor en espera y lo llamamos justicia. Cristo no esperó a que la iglesia fuera hermosa. Se entregó cuando no lo éramos.',
          'Un matrimonio se muere en las negativas chicas. El tono. El teléfono en vez del rostro. El silencio usado como arma. Un amor que se parece a Cristo se gasta.',
        ],
        challenge: [
          'Hermanos, ¿dónde tu amor ha estado esperando ser ganado? Un tono. Una semana de distancia. Una bondad que retuviste. Quizás un matrimonio que redujiste a un acuerdo de compañeros de cuarto.',
          'Hermanos, ¿cómo se vería entregarte esta semana, no solo tu opinión? Un acto concreto. No un discurso.',
        ],
        charge: [
          'Ama como la cruz, no como un contrato. Haz la bondad costosa antes de sentirte un héroe.',
          'El mensaje de Pablo es directo: amad a vuestras mujeres, como Cristo amó a la iglesia. Él se entregó. Empieza ahí.',
        ],
        questions: [
          [
            '¿Dónde estás esperando que tu cónyuge merezca el amor antes de darlo?',
            '¿Qué bondad costosa se parecería a Cristo en tu casa esta semana?',
          ],
          [
            '¿Qué has estado reteniendo hasta que el otro dé el primer paso?',
            '¿En qué se diferencia tu tono en casa del amor del que cantas?',
          ],
        ],
      },
      {
        punch: ['Maridos, amai vossas mulheres. O modelo é uma cruz, não um humor.', 'Cristo amou a igreja e se entregou. Essa é a frase.'],
        context: [
          'Paulo vinha falando de andar em amor. Depois entra na casa. Vós, maridos, amai vossas mulheres, como também Cristo amou a igreja, e a si mesmo se entregou por ela. A medida não é como ela trata você hoje. É como Cristo tratou um povo que não mereceu a cruz.',
          'Efésios 5 não é um acordo. Cristo se dá. O marido é apontado para esse dom, não para um placar de quem lavou a louça.',
        ],
        application: [
          'Quase todos amamos sob condição. Quando ela é amável. Quando ele nota. Quando a casa está em paz. Deixamos o amor para depois e chamamos de justiça. Cristo não esperou a igreja ficar bela. Entregou-se quando não éramos.',
          'Um casamento morre nas recusas pequenas. O tom. O telefone em vez do rosto. O silêncio usado como arma. Um amor que se parece com Cristo se gasta.',
        ],
        challenge: [
          'Irmãos, onde o seu amor tem esperado ser merecido? Um tom. Uma semana de distância. Uma bondade que você segurou. Talvez um casamento que você reduziu a um acordo de colegas de quarto.',
          'Irmãos, como seria entregar-se nesta semana, não só a sua opinião? Um ato concreto. Não um discurso.',
        ],
        charge: [
          'Ame como a cruz, não como um contrato. Faça a bondade custosa antes de se sentir um herói.',
          'A mensagem de Paulo é direta: amai vossas mulheres, como Cristo amou a igreja. Ele se entregou. Comece aí.',
        ],
        questions: [
          [
            'Onde você está esperando que o seu cônjuge mereça o amor antes de dá-lo?',
            'Que bondade custosa se pareceria com Cristo na sua casa nesta semana?',
          ],
          [
            'O que você tem segurado até o outro dar o primeiro passo?',
            'Em que o seu tom em casa é diferente do amor que você canta?',
          ],
        ],
      },
    ),
  },
  {
    id: 'generosity',
    keywords: [
      'money',
      'giving',
      'generosity',
      'generous',
      'tithe',
      'steward',
      'stewardship',
      'offering',
      'dinero',
      'ofrenda',
      'generosidad',
      'diezmo',
      'mayordomia',
      'dinheiro',
      'oferta',
      'generosidade',
      'dizimo',
      'mordomia',
      'bills',
      'debt',
      'debts',
      'deuda',
      'deudas',
      'divida',
      'dividas',
      'contas',
    ],
    bookId: '2co',
    chapter: 9,
    verse: 7,
    endVerse: 7,
    lines: lines('generosity',
      {
        punch: ['God loves a giver whose heart has already decided.', 'A tight fist feels like wisdom. Paul calls it a grudging gift.'],
        context: [
          'Paul is gathering a gift for poor believers. He doesn’t want Corinth to give from pressure or from a grudge. Every man according as he purposeth in his heart, not grudgingly, or of necessity: for God loveth a cheerful giver. The money is worship before it is math.',
          '2 Corinthians 9 ties the gift to God’s supply. He is able to make all grace abound. The cheerful heart isn’t naive. It trusts the Supplier.',
        ],
        application: [
          'Most of us clutch and call it wisdom. When the month is thin. When someone might waste it. When giving would be seen. Or we give to be seen and call it faith. Cheerful giving is neither. It’s a heart that decided before the plate showed up.',
          'A grudging gift can still feed someone. It doesn’t yet look like love. Purpose the gift. Then give it like you mean the trust.',
        ],
        challenge: [
          'Brothers, is your hand tight because you don’t trust the Supplier? The rent. The fear of not enough. The gift you calculate down to nothing. Maybe a generosity that only happens when people are watching.',
          'Brothers, what would cheerful giving look like in the budget you actually have? Not a fantasy number. A decision.',
        ],
        charge: [
          'Purpose a gift before the need surprises you. Give it cheerfully, as to the Lord.',
          'Paul’s message is direct: God loveth a cheerful giver. Decide with your heart, then open your hand.',
        ],
        questions: [
          [
            'Where does fear of not having enough decide what you give?',
            'What would cheerful giving look like in your actual budget this month?',
          ],
          [
            'What gift have you delayed until you feel safe?',
            'Who is helped if your hand opens this week?',
          ],
        ],
      },
      {
        punch: ['Dios ama al dador que ya decidió en el corazón.', 'El puño cerrado se siente como prudencia. Pablo lo llama una ofrenda de mala gana.'],
        context: [
          'Pablo junta una ofrenda para creyentes pobres. No quiere que Corinto dé por presión ni de mala gana. Cada uno dé como propuso en su corazón, no con tristeza ni por necesidad, porque Dios ama al dador alegre. El dinero es adoración antes de ser cuenta.',
          '2 Corintios 9 ata la ofrenda a la provisión de Dios. Poderoso es para hacer que abunde en vosotros toda gracia. El corazón alegre no es ingenuo. Confía en el que provee.',
        ],
        application: [
          'Casi todos apretamos y lo llamamos prudencia. Cuando el mes está corto. Cuando alguien podría desperdiciarlo. Cuando dar se vería. O damos para que nos vean y lo llamamos fe. Dar con alegría no es ninguna de las dos. Es un corazón que decidió antes de que llegara el plato.',
          'Una ofrenda de mala gana todavía puede alimentar a alguien. Todavía no parece amor. Propón la ofrenda. Luego dala como quien de veras confía.',
        ],
        challenge: [
          'Hermanos, ¿la mano está cerrada porque no confías en el que provee? La renta. El miedo de no tener suficiente. La ofrenda que calculas hasta dejarla en nada. Quizás una generosidad que solo aparece cuando la gente mira.',
          'Hermanos, ¿cómo se vería dar con alegría en el presupuesto que de veras tienes? No un número de fantasía. Una decisión.',
        ],
        charge: [
          'Propón una ofrenda antes de que la necesidad te sorprenda. Dala con alegría, como al Señor.',
          'El mensaje de Pablo es directo: Dios ama al dador alegre. Decide en el corazón, y luego abre la mano.',
        ],
        questions: [
          [
            '¿Dónde el miedo de no tener suficiente decide lo que das?',
            '¿Cómo se vería dar con alegría en tu presupuesto real de este mes?',
          ],
          [
            '¿Qué ofrenda has retrasado hasta sentirte seguro?',
            '¿A quién ayudas si tu mano se abre esta semana?',
          ],
        ],
      },
      {
        punch: ['Deus ama quem dá com o coração já decidido.', 'O punho fechado parece prudência. Paulo chama isso de oferta de má vontade.'],
        context: [
          'Paulo junta uma oferta para crentes pobres. Ele não quer que Corinto dê por pressão nem de má vontade. Cada um dê como propôs no coração, não com tristeza nem por necessidade, porque Deus ama a quem dá com alegria. O dinheiro é adoração antes de ser conta.',
          '2 Coríntios 9 ata a oferta à provisão de Deus. Poderoso é para fazer abundar em vós toda a graça. O coração alegre não é ingênuo. Confia em quem supre.',
        ],
        application: [
          'Quase todos apertamos e chamamos de prudência. Quando o mês está curto. Quando alguém poderia desperdiçar. Quando dar seria visto. Ou damos para ser vistos e chamamos de fé. Dar com alegria não é nenhuma das duas. É um coração que decidiu antes de o prato chegar.',
          'Uma oferta de má vontade ainda pode alimentar alguém. Ainda não parece amor. Proponha a oferta. Depois dê como quem de fato confia.',
        ],
        challenge: [
          'Irmãos, a mão está fechada porque você não confia em quem supre? O aluguel. O medo de não ter o suficiente. A oferta que você calcula até zerar. Talvez uma generosidade que só aparece quando as pessoas olham.',
          'Irmãos, como seria dar com alegria no orçamento que você de fato tem? Não um número de fantasia. Uma decisão.',
        ],
        charge: [
          'Proponha uma oferta antes que a necessidade surpreenda. Dê com alegria, como ao Senhor.',
          'A mensagem de Paulo é direta: Deus ama a quem dá com alegria. Decida no coração, e depois abra a mão.',
        ],
        questions: [
          [
            'Onde o medo de não ter o suficiente decide o que você dá?',
            'Como seria dar com alegria no seu orçamento real deste mês?',
          ],
          [
            'Que oferta você adiou até se sentir seguro?',
            'Quem é ajudado se a sua mão abrir nesta semana?',
          ],
        ],
      },
    ),
  },
  {
    id: 'anger',
    keywords: [
      'anger',
      'angry',
      'wrath',
      'temper',
      'rage',
      'ira',
      'enojo',
      'enojado',
      'colera',
      'genio',
      'raiva',
      'furia',
    ],
    bookId: 'jas',
    chapter: 1,
    verse: 19,
    endVerse: 20,
    lines: lines('anger',
      {
        punch: ['The anger of man does not work the righteousness of God.', 'A hot word can feel like zeal and still be the flesh.'],
        context: [
          'James tells the brothers to be swift to hear, slow to speak, slow to wrath. He doesn’t say feelings are fake. The wrath of man worketh not the righteousness of God. Heat is not the same thing as holiness.',
          'The verse sits next to receiving the word. A slow tongue makes room for the Word to be heard before you defend yourself.',
        ],
        application: [
          'Most of us baptize irritation and call it standing for truth. When they disrespect you. When the meeting goes long. When the tone in the kitchen spikes. Sometimes truth does need a clear no. This verse asks whether the heat is serving God or serving you.',
          'Swift to hear is not weakness. It’s the first obedience. The sentence you stop may be the one that was about to do damage in the name of being right.',
        ],
        challenge: [
          'Brothers, whose face tightens your voice before you have heard them? Your child. Your wife. A brother in the church. Maybe a stranger who got the tone wrong.',
          'Brothers, where has your anger been pretending to be righteousness? Name the last hot sentence. Don’t dress it up.',
        ],
        charge: [
          'Be swift to hear this week. If wrath rises, stop the sentence. God’s righteousness does not need your temper to finish his work.',
          'James’ message is direct: slow to wrath. The anger of man will not produce the righteousness of God.',
        ],
        questions: [
          [
            'Where has your anger been pretending to be righteousness?',
            'Who needs you to be slow to speak the next time you meet?',
          ],
          [
            'What sentence do you need to stop before it leaves your mouth?',
            'How is being swift to hear different from building your reply?',
          ],
        ],
      },
      {
        punch: ['La ira del hombre no obra la justicia de Dios.', 'Una palabra caliente puede sentirse como celo y seguir siendo carne.'],
        context: [
          'Santiago dice a los hermanos que sean prontos para oír, tardos para hablar, tardos para airarse. No dice que los sentimientos sean falsos. La ira del hombre no obra la justicia de Dios. El calor no es lo mismo que la santidad.',
          'El versículo está junto a recibir la palabra. Una lengua lenta deja espacio para que la Palabra se oiga antes de que te defiendas.',
        ],
        application: [
          'Casi todos bautizamos la irritación y la llamamos defender la verdad. Cuando te faltan el respeto. Cuando la reunión se alarga. Cuando el tono en la cocina se dispara. A veces la verdad sí necesita un no claro. Este versículo pregunta si el calor sirve a Dios o te sirve a ti.',
          'Ser pronto para oír no es debilidad. Es la primera obediencia. La frase que detienes puede ser la que iba a hacer daño en nombre de tener la razón.',
        ],
        challenge: [
          'Hermanos, ¿el rostro de quién te aprieta la voz antes de haberlo oído? Tu hijo. Tu esposa. Un hermano de la iglesia. Quizás un extraño que erró el tono.',
          'Hermanos, ¿dónde tu ira ha estado fingiendo ser justicia? Nombra la última frase caliente. No la vistas.',
        ],
        charge: [
          'Sé pronto para oír esta semana. Si la ira sube, detén la frase. La justicia de Dios no necesita tu genio para acabar la obra.',
          'El mensaje de Santiago es directo: tardos para airarse. La ira del hombre no va a producir la justicia de Dios.',
        ],
        questions: [
          [
            '¿Dónde tu ira ha estado fingiendo ser justicia?',
            '¿Quién necesita que seas tardo para hablar la próxima vez que se encuentren?',
          ],
          [
            '¿Qué frase necesitas detener antes de que salga de tu boca?',
            '¿En qué se diferencia ser pronto para oír de armar la respuesta?',
          ],
        ],
      },
      {
        punch: ['A ira do homem não opera a justiça de Deus.', 'Uma palavra quente pode parecer zelo e ainda ser carne.'],
        context: [
          'Tiago diz aos irmãos que sejam prontos para ouvir, tardios para falar, tardios para se irar. Ele não diz que os sentimentos são falsos. A ira do homem não opera a justiça de Deus. O calor não é a mesma coisa que a santidade.',
          'O versículo está junto de receber a palavra. Uma língua lenta abre espaço para a Palavra ser ouvida antes de você se defender.',
        ],
        application: [
          'Quase todos batizamos a irritação e chamamos de defender a verdade. Quando faltam com o respeito. Quando a reunião se estica. Quando o tom na cozinha dispara. Às vezes a verdade precisa mesmo de um não claro. Este versículo pergunta se o calor serve a Deus ou serve a você.',
          'Ser pronto para ouvir não é fraqueza. É a primeira obediência. A frase que você para pode ser a que ia fazer dano em nome de estar certo.',
        ],
        challenge: [
          'Irmãos, o rosto de quem aperta a sua voz antes de você o ouvir? O seu filho. A sua esposa. Um irmão da igreja. Talvez um estranho que errou o tom.',
          'Irmãos, onde a sua ira tem fingido ser justiça? Nomeie a última frase quente. Não a vista.',
        ],
        charge: [
          'Seja pronto para ouvir nesta semana. Se a ira subir, pare a frase. A justiça de Deus não precisa do seu gênio para acabar a obra.',
          'A mensagem de Tiago é direta: tardios para se irar. A ira do homem não vai produzir a justiça de Deus.',
        ],
        questions: [
          [
            'Onde a sua ira tem fingido ser justiça?',
            'Quem precisa que você seja tardio para falar na próxima vez que se encontrarem?',
          ],
          [
            'Que frase você precisa parar antes de ela sair da boca?',
            'Em que ser pronto para ouvir é diferente de montar a resposta?',
          ],
        ],
      },
    ),
  },
]

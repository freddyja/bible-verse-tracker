import type { SermonLang, SermonLines, SermonOutline } from '../types'

function lines(en: SermonLines, es: SermonLines, pt: SermonLines): Record<SermonLang, SermonLines> {
  return { en, es, pt }
}

export const REST: readonly SermonOutline[] = [
  {
    id: 'purpose',
    keywords: [
      'purpose',
      'calling',
      'vocation',
      'why am i here',
      'good works',
      'proposito',
      'llamado',
      'vocacion',
      'buenas obras',
      'hechura',
      'chamado',
      'vocacao',
      'boas obras',
      'feitura',
    ],
    bookId: 'eph',
    chapter: 2,
    verse: 10,
    endVerse: 10,
    lines: lines(
      {
        punch: ['You are not an accident with a busy calendar.', 'Purpose isn’t a feeling you discover. It’s a path God already prepared.'],
        context: [
          'Paul has just said salvation is by grace through faith, not of works. Then he says we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them. The works don’t buy you. They are the path.',
          'Workmanship means God made you on purpose. The good works were prepared beforehand. You don’t invent a spectacular calling to avoid the step in front of you.',
        ],
        application: [
          'Most of us hunt a vision and ignore the good work already in the week. When it looks ordinary. When nobody claps. When faithfulness at home doesn’t feel like a calling. Waiting for a vision can be a way of refusing the path already marked. Faithfulness at home. Truth at work. Mercy in the church. Walk in those.',
          'You don’t need a new identity. You need the next step he prepared. Boredom with an ordained work is still a no.',
        ],
        challenge: [
          'Brothers, what good work is already in your path that you are calling ordinary? The house. The job. The brother who needs you. Maybe a mercy you keep renaming “someone else’s job.”',
          'Brothers, where are you bored with a work God already ordained? Walk in it this week.',
        ],
        charge: [
          'Take the step he prepared. You are his workmanship, not your own project.',
          'Paul’s message is direct: we are his workmanship, created unto good works. Walk in them. Don’t wait for a louder calling.',
        ],
        questions: [
          [
            'Where are you bored with a work God already ordained?',
            'What would change if you believed you are his workmanship, not your own project?',
          ],
          [
            'What ordinary obedience have you been waiting to feel called to?',
            'Which prepared work is already in front of you this week?',
          ],
        ],
      },
      {
        punch: ['No eres un accidente con un calendario lleno.', 'El propósito no es un sentimiento que descubres. Es un camino que Dios ya preparó.'],
        context: [
          'Pablo acaba de decir que la salvación es por gracia mediante la fe, no por obras. Luego dice que somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas. Las obras no te compran. Son el camino.',
          'Hechura significa que Dios te hizo a propósito. Las buenas obras fueron preparadas de antemano. No inventas un llamado espectacular para evitar el paso que está delante.',
        ],
        application: [
          'Casi todos buscamos una visión e ignoramos la buena obra que ya está en la semana. Cuando se ve ordinaria. Cuando nadie aplaude. Cuando la fidelidad en casa no se siente como llamado. Esperar una visión puede ser una forma de rehusar el camino ya marcado. Fidelidad en casa. Verdad en el trabajo. Misericordia en la iglesia. Anda en eso.',
          'No necesitas una identidad nueva. Necesitas el siguiente paso que él preparó. Aburrirte de una obra ya ordenada sigue siendo un no.',
        ],
        challenge: [
          'Hermanos, ¿qué buena obra ya está en tu camino y la estás llamando ordinaria? La casa. El trabajo. El hermano que te necesita. Quizás una misericordia que sigues renombrando “el trabajo de otro”.',
          'Hermanos, ¿dónde estás aburrido de una obra que Dios ya preparó? Anda en ella esta semana.',
        ],
        charge: [
          'Da el paso que él preparó. Eres hechura suya, no tu propio proyecto.',
          'El mensaje de Pablo es directo: somos hechura suya, creados para buenas obras. Andad en ellas. No esperes un llamado más ruidoso.',
        ],
        questions: [
          [
            '¿Dónde estás aburrido de una obra que Dios ya preparó?',
            '¿Qué cambiaría si creyeras que eres hechura suya, no tu propio proyecto?',
          ],
          [
            '¿Qué obediencia ordinaria has estado esperando sentir como llamado?',
            '¿Qué obra preparada ya está delante de ti esta semana?',
          ],
        ],
      },
      {
        punch: ['Você não é um acidente com a agenda cheia.', 'O propósito não é um sentimento que você descobre. É um caminho que Deus já preparou.'],
        context: [
          'Paulo acabou de dizer que a salvação é pela graça, por meio da fé, não por obras. Depois diz que somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou antes para que andássemos nelas. As obras não compram você. São o caminho.',
          'Feitura significa que Deus fez você de propósito. As boas obras foram preparadas de antemão. Você não inventa um chamado espetacular para evitar o passo na frente.',
        ],
        application: [
          'Quase todos caçamos uma visão e ignoramos a boa obra que já está na semana. Quando parece ordinária. Quando ninguém aplaude. Quando a fidelidade em casa não parece chamado. Esperar uma visão pode ser um modo de recusar o caminho já marcado. Fidelidade em casa. Verdade no trabalho. Misericórdia na igreja. Ande nisso.',
          'Você não precisa de uma identidade nova. Precisa do próximo passo que ele preparou. Entediar-se de uma obra já ordenada ainda é um não.',
        ],
        challenge: [
          'Irmãos, que boa obra já está no seu caminho e você está chamando de ordinária? A casa. O trabalho. O irmão que precisa de você. Talvez uma misericórdia que você continua renomeando “trabalho de outro”.',
          'Irmãos, onde você está entediado de uma obra que Deus já preparou? Ande nela nesta semana.',
        ],
        charge: [
          'Dê o passo que ele preparou. Você é feitura dele, não o seu próprio projeto.',
          'A mensagem de Paulo é direta: somos feitura dele, criados para boas obras. Andai nelas. Não espere um chamado mais barulhento.',
        ],
        questions: [
          [
            'Onde você está entediado de uma obra que Deus já preparou?',
            'O que mudaria se você cresse que é feitura dele, não o seu próprio projeto?',
          ],
          [
            'Que obediência ordinária você tem esperado sentir como chamado?',
            'Que obra preparada já está na sua frente nesta semana?',
          ],
        ],
      },
    ),
  },
  {
    id: 'rest',
    keywords: [
      'rest',
      'weary',
      'burden',
      'tired',
      'burnout',
      'descanso',
      'cansancio',
      'carga',
      'agotado',
      'yugo',
      'cansaco',
      'fardo',
      'exausto',
      'jugo',
    ],
    bookId: 'mat',
    chapter: 11,
    verse: 28,
    endVerse: 30,
    lines: lines(
      {
        punch: ['Rest is a person who says, Come unto me.', 'His yoke is easy because he carries it with you.'],
        context: [
          'Jesus has been rejected by cities that saw his works. Then he turns and calls the weary. Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke. His burden is light because he is in it with you. The invitation isn’t to quit faithfulness. It’s to quit carrying life without him.',
          'Matthew 11 is a call, not a vacation ad. Come. Take. Learn of me. Rest is found in coming, not in arranging a quieter week and still staying away.',
        ],
        application: [
          'Most weariness comes from yokes we built. When we need to be impressive. When we refuse help. When we fear disappointing people. We call the extra weight faithfulness. Christ doesn’t add a second religion on top of that. He offers his yoke. A quieter calendar with the same pride is not rest.',
          'Come is a direction. Put the extra yoke down. Do one thing this week from rest, not from panic.',
        ],
        challenge: [
          'Brothers, what load are you calling faithfulness that he never asked you to carry alone? The image. The yes you can’t keep. The fear of being ordinary. Maybe a yoke somebody else put on you.',
          'Brothers, what are you weary of that you have not brought to him? Come. Don’t manage it from a distance.',
        ],
        charge: [
          'Come. Put the extra yoke down. Take his. Learn of him. He is meek and lowly in heart.',
          'Jesus’ message is direct: come unto me, and I will give you rest. Don’t leave the invitation in the hallway.',
        ],
        questions: [
          [
            'What are you weary of that you have not brought to him?',
            'Whose yoke are you wearing besides Christ’s?',
          ],
          [
            'What would one act from rest, not panic, look like this week?',
            'Where have you been trying to rest without coming to him?',
          ],
        ],
      },
      {
        punch: ['El descanso es una persona que dice: Venid a mí.', 'Su yugo es fácil porque él lo lleva contigo.'],
        context: [
          'Jesús ha sido rechazado por ciudades que vieron sus obras. Luego se vuelve y llama a los cansados. Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Llevad mi yugo. Su carga es ligera porque él está en ella contigo. La invitación no es dejar la fidelidad. Es dejar de cargar la vida sin él.',
          'Mateo 11 es un llamado, no un anuncio de vacaciones. Venid. Tomad. Aprended de mí. El descanso se halla viniendo, no arreglando una semana más quieta y siguiendo lejos.',
        ],
        application: [
          'Casi todo el cansancio viene de yugos que nosotros armamos. Cuando necesitamos impresionar. Cuando rehusamos ayuda. Cuando tememos decepcionar. Llamamos fidelidad al peso de más. Cristo no añade una segunda religión encima de eso. Ofrece su yugo. Un calendario más quieto con el mismo orgullo no es descanso.',
          'Venid es una dirección. Suelta el yugo de más. Haz una cosa esta semana desde el descanso, no desde el pánico.',
        ],
        challenge: [
          'Hermanos, ¿qué carga estás llamando fidelidad que él nunca te pidió cargar solo? La imagen. El sí que no puedes cumplir. El miedo de ser ordinario. Quizás un yugo que otro te puso.',
          'Hermanos, ¿de qué estás cansado y todavía no se lo has traído? Ven. No lo manejes a distancia.',
        ],
        charge: [
          'Ven. Suelta el yugo de más. Toma el suyo. Aprende de él. Es manso y humilde de corazón.',
          'El mensaje de Jesús es directo: venid a mí, y yo os haré descansar. No dejes la invitación en el pasillo.',
        ],
        questions: [
          [
            '¿De qué estás cansado y todavía no se lo has traído?',
            '¿El yugo de quién llevas además del de Cristo?',
          ],
          [
            '¿Cómo se vería una acción desde el descanso, no desde el pánico, esta semana?',
            '¿Dónde has estado tratando de descansar sin venir a él?',
          ],
        ],
      },
      {
        punch: ['O descanso é uma pessoa que diz: Vinde a mim.', 'O jugo dele é suave porque ele o leva com você.'],
        context: [
          'Jesus foi rejeitado por cidades que viram as suas obras. Depois se volta e chama os cansados. Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Tomai o meu jugo. O fardo dele é leve porque ele está nele com você. O convite não é largar a fidelidade. É largar de carregar a vida sem ele.',
          'Mateus 11 é um chamado, não um anúncio de férias. Vinde. Tomai. Aprendei de mim. O descanso se acha vindo, não arrumando uma semana mais quieta e continuando longe.',
        ],
        application: [
          'Quase todo o cansaço vem de jugos que nós montamos. Quando precisamos impressionar. Quando recusamos ajuda. Quando tememos decepcionar. Chamamos de fidelidade o peso a mais. Cristo não acrescenta uma segunda religião em cima disso. Oferece o seu jugo. Uma agenda mais quieta com o mesmo orgulho não é descanso.',
          'Vinde é uma direção. Largue o jugo a mais. Faça uma coisa nesta semana a partir do descanso, não do pânico.',
        ],
        challenge: [
          'Irmãos, que carga você está chamando de fidelidade que ele nunca pediu que carregasse sozinho? A imagem. O sim que você não consegue cumprir. O medo de ser ordinário. Talvez um jugo que outro pôs em você.',
          'Irmãos, de que você está cansado e ainda não trouxe a ele? Venha. Não administre isso de longe.',
        ],
        charge: [
          'Venha. Largue o jugo a mais. Tome o dele. Aprenda dele. Ele é manso e humilde de coração.',
          'A mensagem de Jesus é direta: vinde a mim, e eu vos aliviarei. Não deixe o convite no corredor.',
        ],
        questions: [
          [
            'De que você está cansado e ainda não trouxe a ele?',
            'O jugo de quem você está usando além do de Cristo?',
          ],
          [
            'Como seria uma ação a partir do descanso, não do pânico, nesta semana?',
            'Onde você tem tentado descansar sem vir a ele?',
          ],
        ],
      },
    ),
  },
  {
    id: 'worship',
    keywords: [
      'worship',
      'praise',
      'adoration',
      'adorar',
      'alabanza',
      'adoracion',
      'louvor',
      'adoracao',
      'adoradores',
      'culto',
    ],
    bookId: 'jhn',
    chapter: 4,
    verse: 24,
    endVerse: 24,
    lines: lines(
      {
        punch: ['The Father is seeking worshipers, not spectators.', 'You can sing and still stay far.'],
        context: [
          'Jesus speaks with a Samaritan woman at a well. She raises the old argument about the right mountain. He moves the question. The hour has come when true worshipers worship the Father in spirit and in truth. God is a Spirit. The heart cannot hide behind a location.',
          'She came for water. He offers living water, and then he talks about worship. Place still matters for the gathered church. It cannot cover a heart that isn’t actually before God.',
        ],
        application: [
          'Most of us can attend and never worship. When the song is familiar. When we stand and think about lunch. When the words don’t match the week. Spirit and truth means the inner person is before God, and the words match who he is. Worship isn’t a mood we wait for on Sunday. It’s the honest offering of people who know they need living water.',
          'Name one false thing you have been singing past. Give the Father the honesty he is seeking.',
        ],
        challenge: [
          'Brothers, are you worshiping, or are you attending? The mouth. The heart. You can tell the difference if you will.',
          'Brothers, what part of your worship is only a place and a habit? Come in truth this week.',
        ],
        charge: [
          'Come in truth. The Father is seeking worshipers. Don’t hand him a performance.',
          'Jesus’ message is direct: worship in spirit and in truth. God is a Spirit, and he is seeking that kind of worshiper.',
        ],
        questions: [
          [
            'What part of your worship is only a place and a habit?',
            'What would spirit and truth change in the way you sing, pray, or sit in the room?',
          ],
          [
            'What false thing have you been singing past?',
            'Where are you a spectator in a room where the Father is seeking worshipers?',
          ],
        ],
      },
      {
        punch: ['El Padre busca adoradores, no espectadores.', 'Puedes cantar y seguir lejos.'],
        context: [
          'Jesús habla con una mujer samaritana junto al pozo. Ella levanta la vieja discusión de cuál es el monte correcto. Él mueve la pregunta. La hora viene cuando los verdaderos adoradores adorarán al Padre en espíritu y en verdad. Dios es Espíritu. El corazón no puede esconderse detrás de un sitio.',
          'Ella vino por agua. Él ofrece agua viva, y luego habla de adoración. El lugar sigue importando para la iglesia reunida. No puede cubrir un corazón que no está de veras delante de Dios.',
        ],
        application: [
          'Casi todos podemos asistir y nunca adorar. Cuando la canción es conocida. Cuando estamos de pie pensando en el almuerzo. Cuando las palabras no coinciden con la semana. Espíritu y verdad significa que la persona interior está delante de Dios, y que las palabras coinciden con quién él es. La adoración no es un ánimo que esperamos el domingo. Es la ofrenda honesta de gente que sabe que necesita agua viva.',
          'Nombra una cosa falsa que has estado cantando de paso. Dale al Padre la honestidad que él busca.',
        ],
        challenge: [
          'Hermanos, ¿estás adorando, o estás asistiendo? La boca. El corazón. Puedes notar la diferencia si quieres.',
          'Hermanos, ¿qué parte de tu adoración es solo un lugar y una costumbre? Ven en verdad esta semana.',
        ],
        charge: [
          'Ven en verdad. El Padre busca adoradores. No le entregues una actuación.',
          'El mensaje de Jesús es directo: adorad en espíritu y en verdad. Dios es Espíritu, y busca esa clase de adorador.',
        ],
        questions: [
          [
            '¿Qué parte de tu adoración es solo un lugar y una costumbre?',
            '¿Qué cambiarían el espíritu y la verdad en tu canto, tu oración o tu manera de sentarte en el cuarto?',
          ],
          [
            '¿Qué cosa falsa has estado cantando de paso?',
            '¿Dónde eres espectador en un cuarto donde el Padre busca adoradores?',
          ],
        ],
      },
      {
        punch: ['O Pai busca adoradores, não espectadores.', 'Você pode cantar e continuar longe.'],
        context: [
          'Jesus fala com uma mulher samaritana junto ao poço. Ela levanta a velha discussão de qual é o monte certo. Ele move a pergunta. A hora vem quando os verdadeiros adoradores adorarão o Pai em espírito e em verdade. Deus é Espírito. O coração não pode se esconder atrás de um sítio.',
          'Ela veio por água. Ele oferece água viva, e depois fala de adoração. O lugar ainda importa para a igreja reunida. Não pode cobrir um coração que não está de fato diante de Deus.',
        ],
        application: [
          'Quase todos podemos assistir e nunca adorar. Quando a canção é conhecida. Quando estamos de pé pensando no almoço. Quando as palavras não combinam com a semana. Espírito e verdade significa que a pessoa interior está diante de Deus, e que as palavras combinam com quem ele é. A adoração não é um humor que esperamos no domingo. É a oferta honesta de gente que sabe que precisa de água viva.',
          'Nomeie uma coisa falsa que você tem cantado por cima. Dê ao Pai a honestidade que ele busca.',
        ],
        challenge: [
          'Irmãos, você está adorando, ou está assistindo? A boca. O coração. Você consegue notar a diferença se quiser.',
          'Irmãos, que parte da sua adoração é só um lugar e um costume? Venha em verdade nesta semana.',
        ],
        charge: [
          'Venha em verdade. O Pai busca adoradores. Não lhe entregue uma performance.',
          'A mensagem de Jesus é direta: adorai em espírito e em verdade. Deus é Espírito, e busca essa espécie de adorador.',
        ],
        questions: [
          [
            'Que parte da sua adoração é só um lugar e um costume?',
            'O que espírito e verdade mudariam no seu canto, na sua oração ou no modo de sentar na sala?',
          ],
          [
            'Que coisa falsa você tem cantado por cima?',
            'Onde você é espectador numa sala onde o Pai busca adoradores?',
          ],
        ],
      },
    ),
  },
  {
    id: 'repentance',
    keywords: [
      'repent',
      'repentance',
      'prodigal',
      'confession',
      'confess',
      'arrepentimiento',
      'arrepentirse',
      'hijo prodigo',
      'confesion',
      'confesar',
      'arrependimento',
      'arrepender',
      'filho prodigo',
      'confissao',
      'confessar',
      'volver a casa',
      'voltar para casa',
    ],
    bookId: 'luk',
    chapter: 15,
    verse: 20,
    endVerse: 20,
    lines: lines(
      {
        punch: ['He got up. The father was already running.', 'Repentance is a road home, not a speech about the pigpen.'],
        context: [
          'The son has wasted the inheritance in a far country. He comes to himself among the pigs. Then he arises and goes to his father. While he is still a long way off, the father sees him, has compassion, runs, and kisses him. The sermon is not the boy’s rehearsed speech. It’s the father’s feet.',
          'Luke 15 is Jesus answering people who grumbled that he received sinners. The father doesn’t wait on the porch with his arms crossed. He runs.',
        ],
        application: [
          'Most of us stay in the explanation. When I feel sorry enough. When I can clean up first. When the speech is perfect. We put coming home on layaway. God doesn’t work that way. The father runs while the son is still dirty. Get up. The kiss is not a prize for a finished apology.',
          'Confession is the road, not the performance. You don’t have to arrive impressive. You have to arrive.',
        ],
        challenge: [
          'Brothers, what pigpen are you still explaining instead of leaving? A habit. A secret. A distance from the Father you’ve started calling normal. Maybe a speech you keep rehearsing and never walk.',
          'Brothers, what would getting up look like this week? Not a mood. A turn. Toward home.',
        ],
        charge: [
          'Get up and go. The Father is not standing with his arms crossed. He runs.',
          'Jesus’ story is direct: he arose and came. And the father ran. Don’t stay in the far country polishing the speech.',
        ],
        questions: [
          [
            'What are you still explaining instead of leaving?',
            'What would it look like to get up and go home this week?',
          ],
          [
            'Where have you been waiting to feel clean before you come to the Father?',
            'Who needs to hear that the Father runs?',
          ],
        ],
      },
      {
        punch: ['Se levantó. El padre ya venía corriendo.', 'El arrepentimiento es un camino a casa, no un discurso sobre el chiquero.'],
        context: [
          'El hijo ha malgastado la herencia en tierra lejana. Vuelve en sí entre los cerdos. Luego se levanta y va a su padre. Cuando todavía está lejos, el padre lo ve, se compadece, corre y lo besa. El sermón no es el discurso ensayado del hijo. Son los pies del padre.',
          'Lucas 15 es Jesús respondiendo a gente que murmuraba porque recibía a los pecadores. El padre no espera en el portal con los brazos cruzados. Corre.',
        ],
        application: [
          'Casi todos nos quedamos en la explicación. Cuando me sienta bastante arrepentido. Cuando pueda limpiarme primero. Cuando el discurso quede perfecto. Ponemos el volver a casa en espera. Dios no funciona así. El padre corre mientras el hijo sigue sucio. Levántate. El beso no es un premio por una disculpa terminada.',
          'La confesión es el camino, no la actuación. No tienes que llegar impresionante. Tienes que llegar.',
        ],
        challenge: [
          'Hermanos, ¿en qué chiquero sigues explicándote en vez de salir? Un hábito. Un secreto. Una distancia del Padre que empezaste a llamar normal. Quizás un discurso que ensayas y nunca caminas.',
          'Hermanos, ¿cómo se vería levantarte esta semana? No un ánimo. Un giro. Hacia casa.',
        ],
        charge: [
          'Levántate y ve. El Padre no está de brazos cruzados. Corre.',
          'La historia de Jesús es directa: se levantó y vino. Y el padre corrió. No te quedes en tierra lejana puliendo el discurso.',
        ],
        questions: [
          [
            '¿Qué sigues explicando en vez de dejar?',
            '¿Cómo se vería levantarte e ir a casa esta semana?',
          ],
          [
            '¿Dónde has estado esperando sentirte limpio antes de venir al Padre?',
            '¿Quién necesita oír que el Padre corre?',
          ],
        ],
      },
      {
        punch: ['Ele se levantou. O pai já vinha correndo.', 'O arrependimento é um caminho para casa, não um discurso sobre o chiqueiro.'],
        context: [
          'O filho desperdiçou a herança numa terra longe. Cai em si no meio dos porcos. Depois se levanta e vai ao pai. Quando ainda está longe, o pai o vê, se compadece, corre e o beija. O sermão não é o discurso ensaiado do filho. São os pés do pai.',
          'Lucas 15 é Jesus respondendo a gente que murmurava porque ele recebia pecadores. O pai não espera na varanda de braços cruzados. Ele corre.',
        ],
        application: [
          'Quase todos ficamos na explicação. Quando eu me sentir arrependido o bastante. Quando eu puder me limpar primeiro. Quando o discurso ficar perfeito. Deixamos a volta para casa para depois. Deus não trabalha assim. O pai corre enquanto o filho ainda está sujo. Levante-se. O beijo não é prêmio de um pedido de desculpa acabado.',
          'A confissão é o caminho, não a performance. Você não precisa chegar impressionante. Precisa chegar.',
        ],
        challenge: [
          'Irmãos, em que chiqueiro você continua se explicando em vez de sair? Um hábito. Um segredo. Uma distância do Pai que você começou a chamar de normal. Talvez um discurso que você ensaia e nunca caminha.',
          'Irmãos, como seria levantar-se nesta semana? Não um humor. Uma virada. Para casa.',
        ],
        charge: [
          'Levante-se e vá. O Pai não está de braços cruzados. Ele corre.',
          'A história de Jesus é direta: ele se levantou e veio. E o pai correu. Não fique na terra longe polindo o discurso.',
        ],
        questions: [
          [
            'O que você continua explicando em vez de deixar?',
            'Como seria levantar-se e ir para casa nesta semana?',
          ],
          [
            'Onde você tem esperado se sentir limpo antes de vir ao Pai?',
            'Quem precisa ouvir que o Pai corre?',
          ],
        ],
      },
    ),
  },
  {
    id: 'loneliness',
    keywords: [
      'lonely',
      'loneliness',
      'alone',
      'abandoned',
      'forsaken',
      'depression',
      'depressed',
      'soledad',
      'abandonado',
      'desamparado',
      'deprimido',
      'depresion',
      'sozinho',
      'desamparo',
      'depressao',
      'vale da sombra',
      'valley of the shadow',
    ],
    bookId: 'psa',
    chapter: 23,
    verse: 4,
    endVerse: 4,
    lines: lines(
      {
        punch: ['The valley is real. So is the Shepherd.', 'Yea, though I walk through the valley. He does not say you will camp there.'],
        context: [
          'David knows a valley of the shadow of death. He doesn’t deny the dark. I will fear no evil: for thou art with me. Thy rod and thy staff they comfort me. The comfort is a Person with a shepherd’s tools, not a change of scenery.',
          'Psalm 23 is a man walking, not a man pretending the valley is a meadow. Through. With me. The rod and the staff are for the sheep who cannot see the next turn.',
        ],
        application: [
          'Most of us treat loneliness as proof we were left. When the house is quiet. When the phone doesn’t light up. When the dark is louder than the promise. We walk the valley as if the Shepherd stepped off the path. He didn’t. Through means you are not moving in to stay. With me means you are not the only one on the road.',
          'Depression can be a long valley. Don’t call it nothing. Don’t call it abandonment. The verse puts God in the dark with you.',
        ],
        challenge: [
          'Brothers, what valley are you walking as if you were alone? The empty house. The diagnosis. The night you don’t tell anybody about. Maybe a sadness you’ve started calling your personality.',
          'Brothers, where have you been fearing evil because you forgot who is with you? Name the valley. Then name the Shepherd.',
        ],
        charge: [
          'Walk through. Don’t camp in the dark. Thou art with me is the line you can say out loud tonight.',
          'David’s message is direct: I will fear no evil, for thou art with me. The valley is not the last room.',
        ],
        questions: [
          [
            'What valley have you been walking as if God stepped off the path?',
            'Who around you is in a dark stretch and needs company, not a speech?',
          ],
          [
            'Where has loneliness been louder than “thou art with me”?',
            'What would it look like to walk through, instead of camping in the valley?',
          ],
        ],
      },
      {
        punch: ['El valle es real. El Pastor también.', 'Aunque ande en valle de sombra de muerte. No dice que te quedes a vivir ahí.'],
        context: [
          'David conoce un valle de sombra de muerte. No niega la oscuridad. No temeré mal alguno, porque tú estarás conmigo. Tu vara y tu cayado me infundirán aliento. El consuelo es una Persona con las herramientas del pastor, no un cambio de paisaje.',
          'El Salmo 23 es un hombre que camina, no un hombre que finge que el valle es un prado. A través. Conmigo. La vara y el cayado son para la oveja que no ve la siguiente curva.',
        ],
        application: [
          'Casi todos tratamos la soledad como prueba de que nos dejaron. Cuando la casa está quieta. Cuando el teléfono no se enciende. Cuando la oscuridad suena más fuerte que la promesa. Caminamos el valle como si el Pastor se hubiera salido de la senda. No se salió. A través significa que no te mudas para quedarte. Conmigo significa que no eres el único en el camino.',
          'La depresión puede ser un valle largo. No la llames nada. No la llames abandono. El versículo pone a Dios en la oscuridad contigo.',
        ],
        challenge: [
          'Hermanos, ¿qué valle estás caminando como si estuvieras solo? La casa vacía. El diagnóstico. La noche de la que no le cuentas a nadie. Quizás una tristeza que empezaste a llamar tu personalidad.',
          'Hermanos, ¿dónde has estado temiendo el mal porque olvidaste quién está contigo? Nombra el valle. Luego nombra al Pastor.',
        ],
        charge: [
          'Camina a través. No acampes en la oscuridad. Tú estarás conmigo es la frase que puedes decir en voz alta esta noche.',
          'El mensaje de David es directo: no temeré mal alguno, porque tú estarás conmigo. El valle no es el último cuarto.',
        ],
        questions: [
          [
            '¿Qué valle has estado caminando como si Dios se hubiera salido de la senda?',
            '¿Quién cerca de ti está en un tramo oscuro y necesita compañía, no un discurso?',
          ],
          [
            '¿Dónde la soledad ha sonado más fuerte que “tú estarás conmigo”?',
            '¿Cómo se vería caminar a través, en vez de acampar en el valle?',
          ],
        ],
      },
      {
        punch: ['O vale é real. O Pastor também.', 'Ainda que eu ande pelo vale da sombra da morte. Ele não diz para você morar lá.'],
        context: [
          'Davi conhece um vale da sombra da morte. Ele não nega o escuro. Não temerei mal algum, porque tu estás comigo. A tua vara e o teu cajado me consolam. O consolo é uma Pessoa com as ferramentas do pastor, não uma mudança de paisagem.',
          'O Salmo 23 é um homem que anda, não um homem que finge que o vale é um prado. Através. Comigo. A vara e o cajado são para a ovelha que não vê a próxima curva.',
        ],
        application: [
          'Quase todos tratamos a solidão como prova de que fomos deixados. Quando a casa está quieta. Quando o telefone não acende. Quando o escuro fala mais alto que a promessa. Andamos o vale como se o Pastor tivesse saído da vereda. Ele não saiu. Através significa que você não se muda para ficar. Comigo significa que você não é o único na estrada.',
          'A depressão pode ser um vale longo. Não a chame de nada. Não a chame de abandono. O versículo põe Deus no escuro com você.',
        ],
        challenge: [
          'Irmãos, que vale você está andando como se estivesse sozinho? A casa vazia. O diagnóstico. A noite de que você não conta a ninguém. Talvez uma tristeza que você começou a chamar de personalidade.',
          'Irmãos, onde você tem temido o mal porque esqueceu quem está com você? Nomeie o vale. Depois nomeie o Pastor.',
        ],
        charge: [
          'Ande através. Não acampe no escuro. Tu estás comigo é a frase que você pode dizer em voz alta hoje à noite.',
          'A mensagem de Davi é direta: não temerei mal algum, porque tu estás comigo. O vale não é o último cômodo.',
        ],
        questions: [
          [
            'Que vale você tem andado como se Deus tivesse saído da vereda?',
            'Quem perto de você está num trecho escuro e precisa de companhia, não de um discurso?',
          ],
          [
            'Onde a solidão falou mais alto que “tu estás comigo”?',
            'Como seria andar através, em vez de acampar no vale?',
          ],
        ],
      },
    ),
  },
  {
    id: 'doubt',
    keywords: [
      'doubt',
      'doubting',
      'unbelief',
      'skeptical',
      'duda',
      'dudar',
      'incredulidad',
      'incredulo',
      'duvida',
      'duvidar',
      'incredulidade',
      'help my unbelief',
      'ayuda mi incredulidad',
    ],
    bookId: 'mrk',
    chapter: 9,
    verse: 24,
    endVerse: 24,
    lines: lines(
      {
        punch: ['He cried, Lord, I believe. Help thou mine unbelief.', 'Honest doubt walks toward Jesus. It doesn’t set up house away from him.'],
        context: [
          'A father has brought a son the disciples could not help. Jesus says all things are possible to him that believeth. Straightway the father cries out with tears, Lord, I believe; help thou mine unbelief. Jesus doesn’t send him away for the second sentence. He meets the boy.',
          'The cry is both. Faith and the mess of faith. The father doesn’t pretend the unbelief isn’t there. He brings it to the only one who can help it.',
        ],
        application: [
          'Most of us hide the doubt or obey it. When the prayer looks unanswered. When the disciples’ failure becomes our excuse. When we wait to feel certain before we’ll come. Bring the unbelief with you. Don’t leave it in charge of the week. The father’s tears were not a disqualification.',
          'Doubt that stays in the dark grows. Doubt that is cried out to Jesus gets help. Say both sentences.',
        ],
        challenge: [
          'Brothers, where is unbelief still driving, while you only admit the part that sounds like faith? The healing. The promise. The fear that God won’t show up. Maybe a question you haven’t said out loud.',
          'Brothers, what would it look like to bring the doubt to him instead of building a life around it? Cry the whole sentence.',
        ],
        charge: [
          'Say it: Lord, I believe. Help my unbelief. Then stay where he is, not where the doubt wants to live.',
          'The father’s cry is the line: he asked for help with the unbelief. Jesus did not reject the man for telling the truth.',
        ],
        questions: [
          [
            'What doubt have you been hiding instead of bringing to Jesus?',
            'Where has unbelief been making decisions that faith was supposed to make?',
          ],
          [
            'What would “help thou mine unbelief” sound like in your actual week?',
            'Who needs permission to bring an honest doubt into this room?',
          ],
        ],
      },
      {
        punch: ['Clamó: Creo, Señor. Ayuda mi incredulidad.', 'La duda honesta camina hacia Jesús. No se instala lejos de él.'],
        context: [
          'Un padre ha traído a un hijo al que los discípulos no pudieron ayudar. Jesús dice que todo es posible al que cree. Luego el padre clama con lágrimas: Creo; ayuda mi incredulidad. Jesús no lo despide por la segunda frase. Atiende al muchacho.',
          'El clamor es las dos cosas. Fe y el desorden de la fe. El padre no finge que la incredulidad no está. La trae al único que puede ayudarla.',
        ],
        application: [
          'Casi todos escondemos la duda o le obedecemos. Cuando la oración parece sin respuesta. Cuando el fracaso de los discípulos se vuelve nuestra excusa. Cuando esperamos sentirnos seguros antes de venir. Trae la incredulidad contigo. No la dejes a cargo de la semana. Las lágrimas del padre no fueron una descalificación.',
          'La duda que se queda en la oscuridad crece. La duda que se clama a Jesús recibe ayuda. Di las dos frases.',
        ],
        challenge: [
          'Hermanos, ¿dónde la incredulidad sigue manejando, mientras solo admites la parte que suena a fe? La sanidad. La promesa. El miedo de que Dios no aparezca. Quizás una pregunta que no has dicho en voz alta.',
          'Hermanos, ¿cómo se vería traerle la duda en vez de armar una vida alrededor de ella? Clama la frase completa.',
        ],
        charge: [
          'Dilo: Creo, Señor. Ayuda mi incredulidad. Luego quédate donde él está, no donde la duda quiere vivir.',
          'El clamor del padre es la línea: pidió ayuda con la incredulidad. Jesús no rechazó al hombre por decir la verdad.',
        ],
        questions: [
          [
            '¿Qué duda has estado escondiendo en vez de traerla a Jesús?',
            '¿Dónde la incredulidad ha estado tomando decisiones que le tocaban a la fe?',
          ],
          [
            '¿Cómo sonaría “ayuda mi incredulidad” en tu semana real?',
            '¿Quién necesita permiso para traer una duda honesta a este cuarto?',
          ],
        ],
      },
      {
        punch: ['Ele clamou: Eu creio, Senhor. Ajuda a minha incredulidade.', 'A dúvida honesta anda para Jesus. Não monta casa longe dele.'],
        context: [
          'Um pai trouxe um filho a quem os discípulos não puderam ajudar. Jesus diz que tudo é possível ao que crê. Logo o pai clama com lágrimas: Eu creio; ajuda a minha incredulidade. Jesus não o manda embora pela segunda frase. Atende o menino.',
          'O clamor é as duas coisas. Fé e a bagunça da fé. O pai não finge que a incredulidade não está. Traz ao único que pode ajudá-la.',
        ],
        application: [
          'Quase todos escondemos a dúvida ou obedecemos a ela. Quando a oração parece sem resposta. Quando o fracasso dos discípulos vira a nossa desculpa. Quando esperamos nos sentir seguros antes de vir. Traga a incredulidade com você. Não a deixe no comando da semana. As lágrimas do pai não foram desqualificação.',
          'A dúvida que fica no escuro cresce. A dúvida que é clamada a Jesus recebe ajuda. Diga as duas frases.',
        ],
        challenge: [
          'Irmãos, onde a incredulidade ainda dirige, enquanto você só admite a parte que soa como fé? A cura. A promessa. O medo de que Deus não apareça. Talvez uma pergunta que você não disse em voz alta.',
          'Irmãos, como seria trazer a dúvida a ele em vez de montar uma vida em volta dela? Clame a frase inteira.',
        ],
        charge: [
          'Diga: Eu creio, Senhor. Ajuda a minha incredulidade. Depois fique onde ele está, não onde a dúvida quer morar.',
          'O clamor do pai é a linha: ele pediu ajuda com a incredulidade. Jesus não rejeitou o homem por dizer a verdade.',
        ],
        questions: [
          [
            'Que dúvida você tem escondido em vez de trazer a Jesus?',
            'Onde a incredulidade tem tomado decisões que eram da fé?',
          ],
          [
            'Como soaria “ajuda a minha incredulidade” na sua semana real?',
            'Quem precisa de permissão para trazer uma dúvida honesta a esta sala?',
          ],
        ],
      },
    ),
  },
  {
    id: 'witness',
    keywords: [
      'witness',
      'witnesses',
      'evangelism',
      'evangelize',
      'testimony',
      'missions',
      'soul winning',
      'testigo',
      'evangelismo',
      'evangelizar',
      'testimonio',
      'misiones',
      'testemunho',
      'testemunhar',
      'missoes',
      'ganhar almas',
    ],
    bookId: 'act',
    chapter: 1,
    verse: 8,
    endVerse: 8,
    lines: lines(
      {
        punch: ['You will receive power. Then you will be witnesses. Not the other way around.', 'Jerusalem is the street you already live on.'],
        context: [
          'The risen Jesus is about to ascend. The disciples ask about the kingdom’s timetable. He points them at the Spirit and at the work. Ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.',
          'The map starts where they are standing. Jerusalem first. Then the hard next town. Then the ends of the earth. Witness is a life that points at him, with power that is not self-confidence.',
        ],
        application: [
          'Most of us want the ends of the earth and skip the neighbor. When I know more. When I feel bold. When the person looks interested. We put witness on layaway. The Spirit has already been given to the church. The next name is usually close. A son. A coworker. The man across the street.',
          'A witness tells what he has seen. You don’t have to be impressive. You have to be clear about Jesus, and near enough for someone to hear you.',
        ],
        challenge: [
          'Brothers, who is your Jerusalem? The house. The job. The man you keep meaning to tell. Maybe a people you have decided is too far, while the near one is still unheard.',
          'Brothers, where are you waiting to feel powerful before you will open your mouth? The power was promised. The silence is the choice.',
        ],
        charge: [
          'Name one person. Pray. Then speak of Jesus this week. Start where your feet already are.',
          'Jesus’ message is direct: ye shall be witnesses unto me. Power, then a mouth. Don’t skip the street you live on.',
        ],
        questions: [
          [
            'Who is your Jerusalem, the person near enough to hear you?',
            'What have you been waiting to feel before you will speak of Jesus?',
          ],
          [
            'Where has fear turned witness into a future project?',
            'What true thing about Jesus can you say in a normal conversation this week?',
          ],
        ],
      },
      {
        punch: ['Recibiréis poder. Luego seréis testigos. No al revés.', 'Jerusalén es la calle donde ya vives.'],
        context: [
          'Jesús resucitado está por ascender. Los discípulos preguntan por el calendario del reino. Él los señala al Espíritu y a la obra. Recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.',
          'El mapa empieza donde están parados. Jerusalén primero. Luego el pueblo difícil. Luego los fines de la tierra. El testimonio es una vida que señala a él, con un poder que no es confianza en uno mismo.',
        ],
        application: [
          'Casi todos queremos los fines de la tierra y nos saltamos al vecino. Cuando sepa más. Cuando me sienta valiente. Cuando la persona parezca interesada. Ponemos el testimonio en espera. El Espíritu ya fue dado a la iglesia. El siguiente nombre suele estar cerca. Un hijo. Un compañero de trabajo. El hombre de enfrente.',
          'Un testigo cuenta lo que ha visto. No tienes que ser impresionante. Tienes que ser claro acerca de Jesús, y estar bastante cerca para que alguien te oiga.',
        ],
        challenge: [
          'Hermanos, ¿quién es tu Jerusalén? La casa. El trabajo. El hombre al que sigues pensando decirle. Quizás un pueblo que decidiste que está demasiado lejos, mientras el cercano sigue sin oír.',
          'Hermanos, ¿dónde estás esperando sentirte poderoso antes de abrir la boca? El poder fue prometido. El silencio es la elección.',
        ],
        charge: [
          'Nombra a una persona. Ora. Luego habla de Jesús esta semana. Empieza donde ya están tus pies.',
          'El mensaje de Jesús es directo: me seréis testigos. Poder, y luego una boca. No te saltes la calle donde vives.',
        ],
        questions: [
          [
            '¿Quién es tu Jerusalén, la persona bastante cerca para oírte?',
            '¿Qué has estado esperando sentir antes de hablar de Jesús?',
          ],
          [
            '¿Dónde el miedo convirtió el testimonio en un proyecto futuro?',
            '¿Qué cosa verdadera acerca de Jesús puedes decir en una conversación normal esta semana?',
          ],
        ],
      },
      {
        punch: ['Recebereis poder. Depois sereis testemunhas. Não o contrário.', 'Jerusalém é a rua onde você já mora.'],
        context: [
          'Jesus ressuscitado está para subir. Os discípulos perguntam pelo calendário do reino. Ele os aponta para o Espírito e para a obra. Recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas, tanto em Jerusalém como em toda a Judeia e Samaria, e até aos confins da terra.',
          'O mapa começa onde eles estão. Jerusalém primeiro. Depois a cidade difícil. Depois os confins da terra. Testemunho é uma vida que aponta para ele, com um poder que não é confiança em si.',
        ],
        application: [
          'Quase todos queremos os confins da terra e pulamos o vizinho. Quando eu souber mais. Quando eu me sentir ousado. Quando a pessoa parecer interessada. Deixamos o testemunho para depois. O Espírito já foi dado à igreja. O próximo nome costuma estar perto. Um filho. Um colega de trabalho. O homem da frente.',
          'Uma testemunha conta o que viu. Você não precisa ser impressionante. Precisa ser claro acerca de Jesus, e estar perto o bastante para alguém ouvir.',
        ],
        challenge: [
          'Irmãos, quem é a sua Jerusalém? A casa. O trabalho. O homem a quem você continua pensando em falar. Talvez um povo que você decidiu que está longe demais, enquanto o próximo ainda não ouviu.',
          'Irmãos, onde você está esperando se sentir poderoso antes de abrir a boca? O poder foi prometido. O silêncio é a escolha.',
        ],
        charge: [
          'Nomeie uma pessoa. Ore. Depois fale de Jesus nesta semana. Comece onde os seus pés já estão.',
          'A mensagem de Jesus é direta: ser-me-eis testemunhas. Poder, e depois uma boca. Não pule a rua onde você mora.',
        ],
        questions: [
          [
            'Quem é a sua Jerusalém, a pessoa perto o bastante para ouvir você?',
            'O que você tem esperado sentir antes de falar de Jesus?',
          ],
          [
            'Onde o medo transformou o testemunho num projeto futuro?',
            'Que coisa verdadeira acerca de Jesus você pode dizer numa conversa normal nesta semana?',
          ],
        ],
      },
    ),
  },
  {
    id: 'spirit',
    keywords: [
      'holy spirit',
      'spirit of god',
      'comforter',
      'pentecost',
      'espiritu santo',
      'consolador',
      'pentecostes',
      'espirito santo',
    ],
    bookId: 'jhn',
    chapter: 14,
    verse: 16,
    endVerse: 16,
    lines: lines(
      {
        punch: ['He doesn’t leave them with a memory. He promises another Comforter.', 'The Spirit stays. That is the gift.'],
        context: [
          'Jesus is hours from leaving. The disciples are about to feel the absence. He says he will pray the Father, and the Father will give another Comforter, that he may abide with you for ever. Not a visit. An abiding.',
          'Another Comforter means one of the same kind as Jesus, not a thinner substitute. The Spirit is how the Father keeps his people when the visible Jesus is no longer in the room.',
        ],
        application: [
          'Most of us live as if we were alone with a Bible and a memory. When the room feels empty. When we try to obey without help. When we treat the Spirit as a mood we might feel on Sunday. Jesus promised a Person who abides. Power for witness, comfort in the valley, and help to keep his word are not three different gods. They are his presence.',
          'Don’t reduce the Holy Spirit to a feeling you chase. Ask. Obey. He was given to stay.',
        ],
        challenge: [
          'Brothers, where are you living as if the Comforter left with the closing prayer? The temptation. The witness you’ve avoided. The grief. Maybe a week you are trying to carry without him.',
          'Brothers, what would change if you believed he abides, not just visits? Name one place you have locked him out of.',
        ],
        charge: [
          'Ask the Father. Then walk as someone who is not alone. The Comforter was promised for ever.',
          'Jesus’ message is direct: he shall give you another Comforter, that he may abide with you for ever. Don’t live like an orphan.',
        ],
        questions: [
          [
            'Where are you trying to follow Jesus without the Spirit he promised?',
            'What would abiding, not a visit, change in your week?',
          ],
          [
            'Have you treated the Holy Spirit as a feeling instead of a Person?',
            'What help have you stopped asking for?',
          ],
        ],
      },
      {
        punch: ['No los deja con un recuerdo. Promete otro Consolador.', 'El Espíritu se queda. Ese es el don.'],
        context: [
          'Jesús está a horas de irse. Los discípulos van a sentir la ausencia. Dice que rogará al Padre, y el Padre les dará otro Consolador, para que esté con vosotros para siempre. No una visita. Una permanencia.',
          'Otro Consolador significa uno de la misma clase que Jesús, no un sustituto más delgado. El Espíritu es cómo el Padre guarda a su pueblo cuando el Jesús visible ya no está en el cuarto.',
        ],
        application: [
          'Casi todos vivimos como si estuviéramos solos con una Biblia y un recuerdo. Cuando el cuarto se siente vacío. Cuando tratamos de obedecer sin ayuda. Cuando tratamos al Espíritu como un ánimo que a lo mejor sentimos el domingo. Jesús prometió una Persona que permanece. Poder para testificar, consuelo en el valle y ayuda para guardar su palabra no son tres dioses. Son su presencia.',
          'No reduzcas al Espíritu Santo a un sentimiento que persigues. Pide. Obedece. Fue dado para quedarse.',
        ],
        challenge: [
          'Hermanos, ¿dónde estás viviendo como si el Consolador se hubiera ido con la oración final? La tentación. El testimonio que has evitado. El luto. Quizás una semana que intentas cargar sin él.',
          'Hermanos, ¿qué cambiaría si creyeras que él permanece, no que solo visita? Nombra un lugar del que lo has dejado afuera.',
        ],
        charge: [
          'Pide al Padre. Luego camina como alguien que no está solo. El Consolador fue prometido para siempre.',
          'El mensaje de Jesús es directo: os dará otro Consolador, para que esté con vosotros para siempre. No vivas como huérfano.',
        ],
        questions: [
          [
            '¿Dónde estás tratando de seguir a Jesús sin el Espíritu que él prometió?',
            '¿Qué cambiaría en tu semana una permanencia, no una visita?',
          ],
          [
            '¿Has tratado al Espíritu Santo como un sentimiento en vez de una Persona?',
            '¿Qué ayuda has dejado de pedir?',
          ],
        ],
      },
      {
        punch: ['Ele não os deixa com uma lembrança. Promete outro Consolador.', 'O Espírito fica. Esse é o dom.'],
        context: [
          'Jesus está a horas de partir. Os discípulos vão sentir a ausência. Ele diz que rogará ao Pai, e o Pai lhes dará outro Consolador, para que fique convosco para sempre. Não uma visita. Uma permanência.',
          'Outro Consolador significa um da mesma espécie de Jesus, não um substituto mais fraco. O Espírito é como o Pai guarda o seu povo quando o Jesus visível já não está na sala.',
        ],
        application: [
          'Quase todos vivemos como se estivéssemos sozinhos com uma Bíblia e uma lembrança. Quando a sala parece vazia. Quando tentamos obedecer sem ajuda. Quando tratamos o Espírito como um humor que talvez sintamos no domingo. Jesus prometeu uma Pessoa que permanece. Poder para testemunhar, consolo no vale e ajuda para guardar a palavra dele não são três deuses. São a presença dele.',
          'Não reduza o Espírito Santo a um sentimento que você caça. Peça. Obedeça. Ele foi dado para ficar.',
        ],
        challenge: [
          'Irmãos, onde você está vivendo como se o Consolador tivesse ido embora com a oração final? A tentação. O testemunho que você evitou. O luto. Talvez uma semana que você tenta carregar sem ele.',
          'Irmãos, o que mudaria se você cresse que ele permanece, não que só visita? Nomeie um lugar de onde você o deixou de fora.',
        ],
        charge: [
          'Peça ao Pai. Depois ande como alguém que não está sozinho. O Consolador foi prometido para sempre.',
          'A mensagem de Jesus é direta: ele vos dará outro Consolador, para que fique convosco para sempre. Não viva como órfão.',
        ],
        questions: [
          [
            'Onde você está tentando seguir Jesus sem o Espírito que ele prometeu?',
            'O que uma permanência, não uma visita, mudaria na sua semana?',
          ],
          [
            'Você tem tratado o Espírito Santo como um sentimento em vez de uma Pessoa?',
            'Que ajuda você parou de pedir?',
          ],
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
  lines: lines(
    {
      punch: [
        'Before this class decides, the Word gets the first word.',
        'A feeling about the subject is not a lamp.',
      ],
      context: [
        'Psalm 119 is one long love for what God has said. His word is a lamp unto the feet and a light unto the path. It doesn’t flatter the traveler. It shows the next step so he doesn’t invent a road in the dark.',
        'The psalmist isn’t collecting opinions. He is walking by what God already said. The lamp is for the feet, not for winning the room.',
      ],
      application: [
        `Most of us came in with a speech ready about ${topicSlot}. When I feel strongly. When the room agrees. When the story is already finished in my head. We put the lamp on the shelf. But God doesn’t work that way. Bring ${topicSlot} into the light. Ask what he has already said.`,
        `We can talk about ${topicSlot} for an hour and never open the book. The verse is not a slogan for the subject. It tells us where to stand while we talk. Refuse to let a feeling have the last word.`,
      ],
      challenge: [
        `Brothers, where does ${topicSlot} press on you this week? At home. At work. In a relationship. Maybe somewhere you haven’t said out loud.`,
        `Brothers, what part of ${topicSlot} have you been carrying without the Word? Name it. Then let the lamp hit it.`,
      ],
      charge: [
        'Open the Word before the room decides what it already wanted to hear. The next step is in what God said.',
        `The psalm’s message is direct: his word is a lamp. Don’t leave ${topicSlot} in the dark.`,
      ],
      questions: [
        [
          `What is one hard part of ${topicSlot} that you have been carrying alone?`,
          `Which verse, besides this one, has already spoken to you about ${topicSlot}?`,
        ],
        [
          `Where have you let a feeling about ${topicSlot} outrun what God has said?`,
          `What next step would the Word show if you actually opened it on ${topicSlot}?`,
        ],
      ],
    },
    {
      punch: [
        'Antes de que la clase decida, la Palabra tiene la primera palabra.',
        'Un sentimiento sobre el tema no es una lámpara.',
      ],
      context: [
        'El Salmo 119 es un amor largo a lo que Dios ha dicho. Su palabra es lámpara a los pies y lumbrera al camino. No adula al que camina. Muestra el siguiente paso para que no invente un camino en la oscuridad.',
        'El salmista no está juntando opiniones. Camina por lo que Dios ya dijo. La lámpara es para los pies, no para ganar el cuarto.',
      ],
      application: [
        `Casi todos llegamos con un discurso listo sobre ${topicSlot}. Cuando me siento fuerte. Cuando el cuarto está de acuerdo. Cuando la historia ya está terminada en mi cabeza. Dejamos la lámpara en el estante. Pero Dios no funciona así. Trae ${topicSlot} a la luz. Pregunta qué ha dicho ya él.`,
        `Podemos hablar de ${topicSlot} una hora y nunca abrir el libro. Este versículo no es un lema para el tema. Nos dice dónde pararnos mientras hablamos. No dejes que un sentimiento tenga la última palabra.`,
      ],
      challenge: [
        `Hermanos, ¿dónde te aprieta ${topicSlot} esta semana? En casa. En el trabajo. En una relación. Quizás en un lugar que no has dicho en voz alta.`,
        `Hermanos, ¿qué parte de ${topicSlot} has estado cargando sin la Palabra? Nómbrala. Luego deja que la lámpara le dé.`,
      ],
      charge: [
        'Abran la Palabra antes de que el cuarto decida lo que ya quería oír. El siguiente paso está en lo que Dios dijo.',
        `El mensaje del salmo es directo: su palabra es lámpara. No dejes ${topicSlot} en la oscuridad.`,
      ],
      questions: [
        [
          `¿Qué parte difícil de ${topicSlot} has estado cargando solo?`,
          `¿Qué versículo, además de este, ya te ha hablado acerca de ${topicSlot}?`,
        ],
        [
          `¿Dónde has dejado que un sentimiento sobre ${topicSlot} le gane a lo que Dios ha dicho?`,
          `¿Qué siguiente paso mostraría la Palabra si de veras la abrieras sobre ${topicSlot}?`,
        ],
      ],
    },
    {
      punch: [
        'Antes de a classe decidir, a Palavra tem a primeira palavra.',
        'Um sentimento sobre o assunto não é uma lâmpada.',
      ],
      context: [
        'O Salmo 119 é um amor longo ao que Deus disse. A palavra dele é lâmpada para os pés e luz para o caminho. Ela não elogia o viajante. Mostra o próximo passo para que ele não invente uma estrada no escuro.',
        'O salmista não está juntando opiniões. Ele anda pelo que Deus já disse. A lâmpada é para os pés, não para ganhar a sala.',
      ],
      application: [
        `Quase todos chegamos com um discurso pronto sobre ${topicSlot}. Quando eu me sinto forte. Quando a sala concorda. Quando a história já está acabada na minha cabeça. Deixamos a lâmpada na prateleira. Mas Deus não trabalha assim. Traga ${topicSlot} para a luz. Pergunte o que ele já disse.`,
        `A gente pode falar de ${topicSlot} uma hora e nunca abrir o livro. Este versículo não é um lema para o assunto. Diz onde ficamos enquanto falamos. Não deixe um sentimento ter a última palavra.`,
      ],
      challenge: [
        `Irmãos, onde ${topicSlot} aperta você nesta semana? Em casa. No trabalho. Num relacionamento. Talvez num lugar que você não disse em voz alta.`,
        `Irmãos, que parte de ${topicSlot} você tem carregado sem a Palavra? Nomeie. Depois deixe a lâmpada bater nela.`,
      ],
      charge: [
        'Abram a Palavra antes de a sala decidir o que já queria ouvir. O próximo passo está no que Deus disse.',
        `A mensagem do salmo é direta: a palavra dele é lâmpada. Não deixe ${topicSlot} no escuro.`,
      ],
      questions: [
        [
          `Qual parte difícil de ${topicSlot} você tem carregado sozinho?`,
          `Que versículo, além deste, já falou com você acerca de ${topicSlot}?`,
        ],
        [
          `Onde você deixou um sentimento sobre ${topicSlot} passar à frente do que Deus disse?`,
          `Que próximo passo a Palavra mostraria se você de fato a abrisse sobre ${topicSlot}?`,
        ],
      ],
    },
  ),
}

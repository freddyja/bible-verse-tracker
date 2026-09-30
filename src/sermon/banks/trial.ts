import type { SermonLang, SermonLines, SermonOutline } from '../types'
import { TRIAL_FULL } from './trial-full'

type ShortLines = Omit<SermonLines, 'full'>

function lines(
  id: string,
  en: ShortLines,
  es: ShortLines,
  pt: ShortLines,
): Record<SermonLang, SermonLines> {
  const pack = TRIAL_FULL[id]
  if (!pack) throw new Error(`missing full lines for ${id}`)
  return {
    en: { ...en, full: pack.en },
    es: { ...es, full: pack.es },
    pt: { ...pt, full: pack.pt },
  }
}

export const TRIAL: readonly SermonOutline[] = [
  {
    id: 'patience',
    keywords: [
      'patience',
      'patient',
      'endurance',
      'perseverance',
      'longsuffering',
      'waiting on god',
      'paciencia',
      'paciente',
      'perseverancia',
      'longanimidad',
      'constancia',
      'perseveranca',
      'longanimidade',
    ],
    bookId: 'jas',
    chapter: 1,
    verse: 2,
    endVerse: 4,
    lines: lines('patience',
      {
        punch: ['The trial isn’t an interruption. It’s the workshop.', 'Joy here isn’t a grin. It’s staying under God’s hand.'],
        context: [
          'James writes to scattered believers under pressure. He doesn’t romanticize the pain. Count it all joy, he says, because the testing of faith works patience, and patience, if it finishes, leaves you whole. God is after maturity, not a smoother week.',
          'These are brothers in the dispersion, not people on a retreat. The trial is the place faith gets tested. Let patience have her perfect work. Don’t bail out of the shop before the work is done.',
        ],
        application: [
          'Most of us ask God to remove the very thing he’s using. When the wait is long. When the person is slow. When the pressure doesn’t lift by Friday. We call quitting discernment. James calls the pressure a workshop.',
          'Patience isn’t biting your tongue for an hour. It’s staying in the faith when the story is unfinished. The joy isn’t pretending it doesn’t hurt. It’s agreeing that God knows what he’s doing with the hurt.',
        ],
        challenge: [
          'Brothers, which trial are you treating as proof that God forgot the plan? The job. The illness. The prayer that still isn’t answered. Maybe a person you can’t fix.',
          'Brothers, what pressure are you trying to escape instead of bringing to God? Name the workshop. Don’t waste it demanding a shortcut.',
        ],
        charge: [
          'Stay. Ask for wisdom in it. Don’t walk out of the shop because the work is loud.',
          'James’ message is direct: let patience finish. Wholeness is on the other side of staying.',
        ],
        questions: [
          [
            'What pressure are you trying to escape instead of bringing to God?',
            'Where have you seen patience actually make someone whole?',
          ],
          [
            'What trial have you labeled as God forgetting you?',
            'What would staying look like this week, without a fake smile?',
          ],
        ],
      },
      {
        punch: ['La prueba no es una interrupción. Es el taller.', 'El gozo aquí no es una sonrisa. Es quedarse bajo la mano de Dios.'],
        context: [
          'Santiago escribe a creyentes dispersos bajo presión. No romantiza el dolor. Tened por sumo gozo, dice, porque la prueba de la fe produce paciencia, y la paciencia, si acaba, te deja entero. Dios busca madurez, no una semana más lisa.',
          'Son hermanos en la dispersión, no gente en un retiro. La prueba es el lugar donde la fe se examina. Dejad que la paciencia tenga su obra completa. No te salgas del taller antes de que el trabajo acabe.',
        ],
        application: [
          'Casi todos le pedimos a Dios que quite lo mismo que está usando. Cuando la espera es larga. Cuando la persona es lenta. Cuando la presión no se levanta para el viernes. Llamamos discernimiento al abandono. Santiago llama a la presión un taller.',
          'La paciencia no es callar una hora. Es quedarte en la fe cuando la historia no ha terminado. El gozo no es fingir que no duele. Es estar de acuerdo en que Dios sabe lo que hace con el dolor.',
        ],
        challenge: [
          'Hermanos, ¿qué prueba estás tratando como prueba de que Dios olvidó el plan? El trabajo. La enfermedad. La oración que sigue sin respuesta. Quizás una persona que no puedes arreglar.',
          'Hermanos, ¿qué presión estás tratando de escapar en vez de traerla a Dios? Nombra el taller. No lo desperdicies exigiendo un atajo.',
        ],
        charge: [
          'Quédate. Pide sabiduría dentro de ella. No te salgas del taller porque el trabajo hace ruido.',
          'El mensaje de Santiago es directo: deja que la paciencia acabe. La integridad está del otro lado de quedarte.',
        ],
        questions: [
          [
            '¿Qué presión estás tratando de escapar en vez de traerla a Dios?',
            '¿Dónde has visto que la paciencia de veras complete a alguien?',
          ],
          [
            '¿Qué prueba has etiquetado como que Dios se olvidó de ti?',
            '¿Cómo se vería quedarte esta semana, sin una sonrisa falsa?',
          ],
        ],
      },
      {
        punch: ['A prova não é uma interrupção. É a oficina.', 'A alegria aqui não é um sorriso. É ficar debaixo da mão de Deus.'],
        context: [
          'Tiago escreve a crentes dispersos debaixo de pressão. Ele não romantiza a dor. Tende por alegria, diz ele, porque a prova da fé produz paciência, e a paciência, se acaba, deixa você inteiro. Deus busca maturidade, não uma semana mais lisa.',
          'São irmãos na dispersão, não gente num retiro. A prova é o lugar onde a fé é examinada. Deixe a paciência ter a sua obra completa. Não saia da oficina antes de o trabalho acabar.',
        ],
        application: [
          'Quase todos pedimos a Deus que tire a mesma coisa que ele está usando. Quando a espera é longa. Quando a pessoa é lenta. Quando a pressão não levanta até sexta. Chamamos de discernimento o abandono. Tiago chama a pressão de oficina.',
          'Paciência não é calar por uma hora. É ficar na fé quando a história não terminou. A alegria não é fingir que não dói. É concordar que Deus sabe o que faz com a dor.',
        ],
        challenge: [
          'Irmãos, que prova você está tratando como prova de que Deus esqueceu o plano? O trabalho. A doença. A oração que continua sem resposta. Talvez uma pessoa que você não consegue consertar.',
          'Irmãos, que pressão você está tentando fugir em vez de trazer a Deus? Nomeie a oficina. Não a desperdice exigindo um atalho.',
        ],
        charge: [
          'Fique. Peça sabedoria dentro dela. Não saia da oficina porque o trabalho faz barulho.',
          'A mensagem de Tiago é direta: deixe a paciência acabar. A integridade está do outro lado de ficar.',
        ],
        questions: [
          [
            'Que pressão você está tentando fugir em vez de trazer a Deus?',
            'Onde você viu a paciência de fato completar alguém?',
          ],
          [
            'Que prova você etiquetou como Deus se esquecendo de você?',
            'Como seria ficar nesta semana, sem um sorriso falso?',
          ],
        ],
      },
    ),
  },
  {
    id: 'courage',
    keywords: [
      'courage',
      'brave',
      'bold',
      'boldness',
      'valor',
      'coraje',
      'valentia',
      'osadia',
      'coragem',
      'ousadia',
      'valente',
      'animo',
    ],
    bookId: 'jos',
    chapter: 1,
    verse: 9,
    endVerse: 9,
    lines: lines('courage',
      {
        punch: ['Courage is commanded because God is already there.', 'Joshua doesn’t get a smaller river. He gets a promise.'],
        context: [
          'Moses is dead. Joshua has to lead Israel across into a land full of enemies. God doesn’t shrink the assignment. Be strong and of a good courage. The Lord thy God is with thee whithersoever thou goest. The command rests on the presence.',
          'The man is looking at a river and a people who remember the last time they were afraid. God tells him three times not to fear. The reason never changes: I am with you.',
        ],
        application: [
          'Most of us wait to feel brave and then call the delay wisdom. When I feel ready. When the room is friendly. When failure is unlikely. Joshua’s courage was obedience with a promise attached. The church still needs people who will speak, serve, and repent without a fearless mood.',
          'We count our own strength and then shrink the good work until it fits. A conversation. A confession. A step into a calling that looks too big. God did not send Joshua in alone.',
        ],
        challenge: [
          'Brothers, what good work are you shrinking because you’re counting only your own strength? The hard talk. The ministry nobody claps for. The truth you’ve been swallowing. Maybe a first step you’ve renamed “later.”',
          'Brothers, where has fear been making your decisions? The silence. The excuse. The smaller assignment you gave yourself.',
        ],
        charge: [
          'Do the next faithful thing. God did not send Joshua in alone, and he has not sent you in alone.',
          'The line is the presence: he goes with you. Stop waiting for a mood that never signed up to lead.',
        ],
        questions: [
          [
            'Where has fear been making your decisions?',
            'What one act of obedience would courage look like this week?',
          ],
          [
            'What assignment have you made smaller so you wouldn’t have to trust him?',
            'Who is waiting on a courage you keep postponing?',
          ],
        ],
      },
      {
        punch: ['El valor se manda porque Dios ya está allí.', 'Josué no recibe un río más chico. Recibe una promesa.'],
        context: [
          'Moisés ha muerto. Josué tiene que llevar a Israel a una tierra llena de enemigos. Dios no achica la tarea. Esfuérzate y sé valiente. Jehová tu Dios está contigo dondequiera que vayas. El mandamiento descansa en la presencia.',
          'El hombre mira un río y un pueblo que recuerda la última vez que tuvo miedo. Dios le dice tres veces que no tema. La razón no cambia: yo estoy contigo.',
        ],
        application: [
          'Casi todos esperamos sentirnos valientes y luego llamamos sabiduría a la demora. Cuando me sienta listo. Cuando el cuarto sea amable. Cuando el fracaso sea improbable. El valor de Josué fue obediencia con una promesa pegada. La iglesia todavía necesita gente que hable, sirva y se arrepienta sin un ánimo sin miedo.',
          'Contamos nuestra propia fuerza y luego achicamos la buena obra hasta que quepa. Una conversación. Una confesión. Un paso hacia un llamado que se ve demasiado grande. Dios no envió a Josué solo.',
        ],
        challenge: [
          'Hermanos, ¿qué buena obra estás achicando porque solo cuentas tu propia fuerza? La conversación dura. El ministerio por el que nadie aplaude. La verdad que te has estado tragando. Quizás un primer paso que renombraste “después”.',
          'Hermanos, ¿dónde el miedo ha estado tomando tus decisiones? El silencio. La excusa. La tarea más chica que te diste.',
        ],
        charge: [
          'Haz lo siguiente que es fiel. Dios no envió a Josué solo, y no te ha enviado solo.',
          'La línea es la presencia: él va contigo. Deja de esperar un ánimo que nunca se apuntó para guiar.',
        ],
        questions: [
          [
            '¿Dónde el miedo ha estado tomando tus decisiones?',
            '¿Qué acto de obediencia sería el valor esta semana?',
          ],
          [
            '¿Qué tarea has hecho más chica para no tener que confiar en él?',
            '¿Quién está esperando un valor que sigues aplazando?',
          ],
        ],
      },
      {
        punch: ['A coragem é ordenada porque Deus já está lá.', 'Josué não recebe um rio menor. Recebe uma promessa.'],
        context: [
          'Moisés morreu. Josué tem de levar Israel a uma terra cheia de inimigos. Deus não encolhe a tarefa. Esforça-te e tem bom ânimo. O Senhor teu Deus é contigo por onde quer que andares. O mandamento descansa na presença.',
          'O homem olha um rio e um povo que lembra a última vez que teve medo. Deus lhe diz três vezes que não tema. A razão não muda: eu sou contigo.',
        ],
        application: [
          'Quase todos esperamos sentir coragem e depois chamamos a demora de sabedoria. Quando eu me sentir pronto. Quando a sala for amável. Quando o fracasso for improvável. A coragem de Josué foi obediência com uma promessa grudada. A igreja ainda precisa de gente que fale, sirva e se arrependa sem um humor sem medo.',
          'Contamos a própria força e depois encolhemos a boa obra até ela caber. Uma conversa. Uma confissão. Um passo para um chamado que parece grande demais. Deus não enviou Josué sozinho.',
        ],
        challenge: [
          'Irmãos, que boa obra você está encolhendo porque só conta a própria força? A conversa dura. O ministério pelo qual ninguém aplaude. A verdade que você tem engolido. Talvez um primeiro passo que você renomeou “depois”.',
          'Irmãos, onde o medo tem tomado as suas decisões? O silêncio. A desculpa. A tarefa menor que você se deu.',
        ],
        charge: [
          'Faça a próxima coisa fiel. Deus não enviou Josué sozinho, e não enviou você sozinho.',
          'A linha é a presença: ele vai com você. Pare de esperar um humor que nunca se inscreveu para guiar.',
        ],
        questions: [
          [
            'Onde o medo tem tomado as suas decisões?',
            'Que ato de obediência seria coragem nesta semana?',
          ],
          [
            'Que tarefa você fez menor para não ter de confiar nele?',
            'Quem está esperando uma coragem que você continua adiando?',
          ],
        ],
      },
    ),
  },
  {
    id: 'wisdom',
    keywords: [
      'wisdom',
      'wise',
      'discernment',
      'discern',
      'sabiduria',
      'sabio',
      'discernimiento',
      'prudencia',
      'sabedoria',
      'discernimento',
    ],
    bookId: 'jas',
    chapter: 1,
    verse: 5,
    endVerse: 5,
    lines: lines('wisdom',
      {
        punch: ['God doesn’t scold the person who asks for wisdom.', 'If you lack wisdom, the verse doesn’t say guess. It says ask.'],
        context: [
          'James has just said trials need patience. Then he tells the church what to do when they don’t know how. Ask God. He gives liberally and doesn’t reproach. Wisdom here isn’t a trick for getting ahead. It’s seeing the trial the way God sees it.',
          'The offer is wide open. Any of you. Lack wisdom. Ask. The warning comes next: don’t ask with a double mind, like a wave. A simple ask expects God to answer by his Word.',
        ],
        application: [
          'Most of us collect opinions and call it counsel. When I’m stuck. When both roads look costly. When I already want one answer. Friends can help. This verse puts the first request in the right place. God gives without the lecture.',
          'We pray last, after the group chat. Wisdom isn’t a louder instinct. It’s light on the next step, and it comes to the person who actually asks.',
        ],
        challenge: [
          'Brothers, what decision are you making without ever asking him? The move. The money. The words you’re about to send. Maybe a yes you already decided.',
          'Brothers, where are you collecting votes instead of asking God? Put the phone down. Ask in plain words.',
        ],
        charge: [
          'Ask today. Then open the Scriptures and obey the wisdom he has already written. He is not annoyed by the question.',
          'James’ message is direct: ask. God gives. Don’t walk out still guessing.',
        ],
        questions: [
          [
            'Where are you collecting opinions instead of asking God?',
            'What would you do differently if you believed he gives without scolding?',
          ],
          [
            'What decision is already leaning on your own reading of the week?',
            'Which verse is already wiser than the advice you’ve been gathering?',
          ],
        ],
      },
      {
        punch: ['Dios no regaña al que pide sabiduría.', 'Si te falta sabiduría, el versículo no dice que adivines. Dice que pidas.'],
        context: [
          'Santiago acaba de decir que las pruebas necesitan paciencia. Luego le dice a la iglesia qué hacer cuando no saben cómo. Pidan a Dios. Él da con liberalidad y no reprocha. La sabiduría aquí no es un truco para salir adelante. Es ver la prueba como Dios la ve.',
          'La oferta está abierta. Si alguno. Le falta sabiduría. Pida. La advertencia viene después: no pidas con doble ánimo, como una onda. Una petición sencilla espera que Dios responda por su Palabra.',
        ],
        application: [
          'Casi todos juntamos opiniones y lo llamamos consejo. Cuando estoy trabado. Cuando los dos caminos cuestan. Cuando ya quiero una respuesta. Los amigos pueden ayudar. Este versículo pone el primer pedido en el lugar correcto. Dios da sin el sermón.',
          'Oramos al final, después del chat. La sabiduría no es un instinto más fuerte. Es luz para el siguiente paso, y le llega a quien de veras pide.',
        ],
        challenge: [
          'Hermanos, ¿qué decisión estás tomando sin pedirle nunca a él? La mudanza. El dinero. Las palabras que estás por enviar. Quizás un sí que ya decidiste.',
          'Hermanos, ¿dónde estás juntando votos en vez de pedir a Dios? Suelta el teléfono. Pide con palabras claras.',
        ],
        charge: [
          'Pide hoy. Luego abre las Escrituras y obedece la sabiduría que él ya escribió. No le molesta la pregunta.',
          'El mensaje de Santiago es directo: pide. Dios da. No salgas todavía adivinando.',
        ],
        questions: [
          [
            '¿Dónde estás juntando opiniones en vez de pedir a Dios?',
            '¿Qué harías distinto si creyeras que él da sin regañar?',
          ],
          [
            '¿Qué decisión ya se apoya en tu propia lectura de la semana?',
            '¿Qué versículo ya es más sabio que el consejo que has estado juntando?',
          ],
        ],
      },
      {
        punch: ['Deus não repreende quem pede sabedoria.', 'Se falta sabedoria, o versículo não manda adivinhar. Manda pedir.'],
        context: [
          'Tiago acabou de dizer que as provas precisam de paciência. Depois diz à igreja o que fazer quando não sabem como. Peçam a Deus. Ele dá com liberalidade e não censura. A sabedoria aqui não é um truque para vencer. É ver a prova como Deus a vê.',
          'A oferta está aberta. Se algum. Falta sabedoria. Peça. O aviso vem depois: não peça com ânimo dobre, como uma onda. Um pedido simples espera que Deus responda pela Palavra.',
        ],
        application: [
          'Quase todos juntamos opiniões e chamamos isso de conselho. Quando estou travado. Quando os dois caminhos custam. Quando eu já quero uma resposta. Os amigos podem ajudar. Este versículo põe o primeiro pedido no lugar certo. Deus dá sem a bronca.',
          'Oramos por último, depois do grupo. Sabedoria não é um instinto mais alto. É luz para o próximo passo, e chega a quem de fato pede.',
        ],
        challenge: [
          'Irmãos, que decisão você está tomando sem nunca pedir a ele? A mudança. O dinheiro. As palavras que você está para enviar. Talvez um sim que você já decidiu.',
          'Irmãos, onde você está juntando votos em vez de pedir a Deus? Solte o telefone. Peça com palavras claras.',
        ],
        charge: [
          'Peça hoje. Depois abra as Escrituras e obedeça a sabedoria que ele já escreveu. A pergunta não o incomoda.',
          'A mensagem de Tiago é direta: peça. Deus dá. Não saia ainda adivinhando.',
        ],
        questions: [
          [
            'Onde você está juntando opiniões em vez de pedir a Deus?',
            'O que você faria diferente se cresse que ele dá sem repreender?',
          ],
          [
            'Que decisão já se apoia na sua própria leitura da semana?',
            'Que versículo já é mais sábio que o conselho que você tem juntado?',
          ],
        ],
      },
    ),
  },
  {
    id: 'grace',
    keywords: [
      'grace',
      'mercy',
      'saved by grace',
      'unmerited',
      'gracia',
      'misericordia',
      'favor',
      'graca',
      'favor imerecido',
    ],
    bookId: 'eph',
    chapter: 2,
    verse: 8,
    endVerse: 9,
    lines: lines('grace',
      {
        punch: ['Grace is God’s gift. It leaves no room for boasting.', 'You were dead. God made you alive. That’s the story.'],
        context: [
          'Paul has described people dead in trespasses. Then God, rich in mercy, makes them alive with Christ. By grace are ye saved through faith. Not of works, lest any man should boast. Faith is the open hand. Nobody walks in as a self-made saint.',
          'Ephesians 2 doesn’t start with your effort. It starts with a corpse. Grace is the gift. Works don’t buy the seat. The next verse will call you his workmanship. Fruit, not a fee.',
        ],
        application: [
          'Most of us slide from grace back to the scoreboard. When I do well, I swell. When I fail, I despair. Both are a kind of boasting. When I compare. When I keep the tally with God. We put salvation on layaway and call the payments faith.',
          'Grace tells the truth. You didn’t climb out. He raised you. The good that follows is thanks, not a receipt.',
        ],
        challenge: [
          'Brothers, are you still trying to pay for what he already gave? The extra guilt. The performance on Sunday. The quiet pride when you did better than him. Maybe the despair that says you’re too far gone to be a gift.',
          'Brothers, where are you keeping score with God or with another believer? Put the boast down.',
        ],
        charge: [
          'Thank him. Then do good because you are his workmanship, not because you’re earning a chair.',
          'Paul’s message is direct: by grace, through faith. Not of yourselves. It is the gift of God.',
        ],
        questions: [
          [
            'Where are you keeping score with God or with other believers?',
            'How would this week look if you really believed salvation is a gift?',
          ],
          [
            'When you fail, do you run to the gift or back to the scoreboard?',
            'What boast can you put down before you leave this room?',
          ],
        ],
      },
      {
        punch: ['La gracia es don de Dios. No deja lugar para el orgullo.', 'Estabas muerto. Dios te dio vida. Esa es la historia.'],
        context: [
          'Pablo ha descrito a personas muertas en pecados. Luego Dios, rico en misericordia, las vivifica con Cristo. Por gracia sois salvos por medio de la fe. No por obras, para que nadie se gloríe. La fe es la mano abierta. Nadie entra como santo hecho por sí mismo.',
          'Efesios 2 no empieza con tu esfuerzo. Empieza con un muerto. La gracia es el don. Las obras no compran el lugar. El versículo que sigue te llama hechura suya. Fruto, no una cuota.',
        ],
        application: [
          'Casi todos nos deslizamos de la gracia otra vez al marcador. Cuando me va bien, me hincho. Cuando fallo, me desespero. Las dos son una forma de jactancia. Cuando comparo. Cuando llevo la cuenta con Dios. Ponemos la salvación en espera y llamamos fe a los pagos.',
          'La gracia dice la verdad. Tú no saliste. Él te resucitó. Lo bueno que sigue es gratitud, no un recibo.',
        ],
        challenge: [
          'Hermanos, ¿sigues tratando de pagar lo que él ya dio? La culpa de más. La actuación del domingo. El orgullo quieto cuando lo hiciste mejor que él. Quizás la desesperación que dice que estás demasiado lejos para ser un don.',
          'Hermanos, ¿dónde sigues llevando la cuenta con Dios o con otro creyente? Suelta la jactancia.',
        ],
        charge: [
          'Dale gracias. Luego haz el bien porque eres hechura suya, no porque estés comprando una silla.',
          'El mensaje de Pablo es directo: por gracia, por medio de la fe. No de vosotros. Es don de Dios.',
        ],
        questions: [
          [
            '¿Dónde sigues llevando la cuenta con Dios o con otros creyentes?',
            '¿Cómo se vería esta semana si de veras creyeras que la salvación es un don?',
          ],
          [
            'Cuando fallas, ¿corres al don o vuelves al marcador?',
            '¿Qué jactancia puedes soltar antes de salir de este cuarto?',
          ],
        ],
      },
      {
        punch: ['A graça é dom de Deus. Não deixa lugar para vanglória.', 'Você estava morto. Deus lhe deu vida. Essa é a história.'],
        context: [
          'Paulo descreveu pessoas mortas nos pecados. Depois Deus, rico em misericórdia, as vivifica com Cristo. Pela graça sois salvos, por meio da fé. Não por obras, para que ninguém se glorie. A fé é a mão aberta. Ninguém entra como santo feito por si mesmo.',
          'Efésios 2 não começa com o seu esforço. Começa com um morto. A graça é o dom. As obras não compram o lugar. O versículo seguinte chama você de feitura dele. Fruto, não uma taxa.',
        ],
        application: [
          'Quase todos escorregamos da graça de volta para o placar. Quando vai bem, eu incho. Quando falho, eu desespero. As duas são um tipo de vanglória. Quando comparo. Quando marco pontos com Deus. Deixamos a salvação para depois e chamamos os pagamentos de fé.',
          'A graça diz a verdade. Você não saiu. Ele ressuscitou você. O bem que segue é gratidão, não um recibo.',
        ],
        challenge: [
          'Irmãos, você ainda está tentando pagar o que ele já deu? A culpa a mais. A performance de domingo. O orgulho quieto quando você fez melhor do que ele. Talvez o desespero que diz que você está longe demais para ser um dom.',
          'Irmãos, onde você ainda marca pontos com Deus ou com outro crente? Largue a vanglória.',
        ],
        charge: [
          'Agradeça. Depois faça o bem porque você é feitura dele, não porque esteja comprando uma cadeira.',
          'A mensagem de Paulo é direta: pela graça, por meio da fé. Não de vós. É dom de Deus.',
        ],
        questions: [
          [
            'Onde você ainda marca pontos com Deus ou com outros crentes?',
            'Como esta semana seria se você cresse de verdade que a salvação é um dom?',
          ],
          [
            'Quando você falha, corre para o dom ou volta para o placar?',
            'Que vanglória você pode largar antes de sair desta sala?',
          ],
        ],
      },
    ),
  },
  {
    id: 'salvation',
    keywords: [
      'salvation',
      'gospel',
      'born again',
      'eternal life',
      'john 3',
      'saved',
      'savior',
      'salvacion',
      'evangelio',
      'nacer de nuevo',
      'vida eterna',
      'salvo',
      'salvador',
      'salvacao',
      'evangelho',
      'novo nascimento',
    ],
    bookId: 'jhn',
    chapter: 3,
    verse: 16,
    endVerse: 16,
    lines: lines('salvation',
      {
        punch: ['God loved. And he gave his Son.', 'This isn’t advice for better people. It’s rescue for perishing people.'],
        context: [
          'Jesus is speaking with Nicodemus at night. The teacher of Israel needs a new birth he cannot perform. John 3:16 isn’t a slogan pulled out of the air. It’s the explanation of the cross. The Father gives the Son so that whoever believes will not perish, but have everlasting life.',
          'Nicodemus comes in the dark with religious credentials. Jesus talks about being born from above, and about a love that gives. Believing is not agreeing that the verse is famous. It’s trusting the Son.',
        ],
        application: [
          'Most of us shrink the gospel until it fits a good person. When I clean up. When I understand more. When I feel worthy. We put life on layaway. God doesn’t work that way. He loved, and he gave, while we were the ones perishing.',
          'We can hear this verse until it feels like wallpaper. Perish is a real word. Everlasting life is a real gift. The hinge is believe. Not admire.',
        ],
        challenge: [
          'Brothers, have you believed, or have you only heard this verse enough times to feel safe? A childhood memory. A verse on a sign. A sentence you never answered. Maybe a life that still hasn’t come to the Son.',
          'Brothers, who near you still needs to hear that God gave his Son? A son. A neighbor. A man in this room who knows the words and not the Savior.',
        ],
        charge: [
          'If you have believed, say so with your life this week. If you have not, don’t leave the love of God as a sentence you never answered.',
          'The message is direct: God so loved that he gave. Believe on the Son. Don’t walk out still only familiar with the verse.',
        ],
        questions: [
          [
            'What does “perish” mean if this verse is true?',
            'Who near you still needs to hear that God gave his Son?',
          ],
          [
            'Have you trusted the Son, or only agreed that the verse is famous?',
            'What would change this week if everlasting life is already yours in him?',
          ],
        ],
      },
      {
        punch: ['Dios amó. Y dio a su Hijo.', 'Esto no es un consejo para gente mejor. Es rescate para gente que se pierde.'],
        context: [
          'Jesús habla con Nicodemo de noche. El maestro de Israel necesita un nuevo nacimiento que él no puede producirse. Juan 3:16 no es un lema sacado del aire. Es la explicación de la cruz. El Padre da al Hijo para que todo aquel que en él cree no se pierda, mas tenga vida eterna.',
          'Nicodemo llega de noche con credenciales religiosas. Jesús habla de nacer de arriba, y de un amor que da. Creer no es estar de acuerdo en que el versículo es famoso. Es confiar en el Hijo.',
        ],
        application: [
          'Casi todos achicamos el evangelio hasta que le quede a una buena persona. Cuando me limpie. Cuando entienda más. Cuando me sienta digno. Ponemos la vida en espera. Dios no funciona así. Amó, y dio, mientras nosotros éramos los que perecíamos.',
          'Podemos oír este versículo hasta que se sienta como papel de pared. Perecer es una palabra real. La vida eterna es un don real. El gozne es creer. No admirar.',
        ],
        challenge: [
          'Hermanos, ¿has creído, o solo has oído este versículo las veces suficientes para sentirte a salvo? Un recuerdo de niño. Un versículo en un letrero. Una frase que nunca respondiste. Quizás una vida que todavía no ha venido al Hijo.',
          'Hermanos, ¿quién cerca de ti todavía necesita oír que Dios dio a su Hijo? Un hijo. Un vecino. Un hombre en este cuarto que conoce las palabras y no al Salvador.',
        ],
        charge: [
          'Si has creído, dilo con la vida esta semana. Si no, no dejes el amor de Dios como una frase que nunca respondiste.',
          'El mensaje es directo: de tal manera amó Dios, que ha dado. Cree en el Hijo. No salgas solo familiarizado con el versículo.',
        ],
        questions: [
          [
            '¿Qué significa “perecer” si este versículo es verdad?',
            '¿Quién cerca de ti todavía necesita oír que Dios dio a su Hijo?',
          ],
          [
            '¿Has confiado en el Hijo, o solo has estado de acuerdo en que el versículo es famoso?',
            '¿Qué cambiaría esta semana si la vida eterna ya es tuya en él?',
          ],
        ],
      },
      {
        punch: ['Deus amou. E deu o seu Filho.', 'Isto não é conselho para gente melhor. É resgate para gente que se perde.'],
        context: [
          'Jesus fala com Nicodemos de noite. O mestre de Israel precisa de um novo nascimento que ele não pode produzir. João 3:16 não é um lema tirado do ar. É a explicação da cruz. O Pai dá o Filho para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
          'Nicodemos chega de noite com credenciais religiosas. Jesus fala de nascer de cima, e de um amor que dá. Crer não é concordar que o versículo é famoso. É confiar no Filho.',
        ],
        application: [
          'Quase todos encolhemos o evangelho até caber numa boa pessoa. Quando eu me limpar. Quando eu entender mais. Quando eu me sentir digno. Deixamos a vida para depois. Deus não trabalha assim. Ele amou, e deu, enquanto nós éramos os que perecíamos.',
          'Podemos ouvir este versículo até ele parecer papel de parede. Perecer é uma palavra real. A vida eterna é um dom real. A dobradiça é crer. Não admirar.',
        ],
        challenge: [
          'Irmãos, você creu, ou só ouviu este versículo vezes bastantes para se sentir seguro? Uma lembrança de criança. Um versículo num cartaz. Uma frase que você nunca respondeu. Talvez uma vida que ainda não veio ao Filho.',
          'Irmãos, quem perto de você ainda precisa ouvir que Deus deu o seu Filho? Um filho. Um vizinho. Um homem nesta sala que conhece as palavras e não o Salvador.',
        ],
        charge: [
          'Se você creu, diga isso com a vida nesta semana. Se não, não deixe o amor de Deus como uma frase que você nunca respondeu.',
          'A mensagem é direta: Deus amou de tal maneira que deu. Creia no Filho. Não saia só familiarizado com o versículo.',
        ],
        questions: [
          [
            'O que significa “perecer” se este versículo é verdade?',
            'Quem perto de você ainda precisa ouvir que Deus deu o seu Filho?',
          ],
          [
            'Você confiou no Filho, ou só concordou que o versículo é famoso?',
            'O que mudaria nesta semana se a vida eterna já é sua nele?',
          ],
        ],
      },
    ),
  },
]

import type { SermonFullLines, SermonLang } from '../types'

export type FullPack = Record<SermonLang, SermonFullLines>

export const WALK_FULL: Record<string, FullPack> = {
  'hope': {
    en: {
        title: ['The God of Hope Fills the Room', 'Hope Is a Person, Not a Forecast'],
        bigIdea: ['Paul’s prayer is the line: the God of hope can fill you.', 'Leave the closed door with him before you leave this room.'],
        openingHook: ['Hope isn’t a mood. It’s the God of hope filling the room. This is not a lecture for somebody else. It is for the week you actually have.', 'Despair closes the book. Hope names who is still writing. This is not a lecture for somebody else. It is for the week you actually have.'],
        context: ['Paul has just said Jew and Gentile stand by faith in Christ. Then he prays. The God of hope fills them with joy and peace in believing, so they abound in hope by the Holy Ghost. The source has a name. It isn’t the news. That is why this passage still belongs in a class that wants more than a slogan.', 'Romans 15 is a prayer, not a slogan. Paul asks the God of hope to fill a church that could have split. Joy and peace come through believing. The Spirit is the one who makes hope overflow. That is why this passage still belongs in a class that wants more than a slogan.'],
        points: [
          { heading: ['Hear what God already said', 'Start with the Word, not the week'], thought: ['Hope isn’t a mood. It’s the God of hope filling the room. That line is not a slogan. It is the doorway into the text.', 'Despair closes the book. Hope names who is still writing. That line is not a slogan. It is the doorway into the text.'] },
          { heading: ['See where the passage sits', 'The story behind the sentence'], thought: ['Paul has just said Jew and Gentile stand by faith in Christ. Stay there long enough for the room to quiet down.', 'Romans 15 is a prayer, not a slogan. Stay there long enough for the room to quiet down.'] },
          { heading: ['Take the next obedient step', 'Leave with one clear yes'], thought: ['Paul’s prayer is the line: the God of hope can fill you. Ask him. Don’t ask the week to be your savior.', 'Leave the closed door with him before you leave this room. Hope is a Person, not a forecast.'] },
        ],
        application: ['Most of us live on the headline. When the report is bad. When the prayer looks unanswered. When we quietly decide this will never change. We put hope on the shelf with the things that didn’t work. God doesn’t work that way. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.', 'We want a feeling called hope and we skip the God who gives it. Believing is not pretending the week is fine. It’s taking the gospel as true when the room feels thin. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.'],
        invitation: ['Brothers, come. What have you quietly decided will never change? A body. A prodigal. A church that feels stuck. Maybe a door you stopped knocking on. If the Spirit is pressing you, do not wait for a better feeling. Answer him.', 'Brothers, come. Where has despair been louder than the promise this month? Bring that closed door here. Don’t ask the headlines to do God’s work. If the Spirit is pressing you, do not wait for a better feeling. Answer him.'],
        closingPrayer: ['Father, thank you for your Word. Plant this truth in us for the week we actually have. Give us courage to obey and mercy when we fail. Through Jesus Christ. Amen.', 'Lord, we have heard you. Now keep us from leaving this room unchanged. Make us doers of the Word. In Jesus’ name. Amen.'],
        questions: [
          [
            'Where has despair been louder than the promise this month?',
            'What would it look like to believe God about that one thing?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
          [
            'What have you stopped praying because you already wrote the ending?',
            'Who around you needs hope that sounds like God, not like a slogan?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
        ],
      },
    es: {
        title: ['El Dios de esperanza llena el cuarto', 'La esperanza es una Persona, no un pronóstico'],
        bigIdea: ['La oración de Pablo es la línea: el Dios de la esperanza puede llenarte.', 'Deja la puerta cerrada con él antes de salir de este cuarto.'],
        openingHook: ['La esperanza no es un ánimo. Es el Dios de la esperanza llenando el cuarto. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.', 'La desesperación cierra el libro. La esperanza nombra a quien sigue escribiendo. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.'],
        context: ['Pablo acaba de decir que judío y gentil están firmes por la fe en Cristo. Luego ora. El Dios de la esperanza los llena de gozo y paz al creer, para que abunden en esperanza por el Espíritu Santo. La fuente tiene nombre. No son las noticias. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.', 'Romanos 15 es una oración, no un lema. Pablo pide al Dios de la esperanza que llene a una iglesia que pudo haberse partido. El gozo y la paz vienen al creer. El Espíritu es quien hace rebosar la esperanza. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.'],
        points: [
          { heading: ['Oye lo que Dios ya dijo', 'Empieza con la Palabra, no con la semana'], thought: ['La esperanza no es un ánimo. Es el Dios de la esperanza llenando el cuarto. Esa línea no es un lema. Es la puerta al texto.', 'La desesperación cierra el libro. La esperanza nombra a quien sigue escribiendo. Esa línea no es un lema. Es la puerta al texto.'] },
          { heading: ['Mira dónde se asienta el pasaje', 'La historia detrás de la frase'], thought: ['Pablo acaba de decir que judío y gentil están firmes por la fe en Cristo. Quédate ahí el tiempo suficiente para que el cuarto se calle.', 'Romanos 15 es una oración, no un lema. Quédate ahí el tiempo suficiente para que el cuarto se calle.'] },
          { heading: ['Da el siguiente paso de obediencia', 'Sal con un sí claro'], thought: ['La oración de Pablo es la línea: el Dios de la esperanza puede llenarte. Pídeselo. No le pidas a la semana que sea tu salvador.', 'Deja la puerta cerrada con él antes de salir de este cuarto. La esperanza es una Persona, no un pronóstico.'] },
        ],
        application: ['Casi todos vivimos del titular. Cuando el informe es malo. Cuando la oración parece sin respuesta. Cuando decidimos en silencio que esto nunca va a cambiar. Dejamos la esperanza en el estante con lo que no funcionó. Dios no funciona así. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.', 'Queremos un sentimiento llamado esperanza y nos saltamos al Dios que la da. Creer no es fingir que la semana está bien. Es tomar el evangelio como verdad cuando el cuarto se siente vacío. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.'],
        invitation: ['Hermanos, vengan. ¿Qué has decidido en silencio que nunca va a cambiar? Un cuerpo. Un hijo pródigo. Una iglesia que se siente trabada. Quizás una puerta a la que dejaste de llamar. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.', 'Hermanos, vengan. ¿Dónde ha sonado más fuerte la desesperación que la promesa este mes? Trae esa puerta cerrada aquí. No le pidas a los titulares que hagan el trabajo de Dios. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.'],
        closingPrayer: ['Padre, gracias por tu Palabra. Siembra esta verdad en nosotros para la semana que de verdad tenemos. Danos valor para obedecer y misericordia cuando fallemos. Por Jesucristo. Amén.', 'Señor, te hemos oído. Ahora no dejes que salgamos de este cuarto sin cambio. Haznos hacedores de la Palabra. En el nombre de Jesús. Amén.'],
        questions: [
          [
            '¿Dónde ha sonado más fuerte la desesperación que la promesa este mes?',
            '¿Cómo se vería creer a Dios en esa sola cosa?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
          [
            '¿Qué dejaste de orar porque ya escribiste el final?',
            '¿Quién cerca de ti necesita una esperanza que suene a Dios, no a un lema?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
        ],
      },
    pt: {
        title: ['O Deus da esperança enche a sala', 'Esperança é uma Pessoa, não uma previsão'],
        bigIdea: ['A oração de Paulo é a linha: o Deus da esperança pode encher você.', 'Deixe a porta fechada com ele antes de sair desta sala.'],
        openingHook: ['A esperança não é um humor. É o Deus da esperança enchendo a sala. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.', 'O desespero fecha o livro. A esperança nomeia quem ainda está escrevendo. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.'],
        context: ['Paulo acabou de dizer que judeu e gentio estão firmes pela fé em Cristo. Depois ele ora. O Deus da esperança os enche de alegria e paz no crer, para que abundem em esperança pelo Espírito Santo. A fonte tem nome. Não são as notícias. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.', 'Romanos 15 é uma oração, não um lema. Paulo pede ao Deus da esperança que encha uma igreja que podia ter se partido. A alegria e a paz vêm no crer. O Espírito é quem faz a esperança transbordar. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.'],
        points: [
          { heading: ['Ouça o que Deus já disse', 'Comece pela Palavra, não pela semana'], thought: ['A esperança não é um humor. É o Deus da esperança enchendo a sala. Essa linha não é um lema. É a porta para o texto.', 'O desespero fecha o livro. A esperança nomeia quem ainda está escrevendo. Essa linha não é um lema. É a porta para o texto.'] },
          { heading: ['Veja onde a passagem se assenta', 'A história por trás da frase'], thought: ['Paulo acabou de dizer que judeu e gentio estão firmes pela fé em Cristo. Fique ali tempo bastante para a sala se aquietar.', 'Romanos 15 é uma oração, não um lema. Fique ali tempo bastante para a sala se aquietar.'] },
          { heading: ['Dê o próximo passo de obediência', 'Saia com um sim claro'], thought: ['A oração de Paulo é a linha: o Deus da esperança pode encher você. Peça a ele. Não peça à semana que seja o seu salvador.', 'Deixe a porta fechada com ele antes de sair desta sala. Esperança é uma Pessoa, não uma previsão.'] },
        ],
        application: ['Quase todos vivemos da manchete. Quando o laudo é ruim. Quando a oração parece sem resposta. Quando decidimos em silêncio que isto nunca vai mudar. Deixamos a esperança na prateleira com o que não funcionou. Deus não trabalha assim. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.', 'Queremos um sentimento chamado esperança e pulamos o Deus que a dá. Crer não é fingir que a semana está bem. É tomar o evangelho como verdade quando a sala parece vazia. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.'],
        invitation: ['Irmãos, venham. O que você decidiu em silêncio que nunca vai mudar? Um corpo. Um filho pródigo. Uma igreja que parece travada. Talvez uma porta em que você parou de bater. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.', 'Irmãos, venham. Onde o desespero falou mais alto que a promessa neste mês? Traga essa porta fechada para cá. Não peça às manchetes que façam o trabalho de Deus. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.'],
        closingPrayer: ['Pai, obrigado pela tua Palavra. Planta esta verdade em nós para a semana que de fato temos. Dá-nos coragem para obedecer e misericórdia quando falharmos. Por Jesus Cristo. Amém.', 'Senhor, nós te ouvimos. Agora não nos deixes sair desta sala sem mudança. Faz-nos praticantes da Palavra. Em nome de Jesus. Amém.'],
        questions: [
          [
            'Onde o desespero falou mais alto que a promessa neste mês?',
            'Como seria crer em Deus nessa única coisa?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
          [
            'O que você parou de orar porque já escreveu o final?',
            'Quem perto de você precisa de uma esperança que soe como Deus, não como um lema?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
        ],
      },
  },
  'love': {
    en: {
        title: ['Love Like the Towel, Not the Seat', 'As I Have Loved You'],
        bigIdea: ['Name that person before God today.', 'Jesus’ message is direct: love one another as I have loved you.'],
        openingHook: ['He washed their feet. Then he told them to love like that. This is not a lecture for somebody else. It is for the week you actually have.', 'The world isn’t reading your opinions first. It’s reading your love. This is not a lecture for somebody else. It is for the week you actually have.'],
        context: ['Jesus has just washed the feet of men who will fail him, including Judas. Then he gives the command. Love one another as I have loved you. The measure isn’t our warmth. It’s his cross, already in view that night. That is why this passage still belongs in a class that wants more than a slogan.', 'John 13 is a room with a towel, not a poster. Jesus calls it a new commandment because the pattern is new: as I have loved you. By this, he says, people will know you are my disciples. That is why this passage still belongs in a class that wants more than a slogan.'],
        points: [
          { heading: ['Hear what God already said', 'Start with the Word, not the week'], thought: ['He washed their feet. Then he told them to love like that. That line is not a slogan. It is the doorway into the text.', 'The world isn’t reading your opinions first. It’s reading your love. That line is not a slogan. It is the doorway into the text.'] },
          { heading: ['See where the passage sits', 'The story behind the sentence'], thought: ['Jesus has just washed the feet of men who will fail him, including Judas. Stay there long enough for the room to quiet down.', 'John 13 is a room with a towel, not a poster. Stay there long enough for the room to quiet down.'] },
          { heading: ['Take the next obedient step', 'Leave with one clear yes'], thought: ['Name that person before God today. Then do one kindness that costs you something small and real.', 'Jesus’ message is direct: love one another as I have loved you. Don’t leave it as a song.'] },
        ],
        application: ['Most of us wait to feel love and then call the wait sincerity. When they deserve it. When they apologize. When it’s easy. Jesus makes love a command for the people in the room, including the difficult one. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.', 'We love the idea of love and walk past the brother. A text we won’t send. A grudge we enjoy. A kindness that would cost an hour. The command is as concrete as a basin of water. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.'],
        invitation: ['Brothers, come. Who in this church have you decided doesn’t deserve the love Christ gave you? A name. A family. A person who gets on your nerves. Maybe someone in this room. If the Spirit is pressing you, do not wait for a better feeling. Answer him.', 'Brothers, come. Where is your love still waiting to feel like it? The hard person is the test. Not the easy one. If the Spirit is pressing you, do not wait for a better feeling. Answer him.'],
        closingPrayer: ['Father, thank you for your Word. Plant this truth in us for the week we actually have. Give us courage to obey and mercy when we fail. Through Jesus Christ. Amen.', 'Lord, we have heard you. Now keep us from leaving this room unchanged. Make us doers of the Word. In Jesus’ name. Amen.'],
        questions: [
          [
            'Where is your love still waiting to feel like it, instead of obeying?',
            'What would this class look like if we loved as he loved us?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
          [
            'Whose feet would you rather not wash?',
            'What costly kindness have you postponed until the feeling shows up?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
        ],
      },
    es: {
        title: ['Ama como la toalla, no como el asiento', 'Como yo os he amado'],
        bigIdea: ['Nombra a esa persona delante de Dios hoy.', 'El mensaje de Jesús es directo: amaos unos a otros como yo os he amado.'],
        openingHook: ['Les lavó los pies. Luego les dijo que amaran así. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.', 'El mundo no lee primero tus opiniones. Lee tu amor. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.'],
        context: ['Jesús acaba de lavar los pies de hombres que van a fallarle, incluso Judas. Luego da el mandamiento. Amaos unos a otros como yo os he amado. La medida no es nuestro calor. Es su cruz, ya a la vista esa noche. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.', 'Juan 13 es un cuarto con una toalla, no un cartel. Jesús lo llama un mandamiento nuevo porque el modelo es nuevo: como yo os he amado. En esto, dice, conocerán que sois mis discípulos. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.'],
        points: [
          { heading: ['Oye lo que Dios ya dijo', 'Empieza con la Palabra, no con la semana'], thought: ['Les lavó los pies. Luego les dijo que amaran así. Esa línea no es un lema. Es la puerta al texto.', 'El mundo no lee primero tus opiniones. Lee tu amor. Esa línea no es un lema. Es la puerta al texto.'] },
          { heading: ['Mira dónde se asienta el pasaje', 'La historia detrás de la frase'], thought: ['Jesús acaba de lavar los pies de hombres que van a fallarle, incluso Judas. Quédate ahí el tiempo suficiente para que el cuarto se calle.', 'Juan 13 es un cuarto con una toalla, no un cartel. Quédate ahí el tiempo suficiente para que el cuarto se calle.'] },
          { heading: ['Da el siguiente paso de obediencia', 'Sal con un sí claro'], thought: ['Nombra a esa persona delante de Dios hoy. Luego haz una bondad que te cueste algo pequeño y real.', 'El mensaje de Jesús es directo: amaos unos a otros como yo os he amado. No lo dejes como una canción.'] },
        ],
        application: ['Casi todos esperamos sentir el amor y luego llamamos sinceridad a la espera. Cuando lo merezcan. Cuando pidan perdón. Cuando sea fácil. Jesús hace del amor un mandamiento para la gente del cuarto, incluso la difícil. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.', 'Amamos la idea del amor y pasamos de largo al hermano. Un mensaje que no enviamos. Un rencor que disfrutamos. Una bondad que costaría una hora. El mandamiento es tan concreto como un lebrillo de agua. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.'],
        invitation: ['Hermanos, vengan. ¿A quién en esta iglesia has decidido que no merece el amor que Cristo te dio? Un nombre. Una familia. Alguien que te cae mal. Quizás alguien en este cuarto. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.', 'Hermanos, vengan. ¿Dónde tu amor sigue esperando sentirse así? La persona difícil es la prueba. No la fácil. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.'],
        closingPrayer: ['Padre, gracias por tu Palabra. Siembra esta verdad en nosotros para la semana que de verdad tenemos. Danos valor para obedecer y misericordia cuando fallemos. Por Jesucristo. Amén.', 'Señor, te hemos oído. Ahora no dejes que salgamos de este cuarto sin cambio. Haznos hacedores de la Palabra. En el nombre de Jesús. Amén.'],
        questions: [
          [
            '¿Dónde tu amor sigue esperando sentirse así, en vez de obedecer?',
            '¿Cómo se vería esta clase si nos amáramos como él nos amó?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
          [
            '¿Los pies de quién preferirías no lavar?',
            '¿Qué bondad costosa has aplazado hasta que aparezca el sentimiento?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
        ],
      },
    pt: {
        title: ['Ame como a toalha, não como o assento', 'Como eu vos amei'],
        bigIdea: ['Nomeie essa pessoa diante de Deus hoje.', 'A mensagem de Jesus é direta: amai-vos uns aos outros como eu vos amei.'],
        openingHook: ['Ele lavou os pés deles. Depois mandou que amassem assim. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.', 'O mundo não lê primeiro as suas opiniões. Lê o seu amor. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.'],
        context: ['Jesus acabou de lavar os pés de homens que vão falhar com ele, inclusive Judas. Depois dá o mandamento. Amai-vos uns aos outros como eu vos amei. A medida não é o nosso calor. É a cruz dele, já à vista naquela noite. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.', 'João 13 é uma sala com uma toalha, não um cartaz. Jesus chama isso de mandamento novo porque o modelo é novo: como eu vos amei. Nisto, diz ele, conhecerão que sois meus discípulos. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.'],
        points: [
          { heading: ['Ouça o que Deus já disse', 'Comece pela Palavra, não pela semana'], thought: ['Ele lavou os pés deles. Depois mandou que amassem assim. Essa linha não é um lema. É a porta para o texto.', 'O mundo não lê primeiro as suas opiniões. Lê o seu amor. Essa linha não é um lema. É a porta para o texto.'] },
          { heading: ['Veja onde a passagem se assenta', 'A história por trás da frase'], thought: ['Jesus acabou de lavar os pés de homens que vão falhar com ele, inclusive Judas. Fique ali tempo bastante para a sala se aquietar.', 'João 13 é uma sala com uma toalha, não um cartaz. Fique ali tempo bastante para a sala se aquietar.'] },
          { heading: ['Dê o próximo passo de obediência', 'Saia com um sim claro'], thought: ['Nomeie essa pessoa diante de Deus hoje. Depois faça uma bondade que lhe custe algo pequeno e real.', 'A mensagem de Jesus é direta: amai-vos uns aos outros como eu vos amei. Não deixe isso como uma canção.'] },
        ],
        application: ['Quase todos esperamos sentir o amor e depois chamamos a espera de sinceridade. Quando merecerem. Quando pedirem desculpa. Quando for fácil. Jesus faz do amor um mandamento para as pessoas da sala, inclusive a difícil. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.', 'Amamos a ideia do amor e passamos reto pelo irmão. Uma mensagem que não mandamos. Um rancor de que gostamos. Uma bondade que custaria uma hora. O mandamento é tão concreto quanto uma bacia de água. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.'],
        invitation: ['Irmãos, venham. Quem nesta igreja você decidiu que não merece o amor que Cristo lhe deu? Um nome. Uma família. Alguém que irrita você. Talvez alguém nesta sala. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.', 'Irmãos, venham. Onde o seu amor ainda espera sentir vontade? A pessoa difícil é a prova. Não a fácil. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.'],
        closingPrayer: ['Pai, obrigado pela tua Palavra. Planta esta verdade em nós para a semana que de fato temos. Dá-nos coragem para obedecer e misericórdia quando falharmos. Por Jesus Cristo. Amém.', 'Senhor, nós te ouvimos. Agora não nos deixes sair desta sala sem mudança. Faz-nos praticantes da Palavra. Em nome de Jesus. Amém.'],
        questions: [
          [
            'Onde o seu amor ainda espera sentir vontade, em vez de obedecer?',
            'Como esta classe seria se nos amássemos como ele nos amou?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
          [
            'Os pés de quem você preferiria não lavar?',
            'Que bondade custosa você adiou até o sentimento aparecer?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
        ],
      },
  },
  'forgiveness': {
    en: {
        title: ['Forgive as You Have Been Forgiven', 'Put the Bill Down'],
        bigIdea: ['Bring that name to the cross before you leave it in the parking lot.', 'Paul’s message is direct: forgive, as God for Christ’s sake has forgiven you.'],
        openingHook: ['We forgive because we have already been forgiven. This is not a lecture for somebody else. It is for the week you actually have.', 'Unforgiveness feels like justice. It works like a chain. This is not a lecture for somebody else. It is for the week you actually have.'],
        context: ['Paul is telling the church what the new life looks like. Kindness. A tender heart. Forgiveness. The pattern is God in Christ, who already forgave you. The debt you release is smaller than the one he cancelled. That is why this passage still belongs in a class that wants more than a slogan.', 'Ephesians 4 puts forgiveness next to the way you speak. Bitterness has a sound. So does kindness. Paul doesn’t call evil good. He points at the cross and says, that is the measure. That is why this passage still belongs in a class that wants more than a slogan.'],
        points: [
          { heading: ['Hear what God already said', 'Start with the Word, not the week'], thought: ['We forgive because we have already been forgiven. That line is not a slogan. It is the doorway into the text.', 'Unforgiveness feels like justice. It works like a chain. That line is not a slogan. It is the doorway into the text.'] },
          { heading: ['See where the passage sits', 'The story behind the sentence'], thought: ['Paul is telling the church what the new life looks like. Stay there long enough for the room to quiet down.', 'Ephesians 4 puts forgiveness next to the way you speak. Stay there long enough for the room to quiet down.'] },
          { heading: ['Take the next obedient step', 'Leave with one clear yes'], thought: ['Bring that name to the cross before you leave it in the parking lot. Ask for the kindness you don’t feel yet, and take one step toward peace.', 'Paul’s message is direct: forgive, as God for Christ’s sake has forgiven you. Put the bill down.'] },
        ],
        application: ['Most of us keep a private bill. When they admit it. When they feel what I felt. When it stops hurting. We put peace on layaway and call it integrity. God doesn’t work that way. Christ already took the case. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.', 'We replay the injury until it sits in the middle of the week. The kitchen. The group text. The name that tightens your jaw. Forgiveness doesn’t say the wound was nothing. It refuses to stay on the bench as judge. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.'],
        invitation: ['Brothers, come. Whose name still tightens your jaw? A parent. A brother in this church. An ex. Maybe somebody who will never say sorry. If the Spirit is pressing you, do not wait for a better feeling. Answer him.', 'Brothers, come. Who are you still making pay for something Christ already carried? You know the name. Don’t dress it up. If the Spirit is pressing you, do not wait for a better feeling. Answer him.'],
        closingPrayer: ['Father, thank you for your Word. Plant this truth in us for the week we actually have. Give us courage to obey and mercy when we fail. Through Jesus Christ. Amen.', 'Lord, we have heard you. Now keep us from leaving this room unchanged. Make us doers of the Word. In Jesus’ name. Amen.'],
        questions: [
          [
            'Who are you still making pay for something Christ already carried?',
            'What would kindness look like toward that person this week, without pretending the wound was nothing?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
          [
            'Where has a grudge been pretending to be discernment?',
            'What one step toward peace is actually in your power this week?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
        ],
      },
    es: {
        title: ['Perdona como has sido perdonado', 'Suelta la cuenta'],
        bigIdea: ['Trae ese nombre a la cruz antes de dejarlo en el estacionamiento.', 'El mensaje de Pablo es directo: perdónense, como Dios también os perdonó en Cristo.'],
        openingHook: ['Perdonamos porque ya fuimos perdonados. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.', 'No perdonar se siente como justicia. Funciona como una cadena. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.'],
        context: ['Pablo le dice a la iglesia cómo se ve la vida nueva. Bondad. Corazón tierno. Perdón. El modelo es Dios en Cristo, que ya te perdonó. La deuda que sueltas es menor que la que él canceló. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.', 'Efesios 4 pone el perdón al lado de la manera en que hablas. La amargura tiene un sonido. La bondad también. Pablo no llama bueno a lo malo. Señala la cruz y dice: esa es la medida. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.'],
        points: [
          { heading: ['Oye lo que Dios ya dijo', 'Empieza con la Palabra, no con la semana'], thought: ['Perdonamos porque ya fuimos perdonados. Esa línea no es un lema. Es la puerta al texto.', 'No perdonar se siente como justicia. Funciona como una cadena. Esa línea no es un lema. Es la puerta al texto.'] },
          { heading: ['Mira dónde se asienta el pasaje', 'La historia detrás de la frase'], thought: ['Pablo le dice a la iglesia cómo se ve la vida nueva. Quédate ahí el tiempo suficiente para que el cuarto se calle.', 'Efesios 4 pone el perdón al lado de la manera en que hablas. Quédate ahí el tiempo suficiente para que el cuarto se calle.'] },
          { heading: ['Da el siguiente paso de obediencia', 'Sal con un sí claro'], thought: ['Trae ese nombre a la cruz antes de dejarlo en el estacionamiento. Pide la bondad que todavía no sientes, y da un paso hacia la paz.', 'El mensaje de Pablo es directo: perdónense, como Dios también os perdonó en Cristo. Suelta la cuenta.'] },
        ],
        application: ['Casi todos guardamos una cuenta privada. Cuando lo admitan. Cuando sientan lo que yo sentí. Cuando deje de doler. Ponemos la paz en espera y lo llamamos integridad. Dios no funciona así. Cristo ya tomó el caso. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.', 'Repetimos la herida hasta sentarla en el centro de la semana. La cocina. El mensaje del grupo. El nombre que te aprieta la mandíbula. El perdón no dice que la herida no existió. Rehúsa quedarse en el banco como juez. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.'],
        invitation: ['Hermanos, vengan. ¿Qué nombre todavía te aprieta la mandíbula? Un padre. Un hermano de esta iglesia. Un ex. Quizás alguien que nunca va a pedir perdón. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.', 'Hermanos, vengan. ¿A quién sigues haciendo pagar por algo que Cristo ya cargó? Sabes el nombre. No lo vistas. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.'],
        closingPrayer: ['Padre, gracias por tu Palabra. Siembra esta verdad en nosotros para la semana que de verdad tenemos. Danos valor para obedecer y misericordia cuando fallemos. Por Jesucristo. Amén.', 'Señor, te hemos oído. Ahora no dejes que salgamos de este cuarto sin cambio. Haznos hacedores de la Palabra. En el nombre de Jesús. Amén.'],
        questions: [
          [
            '¿A quién sigues haciendo pagar por algo que Cristo ya cargó?',
            '¿Cómo se vería la bondad hacia esa persona esta semana, sin fingir que la herida no existió?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
          [
            '¿Dónde un rencor ha estado fingiendo ser discernimiento?',
            '¿Qué paso hacia la paz sí está en tus manos esta semana?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
        ],
      },
    pt: {
        title: ['Perdoe como você foi perdoado', 'Largue a conta'],
        bigIdea: ['Traga esse nome à cruz antes de deixá-lo no estacionamento.', 'A mensagem de Paulo é direta: perdoem, como também Deus em Cristo os perdoou.'],
        openingHook: ['Perdoamos porque já fomos perdoados. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.', 'Não perdoar parece justiça. Funciona como uma corrente. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.'],
        context: ['Paulo diz à igreja como a vida nova aparece. Bondade. Coração terno. Perdão. O modelo é Deus em Cristo, que já perdoou você. A dívida que você solta é menor do que a que ele cancelou. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.', 'Efésios 4 põe o perdão ao lado do jeito como você fala. A amargura tem um som. A bondade também. Paulo não chama o mal de bem. Aponta a cruz e diz: essa é a medida. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.'],
        points: [
          { heading: ['Ouça o que Deus já disse', 'Comece pela Palavra, não pela semana'], thought: ['Perdoamos porque já fomos perdoados. Essa linha não é um lema. É a porta para o texto.', 'Não perdoar parece justiça. Funciona como uma corrente. Essa linha não é um lema. É a porta para o texto.'] },
          { heading: ['Veja onde a passagem se assenta', 'A história por trás da frase'], thought: ['Paulo diz à igreja como a vida nova aparece. Fique ali tempo bastante para a sala se aquietar.', 'Efésios 4 põe o perdão ao lado do jeito como você fala. Fique ali tempo bastante para a sala se aquietar.'] },
          { heading: ['Dê o próximo passo de obediência', 'Saia com um sim claro'], thought: ['Traga esse nome à cruz antes de deixá-lo no estacionamento. Peça a bondade que você ainda não sente, e dê um passo em direção à paz.', 'A mensagem de Paulo é direta: perdoem, como também Deus em Cristo os perdoou. Solte a conta.'] },
        ],
        application: ['Quase todos guardamos uma conta particular. Quando admitirem. Quando sentirem o que eu senti. Quando parar de doer. Deixamos a paz para depois e chamamos isso de integridade. Deus não trabalha assim. Cristo já tomou a causa. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.', 'Repetimos a ferida até sentá-la no centro da semana. A cozinha. A mensagem do grupo. O nome que aperta o queixo. O perdão não diz que a ferida não existiu. Recusa ficar no banco como juiz. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.'],
        invitation: ['Irmãos, venham. Que nome ainda aperta o seu queixo? Um pai. Um irmão desta igreja. Um ex. Talvez alguém que nunca vai pedir desculpa. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.', 'Irmãos, venham. Quem você ainda faz pagar por algo que Cristo já carregou? Você sabe o nome. Não o vista. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.'],
        closingPrayer: ['Pai, obrigado pela tua Palavra. Planta esta verdade em nós para a semana que de fato temos. Dá-nos coragem para obedecer e misericórdia quando falharmos. Por Jesus Cristo. Amém.', 'Senhor, nós te ouvimos. Agora não nos deixes sair desta sala sem mudança. Faz-nos praticantes da Palavra. Em nome de Jesus. Amém.'],
        questions: [
          [
            'Quem você ainda faz pagar por algo que Cristo já carregou?',
            'Como seria a bondade para com essa pessoa nesta semana, sem fingir que a ferida não existiu?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
          [
            'Onde um rancor tem fingido ser discernimento?',
            'Que passo em direção à paz está de fato nas suas mãos nesta semana?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
        ],
      },
  },
  'peace': {
    en: {
        title: ['My Peace I Give Unto You', 'Peace While the Hard Thing Stays'],
        bigIdea: ['Lay down the demand that life be easy before your heart is quiet.', 'Jesus’ message is direct: my peace I give unto you.'],
        openingHook: ['The peace Jesus gives is not the peace the world sells. This is not a lecture for somebody else. It is for the week you actually have.', 'He offers peace while the hard thing is still in the room. This is not a lecture for somebody else. It is for the week you actually have.'],
        context: ['Jesus is hours from the cross. The disciples are troubled. He doesn’t offer a quieter empire or a solved calendar. He gives his own peace, and he tells their hearts not to be afraid. The gift and the command belong together. That is why this passage still belongs in a class that wants more than a slogan.', 'John 14 is a farewell, not a spa. My peace I give unto you. Not as the world giveth. He is about to leave, and he leaves a peace the arrest can’t confiscate. That is why this passage still belongs in a class that wants more than a slogan.'],
        points: [
          { heading: ['Hear what God already said', 'Start with the Word, not the week'], thought: ['The peace Jesus gives is not the peace the world sells. That line is not a slogan. It is the doorway into the text.', 'He offers peace while the hard thing is still in the room. That line is not a slogan. It is the doorway into the text.'] },
          { heading: ['See where the passage sits', 'The story behind the sentence'], thought: ['Jesus is hours from the cross. Stay there long enough for the room to quiet down.', 'John 14 is a farewell, not a spa. Stay there long enough for the room to quiet down.'] },
          { heading: ['Take the next obedient step', 'Leave with one clear yes'], thought: ['Lay down the demand that life be easy before your heart is quiet. Receive what he left you.', 'Jesus’ message is direct: my peace I give unto you. Don’t leave it on the table.'] },
        ],
        application: ['Most of us want peace by subtraction. When the conflict ends. When the noise stops. When the week gets easy. The world sells that. Christ gives peace with the trouble still sitting in the chair. We keep hunting a feeling. He already gave a Person. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.', 'We call the absence of trouble peace, and we stay troubled when trouble stays. A heart that believes him can rest without having every answer. That’s the gift. Not a blank calendar. Take it deeper: do not leave with the same quiet bargain you walked in with. Let the Word rearrange what you call enough, safe, and later.'],
        invitation: ['Brothers, come. What are you calling peace that is only the absence of trouble? A quiet phone. A full account. Nobody mad at you. Maybe a week with nothing hard in it. If the Spirit is pressing you, do not wait for a better feeling. Answer him.', 'Brothers, come. Where are you troubled because you wanted the world’s kind of peace? Name the hard thing. Then receive what he left you. If the Spirit is pressing you, do not wait for a better feeling. Answer him.'],
        closingPrayer: ['Father, thank you for your Word. Plant this truth in us for the week we actually have. Give us courage to obey and mercy when we fail. Through Jesus Christ. Amen.', 'Lord, we have heard you. Now keep us from leaving this room unchanged. Make us doers of the Word. In Jesus’ name. Amen.'],
        questions: [
          [
            'Where are you troubled because you wanted the world’s kind of peace?',
            'What fear would shrink if you trusted the peace he already gave?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
          [
            'What hard thing are you waiting to remove before you will rest?',
            'How would this week change if peace is a Person, not a cleared schedule?',
            'What would change this week if you believed this passage was for your actual life, not only for the class hour?',
            'Who needs you to live this out where they can see it — and what is one concrete step?',
          ],
        ],
      },
    es: {
        title: ['Mi paz os doy', 'Paz mientras lo difícil sigue'],
        bigIdea: ['Suelta la exigencia de que la vida sea fácil antes de que el corazón esté quieto.', 'El mensaje de Jesús es directo: mi paz os doy.'],
        openingHook: ['La paz que Jesús da no es la paz que el mundo vende. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.', 'Él ofrece paz mientras lo difícil sigue en el cuarto. Esto no es una conferencia para otra persona. Es para la semana que de verdad tienes.'],
        context: ['Jesús está a horas de la cruz. Los discípulos están turbados. No ofrece un imperio más quieto ni un calendario resuelto. Da su propia paz, y le dice al corazón que no tema. El don y el mandamiento van juntos. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.', 'Juan 14 es una despedida, no un spa. Mi paz os doy. No como el mundo la da. Está por irse, y deja una paz que el arresto no puede confiscar. Por eso este pasaje todavía pertenece a una clase que quiere más que un lema.'],
        points: [
          { heading: ['Oye lo que Dios ya dijo', 'Empieza con la Palabra, no con la semana'], thought: ['La paz que Jesús da no es la paz que el mundo vende. Esa línea no es un lema. Es la puerta al texto.', 'Él ofrece paz mientras lo difícil sigue en el cuarto. Esa línea no es un lema. Es la puerta al texto.'] },
          { heading: ['Mira dónde se asienta el pasaje', 'La historia detrás de la frase'], thought: ['Jesús está a horas de la cruz. Quédate ahí el tiempo suficiente para que el cuarto se calle.', 'Juan 14 es una despedida, no un spa. Quédate ahí el tiempo suficiente para que el cuarto se calle.'] },
          { heading: ['Da el siguiente paso de obediencia', 'Sal con un sí claro'], thought: ['Suelta la exigencia de que la vida sea fácil antes de que el corazón esté quieto. Recibe lo que él te dejó.', 'El mensaje de Jesús es directo: mi paz os doy. No la dejes sobre la mesa.'] },
        ],
        application: ['Casi todos queremos paz por resta. Cuando se acabe el conflicto. Cuando pare el ruido. Cuando la semana sea fácil. El mundo vende eso. Cristo da paz con el problema todavía sentado en la silla. Nosotros buscamos un sentimiento. Él ya dio una Persona. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.', 'Llamamos paz a la ausencia de problemas, y seguimos turbados cuando el problema se queda. Un corazón que le cree puede descansar sin tener todas las respuestas. Ese es el don. No un calendario en blanco. Llévalo más hondo: no salgas con el mismo trato silencioso con el que entraste. Deja que la Palabra reordene lo que llamas suficiente, seguro y después.'],
        invitation: ['Hermanos, vengan. ¿Qué estás llamando paz que es solo la ausencia de problemas? Un teléfono quieto. Una cuenta llena. Nadie enojado contigo. Quizás una semana sin nada duro. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.', 'Hermanos, vengan. ¿Dónde estás turbado porque querías la paz del mundo? Nombra lo difícil. Luego recibe lo que él te dejó. Si el Espíritu te está apretando, no esperes un mejor sentimiento. Respóndele.'],
        closingPrayer: ['Padre, gracias por tu Palabra. Siembra esta verdad en nosotros para la semana que de verdad tenemos. Danos valor para obedecer y misericordia cuando fallemos. Por Jesucristo. Amén.', 'Señor, te hemos oído. Ahora no dejes que salgamos de este cuarto sin cambio. Haznos hacedores de la Palabra. En el nombre de Jesús. Amén.'],
        questions: [
          [
            '¿Dónde estás turbado porque querías la paz del mundo?',
            '¿Qué temor se achicaría si confiaras en la paz que él ya dio?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
          [
            '¿Qué cosa difícil estás esperando quitar antes de descansar?',
            '¿Cómo cambiaría esta semana si la paz es una Persona, no una agenda limpia?',
            '¿Qué cambiaría esta semana si creyeras que este pasaje es para tu vida real, no solo para la hora de clase?',
            '¿Quién necesita verte vivir esto — y cuál es un paso concreto?',
          ],
        ],
      },
    pt: {
        title: ['A minha paz vos dou', 'Paz enquanto o difícil permanece'],
        bigIdea: ['Largue a exigência de que a vida seja fácil antes de o coração ficar quieto.', 'A mensagem de Jesus é direta: a minha paz vos dou.'],
        openingHook: ['A paz que Jesus dá não é a paz que o mundo vende. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.', 'Ele oferece paz enquanto o difícil ainda está na sala. Isto não é uma palestra para outra pessoa. É para a semana que você de fato tem.'],
        context: ['Jesus está a horas da cruz. Os discípulos estão perturbados. Ele não oferece um império mais quieto nem uma agenda resolvida. Dá a sua própria paz, e manda o coração não temer. O dom e o mandamento andam juntos. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.', 'João 14 é uma despedida, não um spa. A minha paz vos dou. Não como o mundo a dá. Ele está para partir, e deixa uma paz que a prisão não pode confiscar. Por isso esta passagem ainda pertence a uma classe que quer mais do que um lema.'],
        points: [
          { heading: ['Ouça o que Deus já disse', 'Comece pela Palavra, não pela semana'], thought: ['A paz que Jesus dá não é a paz que o mundo vende. Essa linha não é um lema. É a porta para o texto.', 'Ele oferece paz enquanto o difícil ainda está na sala. Essa linha não é um lema. É a porta para o texto.'] },
          { heading: ['Veja onde a passagem se assenta', 'A história por trás da frase'], thought: ['Jesus está a horas da cruz. Fique ali tempo bastante para a sala se aquietar.', 'João 14 é uma despedida, não um spa. Fique ali tempo bastante para a sala se aquietar.'] },
          { heading: ['Dê o próximo passo de obediência', 'Saia com um sim claro'], thought: ['Largue a exigência de que a vida seja fácil antes de o coração ficar quieto. Receba o que ele lhe deixou.', 'A mensagem de Jesus é direta: a minha paz vos dou. Não a deixe sobre a mesa.'] },
        ],
        application: ['Quase todos queremos paz por subtração. Quando o conflito acabar. Quando o barulho parar. Quando a semana ficar fácil. O mundo vende isso. Cristo dá paz com o problema ainda sentado na cadeira. Nós caçamos um sentimento. Ele já deu uma Pessoa. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.', 'Chamamos de paz a ausência de problema, e continuamos perturbados quando o problema fica. Um coração que crê nele pode descansar sem ter todas as respostas. Esse é o dom. Não uma agenda em branco. Leve mais fundo: não saia com o mesmo acordo quieto com que entrou. Deixe a Palavra reordenar o que você chama de bastante, seguro e depois.'],
        invitation: ['Irmãos, venham. O que você está chamando de paz que é só a ausência de problema? Um telefone quieto. Uma conta cheia. Ninguém bravo com você. Talvez uma semana sem nada duro. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.', 'Irmãos, venham. Onde você está perturbado porque queria a paz do mundo? Nomeie o difícil. Depois receba o que ele lhe deixou. Se o Espírito está apertando você, não espere um sentimento melhor. Responda a ele.'],
        closingPrayer: ['Pai, obrigado pela tua Palavra. Planta esta verdade em nós para a semana que de fato temos. Dá-nos coragem para obedecer e misericórdia quando falharmos. Por Jesus Cristo. Amém.', 'Senhor, nós te ouvimos. Agora não nos deixes sair desta sala sem mudança. Faz-nos praticantes da Palavra. Em nome de Jesus. Amém.'],
        questions: [
          [
            'Onde você está perturbado porque queria a paz do mundo?',
            'Que temor diminuiria se você confiasse na paz que ele já deu?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
          [
            'Que coisa difícil você está esperando tirar antes de descansar?',
            'Como esta semana mudaria se a paz é uma Pessoa, não uma agenda limpa?',
            'O que mudaria nesta semana se você cresse que esta passagem é para a sua vida real, não só para a hora da classe?',
            'Quem precisa ver você viver isto — e qual é um passo concreto?',
          ],
        ],
      },
  },
}

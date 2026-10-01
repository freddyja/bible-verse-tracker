import type { PrayerGuideCard, PrayerTemplate } from './types'

function card(
  titleFor: string,
  tagline: string,
  items: PrayerGuideCard['items'],
  footer: PrayerGuideCard['footer'],
  titleHow = 'HOW TO PRAY',
): PrayerGuideCard {
  return { titleHow, titleFor, tagline, items, footer }
}

const wifeEn = card(
  'FOR YOUR WIFE',
  'Cover her with Scripture — identity, heart, home, and calling.',
  [
    {
      n: 1,
      heading: 'HER IDENTITY',
      prayer:
        'Lord, remind her she is Your beloved daughter, chosen and precious in Christ, not defined by performance or praise.',
      ref: '1 Peter 2:9',
    },
    {
      n: 2,
      heading: 'HER HEART',
      prayer:
        'Guard her heart with Your peace; grow in her a steadfast love for You that overflows into every relationship.',
      ref: 'Proverbs 4:23',
    },
    {
      n: 3,
      heading: 'HER MIND',
      prayer:
        'Renew her mind with truth. Give her wisdom to discern, courage to refuse lies, and joy in Your Word.',
      ref: 'Romans 12:2',
    },
    {
      n: 4,
      heading: 'HER PROTECTION',
      prayer:
        'Surround her with Your favor as a shield. Keep her safe in body, spirit, and reputation.',
      ref: 'Psalm 5:12',
    },
    {
      n: 5,
      heading: 'HER HOME',
      prayer:
        'Bless our marriage with unity, kindness, and patience. Help us honor You as we love one another.',
      ref: 'Ephesians 5:25',
    },
    {
      n: 6,
      heading: 'HER CALLING',
      prayer:
        'Confirm the good works You prepared for her. Strengthen her gifts and make her fruitful for Your glory.',
      ref: 'Ephesians 2:10',
    },
  ],
  {
    prayer: 'Father, I entrust my wife to You today. Hold her close and lead us both in Your ways.',
    ref: 'Philippians 1:9–11',
  },
)

const wifeEs = card(
  'POR TU ESPOSA',
  'Cúbrela con la Escritura: identidad, corazón, hogar y llamado.',
  [
    {
      n: 1,
      heading: 'SU IDENTIDAD',
      prayer:
        'Señor, recuérdale que es Tu hija amada, elegida y preciosa en Cristo, no definida por logros ni aplausos.',
      ref: '1 Pedro 2:9',
    },
    {
      n: 2,
      heading: 'SU CORAZÓN',
      prayer:
        'Guarda su corazón con Tu paz; haz crecer en ella un amor firme por Ti que se derrame en cada relación.',
      ref: 'Proverbios 4:23',
    },
    {
      n: 3,
      heading: 'SU MENTE',
      prayer:
        'Renueva su mente con la verdad. Dale sabiduría para discernir, valor para rechazar mentiras y gozo en Tu Palabra.',
      ref: 'Romanos 12:2',
    },
    {
      n: 4,
      heading: 'SU PROTECCIÓN',
      prayer:
        'Rodéala con Tu favor como escudo. Guárdala en cuerpo, espíritu y reputación.',
      ref: 'Salmo 5:12',
    },
    {
      n: 5,
      heading: 'SU HOGAR',
      prayer:
        'Bendice nuestro matrimonio con unidad, bondad y paciencia. Ayúdanos a honrarte amándonos mutuamente.',
      ref: 'Efesios 5:25',
    },
    {
      n: 6,
      heading: 'SU LLAMADO',
      prayer:
        'Confirma las buenas obras que preparaste para ella. Fortalece sus dones y hazla fructífera para Tu gloria.',
      ref: 'Efesios 2:10',
    },
  ],
  {
    prayer: 'Padre, hoy encomiendo a mi esposa a Ti. Acércala a Ti y guíanos a ambos en Tus caminos.',
    ref: 'Filipenses 1:9–11',
  },
  'CÓMO ORAR',
)

const wifePt = card(
  'POR SUA ESPOSA',
  'Cubra-a com a Escritura — identidade, coração, lar e chamado.',
  [
    {
      n: 1,
      heading: 'SUA IDENTIDADE',
      prayer:
        'Senhor, lembra-lhe que ela é Tua filha amada, escolhida e preciosa em Cristo, não definida por desempenho ou elogios.',
      ref: '1 Pedro 2:9',
    },
    {
      n: 2,
      heading: 'SEU CORAÇÃO',
      prayer:
        'Guarda o coração dela com a Tua paz; cresça nela um amor firme por Ti que transborde em cada relacionamento.',
      ref: 'Provérbios 4:23',
    },
    {
      n: 3,
      heading: 'SUA MENTE',
      prayer:
        'Renova a mente dela com a verdade. Dá-lhe sabedoria para discernir, coragem para rejeitar mentiras e alegria na Tua Palavra.',
      ref: 'Romanos 12:2',
    },
    {
      n: 4,
      heading: 'SUA PROTEÇÃO',
      prayer:
        'Cerca-a com o Teu favor como escudo. Guarda-a em corpo, espírito e reputação.',
      ref: 'Salmo 5:12',
    },
    {
      n: 5,
      heading: 'SEU LAR',
      prayer:
        'Abençoa nosso casamento com unidade, bondade e paciência. Ajuda-nos a Te honrar ao nos amarmos.',
      ref: 'Efésios 5:25',
    },
    {
      n: 6,
      heading: 'SEU CHAMADO',
      prayer:
        'Confirma as boas obras que preparaste para ela. Fortalece os dons dela e torna-a frutífera para a Tua glória.',
      ref: 'Efésios 2:10',
    },
  ],
  {
    prayer: 'Pai, hoje entrego minha esposa a Ti. Guarda-a perto e guia a nós dois nos Teus caminhos.',
    ref: 'Filipenses 1:9–11',
  },
  'COMO ORAR',
)

const husbandEn = card(
  'FOR YOUR HUSBAND',
  'Ask God to shape his walk, strength, wisdom, and love at home.',
  [
    {
      n: 1,
      heading: 'HIS WALK',
      prayer:
        'Draw him near to You daily. Let him delight in Your Word and walk worthy of his calling in Christ.',
      ref: 'Colossians 1:10',
    },
    {
      n: 2,
      heading: 'HIS HEART',
      prayer:
        'Give him a soft heart before You — humble, repentant, and quick to love as Christ loves the church.',
      ref: 'Ephesians 5:25',
    },
    {
      n: 3,
      heading: 'HIS WISDOM',
      prayer:
        'Fill him with wisdom from above for work, decisions, and leadership that honors You.',
      ref: 'James 1:5',
    },
    {
      n: 4,
      heading: 'HIS STRENGTH',
      prayer:
        'Strengthen him when he is weary. Remind him that Your grace is enough and Your power is made perfect in weakness.',
      ref: '2 Corinthians 12:9',
    },
    {
      n: 5,
      heading: 'HIS PROTECTION',
      prayer:
        'Guard him from temptation, pride, and harm. Keep his feet on the path of righteousness.',
      ref: 'Psalm 121:7–8',
    },
    {
      n: 6,
      heading: 'HIS HOME',
      prayer:
        'Help him love, listen, and lead with gentleness. Knit our hearts together in peace.',
      ref: '1 Peter 3:7',
    },
  ],
  {
    prayer: 'Lord, bless my husband today. Make him a man after Your own heart.',
    ref: 'Psalm 1:1–3',
  },
)

const husbandEs = card(
  'POR TU ESPOSO',
  'Pide a Dios que forme su caminar, fuerza, sabiduría y amor en el hogar.',
  [
    {
      n: 1,
      heading: 'SU CAMINAR',
      prayer:
        'Acércalo a Ti cada día. Que se deleite en Tu Palabra y camine digno de su llamado en Cristo.',
      ref: 'Colosenses 1:10',
    },
    {
      n: 2,
      heading: 'SU CORAZÓN',
      prayer:
        'Dale un corazón tierno delante de Ti: humilde, arrepentido y rápido para amar como Cristo ama a la iglesia.',
      ref: 'Efesios 5:25',
    },
    {
      n: 3,
      heading: 'SU SABIDURÍA',
      prayer:
        'Llénalo de sabiduría de lo alto para el trabajo, las decisiones y el liderazgo que Te honre.',
      ref: 'Santiago 1:5',
    },
    {
      n: 4,
      heading: 'SU FUERZA',
      prayer:
        'Fortalécelo cuando esté cansado. Recuérdale que Tu gracia basta y Tu poder se perfecciona en la debilidad.',
      ref: '2 Corintios 12:9',
    },
    {
      n: 5,
      heading: 'SU PROTECCIÓN',
      prayer:
        'Guárdalo de la tentación, el orgullo y el daño. Mantén sus pies en el camino de justicia.',
      ref: 'Salmo 121:7–8',
    },
    {
      n: 6,
      heading: 'SU HOGAR',
      prayer:
        'Ayúdalo a amar, escuchar y guiar con mansedumbre. Une nuestros corazones en paz.',
      ref: '1 Pedro 3:7',
    },
  ],
  {
    prayer: 'Señor, bendice a mi esposo hoy. Hazlo un hombre conforme a Tu corazón.',
    ref: 'Salmo 1:1–3',
  },
  'CÓMO ORAR',
)

const husbandPt = card(
  'POR SEU ESPOSO',
  'Peça a Deus que forme o caminhar, a força, a sabedoria e o amor dele em casa.',
  [
    {
      n: 1,
      heading: 'SEU CAMINHAR',
      prayer:
        'Aproxima-o de Ti cada dia. Que ele se deleite na Tua Palavra e ande digno do chamado em Cristo.',
      ref: 'Colossenses 1:10',
    },
    {
      n: 2,
      heading: 'SEU CORAÇÃO',
      prayer:
        'Dá-lhe um coração brando diante de Ti — humilde, arrependido e pronto a amar como Cristo ama a igreja.',
      ref: 'Efésios 5:25',
    },
    {
      n: 3,
      heading: 'SUA SABEDORIA',
      prayer:
        'Enche-o de sabedoria do alto para o trabalho, as decisões e a liderança que Te honre.',
      ref: 'Tiago 1:5',
    },
    {
      n: 4,
      heading: 'SUA FORÇA',
      prayer:
        'Fortalece-o quando estiver cansado. Lembra-lhe que a Tua graça basta e o Teu poder se aperfeiçoa na fraqueza.',
      ref: '2 Coríntios 12:9',
    },
    {
      n: 5,
      heading: 'SUA PROTEÇÃO',
      prayer:
        'Guarda-o da tentação, do orgulho e do dano. Mantém os pés dele no caminho da justiça.',
      ref: 'Salmo 121:7–8',
    },
    {
      n: 6,
      heading: 'SEU LAR',
      prayer:
        'Ajuda-o a amar, ouvir e liderar com mansidão. Une nossos corações em paz.',
      ref: '1 Pedro 3:7',
    },
  ],
  {
    prayer: 'Senhor, abençoa meu esposo hoje. Faze dele um homem segundo o Teu coração.',
    ref: 'Salmo 1:1–3',
  },
  'COMO ORAR',
)


const childrenEn = card(
  'FOR YOUR CHILDREN',
  'Ask God to form their faith, character, safety, and future.',
  [
    {
      n: 1,
      heading: 'THEIR FAITH',
      prayer:
        'Draw each child to know You early. Plant Your Word deep so they trust Jesus as Lord and Savior.',
      ref: 'Deuteronomy 6:6–7',
    },
    {
      n: 2,
      heading: 'THEIR HEART',
      prayer:
        'Give them a soft heart, ready to obey, forgive, and walk in kindness toward others.',
      ref: 'Ephesians 4:32',
    },
    {
      n: 3,
      heading: 'THEIR WISDOM',
      prayer:
        'Teach them to love what is true. Guard their minds from confusion and fill them with discernment.',
      ref: 'Proverbs 1:7',
    },
    {
      n: 4,
      heading: 'THEIR PROTECTION',
      prayer:
        'Watch over their coming and going. Keep them from harm, fear, and the schemes of the enemy.',
      ref: 'Psalm 121:8',
    },
    {
      n: 5,
      heading: 'THEIR FRIENDSHIPS',
      prayer:
        'Surround them with friends who fear You. Help them be a light and choose companions wisely.',
      ref: 'Proverbs 13:20',
    },
    {
      n: 6,
      heading: 'THEIR FUTURE',
      prayer:
        'Order their steps. Confirm their gifts and open doors that lead them into Your purpose.',
      ref: 'Jeremiah 29:11',
    },
  ],
  {
    prayer: 'Father, these children are Yours. Shepherd them all their days.',
    ref: 'Psalm 127:3',
  },
)

const childrenEs = card(
  'POR TUS HIJOS',
  'Pide a Dios que forme su fe, carácter, seguridad y futuro.',
  [
    {
      n: 1,
      heading: 'SU FE',
      prayer:
        'Acerca a cada hijo a conocerte desde temprano. Planta Tu Palabra profunda para que confíen en Jesús como Señor y Salvador.',
      ref: 'Deuteronomio 6:6–7',
    },
    {
      n: 2,
      heading: 'SU CORAZÓN',
      prayer:
        'Dales un corazón tierno, listo para obedecer, perdonar y caminar en bondad hacia otros.',
      ref: 'Efesios 4:32',
    },
    {
      n: 3,
      heading: 'SU SABIDURÍA',
      prayer:
        'Enséñales a amar lo verdadero. Guarda sus mentes de la confusión y llénalos de discernimiento.',
      ref: 'Proverbios 1:7',
    },
    {
      n: 4,
      heading: 'SU PROTECCIÓN',
      prayer:
        'Cuida su salir y su entrar. Guárdalos del daño, el miedo y las trampas del enemigo.',
      ref: 'Salmo 121:8',
    },
    {
      n: 5,
      heading: 'SUS AMISTADES',
      prayer:
        'Rodéalos de amigos que Te teman. Ayúdales a ser luz y a elegir bien sus compañeros.',
      ref: 'Proverbios 13:20',
    },
    {
      n: 6,
      heading: 'SU FUTURO',
      prayer:
        'Ordena sus pasos. Confirma sus dones y abre puertas que los lleven a Tu propósito.',
      ref: 'Jeremías 29:11',
    },
  ],
  {
    prayer: 'Padre, estos hijos son Tuyos. Pastoréalos todos sus días.',
    ref: 'Salmo 127:3',
  },
  'CÓMO ORAR',
)

const childrenPt = card(
  'POR SEUS FILHOS',
  'Peça a Deus que forme a fé, o caráter, a segurança e o futuro deles.',
  [
    {
      n: 1,
      heading: 'A FÉ DELES',
      prayer:
        'Aproxima cada filho de Te conhecer cedo. Planta a Tua Palavra fundo para que confiem em Jesus como Senhor e Salvador.',
      ref: 'Deuteronômio 6:6–7',
    },
    {
      n: 2,
      heading: 'O CORAÇÃO',
      prayer:
        'Dá-lhes um coração brando, pronto a obedecer, perdoar e andar em bondade para com os outros.',
      ref: 'Efésios 4:32',
    },
    {
      n: 3,
      heading: 'A SABEDORIA',
      prayer:
        'Ensina-os a amar o que é verdadeiro. Guarda a mente deles da confusão e enche-os de discernimento.',
      ref: 'Provérbios 1:7',
    },
    {
      n: 4,
      heading: 'A PROTEÇÃO',
      prayer:
        'Cuida da saída e da entrada deles. Guarda-os do dano, do medo e das ciladas do inimigo.',
      ref: 'Salmo 121:8',
    },
    {
      n: 5,
      heading: 'AS AMIZADES',
      prayer:
        'Cerca-os de amigos que Te temam. Ajuda-os a ser luz e a escolher bem os companheiros.',
      ref: 'Provérbios 13:20',
    },
    {
      n: 6,
      heading: 'O FUTURO',
      prayer:
        'Ordena os passos deles. Confirma os dons e abre portas que os levem ao Teu propósito.',
      ref: 'Jeremias 29:11',
    },
  ],
  {
    prayer: 'Pai, estes filhos são Teus. Pastoreia-os todos os seus dias.',
    ref: 'Salmo 127:3',
  },
  'COMO ORAR',
)

const parentsEn = card(
  'FOR YOUR PARENTS',
  'Honor them before God — strength, peace, health, and faith.',
  [
    {
      n: 1,
      heading: 'HONOR',
      prayer:
        'Help me honor them in word and deed. Let gratitude mark how I speak of them and care for them.',
      ref: 'Exodus 20:12',
    },
    {
      n: 2,
      heading: 'THEIR FAITH',
      prayer:
        'Draw them closer to You. If they know You, deepen their trust; if not, open their hearts to the gospel.',
      ref: 'Acts 16:31',
    },
    {
      n: 3,
      heading: 'THEIR PEACE',
      prayer:
        'Calm every anxious thought. Give them rest in Your presence and courage for each day.',
      ref: 'Isaiah 26:3',
    },
    {
      n: 4,
      heading: 'THEIR HEALTH',
      prayer:
        'Sustain their bodies and minds. Give wisdom to caregivers and hope in every season of life.',
      ref: 'Psalm 71:9',
    },
    {
      n: 5,
      heading: 'THEIR RELATIONSHIPS',
      prayer:
        'Heal old wounds where needed. Grow patience, forgiveness, and joy in our family.',
      ref: 'Colossians 3:13',
    },
    {
      n: 6,
      heading: 'THEIR LEGACY',
      prayer:
        'Let their later years bear fruit. Make their story point others to Your faithfulness.',
      ref: 'Psalm 92:14',
    },
  ],
  {
    prayer: 'Lord, bless my parents today. Surround them with Your steadfast love.',
    ref: 'Proverbs 23:22',
  },
)

const parentsEs = card(
  'POR TUS PADRES',
  'Honra a Dios por ellos: fuerza, paz, salud y fe.',
  [
    {
      n: 1,
      heading: 'HONOR',
      prayer:
        'Ayúdame a honrarlos de palabra y de hecho. Que la gratitud marque cómo hablo de ellos y los cuido.',
      ref: 'Éxodo 20:12',
    },
    {
      n: 2,
      heading: 'SU FE',
      prayer:
        'Acércalos más a Ti. Si Te conocen, profundiza su confianza; si no, abre sus corazones al evangelio.',
      ref: 'Hechos 16:31',
    },
    {
      n: 3,
      heading: 'SU PAZ',
      prayer:
        'Calma todo pensamiento ansioso. Dales descanso en Tu presencia y valor para cada día.',
      ref: 'Isaías 26:3',
    },
    {
      n: 4,
      heading: 'SU SALUD',
      prayer:
        'Sustenta sus cuerpos y mentes. Da sabiduría a quienes los cuidan y esperanza en cada estación.',
      ref: 'Salmo 71:9',
    },
    {
      n: 5,
      heading: 'SUS RELACIONES',
      prayer:
        'Sana heridas antiguas donde haga falta. Haz crecer paciencia, perdón y gozo en nuestra familia.',
      ref: 'Colosenses 3:13',
    },
    {
      n: 6,
      heading: 'SU LEGADO',
      prayer:
        'Que sus años den fruto. Haz que su historia señale a otros Tu fidelidad.',
      ref: 'Salmo 92:14',
    },
  ],
  {
    prayer: 'Señor, bendice a mis padres hoy. Rodéalos con Tu amor firme.',
    ref: 'Proverbios 23:22',
  },
  'CÓMO ORAR',
)

const parentsPt = card(
  'POR SEUS PAIS',
  'Honre a Deus por eles — força, paz, saúde e fé.',
  [
    {
      n: 1,
      heading: 'HONRA',
      prayer:
        'Ajuda-me a honrá-los em palavra e ação. Que a gratidão marque como falo deles e cuido deles.',
      ref: 'Êxodo 20:12',
    },
    {
      n: 2,
      heading: 'A FÉ DELES',
      prayer:
        'Aproxima-os de Ti. Se Te conhecem, aprofunda a confiança; se não, abre o coração ao evangelho.',
      ref: 'Atos 16:31',
    },
    {
      n: 3,
      heading: 'A PAZ DELES',
      prayer:
        'Acalma todo pensamento ansioso. Dá-lhes descanso na Tua presença e coragem para cada dia.',
      ref: 'Isaías 26:3',
    },
    {
      n: 4,
      heading: 'A SAÚDE',
      prayer:
        'Sustenta o corpo e a mente deles. Dá sabedoria a quem cuida e esperança em cada estação.',
      ref: 'Salmo 71:9',
    },
    {
      n: 5,
      heading: 'OS RELACIONAMENTOS',
      prayer:
        'Sara feridas antigas onde for preciso. Cresça paciência, perdão e alegria em nossa família.',
      ref: 'Colossenses 3:13',
    },
    {
      n: 6,
      heading: 'O LEGADO',
      prayer:
        'Que os anos deles deem fruto. Faz a história deles apontar outros à Tua fidelidade.',
      ref: 'Salmo 92:14',
    },
  ],
  {
    prayer: 'Senhor, abençoa meus pais hoje. Cerca-os com o Teu amor firme.',
    ref: 'Provérbios 23:22',
  },
  'COMO ORAR',
)


const friendsEn = card(
  'FOR YOUR FRIENDS',
  'Lift them up — faith, courage, loyalty, and Christlike love.',
  [
    {
      n: 1,
      heading: 'THEIR FAITH',
      prayer:
        'Strengthen their trust in You. Where faith is thin, renew hope; where it is strong, make it fruitful.',
      ref: '1 Thessalonians 5:11',
    },
    {
      n: 2,
      heading: 'THEIR JOY',
      prayer:
        'Fill them with the joy of Your salvation. Lift heavy hearts and remind them You are near.',
      ref: 'Psalm 16:11',
    },
    {
      n: 3,
      heading: 'THEIR NEEDS',
      prayer:
        'Provide what they lack — wisdom, work, healing, or peace. Teach me how to help without taking Your place.',
      ref: 'Philippians 4:19',
    },
    {
      n: 4,
      heading: 'THEIR PROTECTION',
      prayer:
        'Keep them from harm and from friendships that pull them from You. Guard their steps.',
      ref: 'Psalm 91:11',
    },
    {
      n: 5,
      heading: 'OUR FRIENDSHIP',
      prayer:
        'Make our friendship honest, patient, and pure. Help us sharpen one another in love.',
      ref: 'Proverbs 27:17',
    },
    {
      n: 6,
      heading: 'THEIR WITNESS',
      prayer:
        'Use their lives to point others to Jesus. Give them boldness and a gentle spirit.',
      ref: 'Matthew 5:16',
    },
  ],
  {
    prayer: 'Lord Jesus, You called us friends. Care for those I love as You care for me.',
    ref: 'John 15:13–15',
  },
)

const friendsEs = card(
  'POR TUS AMIGOS',
  'Levántalos en oración: fe, valor, lealtad y amor como el de Cristo.',
  [
    {
      n: 1,
      heading: 'SU FE',
      prayer:
        'Fortalece su confianza en Ti. Donde la fe sea débil, renueva la esperanza; donde sea fuerte, hazla fructífera.',
      ref: '1 Tesalonicenses 5:11',
    },
    {
      n: 2,
      heading: 'SU GOZO',
      prayer:
        'Llénalos del gozo de Tu salvación. Alza los corazones cansados y recuérdales que estás cerca.',
      ref: 'Salmo 16:11',
    },
    {
      n: 3,
      heading: 'SUS NECESIDADES',
      prayer:
        'Proveeles lo que falte: sabiduría, trabajo, sanidad o paz. Enséñame a ayudar sin ocupar Tu lugar.',
      ref: 'Filipenses 4:19',
    },
    {
      n: 4,
      heading: 'SU PROTECCIÓN',
      prayer:
        'Guárdalos del daño y de amistades que los alejen de Ti. Cuida sus pasos.',
      ref: 'Salmo 91:11',
    },
    {
      n: 5,
      heading: 'NUESTRA AMISTAD',
      prayer:
        'Haz nuestra amistad honesta, paciente y pura. Ayúdanos a afilarnos unos a otros en amor.',
      ref: 'Proverbios 27:17',
    },
    {
      n: 6,
      heading: 'SU TESTIMONIO',
      prayer:
        'Usa sus vidas para señalar a Jesús. Dales valentía y un espíritu manso.',
      ref: 'Mateo 5:16',
    },
  ],
  {
    prayer: 'Señor Jesús, Tú nos llamaste amigos. Cuida a quienes amo como me cuidas a mí.',
    ref: 'Juan 15:13–15',
  },
  'CÓMO ORAR',
)

const friendsPt = card(
  'POR SEUS AMIGOS',
  'Levante-os em oração — fé, coragem, lealdade e amor como o de Cristo.',
  [
    {
      n: 1,
      heading: 'A FÉ DELES',
      prayer:
        'Fortalece a confiança deles em Ti. Onde a fé for fraca, renova a esperança; onde for forte, torna-a frutífera.',
      ref: '1 Tessalonicenses 5:11',
    },
    {
      n: 2,
      heading: 'A ALEGRIA',
      prayer:
        'Enche-os da alegria da Tua salvação. Levanta corações cansados e lembra-lhes que estás perto.',
      ref: 'Salmo 16:11',
    },
    {
      n: 3,
      heading: 'AS NECESSIDADES',
      prayer:
        'Provê o que falta — sabedoria, trabalho, cura ou paz. Ensina-me a ajudar sem ocupar o Teu lugar.',
      ref: 'Filipenses 4:19',
    },
    {
      n: 4,
      heading: 'A PROTEÇÃO',
      prayer:
        'Guarda-os do dano e de amizades que os afastem de Ti. Cuida dos passos deles.',
      ref: 'Salmo 91:11',
    },
    {
      n: 5,
      heading: 'NOSSA AMIZADE',
      prayer:
        'Torna nossa amizade honesta, paciente e pura. Ajuda-nos a afiar uns aos outros em amor.',
      ref: 'Provérbios 27:17',
    },
    {
      n: 6,
      heading: 'O TESTEMUNHO',
      prayer:
        'Usa a vida deles para apontar a Jesus. Dá-lhes ousadia e um espírito manso.',
      ref: 'Mateo 5:16',
    },
  ],
  {
    prayer: 'Senhor Jesus, Tu nos chamaste amigos. Cuida dos que amo como cuidas de mim.',
    ref: 'João 15:13–15',
  },
  'COMO ORAR',
)

const churchEn = card(
  'FOR YOUR CHURCH & PASTOR',
  'Ask God to bless shepherds, unity, holiness, and the Word.',
  [
    {
      n: 1,
      heading: 'THE PASTOR',
      prayer:
        'Strengthen our pastor’s walk with You. Guard his family, refresh his soul, and keep him faithful to Scripture.',
      ref: '1 Timothy 4:16',
    },
    {
      n: 2,
      heading: 'THE WORD',
      prayer:
        'Let the preached Word land with power. Open ears to hear and hearts to obey.',
      ref: '2 Timothy 4:2',
    },
    {
      n: 3,
      heading: 'UNITY',
      prayer:
        'Knit us together in love. Silence gossip, heal division, and make us one in Christ.',
      ref: 'Ephesians 4:3',
    },
    {
      n: 4,
      heading: 'HOLINESS',
      prayer:
        'Purify Your house. Help us walk in the light and turn from every hidden sin.',
      ref: '1 Peter 1:15–16',
    },
    {
      n: 5,
      heading: 'THE MISSION',
      prayer:
        'Send us to the lost with courage and compassion. Grow disciples who make disciples.',
      ref: 'Matthew 28:19–20',
    },
    {
      n: 6,
      heading: 'THE FLOCK',
      prayer:
        'Care for the weary, the lonely, and the young in faith. Make our church a refuge of grace.',
      ref: 'Acts 20:28',
    },
  ],
  {
    prayer: 'Great Shepherd, build Your church and keep us steadfast in love and truth.',
    ref: 'Hebrews 13:17',
  },
)

const churchEs = card(
  'POR TU IGLESIA Y PASTOR',
  'Pide a Dios que bendiga a los pastores, la unidad, la santidad y la Palabra.',
  [
    {
      n: 1,
      heading: 'EL PASTOR',
      prayer:
        'Fortalece el caminar de nuestro pastor contigo. Guarda su familia, refresca su alma y mantenlo fiel a la Escritura.',
      ref: '1 Timoteo 4:16',
    },
    {
      n: 2,
      heading: 'LA PALABRA',
      prayer:
        'Que la Palabra predicada caiga con poder. Abre oídos para oír y corazones para obedecer.',
      ref: '2 Timoteo 4:2',
    },
    {
      n: 3,
      heading: 'UNIDAD',
      prayer:
        'Únenos en amor. Silencia el chisme, sana la división y haznos uno en Cristo.',
      ref: 'Efesios 4:3',
    },
    {
      n: 4,
      heading: 'SANTIDAD',
      prayer:
        'Purifica Tu casa. Ayúdanos a caminar en la luz y a apartarnos de todo pecado oculto.',
      ref: '1 Pedro 1:15–16',
    },
    {
      n: 5,
      heading: 'LA MISIÓN',
      prayer:
        'Envíanos a los perdidos con valor y compasión. Haz discípulos que hagan discípulos.',
      ref: 'Mateo 28:19–20',
    },
    {
      n: 6,
      heading: 'EL REBAÑO',
      prayer:
        'Cuida a los cansados, a los solos y a los nuevos en la fe. Haz de nuestra iglesia un refugio de gracia.',
      ref: 'Hechos 20:28',
    },
  ],
  {
    prayer: 'Gran Pastor, edifica Tu iglesia y mantennos firmes en amor y verdad.',
    ref: 'Hebreos 13:17',
  },
  'CÓMO ORAR',
)

const churchPt = card(
  'POR SUA IGREJA E PASTOR',
  'Peça a Deus que abençoe pastores, unidade, santidade e a Palavra.',
  [
    {
      n: 1,
      heading: 'O PASTOR',
      prayer:
        'Fortalece o caminhar do nosso pastor Contigo. Guarda a família dele, refresca a alma e mantém-no fiel à Escritura.',
      ref: '1 Timóteo 4:16',
    },
    {
      n: 2,
      heading: 'A PALAVRA',
      prayer:
        'Que a Palavra pregada caia com poder. Abre ouvidos para ouvir e corações para obedecer.',
      ref: '2 Timóteo 4:2',
    },
    {
      n: 3,
      heading: 'UNIDADE',
      prayer:
        'Une-nos em amor. Silencia a fofoca, sara a divisão e faze-nos um em Cristo.',
      ref: 'Efésios 4:3',
    },
    {
      n: 4,
      heading: 'SANTIDADE',
      prayer:
        'Purifica a Tua casa. Ajuda-nos a andar na luz e a nos afastar de todo pecado oculto.',
      ref: '1 Pedro 1:15–16',
    },
    {
      n: 5,
      heading: 'A MISSÃO',
      prayer:
        'Envia-nos aos perdidos com coragem e compaixão. Cresça discípulos que façam discípulos.',
      ref: 'Mateus 28:19–20',
    },
    {
      n: 6,
      heading: 'O REBANHO',
      prayer:
        'Cuida dos cansados, dos solitários e dos novos na fé. Faz da nossa igreja um refúgio de graça.',
      ref: 'Atos 20:28',
    },
  ],
  {
    prayer: 'Grande Pastor, edifica a Tua igreja e mantém-nos firmes em amor e verdade.',
    ref: 'Hebreus 13:17',
  },
  'COMO ORAR',
)


const anxietyEn = card(
  'FOR ANXIETY & WORRY',
  'Cast every care on the Lord who holds tomorrow.',
  [
    {
      n: 1,
      heading: 'CAST CARE',
      prayer:
        'I bring You every anxious thought. Teach me to cast my cares on You because You care for me.',
      ref: '1 Peter 5:7',
    },
    {
      n: 2,
      heading: 'YOUR PEACE',
      prayer:
        'Guard my heart and mind with the peace of Christ that surpasses understanding.',
      ref: 'Philippians 4:6–7',
    },
    {
      n: 3,
      heading: 'TRUST',
      prayer:
        'When fear rises, steady me with trust in You. Help me lean not on my own understanding.',
      ref: 'Proverbs 3:5–6',
    },
    {
      n: 4,
      heading: 'REST',
      prayer:
        'Give my body and mind true rest. Quiet the night watches with Your presence.',
      ref: 'Matthew 11:28',
    },
    {
      n: 5,
      heading: 'TOMORROW',
      prayer:
        'Free me from fretting about tomorrow. Enough for today is Your daily bread and mercy.',
      ref: 'Matthew 6:34',
    },
    {
      n: 6,
      heading: 'COURAGE',
      prayer:
        'Replace dread with courage. Remind me You are with me and I need not fear.',
      ref: 'Isaiah 41:10',
    },
  ],
  {
    prayer: 'Prince of Peace, rule my thoughts today and keep me in perfect peace.',
    ref: 'Isaiah 26:3',
  },
)

const anxietyEs = card(
  'POR LA ANSIEDAD Y LA PREOCUPACIÓN',
  'Echa toda carga sobre el Señor que sostiene el mañana.',
  [
    {
      n: 1,
      heading: 'ECHAR LA CARGA',
      prayer:
        'Te traigo cada pensamiento ansioso. Enséñame a echar mi carga sobre Ti porque Tú cuidas de mí.',
      ref: '1 Pedro 5:7',
    },
    {
      n: 2,
      heading: 'TU PAZ',
      prayer:
        'Guarda mi corazón y mi mente con la paz de Cristo que sobrepasa todo entendimiento.',
      ref: 'Filipenses 4:6–7',
    },
    {
      n: 3,
      heading: 'CONFIANZA',
      prayer:
        'Cuando suba el miedo, afírmame en la confianza en Ti. Ayúdame a no apoyarme en mi propio entendimiento.',
      ref: 'Proverbios 3:5–6',
    },
    {
      n: 4,
      heading: 'DESCANSO',
      prayer:
        'Da a mi cuerpo y mente verdadero descanso. Calma las vigilias de la noche con Tu presencia.',
      ref: 'Mateo 11:28',
    },
    {
      n: 5,
      heading: 'EL MAÑANA',
      prayer:
        'Líbrame de afanarme por el mañana. Basta para hoy Tu pan de cada día y Tu misericordia.',
      ref: 'Mateo 6:34',
    },
    {
      n: 6,
      heading: 'VALOR',
      prayer:
        'Cambia el temor por valor. Recuérdame que estás conmigo y no debo temer.',
      ref: 'Isaías 41:10',
    },
  ],
  {
    prayer: 'Príncipe de Paz, rige mis pensamientos hoy y mantenme en perfecta paz.',
    ref: 'Isaías 26:3',
  },
  'CÓMO ORAR',
)

const anxietyPt = card(
  'POR ANSIEDADE E PREOCUPAÇÃO',
  'Lance sobre o Senhor toda a ansiedade — Ele sustenta o amanhã.',
  [
    {
      n: 1,
      heading: 'LANÇAR O CUIDADO',
      prayer:
        'Trago a Ti cada pensamento ansioso. Ensina-me a lançar sobre Ti a minha ansiedade, porque Tu cuidas de mim.',
      ref: '1 Pedro 5:7',
    },
    {
      n: 2,
      heading: 'TUA PAZ',
      prayer:
        'Guarda meu coração e minha mente com a paz de Cristo que excede todo entendimento.',
      ref: 'Filipenses 4:6–7',
    },
    {
      n: 3,
      heading: 'CONFIANÇA',
      prayer:
        'Quando o medo subir, firma-me na confiança em Ti. Ajuda-me a não me apoiar no próprio entendimento.',
      ref: 'Provérbios 3:5–6',
    },
    {
      n: 4,
      heading: 'DESCANSO',
      prayer:
        'Dá ao meu corpo e mente verdadeiro descanso. Acalma as vigílias da noite com a Tua presença.',
      ref: 'Mateus 11:28',
    },
    {
      n: 5,
      heading: 'O AMANHÃ',
      prayer:
        'Livra-me de inquietar-me com o amanhã. Basta para hoje o Teu pão de cada dia e a Tua misericórdia.',
      ref: 'Mateus 6:34',
    },
    {
      n: 6,
      heading: 'CORAGEM',
      prayer:
        'Troca o pavor por coragem. Lembra-me que estás comigo e não preciso temer.',
      ref: 'Isaías 41:10',
    },
  ],
  {
    prayer: 'Príncipe da Paz, governa meus pensamentos hoje e guarda-me em perfeita paz.',
    ref: 'Isaías 26:3',
  },
  'COMO ORAR',
)

const healingEn = card(
  'FOR HEALING',
  'Ask the Lord who heals — body, mind, and spirit.',
  [
    {
      n: 1,
      heading: 'THE HEALER',
      prayer:
        'You are the Lord who heals. I bring this need to You with faith and humility.',
      ref: 'Exodus 15:26',
    },
    {
      n: 2,
      heading: 'THE BODY',
      prayer:
        'Restore strength where it is weak. Guide doctors and give wisdom for every treatment.',
      ref: 'Psalm 103:2–3',
    },
    {
      n: 3,
      heading: 'THE MIND',
      prayer:
        'Calm racing thoughts. Replace despair with hope and confusion with clarity.',
      ref: 'Psalm 42:11',
    },
    {
      n: 4,
      heading: 'THE SPIRIT',
      prayer:
        'Heal wounds of the heart. Bind up the brokenhearted and renew a steadfast spirit.',
      ref: 'Psalm 147:3',
    },
    {
      n: 5,
      heading: 'PATIENCE',
      prayer:
        'Teach waiting without bitterness. Let endurance finish its work while we trust You.',
      ref: 'James 1:4',
    },
    {
      n: 6,
      heading: 'WITNESS',
      prayer:
        'Whether by recovery or by grace in weakness, let this season glorify Jesus.',
      ref: '2 Corinthians 12:9',
    },
  ],
  {
    prayer: 'Merciful Father, stretch out Your hand for healing and hold us in Your love.',
    ref: 'James 5:14–15',
  },
)

const healingEs = card(
  'POR LA SANIDAD',
  'Pide al Señor que sana: cuerpo, mente y espíritu.',
  [
    {
      n: 1,
      heading: 'EL SANADOR',
      prayer:
        'Tú eres el Señor que sana. Traigo esta necesidad a Ti con fe y humildad.',
      ref: 'Éxodo 15:26',
    },
    {
      n: 2,
      heading: 'EL CUERPO',
      prayer:
        'Restaura la fuerza donde esté débil. Guía a los médicos y da sabiduría en cada tratamiento.',
      ref: 'Salmo 103:2–3',
    },
    {
      n: 3,
      heading: 'LA MENTE',
      prayer:
        'Calma los pensamientos agitados. Cambia la desesperanza por esperanza y la confusión por claridad.',
      ref: 'Salmo 42:11',
    },
    {
      n: 4,
      heading: 'EL ESPÍRITU',
      prayer:
        'Sana las heridas del corazón. Venda a los quebrantados y renueva un espíritu firme.',
      ref: 'Salmo 147:3',
    },
    {
      n: 5,
      heading: 'PACIENCIA',
      prayer:
        'Enséñanos a esperar sin amargura. Que la perseverancia complete su obra mientras confiamos en Ti.',
      ref: 'Santiago 1:4',
    },
    {
      n: 6,
      heading: 'TESTIMONIO',
      prayer:
        'Sea por recuperación o por gracia en la debilidad, que esta temporada glorifique a Jesús.',
      ref: '2 Corintios 12:9',
    },
  ],
  {
    prayer: 'Padre misericordioso, extiende Tu mano para sanar y sostennos en Tu amor.',
    ref: 'Santiago 5:14–15',
  },
  'CÓMO ORAR',
)

const healingPt = card(
  'POR CURA',
  'Peça ao Senhor que sara — corpo, mente e espírito.',
  [
    {
      n: 1,
      heading: 'O CURADOR',
      prayer:
        'Tu és o Senhor que sara. Trago esta necessidade a Ti com fé e humildade.',
      ref: 'Êxodo 15:26',
    },
    {
      n: 2,
      heading: 'O CORPO',
      prayer:
        'Restaura a força onde estiver fraca. Guia os médicos e dá sabedoria em cada tratamento.',
      ref: 'Salmo 103:2–3',
    },
    {
      n: 3,
      heading: 'A MENTE',
      prayer:
        'Acalma pensamentos agitados. Troca o desespero por esperança e a confusão por clareza.',
      ref: 'Salmo 42:11',
    },
    {
      n: 4,
      heading: 'O ESPÍRITO',
      prayer:
        'Sara as feridas do coração. Liga os quebrantados e renova um espírito firme.',
      ref: 'Salmo 147:3',
    },
    {
      n: 5,
      heading: 'PACIÊNCIA',
      prayer:
        'Ensina a esperar sem amargura. Que a perseverança complete a sua obra enquanto confiamos em Ti.',
      ref: 'Tiago 1:4',
    },
    {
      n: 6,
      heading: 'TESTEMUNHO',
      prayer:
        'Seja por recuperação ou por graça na fraqueza, que esta estação glorifique Jesus.',
      ref: '2 Coríntios 12:9',
    },
  ],
  {
    prayer: 'Pai misericordioso, estende a Tua mão para curar e guarda-nos no Teu amor.',
    ref: 'Tiago 5:14–15',
  },
  'COMO ORAR',
)


const gratitudeEn = card(
  'FOR GRATITUDE',
  'Train the heart to give thanks in every season.',
  [
    {
      n: 1,
      heading: 'WHO GOD IS',
      prayer:
        'I thank You for who You are — holy, faithful, and near. You alone are worthy of praise.',
      ref: 'Psalm 100:4–5',
    },
    {
      n: 2,
      heading: 'SALVATION',
      prayer:
        'Thank You for Jesus, for the cross, and for new life. Let gratitude for the gospel never grow cold.',
      ref: '2 Corinthians 9:15',
    },
    {
      n: 3,
      heading: 'DAILY GIFTS',
      prayer:
        'Open my eyes to today’s mercies — breath, bread, work, and people You have placed near me.',
      ref: 'Lamentations 3:22–23',
    },
    {
      n: 4,
      heading: 'IN TRIAL',
      prayer:
        'Even in hard places, teach me to give thanks. Use waiting and weakness for my good.',
      ref: '1 Thessalonians 5:18',
    },
    {
      n: 5,
      heading: 'OTHERS',
      prayer:
        'Make me quick to thank those who serve and love me. Let appreciation replace complaint.',
      ref: 'Philippians 1:3',
    },
    {
      n: 6,
      heading: 'GENEROSITY',
      prayer:
        'Turn gratitude into generosity. Help me share freely because You have given freely.',
      ref: '2 Corinthians 9:11',
    },
  ],
  {
    prayer: 'Father of lights, every good gift is from You. Keep my heart thankful today.',
    ref: 'James 1:17',
  },
)

const gratitudeEs = card(
  'POR LA GRATITUD',
  'Entrena el corazón a dar gracias en toda estación.',
  [
    {
      n: 1,
      heading: 'QUIÉN ES DIOS',
      prayer:
        'Te doy gracias por quién eres: santo, fiel y cercano. Solo Tú eres digno de alabanza.',
      ref: 'Salmo 100:4–5',
    },
    {
      n: 2,
      heading: 'SALVACIÓN',
      prayer:
        'Gracias por Jesús, por la cruz y por la vida nueva. Que la gratitud por el evangelio nunca se enfríe.',
      ref: '2 Corintios 9:15',
    },
    {
      n: 3,
      heading: 'DONES DIARIOS',
      prayer:
        'Abre mis ojos a las misericordias de hoy: aliento, pan, trabajo y las personas que has puesto cerca.',
      ref: 'Lamentaciones 3:22–23',
    },
    {
      n: 4,
      heading: 'EN LA PRUEBA',
      prayer:
        'Aun en lugares difíciles, enséñame a dar gracias. Usa la espera y la debilidad para mi bien.',
      ref: '1 Tesalonicenses 5:18',
    },
    {
      n: 5,
      heading: 'LOS DEMÁS',
      prayer:
        'Hazme rápido para agradecer a quienes me sirven y me aman. Que el aprecio reemplace la queja.',
      ref: 'Filipenses 1:3',
    },
    {
      n: 6,
      heading: 'GENEROSIDAD',
      prayer:
        'Convierte la gratitud en generosidad. Ayúdame a compartir con libertad porque Tú has dado con libertad.',
      ref: '2 Corintios 9:11',
    },
  ],
  {
    prayer: 'Padre de las luces, todo buen don viene de Ti. Mantén mi corazón agradecido hoy.',
    ref: 'Santiago 1:17',
  },
  'CÓMO ORAR',
)

const gratitudePt = card(
  'POR GRATIDÃO',
  'Treine o coração a dar graças em toda estação.',
  [
    {
      n: 1,
      heading: 'QUEM DEUS É',
      prayer:
        'Agradeço-Te por quem és — santo, fiel e perto. Só Tu és digno de louvor.',
      ref: 'Salmo 100:4–5',
    },
    {
      n: 2,
      heading: 'SALVAÇÃO',
      prayer:
        'Obrigado por Jesus, pela cruz e pela vida nova. Que a gratidão pelo evangelho nunca esfrie.',
      ref: '2 Coríntios 9:15',
    },
    {
      n: 3,
      heading: 'DONS DIÁRIOS',
      prayer:
        'Abre meus olhos às misericórdias de hoje — fôlego, pão, trabalho e as pessoas que puseste perto.',
      ref: 'Lamentações 3:22–23',
    },
    {
      n: 4,
      heading: 'NA PROVA',
      prayer:
        'Mesmo em lugares difíceis, ensina-me a dar graças. Usa a espera e a fraqueza para o meu bem.',
      ref: '1 Tessalonicenses 5:18',
    },
    {
      n: 5,
      heading: 'OS OUTROS',
      prayer:
        'Faz-me rápido a agradecer quem me serve e me ama. Que a apreciação substitua a reclamação.',
      ref: 'Filipenses 1:3',
    },
    {
      n: 6,
      heading: 'GENEROSIDADE',
      prayer:
        'Transforma gratidão em generosidade. Ajuda-me a partilhar com liberdade porque Tu deste com liberdade.',
      ref: '2 Coríntios 9:11',
    },
  ],
  {
    prayer: 'Pai das luzes, todo bom dom vem de Ti. Guarda meu coração grato hoje.',
    ref: 'Tiago 1:17',
  },
  'COMO ORAR',
)

const nationEn = card(
  'FOR NATION & LEADERS',
  'Seek the peace of the city and wisdom for those in authority.',
  [
    {
      n: 1,
      heading: 'LEADERS',
      prayer:
        'Give our leaders wisdom, integrity, and a heart that fears You. Guide their counsel for the common good.',
      ref: '1 Timothy 2:1–2',
    },
    {
      n: 2,
      heading: 'JUSTICE',
      prayer:
        'Let justice roll down like waters. Defend the vulnerable and restrain evil.',
      ref: 'Amos 5:24',
    },
    {
      n: 3,
      heading: 'PEACE',
      prayer:
        'Grant peace in our streets and homes. Turn hearts from violence toward neighborly love.',
      ref: 'Jeremiah 29:7',
    },
    {
      n: 4,
      heading: 'TRUTH',
      prayer:
        'Expose lies and honor truth. Raise voices that speak righteousness without hate.',
      ref: 'Psalm 85:10–11',
    },
    {
      n: 5,
      heading: 'THE CHURCH',
      prayer:
        'Make Your people salt and light in this land — humble, holy, and bold with the gospel.',
      ref: 'Matthew 5:13–14',
    },
    {
      n: 6,
      heading: 'MERCY',
      prayer:
        'Have mercy on our nation. Heal what is broken and draw many to repentance and faith.',
      ref: '2 Chronicles 7:14',
    },
  ],
  {
    prayer: 'King of kings, establish Your justice and peace among us, and keep us praying.',
    ref: 'Psalm 33:12',
  },
)

const nationEs = card(
  'POR LA NACIÓN Y LOS LÍDERES',
  'Busca la paz de la ciudad y sabiduría para quienes tienen autoridad.',
  [
    {
      n: 1,
      heading: 'LÍDERES',
      prayer:
        'Da a nuestros líderes sabiduría, integridad y un corazón que Te tema. Guía su consejo para el bien común.',
      ref: '1 Timoteo 2:1–2',
    },
    {
      n: 2,
      heading: 'JUSTICIA',
      prayer:
        'Que corra el juicio como las aguas. Defiende a los vulnerables y refrena el mal.',
      ref: 'Amós 5:24',
    },
    {
      n: 3,
      heading: 'PAZ',
      prayer:
        'Concede paz en nuestras calles y hogares. Vuelve los corazones de la violencia al amor al prójimo.',
      ref: 'Jeremías 29:7',
    },
    {
      n: 4,
      heading: 'VERDAD',
      prayer:
        'Expón la mentira y honra la verdad. Levanta voces que hablen justicia sin odio.',
      ref: 'Salmo 85:10–11',
    },
    {
      n: 5,
      heading: 'LA IGLESIA',
      prayer:
        'Haz a Tu pueblo sal y luz en esta tierra: humilde, santo y valiente con el evangelio.',
      ref: 'Mateo 5:13–14',
    },
    {
      n: 6,
      heading: 'MISERICORDIA',
      prayer:
        'Ten misericordia de nuestra nación. Sana lo quebrado y atrae a muchos al arrepentimiento y la fe.',
      ref: '2 Crónicas 7:14',
    },
  ],
  {
    prayer: 'Rey de reyes, establece Tu justicia y paz entre nosotros, y mantennos orando.',
    ref: 'Salmo 33:12',
  },
  'CÓMO ORAR',
)

const nationPt = card(
  'POR A NAÇÃO E OS LÍDERES',
  'Busque a paz da cidade e sabedoria para quem tem autoridade.',
  [
    {
      n: 1,
      heading: 'LÍDERES',
      prayer:
        'Dá aos nossos líderes sabedoria, integridade e um coração que Te tema. Guia o conselho deles para o bem comum.',
      ref: '1 Timóteo 2:1–2',
    },
    {
      n: 2,
      heading: 'JUSTIÇA',
      prayer:
        'Corra o juízo como as águas. Defende os vulneráveis e refrena o mal.',
      ref: 'Amós 5:24',
    },
    {
      n: 3,
      heading: 'PAZ',
      prayer:
        'Concede paz nas nossas ruas e lares. Volta os corações da violência ao amor ao próximo.',
      ref: 'Jeremias 29:7',
    },
    {
      n: 4,
      heading: 'VERDADE',
      prayer:
        'Expõe a mentira e honra a verdade. Levanta vozes que falem justiça sem ódio.',
      ref: 'Salmo 85:10–11',
    },
    {
      n: 5,
      heading: 'A IGREJA',
      prayer:
        'Faz o Teu povo sal e luz nesta terra — humilde, santo e ousado com o evangelho.',
      ref: 'Mateus 5:13–14',
    },
    {
      n: 6,
      heading: 'MISERICÓRDIA',
      prayer:
        'Tem misericórdia da nossa nação. Sara o que está quebrado e atrai muitos ao arrependimento e à fé.',
      ref: '2 Crônicas 7:14',
    },
  ],
  {
    prayer: 'Rei dos reis, estabelece a Tua justiça e paz entre nós, e mantém-nos orando.',
    ref: 'Salmo 33:12',
  },
  'COMO ORAR',
)

export const TEMPLATES: readonly PrayerTemplate[] = [
  {
    id: 'wife',
    chip: { en: 'Wife', es: 'Esposa', pt: 'Esposa' },
    keywords: [
      'wife',
      'my wife',
      'for my wife',
      'praying for my wife',
      'how to pray for my wife',
      'esposa',
      'mi esposa',
      'por mi esposa',
      'orar por mi esposa',
      'minha esposa',
      'por minha esposa',
      'orar pela esposa',
    ],
    guides: { en: wifeEn, es: wifeEs, pt: wifePt },
  },
  {
    id: 'husband',
    chip: { en: 'Husband', es: 'Esposo', pt: 'Esposo' },
    keywords: [
      'husband',
      'my husband',
      'for my husband',
      'praying for my husband',
      'esposo',
      'marido',
      'mi esposo',
      'mi marido',
      'por mi esposo',
      'meu esposo',
      'meu marido',
      'por meu marido',
    ],
    guides: { en: husbandEn, es: husbandEs, pt: husbandPt },
  },
  {
    id: 'children',
    chip: { en: 'Children', es: 'Hijos', pt: 'Filhos' },
    keywords: [
      'children',
      'kids',
      'my children',
      'my kids',
      'son',
      'daughter',
      'hijos',
      'mis hijos',
      'hijo',
      'hija',
      'filhos',
      'meus filhos',
      'filho',
      'filha',
    ],
    guides: { en: childrenEn, es: childrenEs, pt: childrenPt },
  },
  {
    id: 'parents',
    chip: { en: 'Parents', es: 'Padres', pt: 'Pais' },
    keywords: [
      'parents',
      'mom',
      'dad',
      'mother',
      'father',
      'my parents',
      'padres',
      'mis padres',
      'madre',
      'padre',
      'mamá',
      'papá',
      'pais',
      'meus pais',
      'mãe',
      'pai',
    ],
    guides: { en: parentsEn, es: parentsEs, pt: parentsPt },
  },
  {
    id: 'friends',
    chip: { en: 'Friends', es: 'Amigos', pt: 'Amigos' },
    keywords: [
      'friends',
      'friend',
      'my friends',
      'amistad',
      'amigos',
      'amigo',
      'amiga',
      'mis amigos',
      'amizades',
      'meus amigos',
    ],
    guides: { en: friendsEn, es: friendsEs, pt: friendsPt },
  },
  {
    id: 'church',
    chip: { en: 'Church & Pastor', es: 'Iglesia y pastor', pt: 'Igreja e pastor' },
    keywords: [
      'church',
      'pastor',
      'my church',
      'my pastor',
      'congregation',
      'iglesia',
      'pastor',
      'mi iglesia',
      'mi pastor',
      'igreja',
      'minha igreja',
      'meu pastor',
    ],
    guides: { en: churchEn, es: churchEs, pt: churchPt },
  },
  {
    id: 'anxiety',
    chip: { en: 'Anxiety', es: 'Ansiedad', pt: 'Ansiedade' },
    keywords: [
      'anxiety',
      'worry',
      'worried',
      'anxious',
      'fear',
      'stress',
      'ansiedad',
      'preocupacion',
      'preocupación',
      'miedo',
      'estres',
      'estrés',
      'ansiedade',
      'preocupacao',
      'preocupação',
      'medo',
    ],
    guides: { en: anxietyEn, es: anxietyEs, pt: anxietyPt },
  },
  {
    id: 'healing',
    chip: { en: 'Healing', es: 'Sanidad', pt: 'Cura' },
    keywords: [
      'healing',
      'heal',
      'sick',
      'illness',
      'health',
      'recovery',
      'sanidad',
      'sanar',
      'enfermedad',
      'salud',
      'cura',
      'curar',
      'doenca',
      'doença',
      'saude',
      'saúde',
    ],
    guides: { en: healingEn, es: healingEs, pt: healingPt },
  },
  {
    id: 'gratitude',
    chip: { en: 'Gratitude', es: 'Gratitud', pt: 'Gratidão' },
    keywords: [
      'gratitude',
      'thankful',
      'thanksgiving',
      'thanks',
      'grateful',
      'gratitud',
      'agradecimiento',
      'agradecido',
      'gracias',
      'gratidao',
      'gratidão',
      'agradecimento',
      'obrigado',
    ],
    guides: { en: gratitudeEn, es: gratitudeEs, pt: gratitudePt },
  },
  {
    id: 'nation',
    chip: { en: 'Nation & Leaders', es: 'Nación y líderes', pt: 'Nação e líderes' },
    keywords: [
      'nation',
      'leaders',
      'government',
      'country',
      'president',
      'nacion',
      'nación',
      'lideres',
      'líderes',
      'gobierno',
      'nacao',
      'nação',
      'governo',
      'lideranca',
      'liderança',
    ],
    guides: { en: nationEn, es: nationEs, pt: nationPt },
  },
]

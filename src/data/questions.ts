import { SortingItem, QuizQuestion, KitchenSurveyMission, ComicPanelChallenge } from '../types';

export const SORTING_ITEMS: SortingItem[] = [
  {
    id: 'item-1',
    name: 'Cascas de Macaxeira, Abóbora e Cenoura (Higienizadas)',
    emoji: '🥕',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-carrot.png`,
    origin: 'Corte de legumes da merenda (Slide 14)',
    category: 'aproveitamento',
    explanation: 'Cascas bem lavadas de raízes e legumes entram no Aproveitamento Integral dos Alimentos (caldos nutritivos, farofas e bolinhos) ou podem ir para a compostagem!',
    points: 100
  },
  {
    id: 'item-2',
    name: 'Garrafa Plástica de Suco Vazia',
    emoji: '🧴',
    origin: 'Exemplo clássico do Slide 4',
    category: 'reciclavel',
    explanation: 'Como vimos no Slide 4, uma garrafa plástica vazia não é "lixo sem valor"! Encaminhada à coleta seletiva, ela é reciclada para produzir novos materiais.',
    points: 100
  },
  {
    id: 'item-3',
    name: 'Borra de Café e Folhas Secas do Pátio',
    emoji: '☕',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-herbs.png`,
    origin: 'Cozinha e pátio escolar (Slide 10)',
    category: 'compostagem',
    explanation: 'Borra de café, folhas e podas vão para a Composteira e viram adubo rico em nutrientes. Nossa horta escolar agradece!',
    points: 100
  },
  {
    id: 'item-4',
    name: 'Talos de Cheiro-Verde, Couve e Brócolis',
    emoji: '🥦',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-leaves.png`,
    origin: 'Preparo do almoço escolar (Slides 9 e 14)',
    category: 'aproveitamento',
    explanation: 'Aproveite todas as partes dos alimentos! Talos de cheiro-verde, cenoura e brócolis são riquíssimos em fibras e vitaminas para arroz verde, sopas e tortas.',
    points: 100
  },
  {
    id: 'item-5',
    name: 'Cascas de Banana, Laranja e Melancia',
    emoji: '🍌',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-banana.png`,
    origin: 'Sobremesa da merenda (Slide 14)',
    category: 'compostagem',
    explanation: 'As cascas de frutas geradas em grande volume na escola podem ser compostadas para gerar adubo natural para a nossa horta!',
    points: 100
  },
  {
    id: 'item-6',
    name: 'Latas de Alumínio e Embalagens Metálicas Limpas',
    emoji: '🥫',
    origin: 'Despensa da cozinha (Slide 10)',
    category: 'reciclavel',
    explanation: 'Plásticos, metais, papéis, vidros e embalagens limpas são Resíduos Recicláveis e voltam ao ciclo produtivo com valor econômico!',
    points: 100
  },
  {
    id: 'item-7',
    name: 'Sementes de Abóbora e Tomate para Receitas',
    emoji: '🍅',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-apple.png`,
    origin: 'Preparo da merenda (Slide 9)',
    category: 'aproveitamento',
    explanation: 'No aproveitamento integral dos alimentos (Slide 9), sementes e partes comestíveis evitam o desperdício e enriquecem novas receitas!',
    points: 100
  },
  {
    id: 'item-8',
    name: 'Caixas de Papelão e Papéis Limpos',
    emoji: '📦',
    origin: 'Secretaria e despensa (Slide 10)',
    category: 'reciclavel',
    explanation: 'Papéis e caixas limpas e secas devem ser separados para a coleta seletiva, evitando o corte de novas árvores.',
    points: 100
  },
  {
    id: 'item-9',
    name: 'Miolo de Maçã e Restos Orgânicos do Prato',
    emoji: '🍎',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-roots.png`,
    origin: 'Refeitório escolar (Slides 9 e 10)',
    category: 'compostagem',
    explanation: 'Restos de alimentos orgânicos que não podem mais ser consumidos vão para a compostagem — e lembre-se do lema: "Sirva apenas o que vai consumir!"',
    points: 100
  }
];

export const LIGHTNING_QUIZ_GAME1: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Na apresentação da UFPA, aprendemos que "resíduo sólido" e "lixo sem valor" NÃO são a mesma coisa. Por quê?',
    context: 'Conceito fundamental dos Slides 3 e 4',
    options: [
      'Porque resíduos sólidos são materiais que ainda têm valor e podem ser reutilizados, reciclados ou compostados.',
      'Porque resíduo sólido é apenas o que sobra nos hospitais e indústrias químicas.',
      'Porque todo resíduo sólido deve ser queimado em terrenos baldios.',
      'Porque o descarte errado não causa nenhum impacto ambiental.'
    ],
    correctIndex: 0,
    explanation: 'Exato! Muitos materiais descartados ainda possuem valor econômico e ambiental, podendo voltar ao ciclo produtivo via reciclagem, reutilização ou compostagem.',
    slideRef: 'Slides 3 e 4'
  },
  {
    id: 'q2',
    question: 'Durante o preparo da merenda, a cozinha gera muitas cascas, talos e sementes. Quais são as DUAS melhores soluções ensinadas no Slide 9 para esses materiais?',
    context: 'Para onde tudo isso vai? (Slide 9)',
    options: [
      'Jogar tudo no rio mais próximo ou esconder debaixo da terra.',
      'Aproveitamento integral dos alimentos (novas receitas) e Compostagem (transformar em adubo para a horta).',
      'Misturar as cascas de frutas com garrafas plásticas e vidros quebrados.',
      'Proibir o uso de frutas, raízes e verduras na merenda da escola.'
    ],
    correctIndex: 1,
    explanation: 'Perfeito! O Slide 9 destaca o planejamento das porções, o aproveitamento integral dos alimentos em novas receitas e a compostagem para gerar adubo!',
    slideRef: 'Slides 9 e 10'
  },
  {
    id: 'q3',
    question: 'No refeitório da escola, qual atitude de cada aluno do 6º ano ajuda diretamente a reduzir o desperdício de comida todos os dias?',
    context: 'Pequenas escolhas, grandes mudanças! (Slide 10)',
    options: [
      'Encher o prato até transbordar mesmo sem estar com fome.',
      'Jogar a fruta inteira no lixo comum para sair mais rápido para o recreio.',
      'Servir de forma consciente, colocando no prato apenas a quantidade que realmente vai consumir.',
      'Deixar a responsabilidade apenas para as merendeiras da cozinha.'
    ],
    correctIndex: 2,
    explanation: 'Muito bem! "Sirva consciente. Aproveite melhor. Sirva apenas o que vai consumir!" Assim evitamos que comida boa vire desperdício.',
    slideRef: 'Slide 10'
  }
];

export const KITCHEN_SURVEY_MISSIONS: KitchenSurveyMission[] = [
  {
    id: 1,
    stepTitle: 'Pergunta 1: O Volume Diário de Preparo',
    slideNumber: 11,
    surveyQuestion: '"Em média, quantos quilos (ou baldes) de resíduos orgânicos (cascas, talos, sementes e aparas) são gerados aqui na cozinha por dia, apenas preparando a merenda?"',
    excelOutput: 'Gráfico mostrando o "Volume Diário de Resíduos da Cozinha em kg", ajudando a ver a quantidade exata gerada por dia.',
    kitchenReport: 'Dona Nazaré, chefe da cozinha, anotou com a turma: "Crianças, nós usamos baldes de 4 kg. No preparo de hoje enchemos 3 baldes inteiros só de cascas e talos!"',
    recommendedChart: 'bar-daily',
    chartData: [
      { label: 'Balde 1 (Raízes)', value: 4, color: '#ED9527', unit: 'kg' },
      { label: 'Balde 2 (Frutas)', value: 4, color: '#CCA151', unit: 'kg' },
      { label: 'Balde 3 (Talos/Folhas)', value: 4, color: '#67960E', unit: 'kg' },
      { label: 'Total Diário', value: 12, color: '#3D531B', unit: 'kg' }
    ],
    chartTypeQuestion: {
      prompt: 'De acordo com o Slide 11, o que essa primeira pergunta do questionário rende quando levamos os dados para o Excel?',
      options: [
        'Um gráfico mostrando o "Volume Diário de Resíduos da Cozinha em kg".',
        'Uma lista secreta com as notas de matemática da turma.',
        'Um mapa de ruas do bairro da escola.'
      ],
      correctIndex: 0
    },
    interpretationQuestion: {
      prompt: 'Se a cozinha encheu 3 baldes de 4 kg por dia (12 kg diários), quantos quilos de resíduos orgânicos serão gerados em uma semana escolar de 5 dias (segunda a sexta)?',
      options: [
        '15 kg na semana',
        '30 kg na semana',
        '60 kg na semana',
        '120 kg na semana'
      ],
      correctIndex: 2,
      explanation: 'Cálculo certeiro de 6º ano! 12 kg por dia × 5 dias de aula = 60 kg de resíduos orgânicos por semana que podem virar adubo na composteira!'
    }
  },
  {
    id: 2,
    stepTitle: 'Pergunta 2: O Dia de Maior Geração',
    slideNumber: 12,
    surveyQuestion: '"Em qual dia da semana vocês percebem que a cozinha enche mais baldes de cascas e resíduos? E em qual dia gera menos?"',
    excelOutput: 'Um gráfico de colunas comparando segunda a sexta.',
    kitchenReport: 'A equipe da cozinha mostrou a planilha da semana: Segunda (10 kg), Terça (14 kg), Quarta (18 kg - Dia de Sopão!), Quinta (12 kg) e Sexta (6 kg - Dia de Mingau).',
    recommendedChart: 'column-week',
    chartData: [
      { label: 'Segunda', value: 10, color: '#67960E', unit: 'kg' },
      { label: 'Terça', value: 14, color: '#CCA151', unit: 'kg' },
      { label: 'Quarta', value: 18, color: '#AC300F', unit: 'kg' },
      { label: 'Quinta', value: 12, color: '#ED9527', unit: 'kg' },
      { label: 'Sexta', value: 6, color: '#3D531B', unit: 'kg' }
    ],
    chartTypeQuestion: {
      prompt: 'Segundo o Slide 12, qual tipo de gráfico do Excel é ideal para comparar a geração de resíduos de segunda a sexta-feira?',
      options: [
        'Um gráfico de colunas comparando segunda a sexta.',
        'Um texto sem números.',
        'Uma fotografia preta e branca.'
      ],
      correctIndex: 0
    },
    interpretationQuestion: {
      prompt: 'Olhando para o Gráfico de Colunas acima, qual é a diferença em quilos entre o dia que MAIS gera resíduos (Quarta-feira) e o dia que MENOS gera (Sexta-feira)?',
      options: [
        '8 kg de diferença',
        '12 kg de diferença',
        '18 kg de diferença',
        '24 kg de diferença'
      ],
      correctIndex: 1,
      explanation: 'Isso mesmo! Quarta-feira (18 kg) menos Sexta-feira (6 kg) = 12 kg de diferença! Os gráficos de colunas ajudam a visualizar rapidamente esses picos.'
    }
  },
  {
    id: 3,
    stepTitle: 'Pergunta 3: O Impacto do Cardápio',
    slideNumber: 13,
    surveyQuestion: '"Pensando no cardápio da escola, qual é a refeição ou prato que dá mais trabalho de corte e gera mais volume de cascas e talos?"',
    excelOutput: 'Um gráfico classificando "Os pratos que mais geram resíduos orgânicos".',
    kitchenReport: 'As merendeiras listaram os 3 pratos campeões de cascas e talos: 1º Sopa de Carne com Macaxeira e Legumes (18 kg), 2º Picadinho com Salada de Frutas (15 kg) e 3º Arroz com Frango e Cenoura (9 kg).',
    recommendedChart: 'ranking-dishes',
    chartData: [
      { label: '1º Sopa c/ Macaxeira e Legumes', value: 18, color: '#AC300F', unit: 'kg' },
      { label: '2º Picadinho + Salada de Frutas', value: 15, color: '#ED9527', unit: 'kg' },
      { label: '3º Arroz c/ Frango e Cenoura', value: 9, color: '#67960E', unit: 'kg' }
    ],
    chartTypeQuestion: {
      prompt: 'Para que serve anotar os 2 ou 3 pratos que dão mais trabalho de corte e geram mais cascas na cozinha (Slide 13)?',
      options: [
        'Para criar no Excel um gráfico classificando "Os pratos que mais geram resíduos orgânicos" e planejar o reaproveitamento.',
        'Para proibir a merendeira de cozinhar legumes na escola.',
        'Para jogar todas as verduras cruas no lixo.'
      ],
      correctIndex: 0
    },
    interpretationQuestion: {
      prompt: 'Por que a "Sopa com Macaxeira e Legumes" aparece em 1º lugar no gráfico de geração de resíduos da cozinha?',
      options: [
        'Porque ninguém gosta de tomar sopa na escola.',
        'Porque utiliza muitas raízes, legumes e temperos verdes in natura que precisam ser descascados e cortados.',
        'Porque a sopa vem dentro de garrafas plásticas.',
        'Porque não usa nenhum ingrediente de origem vegetal.'
      ],
      correctIndex: 1,
      explanation: 'Perfeito! Pratos com raízes (macaxeira, batata) e legumes frescos geram muitas cascas e talos — que são excelentes para compostagem e receitas de aproveitamento integral!'
    }
  },
  {
    id: 4,
    stepTitle: 'Pergunta 4: A Composição do Resíduo',
    slideNumber: 14,
    surveyQuestion: '"Se a gente olhasse para o balde de resíduos de vocês no fim do dia, qual desses itens estaria em maior quantidade?"',
    excelOutput: 'Um gráfico de pizza excelente mostrando "Do que é feito o resíduo da nossa cozinha".',
    kitchenReport: 'Ao analisar o balde do fim do dia, a turma descobriu: 50% são Cascas de raízes e legumes (batata, cenoura, macaxeira), 35% são Cascas de frutas (banana, laranja, melancia) e 15% são Talos e folhas (cheiro-verde, folhas duras).',
    recommendedChart: 'pie-composition',
    chartData: [
      { label: 'Cascas de raízes/legumes (batata, cenoura, macaxeira)', value: 50, color: '#ED9527', unit: '%' },
      { label: 'Cascas de frutas (banana, laranja, melancia)', value: 35, color: '#CCA151', unit: '%' },
      { label: 'Talos e folhas (cheiro-verde, folhas duras)', value: 15, color: '#67960E', unit: '%' }
    ],
    chartTypeQuestion: {
      prompt: 'Qual gráfico do Excel o Slide 14 recomenda para mostrar as fatias de "Do que é feito o resíduo da nossa cozinha"?',
      options: [
        'Um gráfico de pizza excelente mostrando a proporção de cada tipo de resíduo.',
        'Uma tabela em branco sem números.',
        'Um cronômetro regressivo.'
      ],
      correctIndex: 0
    },
    interpretationQuestion: {
      prompt: 'No gráfico de pizza acima, qual grupo representa sozinho a METADE (50%) de todo o resíduo orgânico gerado no balde da cozinha?',
      options: [
        'Talos e folhas de cheiro-verde (15%)',
        'Cascas de frutas como banana, laranja e melancia (35%)',
        'Cascas e pedaços de raízes/legumes como batata, cenoura e macaxeira (50%)',
        'Garrafas plásticas e latinhas (0%)'
      ],
      correctIndex: 2,
      explanation: 'Exatamente! 50% equivale à metade do gráfico de pizza: as cascas e pedaços de raízes e legumes (batata, cenoura, macaxeira) lideram o volume no balde!'
    }
  },
  {
    id: 5,
    stepTitle: 'Pergunta 5: O Destino Atual e a Mudança',
    slideNumber: 15,
    surveyQuestion: '"Hoje, o que acontece com todas essas cascas e talos que sobram do preparo?" ( ) Lixo comum ( ) Animais ( ) Outro destino.',
    excelOutput: 'Informação-chave para os cartazes e HQs de conscientização da 3ª Etapa!',
    kitchenReport: 'Antes do projeto, 80% das cascas iam para o lixo comum da escola e apenas 20% alguém levava para alimentar animais. Com a nossa missão da UFPA, queremos levar 100% para Compostagem, Horta e Reaproveitamento!',
    recommendedChart: 'destination-cards',
    chartData: [
      { label: 'Lixo Comum (Antes do Projeto)', value: 80, color: '#AC300F', unit: '%' },
      { label: 'Alimentação de Animais', value: 20, color: '#CCA151', unit: '%' },
      { label: 'Meta: Compostagem + Horta Escolar', value: 100, color: '#67960E', unit: '%' }
    ],
    chartTypeQuestion: {
      prompt: 'De acordo com o Slide 15, por que descobrir "O Destino Atual" das cascas e talos é tão importante para os grupos?',
      options: [
        'Porque é uma informação-chave para criar os cartazes e as Histórias em Quadrinhos (HQs) de conscientização!',
        'Porque serve apenas para decorar o caderno e depois esquecer.',
        'Porque não tem relação com o meio ambiente.'
      ],
      correctIndex: 0
    },
    interpretationQuestion: {
      prompt: 'Se a escola substituir o envio das cascas ao "lixo comum" pela COMPOSTAGEM na própria escola, qual será o benefício direto citado no Slide 10?',
      options: [
        'Os resíduos orgânicos viram adubo rico e fortalecem a nossa horta escolar ("Nossa horta agradece!").',
        'O pátio da escola ficará cheio de fumaça.',
        'As plantas da horta vão parar de crescer.',
        'O desperdício de comida no refeitório vai aumentar.'
      ],
      correctIndex: 0,
      explanation: 'Brilhante! Como diz o Slide 10: "Resíduos orgânicos viram adubo! Composte sempre. Nossa horta agradece!"'
    }
  }
];

export const COMIC_PANELS: ComicPanelChallenge[] = [
  {
    id: 1,
    panelTitle: 'Quadrinho 1: O Chamado da UFPA',
    stageTag: 'Protagonismo Jovem (Slide 2)',
    sceneEmoji: '🎓🌱',
    illust: `${import.meta.env.BASE_URL}assets/slides/ufpa-crest.png`,
    characterName: 'Clarice & Lucas (6º Ano)',
    characterRole: 'Agentes de Transformação',
    situation: 'O projeto "Da Cozinha à Consciência" da UFPA chegou na escola! A turma descobriu que não é apenas espectadora.',
    speechPrompt: 'Complete o balão de fala da Clarice explicando o papel dos alunos no projeto:',
    options: [
      {
        text: '"Nós não somos apenas alunos! Somos agentes de transformação e educadores ambientais capazes de propor soluções reais para a nossa escola!"',
        isCorrect: true,
        feedback: 'Perfeito! Você usou exatamente o conceito de Protagonismo Jovem dos Slides 2 e 10!'
      },
      {
        text: '"Cuidar do meio ambiente é tarefa exclusiva dos adultos, então não precisamos fazer nada na escola."',
        isCorrect: false,
        feedback: 'Ops! No Slide 2 aprendemos que os alunos são protagonistas e agentes de transformação!'
      },
      {
        text: '"Vamos guardar esse conhecimento em segredo e não contar para nenhuma outra turma."',
        isCorrect: false,
        feedback: 'Lembre-se: a meta é compartilhar o conhecimento com toda a escola!'
      }
    ]
  },
  {
    id: 2,
    panelTitle: 'Quadrinho 2: Lixo ou Resíduo Sólido?',
    stageTag: 'Conceito-Chave (Slides 3, 4 e 8)',
    sceneEmoji: '♻️🧴',
    illust: `${import.meta.env.BASE_URL}assets/slides/eco-badge.png`,
    characterName: 'Pedro (Detetive Ambiental)',
    characterRole: 'Explicando o que são Resíduos Sólidos',
    situation: 'No pátio, um colega ia jogar uma garrafa plástica vazia em um canto qualquer, chamando-a de "lixo sem valor".',
    speechPrompt: 'Qual fala do Pedro responde corretamente "O que são os resíduos sólidos?" na nossa HQ?',
    options: [
      {
        text: '"Espera! Resíduo sólido não é lixo sem valor! Essa garrafa plástica pode ir para a coleta seletiva, ser reciclada e virar novos produtos!"',
        isCorrect: true,
        feedback: 'Show! Essa é a primeira pergunta obrigatória da HQ do Slide 8 explicada com o exemplo do Slide 4!'
      },
      {
        text: '"Pode jogar no terreno baldio, porque o plástico desaparece sozinho em dois minutos."',
        isCorrect: false,
        feedback: 'Cuidado! O descarte errado gera graves impactos ambientais e à saúde pública (Slide 3).'
      },
      {
        text: '"Garrafa plástica deve ser misturada com casca de banana dentro da horta."',
        isCorrect: false,
        feedback: 'Garrafa plástica é resíduo reciclável seco, não orgânico!'
      }
    ]
  },
  {
    id: 3,
    panelTitle: 'Quadrinho 3: A Investigação na Cozinha',
    stageTag: '1ª e 2ª Etapas (Slides 6 e 7)',
    sceneEmoji: '📋👩‍🍳',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-veggies.png`,
    characterName: 'Dona Nazaré & Grupo de Pesquisa',
    characterRole: 'Coleta de Dados e Excel',
    situation: 'Com o formulário em mãos, o grupo entrevistou a equipe da cozinha e levou os números para as planilhas do Excel.',
    speechPrompt: 'Complete o balão que explica como o grupo descobriu a realidade do desperdício na escola:',
    options: [
      {
        text: '"Adivinhamos os números de cabeça sem conversar com ninguém da cozinha."',
        isCorrect: false,
        feedback: 'Na 1ª Etapa nós fomos a campo entrevistar a equipe da cozinha com o questionário!'
      },
      {
        text: '"Entrevistamos a cozinha sobre os baldes de cascas de macaxeira, frutas e talos, e transformamos tudo em gráficos de colunas e pizza no Excel!"',
        isCorrect: true,
        feedback: 'Excelente! Você conectou a entrevista de campo (1ª Etapa) com os gráficos digitais no Excel (2ª Etapa)!'
      },
      {
        text: '"Descobrimos que a cozinha não usa nenhuma fruta ou legume na merenda."',
        isCorrect: false,
        feedback: 'Pelo contrário! A cozinha gera quilos de cascas e talos preparando a merenda todos os dias.'
      }
    ]
  },
  {
    id: 4,
    panelTitle: 'Quadrinho 4: O Poder do Aproveitamento Integral',
    stageTag: 'Menos Desperdício (Slides 9 e 10)',
    sceneEmoji: '🥕🍲',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-carrot.png`,
    characterName: 'Chef Mirim Tiago',
    characterRole: 'Reaproveitamento de Alimentos',
    situation: 'Muitas cascas limpas, talos de cheiro-verde e sementes nutritivas iam parar no lixo comum por falta de informação.',
    speechPrompt: 'Como o personagem da HQ ensina a reaproveitar os alimentos na cozinha?',
    options: [
      {
        text: '"Com o aproveitamento integral, usamos todas as partes nutritivas dos alimentos — cascas, talos e sementes — para criar novas receitas deliciosas!"',
        isCorrect: true,
        feedback: 'Mandou muito bem! "Aproveite todas as partes dos alimentos! Sobras de alimentos viram novas receitas" (Slides 9 e 10).'
      },
      {
        text: '"A única parte boa dos legumes é o meio; todas as folhas e talos devem ir para o caminhão de lixo."',
        isCorrect: false,
        feedback: 'Talos e folhas possuem muitas vitaminas e fibras e podem ser reaproveitados!'
      },
      {
        text: '"Para não ter cascas, devemos comer apenas biscoito embalado em plástico."',
        isCorrect: false,
        feedback: 'Alimentos naturais são saudáveis e suas cascas podem ser reaproveitadas ou compostadas!'
      }
    ]
  },
  {
    id: 5,
    panelTitle: 'Quadrinho 5: Da Composteira para a Horta!',
    stageTag: 'Compostagem (Slides 9 e 10)',
    sceneEmoji: '🪱🌻',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-banana.png`,
    characterName: 'Bia (Guardiã da Horta)',
    characterRole: 'Separação e Compostagem',
    situation: 'E aquelas cascas de banana, borra de café e folhas secas que não entraram nas receitas? Elas têm um destino nobre!',
    speechPrompt: 'Escolha a fala que mostra como a compostagem ajuda a natureza e a escola:',
    options: [
      {
        text: '"Quando separamos os resíduos orgânicos (cascas, borra de café e folhas) para a compostagem, eles viram um adubo rico! Nossa horta escolar agradece!"',
        isCorrect: true,
        feedback: 'Perfeito! Você respondeu à pergunta "Como a compostagem ajuda a natureza?" do Slide 10!'
      },
      {
        text: '"Misturamos vidro e plástico com casca de banana para fazer adubo artificial."',
        isCorrect: false,
        feedback: 'Na composteira entram apenas resíduos orgânicos! Plástico e vidro vão para a reciclagem.'
      },
      {
        text: '"Queimamos as folhas e cascas no pátio para produzir fumaça."',
        isCorrect: false,
        feedback: 'Queimar resíduos polui o ar e desperdiça nutrientes que virariam adubo na compostagem.'
      }
    ]
  },
  {
    id: 6,
    panelTitle: 'Quadrinho 6: A Grande Exposição no Pátio!',
    stageTag: '3ª Etapa (Slide 10)',
    sceneEmoji: '🎨🏫',
    illust: `${import.meta.env.BASE_URL}assets/slides/illust-leaves.png`,
    characterName: 'Toda a Turma do 6º Ano',
    characterRole: 'Educadores Ambientais na Escola',
    situation: 'Chegou o dia da Grande Exposição das HQs no refeitório e no pátio! Todas as turmas vieram ver os gráficos e quadrinhos.',
    speechPrompt: 'Qual mensagem final encerra a nossa HQ para transformar os hábitos da escola?',
    options: [
      {
        text: '"Sirva consciente, coloque no prato apenas o que vai consumir, separe os resíduos e composte sempre! A mudança da escola começa pelas nossas mãos!"',
        isCorrect: true,
        feedback: 'FINAL ÉPICO! Você reuniu todos os lemas do Slide 10 ("Sirva consciente", "Separe corretamente", "A mudança da escola começa pelas mãos de vocês!").'
      },
      {
        text: '"A exposição acabou, então a partir de amanhã podemos voltar a desperdiçar merenda."',
        isCorrect: false,
        feedback: 'Nossa Meta Real no Slide 10 é ir além do papel e promover uma mudança de hábito permanente!'
      },
      {
        text: '"Só quem participou do grupo precisa separar os resíduos no refeitório."',
        isCorrect: false,
        feedback: 'A exposição nos espaços de maior circulação serve justamente para envolver todas as outras turmas!'
      }
    ]
  }
];

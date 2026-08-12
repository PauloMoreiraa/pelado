const TEAM_NAMES = [
  'Bar Sem Lona FC',
  'Betinhas FC',
  'Só Canela',
  'Real Madruga',
  'Os Bagres',
  'SC Farmadores',
  'Meinhas FC',
  'Bola Murcha FC',
  'Peladeiros Anônimos',
  'Os Sem VAR',
  'Tabajara FC',
  'Canelada FC',
  'SE Porcoletes',
  'Futebol de Quinta',
  'Deixa Que Eu Chuto',
  'Os Perninhas',
  'Pés de Rato FC',
  'Ruindade FC',
  'Bonde do Churrasco',
  'Resenha FC',
  'Vai Que Cola FC',
  'Os Últimos',
  'SC Só no Toco FC',
  'Bebedeira FC',
  'Os Incansáveis',
  'Cirrose de Regatas',
  'Horríveis FC',
  'Real Madruga',
  'SC Saúde Que Importa',
  'Dom Peso Primeiro',
  'Juventude Perdida',
  'Inter de Milão de Mentira',
  'Os Sem Joelho',
  'Liverpum',
  'Barcelona do Zap',
  'Flamingus de Regatas',
  'Prantos FC',
  'Cortinas Paulista',
  'Tricas FC',
  'Cai Cai FC',
  'Os Caneteiros',
]

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (
    let index = shuffled.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    )

    ;[shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ]
  }

  return shuffled
}

export function generateTeamNames(
  numberOfTeams: number,
): string[] {
  if (numberOfTeams <= 0) {
    return []
  }

  const shuffledNames = shuffle(TEAM_NAMES)

  return Array.from(
    { length: numberOfTeams },
    (_, index) => {
      if (shuffledNames[index]) {
        return shuffledNames[index]
      }

      return `Peladô FC ${index + 1}`
    },
  )
}
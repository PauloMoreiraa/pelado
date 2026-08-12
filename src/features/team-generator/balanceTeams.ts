import type { Player } from '../../types/player'

import type {
  GoalkeeperMode,
  LevelStrengthMap,
  TeamDraft,
} from './types'

const LEVEL_STRENGTH: LevelStrengthMap = {
  'perna-de-pau': 1,
  'arroz-com-feijao': 2,
  craque: 3,
}

function getPlayerStrength(
  player: Player,
): number {
  return LEVEL_STRENGTH[player.level]
}

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

    const current = shuffled[index]

    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = current
  }

  return shuffled
}

function createEmptyTeams(
  numberOfTeams: number,
): TeamDraft[] {
  return Array.from(
    { length: numberOfTeams },
    () => ({
      players: [],
      totalStrength: 0,
      goalkeeperCount: 0,
    }),
  )
}

function getBestTeam(
  teams: TeamDraft[],
): TeamDraft {
  const minimumStrength = Math.min(
    ...teams.map(
      (team) => team.totalStrength,
    ),
  )

  const weakestTeams = teams.filter(
    (team) =>
      team.totalStrength ===
      minimumStrength,
  )

  const minimumPlayers = Math.min(
    ...weakestTeams.map(
      (team) => team.players.length,
    ),
  )

  const availableTeams =
    weakestTeams.filter(
      (team) =>
        team.players.length ===
        minimumPlayers,
    )

  const randomIndex = Math.floor(
    Math.random() * availableTeams.length,
  )

  return availableTeams[randomIndex]
}

function distributeGoalkeepers(
  teams: TeamDraft[],
  goalkeepers: Player[],
  playersPerTeam: number,
): void {
  const shuffledGoalkeepers =
    shuffle(goalkeepers)

  for (const goalkeeper of shuffledGoalkeepers) {
    const availableTeams = teams.filter(
      (team) =>
        team.players.length <
          playersPerTeam &&
        team.goalkeeperCount === 0,
    )

    /*
     * Enquanto existir uma equipe sem goleiro,
     * sempre colocamos o próximo goleiro nela.
     */
    if (availableTeams.length > 0) {
      const team = getBestTeam(
        availableTeams,
      )

      team.players.push(goalkeeper)

      team.totalStrength +=
        getPlayerStrength(goalkeeper)

      team.goalkeeperCount += 1

      continue
    }

    /*
     * Se todas as equipes já possuem goleiro,
     * jogadores adicionais podem ser distribuídos
     * normalmente.
     */
    const teamsWithSpace = teams.filter(
      (team) =>
        team.players.length <
        playersPerTeam,
    )

    if (teamsWithSpace.length === 0) {
      continue
    }

    const team = getBestTeam(
      teamsWithSpace,
    )

    team.players.push(goalkeeper)

    team.totalStrength +=
      getPlayerStrength(goalkeeper)

    team.goalkeeperCount += 1
  }
}

function distributeFieldPlayers(
  teams: TeamDraft[],
  players: Player[],
  playersPerTeam: number,
): void {
  const shuffledPlayers = shuffle(players)

  /*
   * Jogadores mais fortes entram primeiro.
   *
   * Isso reduz a possibilidade de concentrar
   * muitos craques em uma mesma equipe.
   */
  shuffledPlayers.sort((playerA, playerB) => {
    const strengthA =
      getPlayerStrength(playerA)

    const strengthB =
      getPlayerStrength(playerB)

    return strengthB - strengthA
  })

  for (const player of shuffledPlayers) {
    const availableTeams = teams.filter(
      (team) =>
        team.players.length <
        playersPerTeam,
    )

    if (availableTeams.length === 0) {
      break
    }

    const team = getBestTeam(
      availableTeams,
    )

    team.players.push(player)

    team.totalStrength +=
      getPlayerStrength(player)
  }
}

export function balanceTeams(
  players: Player[],
  numberOfTeams: number,
  playersPerTeam: number,
  goalkeeperMode: GoalkeeperMode,
): TeamDraft[] {
  const teams = createEmptyTeams(
    numberOfTeams,
  )

  const goalkeepers = players.filter(
    (player) => player.isGoalkeeper,
  )

  const fieldPlayers = players.filter(
    (player) => !player.isGoalkeeper,
  )

  /*
   * No modo por equipe, tentamos garantir
   * um goleiro por equipe antes de colocar
   * um segundo goleiro.
   */
  if (goalkeeperMode === 'per-team') {
    distributeGoalkeepers(
      teams,
      goalkeepers,
      playersPerTeam,
    )

    distributeFieldPlayers(
      teams,
      fieldPlayers,
      playersPerTeam,
    )

    return teams
  }

  const allPlayers = shuffle(players)

  allPlayers.sort((playerA, playerB) => {
    const strengthA =
      getPlayerStrength(playerA)

    const strengthB =
      getPlayerStrength(playerB)

    return strengthB - strengthA
  })

  for (const player of allPlayers) {
    const availableTeams = teams.filter(
      (team) =>
        team.players.length <
        playersPerTeam,
    )

    if (availableTeams.length === 0) {
      break
    }

    const team = getBestTeam(
      availableTeams,
    )

    team.players.push(player)

    team.totalStrength +=
      getPlayerStrength(player)

    if (player.isGoalkeeper) {
      team.goalkeeperCount += 1
    }
  }

  return teams
}
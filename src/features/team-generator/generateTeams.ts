import { balanceTeams } from './balanceTeams'
import { generateTeamNames } from './generateTeamName'

import type {
  GenerateTeamsConfig,
  GenerateTeamsResult,
  GeneratedTeam,
} from './types'

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

function generateTeamId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return `team-${crypto.randomUUID()}`
  }

  return `team-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`
}

export function generateTeams({
  players,
  playersPerTeam,
  goalkeeperMode,
}: GenerateTeamsConfig): GenerateTeamsResult {
  if (players.length === 0) {
    throw new Error(
      'Não existem jogadores cadastrados.',
    )
  }

  if (playersPerTeam < 2) {
    throw new Error(
      'Cada equipe precisa ter pelo menos 2 jogadores.',
    )
  }

  if (players.length < playersPerTeam * 2) {
    throw new Error(
      `São necessários pelo menos ${playersPerTeam * 2} jogadores para formar 2 equipes.`,
    )
  }

  const numberOfTeams = Math.floor(
    players.length / playersPerTeam,
  )

  const numberOfNextPlayers =
    players.length % playersPerTeam

  const shuffledPlayers = shuffle(players)

  const nextPlayers =
    numberOfNextPlayers > 0
      ? shuffledPlayers.slice(
          shuffledPlayers.length -
            numberOfNextPlayers,
        )
      : []

  const playersForTeams =
    numberOfNextPlayers > 0
      ? shuffledPlayers.slice(
          0,
          shuffledPlayers.length -
            numberOfNextPlayers,
        )
      : shuffledPlayers

  const balancedTeams = balanceTeams(
    playersForTeams,
    numberOfTeams,
    playersPerTeam,
    goalkeeperMode,
  )

  const teamNames = generateTeamNames(
    numberOfTeams,
  )

  const teams: GeneratedTeam[] =
    balancedTeams.map((team, index) => ({
      id: generateTeamId(),
      name: teamNames[index],
      players: team.players,
      totalStrength: team.totalStrength,
      goalkeeperCount:
        team.goalkeeperCount,
    }))

  return {
    teams,
    nextPlayers,
  }
}
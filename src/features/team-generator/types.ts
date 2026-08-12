import type {
  Player,
  PlayerLevel,
} from '../../types/player'

export type GoalkeeperMode =
  | 'none'
  | 'per-team'

export interface GeneratedTeam {
  id: string
  name: string
  players: Player[]
  totalStrength: number
  goalkeeperCount: number
}

export interface GenerateTeamsConfig {
  players: Player[]
  playersPerTeam: number
  goalkeeperMode: GoalkeeperMode
}

export interface GenerateTeamsResult {
  teams: GeneratedTeam[]
  nextPlayers: Player[]
}

export interface TeamDraft {
  players: Player[]
  totalStrength: number
  goalkeeperCount: number
}

export type LevelStrengthMap = Record<
  PlayerLevel,
  number
>
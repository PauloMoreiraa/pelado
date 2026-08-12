export type PlayerLevel =
  | 'perna-de-pau'
  | 'arroz-com-feijao'
  | 'craque'

export interface Player {
  id: string
  name: string
  level: PlayerLevel
  isGoalkeeper: boolean
}
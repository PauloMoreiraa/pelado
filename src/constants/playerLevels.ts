import type { PlayerLevel } from '../types/player'

export const PLAYER_LEVELS: {
  value: PlayerLevel
  label: string
  shortLabel: string
  strength: number
}[] = [
  {
    value: 'perna-de-pau',
    label: 'Perna de Pau',
    shortLabel: 'Perna de Pau',
    strength: 1,
  },
  {
    value: 'arroz-com-feijao',
    label: 'Faz o Arroz com Feijão',
    shortLabel: 'Arroz com Feijão',
    strength: 2,
  },
  {
    value: 'craque',
    label: 'Craque',
    shortLabel: 'Craque',
    strength: 3,
  },
]
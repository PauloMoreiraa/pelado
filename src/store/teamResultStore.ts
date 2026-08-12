import { create } from 'zustand'

import type {
  GeneratedTeam,
} from '../features/team-generator'

import type { Player } from '../types/player'

interface TeamResultStore {
  teams: GeneratedTeam[]
  nextPlayers: Player[]

  setResult: (
    teams: GeneratedTeam[],
    nextPlayers: Player[],
  ) => void

  clearResult: () => void
}

export const useTeamResultStore =
  create<TeamResultStore>((set) => ({
    teams: [],
    nextPlayers: [],

    setResult: (teams, nextPlayers) =>
      set({
        teams,
        nextPlayers,
      }),

    clearResult: () =>
      set({
        teams: [],
        nextPlayers: [],
      }),
  }))
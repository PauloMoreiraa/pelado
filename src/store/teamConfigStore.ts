import { create } from 'zustand'

import type {
  GoalkeeperMode,
} from '../features/team-generator/types'

export type OrganizationMode =
  | 'teams'
  | 'competition'

interface TeamConfigState {
  playersPerTeam: number

  goalkeeperMode: GoalkeeperMode

  organizationMode: OrganizationMode

  setPlayersPerTeam: (
    playersPerTeam: number,
  ) => void

  setGoalkeeperMode: (
    goalkeeperMode: GoalkeeperMode,
  ) => void

  setOrganizationMode: (
    organizationMode: OrganizationMode,
  ) => void

  resetConfig: () => void
}

export const useTeamConfigStore =
  create<TeamConfigState>((set) => ({
    playersPerTeam: 5,

    goalkeeperMode: 'none',

    organizationMode: 'teams',

    setPlayersPerTeam: (playersPerTeam) =>
      set({
        playersPerTeam,
      }),

    setGoalkeeperMode: (goalkeeperMode) =>
      set({
        goalkeeperMode,
      }),

    setOrganizationMode: (
      organizationMode,
    ) =>
      set({
        organizationMode,
      }),

    resetConfig: () =>
      set({
        playersPerTeam: 5,
        goalkeeperMode: 'none',
        organizationMode: 'teams',
      }),
  }))
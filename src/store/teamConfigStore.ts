import { create } from 'zustand'

export type GoalkeeperMode =
  | 'fixed'
  | 'per-team'

export type OrganizationMode =
  | 'teams'
  | 'competition'

export type CompetitionMode =
  | 'league'
  | 'knockout'
  | 'tournament'

interface TeamConfigStore {
  playersPerTeam: number
  goalkeeperMode: GoalkeeperMode
  organizationMode: OrganizationMode
  competitionMode: CompetitionMode

  setPlayersPerTeam: (value: number) => void
  setGoalkeeperMode: (value: GoalkeeperMode) => void
  setOrganizationMode: (
    value: OrganizationMode,
  ) => void
  setCompetitionMode: (
    value: CompetitionMode,
  ) => void

  resetConfig: () => void
}

const DEFAULT_CONFIG = {
  playersPerTeam: 5,
  goalkeeperMode: 'per-team' as GoalkeeperMode,
  organizationMode: 'teams' as OrganizationMode,
  competitionMode: 'league' as CompetitionMode,
}

export const useTeamConfigStore =
  create<TeamConfigStore>((set) => ({
    ...DEFAULT_CONFIG,

    setPlayersPerTeam: (value) =>
      set({
        playersPerTeam: value,
      }),

    setGoalkeeperMode: (value) =>
      set({
        goalkeeperMode: value,
      }),

    setOrganizationMode: (value) =>
      set({
        organizationMode: value,
      }),

    setCompetitionMode: (value) =>
      set({
        competitionMode: value,
      }),

    resetConfig: () =>
      set({
        ...DEFAULT_CONFIG,
      }),
  }))
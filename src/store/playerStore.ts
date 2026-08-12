import { create } from 'zustand'
import type { Player, PlayerLevel } from '../types/player'

interface AddPlayerData {
  name: string
  level: PlayerLevel
  isGoalkeeper: boolean
}

interface PlayerStore {
  players: Player[]

  addPlayer: (data: AddPlayerData) => void
  updatePlayer: (id: string, data: AddPlayerData) => void
  removePlayer: (id: string) => void
  clearPlayers: () => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  players: [],

  addPlayer: (data) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: crypto.randomUUID(),
          ...data,
        },
      ],
    })),

  updatePlayer: (id, data) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? {
              ...player,
              ...data,
            }
          : player,
      ),
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter(
        (player) => player.id !== id,
      ),
    })),

  clearPlayers: () => set({ players: [] }),
}))
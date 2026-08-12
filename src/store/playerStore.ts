import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Player } from '../types/player'

interface PlayerState {
  players: Player[]

  addPlayer: (player: Player) => void

  updatePlayer: (
    id: string,
    player: Player,
  ) => void

  removePlayer: (id: string) => void

  clearPlayers: () => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      players: [],

      addPlayer: (player) =>
        set((state) => ({
          players: [
            ...state.players,
            player,
          ],
        })),

      updatePlayer: (id, player) =>
        set((state) => ({
          players: state.players.map(
            (currentPlayer) =>
              currentPlayer.id === id
                ? player
                : currentPlayer,
          ),
        })),

      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter(
            (player) => player.id !== id,
          ),
        })),

      clearPlayers: () =>
        set({
          players: [],
        }),
    }),
    {
      name: 'pelado-players',
    },
  ),
)
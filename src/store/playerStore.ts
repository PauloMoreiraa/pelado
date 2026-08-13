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

function normalizePlayers(
  players: Player[],
): Player[] {
  const usedIds = new Set<string>()

  return players.map((player) => {
    let id = player.id

    /*
     * Se não existir ID ou se o ID estiver
     * duplicado, cria um novo.
     */
    if (!id || usedIds.has(id)) {
      id = crypto.randomUUID()
    }

    usedIds.add(id)

    return {
      ...player,
      id,
    }
  })
}

export const usePlayerStore =
  create<PlayerState>()(
    persist(
      (set) => ({
        players: [],

        addPlayer: (player) =>
          set((state) => {
            /*
             * O ID é sempre gerado pelo store.
             *
             * Assim nunca dependemos do
             * formulário para identificar
             * corretamente o jogador.
             */
            const newPlayer: Player = {
              ...player,
              id:
                player.id &&
                !state.players.some(
                  (existingPlayer) =>
                    existingPlayer.id ===
                    player.id,
                )
                  ? player.id
                  : crypto.randomUUID(),
            }

            return {
              players: [
                ...state.players,
                newPlayer,
              ],
            }
          }),

        updatePlayer: (id, player) =>
          set((state) => ({
            players: state.players.map(
              (currentPlayer) =>
                currentPlayer.id === id
                  ? {
                      ...player,
                      id,
                    }
                  : currentPlayer,
            ),
          })),

        removePlayer: (id) =>
          set((state) => ({
            players: state.players.filter(
              (player) =>
                player.id !== id,
            ),
          })),

        clearPlayers: () =>
          set({
            players: [],
          }),
      }),

      {
        name: 'pelado-players',

        /*
         * Quando o Zustand recuperar os dados
         * antigos do localStorage, normalizamos
         * os IDs antes de colocá-los no estado.
         */
        merge: (persistedState, currentState) => {
          const persisted =
            persistedState as Partial<PlayerState>

          return {
            ...currentState,
            ...persisted,
            players: normalizePlayers(
              persisted.players ?? [],
            ),
          }
        },
      },
    ),
  )
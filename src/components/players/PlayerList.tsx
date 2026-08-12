import { Users } from 'lucide-react'

import { usePlayerStore } from '../../store/playerStore'
import type { Player } from '../../types/player'

import { PlayerCard } from './PlayerCard'

interface PlayerListProps {
  onEdit: (player: Player) => void
}

export function PlayerList({
  onEdit,
}: PlayerListProps) {
  const players = usePlayerStore(
    (state) => state.players,
  )

  if (players.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-secondary)]">
          <Users
            size={22}
            className="text-[var(--color-text-muted)]"
          />
        </div>

        <h3 className="mt-4 font-semibold">
          Nenhum jogador cadastrado
        </h3>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Adicione os jogadores que participarão da
          partida.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
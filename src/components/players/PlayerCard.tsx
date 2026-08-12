import { useState } from 'react'
import {
  Pencil,
  Shield,
  Trash2,
} from 'lucide-react'

import { PLAYER_LEVELS } from '../../constants/playerLevels'
import { usePlayerStore } from '../../store/playerStore'

import type { Player } from '../../types/player'

import { Modal } from '../common/Modal'
import { Button } from '../common/Button'

interface PlayerCardProps {
  player: Player
  onEdit: (player: Player) => void
}

export function PlayerCard({
  player,
  onEdit,
}: PlayerCardProps) {
  const removePlayer = usePlayerStore(
    (state) => state.removePlayer,
  )

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false)

  const level = PLAYER_LEVELS.find(
    (item) => item.value === player.level,
  )

  function handleRemove() {
    removePlayer(player.id)
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <article className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-lg">
          {player.isGoalkeeper
            ? '🧤'
            : '⚽'}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">
              {player.name}
            </h3>

            {player.isGoalkeeper && (
              <Shield
                size={15}
                className="shrink-0 text-[var(--color-primary)]"
              />
            )}
          </div>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {level?.label}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onEdit(player)}
            aria-label={`Editar ${player.name}`}
            className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-primary)]"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              setIsDeleteModalOpen(true)
            }
            aria-label={`Remover ${player.name}`}
            className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-red-50 hover:text-[var(--color-danger)]"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </article>

      <Modal
        open={isDeleteModalOpen}
        title="Remover jogador"
        onClose={() =>
          setIsDeleteModalOpen(false)
        }
      >
        <p className="text-[var(--color-text-secondary)]">
          Tem certeza que deseja remover{' '}
          <strong className="text-[var(--color-text)]">
            {player.name}
          </strong>
          ?
        </p>

        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Essa ação não poderá ser desfeita.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={() =>
              setIsDeleteModalOpen(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            onClick={handleRemove}
          >
            Remover jogador
          </Button>
        </div>
      </Modal>
    </>
  )
}
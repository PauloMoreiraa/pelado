import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { PlayerForm } from '../../components/players/PlayerForm'
import { PlayerList } from '../../components/players/PlayerList'

import { usePlayerStore } from '../../store/playerStore'

import type { Player } from '../../types/player'

export function Players() {
  const navigate = useNavigate()

  const players = usePlayerStore(
    (state) => state.players,
  )

  const [
    editingPlayer,
    setEditingPlayer,
  ] = useState<Player | null>(null)

  const canContinue = players.length >= 4

  function handleEdit(player: Player) {
    setEditingPlayer(player)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Users size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Jogadores
              </h1>

              <p className="text-sm text-[var(--color-text-muted)]">
                {players.length}{' '}
                {players.length === 1
                  ? 'jogador cadastrado'
                  : 'jogadores cadastrados'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
          <PlayerForm
            player={editingPlayer}
            onFinishEditing={() =>
              setEditingPlayer(null)
            }
          />

          <div>
            <h2 className="mb-4 font-bold">
              Lista de jogadores
            </h2>

            <PlayerList
              onEdit={handleEdit}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => navigate('/configuracao')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-4 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Continuar
            <ArrowRight size={20} />
          </button>
        </div>

        {!canContinue && (
          <p className="mt-3 text-right text-sm text-[var(--color-text-muted)]">
            Cadastre pelo menos 4 jogadores para
            continuar.
          </p>
        )}
      </div>
    </section>
  )
}
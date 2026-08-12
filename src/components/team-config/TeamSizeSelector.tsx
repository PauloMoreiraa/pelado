import { Minus, Plus, Users } from 'lucide-react'

import { useTeamConfigStore } from '../../store/teamConfigStore'

interface TeamSizeSelectorProps {
  totalPlayers: number
}

export function TeamSizeSelector({
  totalPlayers,
}: TeamSizeSelectorProps) {
  const playersPerTeam = useTeamConfigStore(
    (state) => state.playersPerTeam,
  )

  const setPlayersPerTeam = useTeamConfigStore(
    (state) => state.setPlayersPerTeam,
  )

  function decrease() {
    if (playersPerTeam <= 2) {
      return
    }

    setPlayersPerTeam(playersPerTeam - 1)
  }

  function increase() {
    if (playersPerTeam >= 15) {
      return
    }

    setPlayersPerTeam(playersPerTeam + 1)
  }

  const numberOfTeams = Math.floor(
    totalPlayers / playersPerTeam,
  )

  const remainingPlayers =
    totalPlayers % playersPerTeam

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
          <Users size={20} />
        </div>

        <div>
          <h2 className="font-bold">
            Jogadores por equipe
          </h2>

          <p className="text-sm text-[var(--color-text-muted)]">
            Escolha o tamanho de cada equipe.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={decrease}
          disabled={playersPerTeam <= 2}
          aria-label="Diminuir jogadores por equipe"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-[var(--color-border)]
            transition
            hover:bg-[var(--color-surface-secondary)]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Minus size={20} />
        </button>

        <div className="text-center">
          <span className="block text-4xl font-bold text-[var(--color-primary)]">
            {playersPerTeam}
          </span>

          <span className="text-sm text-[var(--color-text-muted)]">
            por equipe
          </span>
        </div>

        <button
          type="button"
          onClick={increase}
          disabled={playersPerTeam >= 15}
          aria-label="Aumentar jogadores por equipe"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-[var(--color-border)]
            transition
            hover:bg-[var(--color-surface-secondary)]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Plus size={20} />
        </button>
      </div>

      {totalPlayers > 0 && (
        <div className="mt-6 rounded-xl bg-[var(--color-surface-secondary)] p-4 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Com {totalPlayers} jogadores:
          </p>

          <p className="mt-1 font-semibold">
            {numberOfTeams}{' '}
            {numberOfTeams === 1
              ? 'equipe'
              : 'equipes'}
            {remainingPlayers > 0 && (
              <>
                {' '}
                + {remainingPlayers}{' '}
                {remainingPlayers === 1
                  ? 'jogador'
                  : 'jogadores'}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
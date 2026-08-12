import { ArrowLeft, Settings } from 'lucide-react'

import { Button } from '../../components/common/Button'
import { GoalkeeperConfig } from '../../components/team-config/GoalkeeperConfig'
import { OrganizationMode } from '../../components/team-config/OrganizationMode'
import { TeamSizeSelector } from '../../components/team-config/TeamSizeSelector'

import { usePlayerStore } from '../../store/playerStore'

export function TeamConfig() {
  const players = usePlayerStore(
    (state) => state.players,
  )

  const hasEnoughPlayers = players.length >= 3

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <header>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Settings size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Configurar times
              </h1>

              <p className="text-sm text-[var(--color-text-muted)]">
                Defina como o Peladô deve organizar os
                jogadores.
              </p>
            </div>
          </div>
        </header>

        {!hasEnoughPlayers && (
          <div className="mt-6 rounded-2xl border border-[var(--color-danger)] bg-red-50 p-4">
            <p className="font-semibold text-[var(--color-danger)]">
              Jogadores insuficientes
            </p>

            <p className="mt-1 text-sm text-[var(--color-danger)]">
              Cadastre pelo menos 3 jogadores para
              continuar.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-5">
          <TeamSizeSelector
            totalPlayers={players.length}
          />

          <GoalkeeperConfig />

          <OrganizationMode />
        </div>

        <div className="mt-8">
          <Button
            className="w-full"
            disabled={!hasEnoughPlayers}
          >
            Continuar
          </Button>
        </div>
      </div>
    </section>
  )
}
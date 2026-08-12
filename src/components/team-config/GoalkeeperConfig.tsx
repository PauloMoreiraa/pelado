import { Shield } from 'lucide-react'

import {
  useTeamConfigStore,
  type GoalkeeperMode,
} from '../../store/teamConfigStore'

export function GoalkeeperConfig() {
  const goalkeeperMode = useTeamConfigStore(
    (state) => state.goalkeeperMode,
  )

  const setGoalkeeperMode = useTeamConfigStore(
    (state) => state.setGoalkeeperMode,
  )

  const options: {
    value: GoalkeeperMode
    title: string
    description: string
  }[] = [
    {
      value: 'per-team',
      title: 'Goleiro por equipe',
      description:
        'Distribui os goleiros entre as equipes.',
    },
    {
      value: 'fixed',
      title: 'Goleiro fixo',
      description:
        'Os goleiros não entram no sorteio das equipes.',
    },
  ]

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
          <Shield size={20} />
        </div>

        <div>
          <h2 className="font-bold">
            Configuração de goleiros
          </h2>

          <p className="text-sm text-[var(--color-text-muted)]">
            Escolha como os goleiros serão tratados.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {options.map((option) => {
          const selected =
            goalkeeperMode === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setGoalkeeperMode(option.value)
              }
              className={`
                rounded-xl
                border
                p-4
                text-left
                transition
                ${
                  selected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    mt-0.5
                    h-5
                    w-5
                    rounded-full
                    border-2
                    ${
                      selected
                        ? 'border-[var(--color-primary)]'
                        : 'border-[var(--color-border)]'
                    }
                  `}
                >
                  {selected && (
                    <div className="m-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                  )}
                </div>

                <div>
                  <span className="block font-semibold">
                    {option.title}
                  </span>

                  <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
                    {option.description}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
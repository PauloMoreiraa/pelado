import { Swords, Trophy } from 'lucide-react'

import {
  useTeamConfigStore,
  type OrganizationMode,
} from '../../store/teamConfigStore'

export function OrganizationMode() {
  const organizationMode = useTeamConfigStore(
    (state) => state.organizationMode,
  )

  const setOrganizationMode = useTeamConfigStore(
    (state) => state.setOrganizationMode,
  )

  const options: {
    value: OrganizationMode
    title: string
    description: string
    icon: typeof Swords
  }[] = [
    {
      value: 'teams',
      title: 'Apenas dividir times',
      description:
        'Sorteia os jogadores e monta as equipes.',
      icon: Swords,
    },
    {
      value: 'competition',
      title: 'Organizar competição',
      description:
        'Monte uma liga, mata-mata ou torneio.',
      icon: Trophy,
    },
  ]

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <h2 className="font-bold">
        Como deseja organizar?
      </h2>

      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Escolha o que deseja fazer com os times.
      </p>

      <div className="mt-5 grid gap-3">
        {options.map((option) => {
          const selected =
            organizationMode === option.value

          const Icon = option.icon

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setOrganizationMode(option.value)
              }
              className={`
                flex
                items-start
                gap-4
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
              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${
                    selected
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]'
                  }
                `}
              >
                <Icon size={20} />
              </div>

              <div>
                <span className="block font-semibold">
                  {option.title}
                </span>

                <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
                  {option.description}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
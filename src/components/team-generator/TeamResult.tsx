import type { GeneratedTeam } from '../../features/team-generator'

interface TeamResultProps {
  team: GeneratedTeam
  onEditName?: () => void
}

export function TeamResult({
  team,
  onEditName,
}: TeamResultProps) {
  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Equipe
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {team.name}
          </h2>
        </div>

        {onEditName && (
          <button
            type="button"
            onClick={onEditName}
            className="text-sm font-semibold text-[var(--color-primary)]"
          >
            Editar
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <div className="rounded-lg bg-[var(--color-surface-secondary)] px-3 py-2">
          <span className="block text-xs text-[var(--color-text-muted)]">
            Jogadores
          </span>

          <strong>
            {team.players.length}
          </strong>
        </div>

        <div className="rounded-lg bg-[var(--color-surface-secondary)] px-3 py-2">
          <span className="block text-xs text-[var(--color-text-muted)]">
            Força
          </span>

          <strong>
            {team.totalStrength}
          </strong>
        </div>

        {team.goalkeeperCount > 0 && (
          <div className="rounded-lg bg-[var(--color-surface-secondary)] px-3 py-2">
            <span className="block text-xs text-[var(--color-text-muted)]">
              Goleiros
            </span>

            <strong>
              {team.goalkeeperCount}
            </strong>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-2">
        {team.players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between rounded-xl bg-[var(--color-surface-secondary)] px-4 py-3"
          >
            <span className="font-medium">
              {player.name}
            </span>

            {player.isGoalkeeper && (
              <span
                title="Goleiro"
                aria-label="Goleiro"
              >
                🧤
              </span>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}
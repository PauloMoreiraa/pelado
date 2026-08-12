import { PLAYER_LEVELS } from '../../constants/playerLevels'
import type { GeneratedTeam } from '../../features/team-generator'

interface TeamResultProps {
  team: GeneratedTeam
  onEditName?: () => void
}

function getPlayerStars(
  level: GeneratedTeam['players'][number]['level'],
) {
  const levelStrength =
    PLAYER_LEVELS.find(
      (item) => item.value === level,
    )?.strength ?? 0

  return '★'.repeat(levelStrength)
}

export function TeamResult({
  team,
  onEditName,
}: TeamResultProps) {
  const averageLevel =
    Math.round(
      team.players.reduce((total, player) => {
        const playerStrength =
          PLAYER_LEVELS.find(
            (item) => item.value === player.level,
          )?.strength ?? 0

        return total + playerStrength
      }, 0) /
        Math.max(team.players.length, 1),
    ) || 1

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
            Nível
          </span>

          <strong
            className="inline-flex items-center gap-1 text-[var(--color-primary)]"
            title={`${averageLevel} estrelas`}
            aria-label={`${averageLevel} estrelas`}
          >
            {'★'.repeat(averageLevel)}
          </strong>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {team.players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-surface-secondary)] px-4 py-3"
          >
            <span className="font-medium">
              {player.name}
            </span>

            <span
              className="flex items-center gap-2 text-sm text-[var(--color-primary)]"
              title={
                PLAYER_LEVELS.find(
                  (item) => item.value === player.level,
                )?.label ?? 'Jogador'
              }
              aria-label={
                PLAYER_LEVELS.find(
                  (item) => item.value === player.level,
                )?.label ?? 'Jogador'
              }
            >
              {player.isGoalkeeper && (
                <span title="Goleiro" aria-label="Goleiro">
                  🧤
                </span>
              )}

              {getPlayerStars(player.level)}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}
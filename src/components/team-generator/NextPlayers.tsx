import { PLAYER_LEVELS } from '../../constants/playerLevels'
import type { Player } from '../../types/player'

interface NextPlayersProps {
  players: Player[]
}

function getPlayerStars(level: Player['level']) {
  const levelStrength =
    PLAYER_LEVELS.find(
      (item) => item.value === level,
    )?.strength ?? 0

  return '★'.repeat(levelStrength)
}

export function NextPlayers({
  players,
}: NextPlayersProps) {
  if (players.length === 0) {
    return null
  }

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
          Pelada
        </p>

        <h2 className="mt-1 text-xl font-bold">
          Os de Próximo
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Jogadores que aguardam a próxima
          partida.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {players.map((player) => (
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
    </section>
  )
}
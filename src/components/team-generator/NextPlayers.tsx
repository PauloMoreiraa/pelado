import type { Player } from '../../types/player'

interface NextPlayersProps {
  players: Player[]
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
            className="rounded-xl bg-[var(--color-surface-secondary)] px-4 py-3"
          >
            <span className="font-medium">
              {player.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
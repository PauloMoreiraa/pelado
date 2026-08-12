import { ArrowLeft, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/common/Button'
import { GoalkeeperConfig } from '../../components/team-config/GoalkeeperConfig'
import { TeamSizeSelector } from '../../components/team-config/TeamSizeSelector'

import { usePlayerStore } from '../../store/playerStore'
import { useTeamConfigStore } from '../../store/teamConfigStore'
import { useTeamResultStore } from '../../store/teamResultStore'

import { generateTeams } from '../../features/team-generator'

export function TeamConfig() {
  const navigate = useNavigate()

  const players = usePlayerStore(
    (state) => state.players,
  )

  const playersPerTeam = useTeamConfigStore(
    (state) => state.playersPerTeam,
  )

  const goalkeeperMode = useTeamConfigStore(
    (state) => state.goalkeeperMode,
  )

  const setResult = useTeamResultStore(
    (state) => state.setResult,
  )

  const hasEnoughPlayers = players.length >= 4

  const minimumPlayersForTwoTeams =
    playersPerTeam * 2

  const hasValidTeamSize =
    players.length >= minimumPlayersForTwoTeams &&
    Math.floor(players.length / playersPerTeam) >= 2

  const maxTeamsPossible = Math.floor(
    players.length / playersPerTeam,
  )

  function handleGenerateTeams() {
    if (
      !hasEnoughPlayers ||
      !hasValidTeamSize
    ) {
      return
    }

    try {
      const result = generateTeams({
        players,
        playersPerTeam,
        goalkeeperMode,
      })

      setResult(
        result.teams,
        result.nextPlayers,
      )

      navigate('/resultado')
    } catch (error) {
      console.error(
        'Erro ao gerar equipes:',
        error,
      )
    }
  }

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate('/jogadores')}
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
                Sortear times
              </h1>

              <p className="text-sm text-[var(--color-text-muted)]">
                Defina como o Peladô deve organizar
                os jogadores.
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
              Cadastre pelo menos 4 jogadores
              para continuar.
            </p>
          </div>
        )}

        {players.length > 0 &&
          !hasValidTeamSize && (
            <div className="mt-6 rounded-2xl border border-[var(--color-danger)] bg-red-50 p-4">
              <p className="font-semibold text-[var(--color-danger)]">
                Tamanho de equipe inválido
              </p>

              <p className="mt-1 text-sm text-[var(--color-danger)]">
                Com {players.length}{' '}
                {players.length === 1
                  ? 'jogador'
                  : 'jogadores'}, o máximo de
                equipes com {playersPerTeam}{' '}
                {playersPerTeam === 1
                  ? 'jogador'
                  : 'jogadores'} por time é{' '}
                {maxTeamsPossible || 1}{' '}
                {maxTeamsPossible === 1
                  ? 'equipe'
                  : 'equipes'}.
                <br />
                Para sortear com esse tamanho,
                são necessários pelo menos{' '}
                {minimumPlayersForTwoTeams}{' '}
                jogadores.
              </p>
            </div>
          )}

        <div className="mt-8 space-y-5">
          <TeamSizeSelector
            totalPlayers={players.length}
          />

          <GoalkeeperConfig />
        </div>

        <div className="mt-8">
          <Button
            type="button"
            className="w-full"
            disabled={
              !hasEnoughPlayers ||
              !hasValidTeamSize
            }
            onClick={handleGenerateTeams}
          >
            Sortear times
          </Button>
        </div>
      </div>
    </section>
  )
}
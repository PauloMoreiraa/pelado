import {
  ArrowLeft,
  RotateCcw,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { NextPlayers } from '../../components/team-generator/NextPlayers'
import { TeamResult as TeamResultCard } from '../../components/team-generator/TeamResult'

import { useTeamResultStore } from '../../store/teamResultStore'

export function TeamResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isFinishing, setIsFinishing] =
    useState(false)

  const teams = useTeamResultStore(
    (state) => state.teams,
  )

  const nextPlayers = useTeamResultStore(
    (state) => state.nextPlayers,
  )

  const clearResult = useTeamResultStore(
    (state) => state.clearResult,
  )

  useEffect(() => {
    if (
      teams.length === 0 &&
      !isFinishing &&
      location.pathname !== '/'
    ) {
      navigate('/configuracao', {
        replace: true,
      })
    }
  }, [teams.length, isFinishing, location.pathname, navigate])

  function handleBack() {
    setIsFinishing(false)
    clearResult()
    navigate('/configuracao')
  }

  function handleResort() {
    setIsFinishing(false)
    clearResult()
    navigate('/configuracao')
  }

  function handleFinish() {
    setIsFinishing(true)
    clearResult()
    window.localStorage.removeItem(
      'pelado-players',
    )
    navigate('/', {
      replace: true,
    })
  }

  if (teams.length === 0) {
    return null
  }

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <header>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Peladô
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Times sorteados
          </h1>

          <p className="mt-2 text-[var(--color-text-muted)]">
            Os times foram divididos tentando
            equilibrar os níveis dos jogadores.
          </p>
        </header>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {teams.map((team) => (
            <TeamResultCard
              key={team.id}
              team={team}
            />
          ))}
        </div>

        <div className="mt-5">
          <NextPlayers
            players={nextPlayers}
          />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleResort}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-4 font-bold text-white transition hover:opacity-90"
          >
            <RotateCcw size={20} />
            Sortear novamente
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="flex w-full items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 font-bold text-[var(--color-text-primary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            Finalizar sorteio
          </button>
        </div>
      </div>
    </section>
  )
}
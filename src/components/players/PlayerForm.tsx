import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'

import {
  Save,
  UserPlus,
  X,
} from 'lucide-react'

import { Button } from '../common/Button'
import { PLAYER_LEVELS } from '../../constants/playerLevels'
import { usePlayerStore } from '../../store/playerStore'

import type {
  Player,
  PlayerLevel,
} from '../../types/player'

interface PlayerFormProps {
  player?: Player | null
  onFinishEditing?: () => void
}

export function PlayerForm({
  player,
  onFinishEditing,
}: PlayerFormProps) {
  const addPlayer = usePlayerStore(
    (state) => state.addPlayer,
  )

  const updatePlayer = usePlayerStore(
    (state) => state.updatePlayer,
  )

  const players = usePlayerStore(
    (state) => state.players,
  )

  const [name, setName] = useState('')
  const [level, setLevel] =
    useState<PlayerLevel>('arroz-com-feijao')

  const [isGoalkeeper, setIsGoalkeeper] =
    useState(false)

  const [error, setError] = useState('')

  const isEditing = Boolean(player)

  /*
   * Normaliza o nome para evitar jogadores
   * duplicados com diferenças de maiúsculas,
   * minúsculas ou espaços.
   */
  const normalizedName = name
    .trim()
    .toLocaleLowerCase()

  const isDuplicateName =
    normalizedName.length > 0 &&
    players.some((existingPlayer) => {
      /*
       * Quando estamos editando,
       * ignoramos o próprio jogador.
       */
      if (
        player &&
        existingPlayer.id === player.id
      ) {
        return false
      }

      return (
        existingPlayer.name
          .trim()
          .toLocaleLowerCase() ===
        normalizedName
      )
    })

  const isFormValid =
    name.trim().length > 0 &&
    Boolean(level) &&
    !isDuplicateName

  /*
   * Carrega os dados do jogador quando
   * o usuário clica em "Editar".
   */
  useEffect(() => {
    if (!player) {
      setName('')
      setLevel('arroz-com-feijao')
      setIsGoalkeeper(false)
      setError('')

      return
    }

    setName(player.name)
    setLevel(player.level)
    setIsGoalkeeper(player.isGoalkeeper)
    setError('')

    /*
     * Ao editar, leva o formulário para o topo
     * da página para facilitar a visualização.
     */
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [player])

  function isNameAlreadyUsed(
    playerName: string,
  ) {
    const normalizedPlayerName =
      playerName
        .trim()
        .toLocaleLowerCase()

    return players.some((existingPlayer) => {
      /*
       * Não considera o próprio jogador
       * como duplicado durante a edição.
       */
      if (
        player &&
        existingPlayer.id === player.id
      ) {
        return false
      }

      return (
        existingPlayer.name
          .trim()
          .toLocaleLowerCase() ===
        normalizedPlayerName
      )
    })
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Digite o nome do jogador.')
      return
    }

    if (isNameAlreadyUsed(trimmedName)) {
      setError(
        'Já existe um jogador com esse nome.',
      )
      return
    }

    if (!level) {
      setError(
        'Selecione o nível do jogador.',
      )
      return
    }

    /*
     * EDIÇÃO
     */
    if (player) {
      const updatedPlayer: Player = {
        ...player,
        name: trimmedName,
        level,
        isGoalkeeper,
      }

      updatePlayer(
        player.id,
        updatedPlayer,
      )

      onFinishEditing?.()

      resetForm()

      return
    }

    /*
     * NOVO JOGADOR
     *
     * O ID é criado aqui para garantir
     * que cada jogador tenha uma identidade
     * própria.
     */
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: trimmedName,
      level,
      isGoalkeeper,
    }

    addPlayer(newPlayer)

    resetForm()
  }

  function resetForm() {
    setName('')
    setLevel('arroz-com-feijao')
    setIsGoalkeeper(false)
    setError('')
  }

  function handleCancel() {
    resetForm()
    onFinishEditing?.()
  }

  function handleNameChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setName(event.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5
        shadow-sm
        sm:p-6
      "
    >
      {/* HEADER */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary-soft)]
            text-[var(--color-primary)]
          "
        >
          <UserPlus size={20} />
        </div>

        <div>
          <h2 className="font-bold">
            {isEditing
              ? 'Editar jogador'
              : 'Adicionar jogador'}
          </h2>

          <p className="text-sm text-[var(--color-text-muted)]">
            {isEditing
              ? 'Atualize as informações do jogador.'
              : 'Cadastre quem vai participar da partida.'}
          </p>
        </div>
      </div>

      {/* NOME */}

      <div className="mt-6">
        <label
          htmlFor="player-name"
          className="mb-2 block text-sm font-semibold"
        >
          Nome
        </label>

        <input
          id="player-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Ex.: Paulo"
          maxLength={40}
          autoComplete="off"
          className={`
            w-full
            rounded-xl
            border
            bg-[var(--color-surface)]
            px-4
            py-3
            text-[var(--color-text)]
            outline-none
            transition
            placeholder:text-[var(--color-text-muted)]
            focus:ring-2
            ${
              isDuplicateName
                ? `
                  border-[var(--color-danger)]
                  focus:border-[var(--color-danger)]
                  focus:ring-red-100
                `
                : `
                  border-[var(--color-border)]
                  focus:border-[var(--color-primary)]
                  focus:ring-[var(--color-primary-soft)]
                `
            }
          `}
        />

        {isDuplicateName && (
          <p className="mt-2 text-sm text-[var(--color-danger)]">
            Já existe um jogador com esse nome.
          </p>
        )}

        {error && !isDuplicateName && (
          <p className="mt-2 text-sm text-[var(--color-danger)]">
            {error}
          </p>
        )}
      </div>

      {/* NÍVEL */}

      <div className="mt-5">
        <span className="mb-3 block text-sm font-semibold">
          Nível
        </span>

        <div className="grid gap-2">
          {PLAYER_LEVELS.map(
            (playerLevel) => {
              const selected =
                level === playerLevel.value

              return (
                <button
                  key={playerLevel.value}
                  type="button"
                  onClick={() =>
                    setLevel(
                      playerLevel.value,
                    )
                  }
                  className={`
                    rounded-xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      selected
                        ? `
                          border-[var(--color-primary)]
                          bg-[var(--color-primary-soft)]
                        `
                        : `
                          border-[var(--color-border)]
                          bg-[var(--color-surface)]
                          hover:bg-[var(--color-surface-secondary)]
                        `
                    }
                  `}
                >
                  <span className="block font-semibold">
                    {playerLevel.label}
                  </span>

                  <span className="mt-1 block text-xs text-[var(--color-text-muted)]">
                    Força {playerLevel.strength}/3
                  </span>
                </button>
              )
            },
          )}
        </div>
      </div>

      {/* GOLEIRO */}

      <button
        type="button"
        onClick={() =>
          setIsGoalkeeper(
            (value) => !value,
          )
        }
        className={`
          mt-5
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          p-4
          text-left
          transition
          ${
            isGoalkeeper
              ? `
                border-[var(--color-primary)]
                bg-[var(--color-primary-soft)]
              `
              : `
                border-[var(--color-border)]
              `
          }
        `}
      >
        <div>
          <span className="block font-semibold">
            🧤 Goleiro
          </span>

          <span className="text-xs text-[var(--color-text-muted)]">
            Este jogador pode ser goleiro.
          </span>
        </div>

        <div
          className={`
            flex
            h-6
            w-11
            items-center
            rounded-full
            p-1
            transition
            ${
              isGoalkeeper
                ? 'bg-[var(--color-primary)]'
                : 'bg-[var(--color-border)]'
            }
          `}
        >
          <span
            className={`
              h-4
              w-4
              rounded-full
              bg-white
              transition
              ${
                isGoalkeeper
                  ? 'translate-x-5'
                  : 'translate-x-0'
              }
            `}
          />
        </div>
      </button>

      {/* AÇÕES */}

      <div className="mt-6 flex gap-3">
        <Button
          type="submit"
          className="flex-1"
          disabled={!isFormValid}
        >
          <Save size={18} />

          {isEditing
            ? 'Salvar alterações'
            : 'Adicionar jogador'}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
          >
            <X size={18} />
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
import { useEffect, useState } from 'react'
import { Save, UserPlus, X } from 'lucide-react'

import { Button } from '../common/Button'
import { PLAYER_LEVELS } from '../../constants/playerLevels'
import { usePlayerStore } from '../../store/playerStore'

import type { Player, PlayerLevel } from '../../types/player'

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
   * Normaliza o nome para comparação.
   *
   * Exemplos:
   *
   * "Paulo"
   * " paulo "
   * "PAULO"
   *
   * Todos serão considerados o mesmo nome.
   */
  const normalizedName = name
    .trim()
    .toLocaleLowerCase()

  /*
   * Verifica se já existe outro jogador
   * utilizando esse nome.
   *
   * Durante a edição, o próprio jogador
   * é ignorado.
   */
  const isDuplicateName =
    normalizedName.length > 0 &&
    players.some((existingPlayer) => {
      if (
        player &&
        existingPlayer.id === player.id
      ) {
        return false
      }

      return (
        existingPlayer.name
          .trim()
          .toLocaleLowerCase() === normalizedName
      )
    })

  /*
   * O formulário só pode ser enviado quando:
   *
   * - existe um nome;
   * - existe um nível;
   * - o nome não está duplicado.
   */
  const isFormValid =
    name.trim().length > 0 &&
    Boolean(level) &&
    !isDuplicateName

  /*
   * Quando entramos no modo de edição,
   * carregamos os dados do jogador no formulário.
   *
   * Quando saímos do modo de edição,
   * limpamos o formulário.
   */
  useEffect(() => {
    if (player) {
      setName(player.name)
      setLevel(player.level)
      setIsGoalkeeper(player.isGoalkeeper)
      setError('')

      return
    }

    setName('')
    setLevel('arroz-com-feijao')
    setIsGoalkeeper(false)
    setError('')
  }, [player])

  /*
   * Verificação adicional do nome.
   *
   * Mesmo que o botão esteja desabilitado,
   * essa validação continua existindo para
   * garantir que a regra seja respeitada.
   */
  function isNameAlreadyUsed(
    playerName: string,
  ) {
    const normalizedPlayerName = playerName
      .trim()
      .toLocaleLowerCase()

    return players.some((existingPlayer) => {
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
    event: React.FormEvent<HTMLFormElement>,
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
      setError('Selecione o nível do jogador.')
      return
    }

    const playerData = {
      name: trimmedName,
      level,
      isGoalkeeper,
    }

    /*
     * Se estamos editando:
     * atualiza o jogador existente.
     *
     * Caso contrário:
     * cria um novo jogador.
     */
    if (player) {
      updatePlayer(player.id, playerData)

      onFinishEditing?.()
    } else {
      addPlayer(playerData)
    }

    /*
     * Limpa o formulário depois de salvar.
     */
    setName('')
    setLevel('arroz-com-feijao')
    setIsGoalkeeper(false)
    setError('')
  }

  function handleCancel() {
    setName('')
    setLevel('arroz-com-feijao')
    setIsGoalkeeper(false)
    setError('')

    onFinishEditing?.()
  }

  function handleNameChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setName(event.target.value)

    /*
     * Limpa uma mensagem de erro antiga
     * assim que o usuário começa a corrigir
     * o campo.
     */
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
                ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-red-100'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-soft)]'
            }
          `}
        />

        {/* NOME DUPLICADO */}

        {isDuplicateName && (
          <p className="mt-2 text-sm text-[var(--color-danger)]">
            Já existe um jogador com esse nome.
          </p>
        )}

        {/* OUTROS ERROS */}

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
          {PLAYER_LEVELS.map((playerLevel) => {
            const selected =
              level === playerLevel.value

            return (
              <button
                key={playerLevel.value}
                type="button"
                onClick={() =>
                  setLevel(playerLevel.value)
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
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)]'
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
          })}
        </div>
      </div>

      {/* GOLEIRO */}

      <button
        type="button"
        onClick={() =>
          setIsGoalkeeper((value) => !value)
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
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
              : 'border-[var(--color-border)]'
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
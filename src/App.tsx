function App() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Peladô ⚽
        </h1>

        <p className="mt-2 text-[var(--color-text-muted)]">
          Organize sua pelada.
        </p>

        <button
          className="
            mt-6
            rounded-xl
            bg-[var(--color-primary)]
            px-6
            py-3
            font-semibold
            text-black
            transition
            hover:bg-[var(--color-primary-hover)]
          "
        >
          Começar
        </button>
      </div>
    </main>
  )
}

export default App
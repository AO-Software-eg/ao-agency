function Button({text , primary = false}: {text: string , primary?: boolean }) {
  return (
    <button className={`${primary ? 'text-foreground-secondary ' : 'background-none text-foreground-secondary border border-foreground-secondary'} text-2xl font-medium p-4 rounded-xl hover:scale-98 transition-transform cursor-pointer`}>
        {text}
    </button>
  )
}

export default Button
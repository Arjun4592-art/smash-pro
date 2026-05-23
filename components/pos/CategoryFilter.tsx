interface Props {
  categories: string[]
  selected: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <div className='flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide'>
      {['All', ...categories].map((cat) => {
        const isActive = selected === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className='px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 border transition-all'
            style={{
              background: isActive ? '#008060' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#6D7175',
              borderColor: isActive ? '#008060' : '#E1E3E5',
            }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}

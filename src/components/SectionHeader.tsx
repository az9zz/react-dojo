interface SectionHeaderProps {
  id: string
  title: string
  color?: string
}

const SectionHeader = ({ id, title, color = '#1677ff' }: SectionHeaderProps) => {
  return (
    <div id={id} className="scroll-mt-28 flex items-center gap-3 mt-8 mb-4">
      <div className="w-1 h-6 rounded-sm" style={{ backgroundColor: color }} />
      <h3 className="text-xl font-semibold m-0">{title}</h3>
    </div>
  )
}

export default SectionHeader

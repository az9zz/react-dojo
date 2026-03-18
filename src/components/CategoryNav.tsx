import { Tag } from 'antd'
import { slugify } from '@/utils/slugify'

interface CategoryNavProps {
  categories: string[]
  idPrefix?: string
}

const CategoryNav = ({ categories, idPrefix = '' }: CategoryNavProps) => {
  const handleClick = (category: string) => {
    const id = `${idPrefix}${slugify(category)}`
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm py-3 mb-4 border-b border-gray-200">
      {categories.map((cat) => (
        <Tag
          key={cat}
          color="blue"
          className="cursor-pointer !text-sm !py-1 !px-3"
          onClick={() => handleClick(cat)}
        >
          {cat}
        </Tag>
      ))}
    </div>
  )
}

export default CategoryNav

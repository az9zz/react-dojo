import { Typography, Flex } from 'antd'
import { conceptsRegistry } from '@/concepts/registry'
import CategoryNav from '@/components/CategoryNav'
import { slugify } from '@/utils/slugify'
import SectionHeader from '@/components/SectionHeader'

const { Title } = Typography

const ConceptsPage = () => {
  const categories = [...new Set(conceptsRegistry.map((e) => e.category))]

  return (
    <div>
      <Title level={2}>核心知识点</Title>
      <CategoryNav categories={categories} />
      {categories.map((cat) => {
        const entries = conceptsRegistry.filter((e) => e.category === cat)
        return (
          <div key={cat}>
            <SectionHeader id={slugify(cat)} title={cat} />
            <Flex vertical gap={24}>
              {entries.map((entry) => (
                <entry.component key={entry.id} />
              ))}
            </Flex>
          </div>
        )
      })}
    </div>
  )
}

export default ConceptsPage

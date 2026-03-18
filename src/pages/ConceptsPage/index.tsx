import { Typography, Divider, Flex } from 'antd'
import { conceptsRegistry } from '@/concepts/registry'

const { Title } = Typography

const ConceptsPage = () => {
  const categories = [...new Set(conceptsRegistry.map((e) => e.category))]

  return (
    <div>
      <Title level={2}>核心知识点</Title>
      {categories.map((cat) => {
        const entries = conceptsRegistry.filter((e) => e.category === cat)
        return (
          <div key={cat}>
            <Divider orientation="left">{cat}</Divider>
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

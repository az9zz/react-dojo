import { Typography, Flex } from 'antd'
import { interviewRegistry } from '@/interview/registry'
import CategoryNav from '@/components/CategoryNav'
import { slugify } from '@/utils/slugify'
import SectionHeader from '@/components/SectionHeader'

const { Title } = Typography

const categories = ['JavaScript 基础', 'JavaScript 异步与流程控制', 'JavaScript 性能优化']

const InterviewPage = () => {
  return (
    <div>
      <Title level={2}>前端面试题实践</Title>
      <CategoryNav categories={categories} />
      {categories.map((cat) => {
        const entries = interviewRegistry.filter((e) => e.category === cat)
        if (entries.length === 0) return null
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

export default InterviewPage

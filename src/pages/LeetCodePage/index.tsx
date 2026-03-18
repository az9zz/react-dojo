import { Typography, Flex } from 'antd'
import { leetcodeRegistry } from '@/leetcode/registry'
import CategoryNav from '@/components/CategoryNav'
import { slugify } from '@/utils/slugify'
import SectionHeader from '@/components/SectionHeader'

const { Title } = Typography

const categories = ['Easy', 'Medium']
const categoryColors: Record<string, string> = { Easy: '#52c41a', Medium: '#faad14' }

const LeetCodePage = () => {
  return (
    <div>
      <Title level={2}>LeetCode 算法题解</Title>
      <CategoryNav categories={categories} />
      {categories.map((cat) => {
        const entries = leetcodeRegistry.filter((e) => e.difficulty === cat.toLowerCase())
        if (entries.length === 0) return null
        return (
          <div key={cat}>
            <SectionHeader id={slugify(cat)} title={cat} color={categoryColors[cat]} />
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

export default LeetCodePage

import { Typography, Divider, Flex } from 'antd'
import { leetcodeRegistry } from '@/leetcode/registry'

const { Title } = Typography

const LeetCodePage = () => {
  const easy = leetcodeRegistry.filter((e) => e.difficulty === 'easy')
  const medium = leetcodeRegistry.filter((e) => e.difficulty === 'medium')

  return (
    <div>
      <Title level={2}>LeetCode 算法题解</Title>
      <Divider orientation="left">Easy</Divider>
      <Flex vertical gap={24}>
        {easy.map((entry) => (
          <entry.component key={entry.id} />
        ))}
      </Flex>

      <Divider orientation="left">Medium</Divider>
      <Flex vertical gap={24}>
        {medium.map((entry) => (
          <entry.component key={entry.id} />
        ))}
      </Flex>
    </div>
  )
}

export default LeetCodePage

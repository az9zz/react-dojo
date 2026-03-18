import { useState } from 'react'
import { Divider } from 'antd'
import CodeBlock from './index'

interface SolutionCodeProps {
  code: string
  language?: string
  title?: string
}

const SolutionCode = ({ code, language = 'typescript', title = '解题代码' }: SolutionCodeProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer', userSelect: 'none' }}>
        <Divider>
          {title} {open ? '▾' : '▸'}
        </Divider>
      </div>
      {open && (
        <CodeBlock language={language} defaultCollapsed={false}>
          {code}
        </CodeBlock>
      )}
    </>
  )
}

export default SolutionCode

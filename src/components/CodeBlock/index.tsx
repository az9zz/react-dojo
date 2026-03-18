import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  className?: string
}

const CodeBlock = ({ children, language, title, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyButton = (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-white/20 hover:bg-white/30 transition-colors cursor-pointer border-none"
      style={{ color: language ? '#abb2bf' : '#666' }}
    >
      {copied ? '已复制' : '复制'}
    </button>
  )

  // 输出模式：无 language
  if (!language) {
    return (
      <div className={`relative ${className ?? ''}`}>
        {title && <div className="text-xs text-gray-500 mb-1 font-medium">{title}</div>}
        <pre className="bg-[#f5f5f5] p-3 rounded-md text-[13px] font-mono whitespace-pre-wrap overflow-auto m-0">
          {children}
        </pre>
        {copyButton}
      </div>
    )
  }

  // 代码模式：有 language → 语法高亮
  return (
    <div className={`relative ${className ?? ''}`}>
      {(title || language) && (
        <div className="flex items-center gap-2 mb-1">
          {title && <span className="text-xs text-gray-500 font-medium">{title}</span>}
          <span className="text-xs text-gray-400">{language}</span>
        </div>
      )}
      <Highlight theme={themes.oneDark} code={children.trimEnd()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-3 rounded-md text-[13px] overflow-auto m-0" style={{ ...style }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {copyButton}
    </div>
  )
}

export default CodeBlock

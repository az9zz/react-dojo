import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  className?: string
  /** 默认是否收起（仅代码模式生效），默认 true */
  defaultCollapsed?: boolean
}

const COLLAPSED_MAX_HEIGHT = 200

const CodeBlock = ({
  children,
  language,
  title,
  className,
  defaultCollapsed = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 输出模式：无 language — 不需要折叠
  if (!language) {
    return (
      <div className={`relative ${className ?? ''}`}>
        {title && <div className="text-xs text-gray-500 mb-1 font-medium">{title}</div>}
        <div className="relative">
          <pre className="bg-[#f5f5f5] p-3 rounded-md text-[13px] font-mono whitespace-pre-wrap overflow-auto m-0">
            {children}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-black/5 hover:bg-black/10 transition-colors cursor-pointer border-none"
            style={{ color: '#666' }}
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    )
  }

  // 代码模式：有 language → 语法高亮 + 折叠
  const lineCount = children.trimEnd().split('\n').length
  const canCollapse = lineCount > 10

  return (
    <div className={className ?? ''}>
      {(title || language) && (
        <div className="flex items-center gap-2 mb-1">
          {title && <span className="text-xs text-gray-500 font-medium">{title}</span>}
          <span className="text-xs text-gray-400">{language}</span>
        </div>
      )}
      <div className="relative">
        <Highlight theme={themes.oneDark} code={children.trimEnd()} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="p-3 rounded-md text-[13px] overflow-auto m-0 transition-[max-height] duration-300"
              style={{
                ...style,
                ...(canCollapse && collapsed
                  ? { maxHeight: COLLAPSED_MAX_HEIGHT, overflow: 'hidden' }
                  : {}),
              }}
            >
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
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none"
          style={{ color: '#abb2bf' }}
        >
          {copied ? '已复制' : '复制'}
        </button>
        {canCollapse && collapsed && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 rounded-b-md flex items-end justify-center pb-2"
            style={{
              background: 'linear-gradient(transparent, #282c34)',
            }}
          >
            <button
              onClick={() => setCollapsed(false)}
              className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none"
              style={{ color: '#abb2bf' }}
            >
              展开全部 ({lineCount} 行)
            </button>
          </div>
        )}
      </div>
      {canCollapse && !collapsed && (
        <div className="flex justify-center mt-1">
          <button
            onClick={() => setCollapsed(true)}
            className="px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer border-none text-gray-500"
          >
            收起代码
          </button>
        </div>
      )}
    </div>
  )
}

export default CodeBlock

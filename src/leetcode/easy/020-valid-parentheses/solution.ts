// src/leetcode/easy/020-valid-parentheses/solution.ts

export function isValid(s: string): boolean {
  const stack: string[] = []
  const map = new Map<string, string>([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ])

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    if (map.has(char)) {
      // 是右括号
      if (stack.length === 0 || stack.pop() !== map.get(char)) {
        return false // 栈为空或栈顶不匹配
      }
    } else {
      // 是左括号
      stack.push(char)
    }
  }

  // 最终栈应为空
  return stack.length === 0
}

// 代码要点:

// 这种写法比 README 中的描述更简洁。我们直接检查 map 中是否存在 char 作为键来判断是左括号还是右括号，省去了一次判断。
// map.get(char) 能优雅地获取右括号对应的左括号。

// src/leetcode/medium/200-number-of-islands/index.tsx
import { useState, useMemo, useEffect } from 'react'
import { Card, Button, Typography, Space, Divider, Alert } from 'antd'
import { numIslands } from './solution'

const { Paragraph } = Typography

const initialGrid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]

export const NumIslandsComponent = () => {
  const [grid, setGrid] = useState<string[][]>(initialGrid.map((row) => [...row]))
  const [islandCount, setIslandCount] = useState(0)

  const islandCountResult = useMemo(() => {
    // useMemo 可以在 grid 变化时重新计算，避免不必要的重复计算
    return numIslands(grid)
  }, [grid])

  useEffect(() => {
    setIslandCount(islandCountResult)
  }, [islandCountResult])

  const handleCellClick = (r: number, c: number) => {
    const newGrid = grid.map((row) => [...row])
    newGrid[r][c] = newGrid[r][c] === '1' ? '0' : '1'
    setGrid(newGrid)
  }

  const resetGrid = () => {
    setGrid(initialGrid.map((row) => [...row]))
  }

  return (
    <Card title="200. 岛屿数量 (Number of Islands)">
      <Paragraph>点击下方的网格可以切换陆地 ('1') 和水 ('0')，岛屿数量会实时更新。</Paragraph>

      <div style={{ marginBottom: '16px' }}>
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex' }}>
            {row.map((cell, c) => (
              <button
                key={c}
                onClick={() => handleCellClick(r, c)}
                style={{
                  width: 30,
                  height: 30,
                  border: '1px solid #ccc',
                  backgroundColor: cell === '1' ? '#87CEEB' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>

      <Space>
        <Button onClick={resetGrid}>重置网格</Button>
      </Space>

      <Divider>计算结果</Divider>
      <Alert message={`当前岛屿数量: ${islandCount}`} type="success" showIcon />
    </Card>
  )
}

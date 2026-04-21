import { useState, useEffect } from 'react'

// --- 実装コード ---
export const useDebouncedSearch = (query: string, delay: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), delay)
    return () => clearTimeout(handler)
  }, [query, delay])

  return debouncedQuery
}

export const SearchStatus = ({ query }: { query: string }) => {
  const debounced = useDebouncedSearch(query, 500)
  return <p>{debounced ? `検索中: ${debounced}` : '待機中'}</p>
}

// --- インソーステスト (環境設定が必要ですが、ファイル内に書けます) ---
if (import.meta.vitest) {
  const { render, screen, act } = await import('@testing-library/react')
  const { it, expect, vi } = import.meta.vitest

  it('指定した時間（500ms）経過後に値が更新されるか', () => {
    vi.useFakeTimers() // 仮想タイマーを開始
    
    const { rerender } = render(<SearchStatus query="React" />)
    expect(screen.getByText('検索中: React')).toBeInTheDocument()

    // クエリを変更
    rerender(<SearchStatus query="Vitest" />)
    // 変更直後はまだ前の値（React）のまま
    expect(screen.getByText('検索中: React')).toBeInTheDocument()

    // 時間を500ms進める
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // 更新されていることを確認
    expect(screen.getByText('検索中: Vitest')).toBeInTheDocument()
    
    vi.useRealTimers() // タイマーを元に戻す
  })
}

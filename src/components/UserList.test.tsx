import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { UserList } from './UserList'

// 1. モックサーバーの設定
const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'テスト太郎' },
      { id: 2, name: 'テスト花子' },
    ])
  })
)

// テスト実行前後のサーバー制御
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('【非同期・外部】UserList 非同期テスト', () => {
  it('APIから取得したユーザー名が表示されるか', async () => {
    render(<UserList />)

    // 読み込み中が表示されていることを確認
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()

    // 非同期で要素が出現するのを待つ (findBy系を使用)
    const userItem = await screen.findByText('テスト太郎')
    expect(userItem).toBeInTheDocument()
    expect(screen.getByText('テスト花子')).toBeInTheDocument()
  })

  it('APIエラー時にエラーメッセージが表示されるか', async () => {
    // このテストだけ500エラーを返すように上書き
    server.use(
      http.get('/api/users', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    render(<UserList />)

    const errorMsg = await screen.findByText('エラーが発生しました')
    expect(errorMsg).toBeInTheDocument()
  })
})

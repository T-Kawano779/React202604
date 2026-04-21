import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Greeting } from './Greeting'
import { describe, it, expect } from 'vitest'

// UI・表示テストのサンプル
describe('【UI・表示】Greeting コンポーネントのテスト', () => {
  it('Propsで渡した名前が正しく表示されるか', () => {
    render(<Greeting name="田中" />)
    
    // 「田中」というテキストが含まれているか確認
    expect(screen.getByText(/田中さん/)).toBeInTheDocument()
  })

  it('初期状態ではログインボタンが表示されているか', () => {
    render(<Greeting name="田中" />)
    
    const button = screen.getByRole('button', { name: 'ログインする' })
    expect(button).toBeInTheDocument()
  })

  it('ボタンをクリックすると表示が切り替わるか', async () => {
    const user = userEvent.setup()
    render(<Greeting name="田中" />)

    const button = screen.getByRole('button', { name: 'ログインする' })
    
    // ボタンをクリック(await が必要であることに注意すること)
    await user.click(button)

    // ボタンが消え、「ログイン済みです」という文字が出現したか確認
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('ログイン済みです')).toBeInTheDocument()
  })
})

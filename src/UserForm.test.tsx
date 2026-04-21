import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserForm } from './UserForm'
import { describe, it, expect } from 'vitest'

// ユーザー操作テストのサンプル
describe('【ユーザー操作】UserForm ユーザー操作テスト', () => {
  it('入力フィールドに文字を入力できるか', async () => {
    const user = userEvent.setup()
    render(<UserForm />)

    const input = screen.getByLabelText('名前')
    await user.type(input, '田中太郎')

    expect(input).toHaveValue('田中太郎')
  })

  it('1文字だけで送信したときにバリデーションエラーが出るか', async () => {
    const user = userEvent.setup()
    render(<UserForm />)

    const input = screen.getByLabelText('名前')
    const button = screen.getByRole('button', { name: '送信' })

    await user.type(input, 'あ')
    await user.click(button)

    expect(screen.getByText('名前は2文字以上で入力してください')).toBeInTheDocument()
    expect(screen.queryByText('登録が完了しました')).not.toBeInTheDocument()
  })

  it('正しく入力して送信すると完了メッセージが表示されるか', async () => {
    const user = userEvent.setup()
    render(<UserForm />)

    const input = screen.getByLabelText('名前')
    const button = screen.getByRole('button', { name: '送信' })

    await user.type(input, '佐藤')
    await user.click(button)

    expect(screen.getByText('登録が完了しました：佐藤')).toBeInTheDocument()
    // フォーム自体が非表示になっていることを確認
    expect(screen.queryByLabelText('名前')).not.toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import App from './App'


// テストの基本ソース
describe('App', () => {
  it('Vite + React の見出しが表示される', () => {
    render(<App />)

    const heading = screen.getByText('Vite + React')
    expect(heading).toBeInTheDocument()
  })

  it('count ボタンが表示される', () => {
    render(<App />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

})
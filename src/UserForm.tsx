import { useState } from 'react'

export const UserForm = () => {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.length < 2) {
      setError('名前は2文字以上で入力してください')
      return
    }
    setSubmitted(true)
    setError('')
  }

  if (submitted) return <p>登録が完了しました：{name}</p>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-input">名前</label>
        <input
          id="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">送信</button>
    </form>
  )
}

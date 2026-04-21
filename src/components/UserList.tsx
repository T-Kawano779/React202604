import { useState, useEffect } from 'react'

export const UserList = () => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch(() => setError(true))
  }, [])

  if (error) return <p>エラーが発生しました</p>
  if (users.length === 0) return <p>読み込み中...</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

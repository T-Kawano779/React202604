import { useState } from 'react'

export const Greeting = ({ name }: { name: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <h1>こんにちは、{name}さん</h1>
      {isLoggedIn ? (
        <p>ログイン済みです</p>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>ログインする</button>
      )}
    </div>
  )
}

import { useState, useEffect } from "react"
import "./ThreadList.css"

const ThreadList = () => {
  const [threads, setThreads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchThreads()
  }, [])

  const fetchThreads = async () => {
    try {
      const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads")
      if (!response.ok) {
        throw new Error("データの取得に失敗しました")
      }
      const data = await response.json()
      setThreads(data)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  if (isLoading) return <div className="loading">読み込み中...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="thread-list">
      <h1>スレッド一覧</h1>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id} className="thread-item">
            <h2>{thread.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThreadList;




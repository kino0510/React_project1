import { useState } from 'react';
import './CreateThread.css';

const CreateThread = () => {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error("スレッドの作成に失敗しました")
      }

      const data = await response.json()
      console.log("作成されたスレッド:", data)
      setSuccess(true)
      setTitle("")
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-thread">
      <h1>新規スレッド作成</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="thread-title">スレッドタイトル:</label>
          <input
            type="text"
            id="thread-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "作成中..." : "スレッドを作成"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">スレッドが正常に作成されました！</p>}
    </div>
  )
}

export default CreateThread;


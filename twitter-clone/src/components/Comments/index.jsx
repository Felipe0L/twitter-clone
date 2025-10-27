import { useState, useEffect } from "react"
import CommentCard from "../CommentCard"
import { CommentInput, SubmitBt, FormContainer, NoCommentText } from "./styles"

export default function Comments({
  postId,
  comments = [],
  onDeleteComment,
  onAddComment,
  currentUser
}) {
  const [text, setText] = useState("")
  const [localComments, setLocalComments] = useState([])

  // 🔁 Atualiza comentários quando `comments` mudar
  useEffect(() => {
    if (Array.isArray(comments)) {
      setLocalComments(comments)
    } else {
      setLocalComments([])
    }
  }, [comments])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      const res = await fetch(
        `http://localhost:8000/api/posts/${postId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ content: text })
        }
      )

      if (!res.ok) throw new Error("Erro ao enviar comentário")

      const newComment = await res.json()

      // ✅ Adiciona no topo para refletir ordem do backend
      setLocalComments((prev) => [newComment, ...prev])
      onAddComment(newComment, postId)
      setText("")
    } catch (err) {
      console.error("Erro ao enviar comentário:", err)
    }
  }

  return (
    <div style={{ marginTop: "10px" }}>
      {localComments?.length > 0 ? (
        localComments.map((c) => {
          const normalized = {
            ...c,
            author: c.author || {
              id: c.user?.id || currentUser?.id,
              username: c.user?.username || currentUser?.username || "Anônimo",
              avatar: c.user?.avatar || currentUser?.avatar || null
            }
          }

          return (
            <CommentCard
              key={normalized.id}
              comment={normalized}
              onDelete={() => onDeleteComment(normalized.id, postId)}
              currentUser={currentUser}
            />
          )
        })
      ) : (
        <NoCommentText>Sem comentários ainda</NoCommentText>
      )}

      <FormContainer onSubmit={handleSubmit}>
        <CommentInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Escreva um comentário...'
        />
        <SubmitBt type='submit'>Enviar</SubmitBt>
      </FormContainer>
    </div>
  )
}

import React, { useEffect, useState } from "react"
import PostCard from "../../components/PostCard"
import { FeedContainer, FeedWrapper, PostsList, NFMessage } from "./styles"

function Feed() {
  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState(null) // 🔥 armazena o user logado

  // Buscar feed (posts dos seguidos)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch("https://felipe0l.pythonanywhere.com/api/feed/", {
      headers: { Authorization: `Token ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Erro ao carregar posts:", err))

    // 🔥 Buscar usuário logado
    fetch("https://felipe0l.pythonanywhere.com/api/profile/", {
      headers: { Authorization: `Token ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Erro ao buscar usuário:", err))
  }, [])

  // Excluir post
  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(
        `https://felipe0l.pythonanywhere.com/api/posts/${postId}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Token ${token}` }
        }
      )

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== postId))
      }
    } catch (err) {
      console.error("Erro ao excluir post:", err)
    }
  }

  // Curtir/descurtir post
  const handleToggleLike = async (postId) => {
    try {
      const response = await fetch(
        `https://felipe0l.pythonanywhere.com/api/posts/${postId}/like/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      )

      if (!response.ok) throw new Error("Erro ao curtir/descurtir post")

      const data = await response.json()

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes_count: data.likes_count,
                liked: data.status === "liked"
              }
            : post
        )
      )
    } catch (error) {
      console.error("Erro no toggle like:", error)
    }
  }

  // Seguir/deixar de seguir autor
  const handleToggleFollow = async (userId) => {
    try {
      const response = await fetch(
        `https://felipe0l.pythonanywhere.com/api/follow/${userId}/toggle/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      )

      if (!response.ok) throw new Error("Erro ao seguir/deixar de seguir")

      const data = await response.json()

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.author.id === userId
            ? {
                ...post,
                author: {
                  ...post.author,
                  is_following: data.status === "followed"
                }
              }
            : post
        )
      )
    } catch (error) {
      console.error("Erro no toggle follow:", error)
    }
  }

  // adiciona comentário a um post
  const handleAddComment = (newComment, postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), newComment] }
          : p
      )
    )
  }

  const handleDeleteComment = async (commentId, postId) => {
    if (!window.confirm("Tem certeza que deseja excluir este comentário?"))
      return

    try {
      const res = await fetch(
        `https://felipe0l.pythonanywhere.com/api/posts/${postId}/comments/${commentId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
          }
        }
      )

      if (!res.ok) throw new Error("Erro ao deletar comentário")

      // atualiza no estado
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
            : p
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <FeedContainer>
      <FeedWrapper>
        <PostsList>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={() => handleDeletePost(post.id)}
                onLike={() => handleToggleLike(post.id)}
                onFollow={() => handleToggleFollow(post.author.id)}
                onDeleteComment={handleDeleteComment}
                onAddComment={handleAddComment} // 🔥 passa para Comments
                currentUser={currentUser} // 🔥 passa usuário logado
              />
            ))
          ) : (
            <NFMessage>
              Você ainda não segue ninguém ou quem você segue não postou nada 👀
            </NFMessage>
          )}
        </PostsList>
      </FeedWrapper>
    </FeedContainer>
  )
}

export default Feed

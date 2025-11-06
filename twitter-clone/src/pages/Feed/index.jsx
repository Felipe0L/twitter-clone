import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import BlackButton from "../../components/BlackButton"

import PostCard from "../../components/PostCard"
import UserCard from "../../components/UserCard"
import ProfileModal from "../../components/ProfileModal"
import Myfeed from "../../containers/MyFeed"

import {
  FeedContainer,
  WritePost,
  PostTextArea,
  AvatarCont,
  Foryou,
  MoreContainer,
  MobileMenu,
  MobileMenuContainer
} from "./styles"

import PremiumIcon from "../../assets/xmenu_premium.png"
import Avatar from "../../assets/avatar.png"
import MenuBar from "../../components/MenuBar"
import RightSideBar from "../../components/RightSideBar"

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState("")
  const [user, setUser] = useState(null)
  const [moreIsOpen, setMoreIsOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [activeFeed, setActiveFeed] = useState(
    localStorage.getItem("activeFeed") || "foryou"
  )
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://felipe0l.pythonanywhere.com/api/profile/",
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      const data = await response.json()
      console.log("User recebido:", data)
      setUser(data)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(
          "https://felipe0l.pythonanywhere.com/api/posts/",
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )

        if (!res.ok) {
          console.error("Erro ao buscar posts")
          return
        }

        const data = await res.json()
        console.log(data)
        setPosts(data)
      } catch (error) {
        console.error("Erro na requisição dos posts", error)
      }
    }

    fetchPosts()
  }, [])

  const handleSwitchFeed = (feed) => {
    setActiveFeed(feed)
    localStorage.setItem("activeFeed", feed) // salva a aba escolhida
    navigate(0)
  }

  const logout = async () => {
    const token = localStorage.getItem("token")

    try {
      await fetch("https://felipe0l.pythonanywhere.com/api/logout/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`
        }
      })

      localStorage.removeItem("token") // remove do storage
      window.location.href = "/" // redireciona para o login
    } catch (err) {
      console.error("Erro no logout:", err)
    }
  }

  const handlePost = async () => {
    if (newPost.trim().length === 0) return

    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        "https://felipe0l.pythonanywhere.com/api/posts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({
            content: newPost
          })
        }
      )

      if (!res.ok) {
        console.error("Erro ao criar post")
        return
      }

      const createdPost = await res.json()
      setPosts([createdPost, ...posts]) // adiciona no topo
      setNewPost("") // limpa o campo
    } catch (error) {
      console.error("Erro na requisição de post:", error)
    }
  }

  const handleToggleMore = () => {
    setMoreIsOpen(!moreIsOpen)
  }

  const handleDeletePost = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://felipe0l.pythonanywhere.com/api/posts/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id)) // remove da lista
      } else {
        console.error("Erro ao deletar post:", await res.text())
      }
    } catch (err) {
      console.error("Erro na requisição:", err)
    }
  }

  const handleSaveProfile = async (formData) => {
    try {
      const token = localStorage.getItem("token") // ou onde você guarda o token

      const response = await fetch(
        "https://felipe0l.pythonanywhere.com/api/profile/update/",
        {
          method: "PATCH", // ✅ atualização parcial
          headers: {
            Authorization: `Token ${token}` // caso esteja usando DRF TokenAuth
          },
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil")
      }

      const updatedUser = await response.json()
      setUser(updatedUser) // 🔥 atualiza estado global/local com dados novos
      setIsProfileModalOpen(false)
      navigate(0)
    } catch (err) {
      console.error(err)
      alert("Falha ao atualizar perfil")
    }
  }
  // Curtir / deixar de curtir
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

      if (!response.ok) {
        throw new Error("Erro ao curtir/descurtir post")
      }

      const data = await response.json()
      console.log("Resposta like:", data)

      // Atualiza apenas o post alterado
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                liked: !post.liked, // alterna o estado
                likes_count: post.liked
                  ? post.likes_count - 1
                  : post.likes_count + 1
              }
            : post
        )
      )
    } catch (error) {
      console.error("Erro no toggle like:", error)
    }
    navigate(0)
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

      if (!response.ok) {
        throw new Error("Erro ao seguir/deixar de seguir")
      }

      const data = await response.json()
      console.log("Resposta follow:", data)

      // Atualiza todos os posts desse usuário no feed
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
    navigate(0)
  }

  // adiciona comentário a um post
  const handleAddComment = (newComment, postId) => {
    console.log("Novo comentário recebido:", newComment)
    console.log("Post alvo:", postId)

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
    <>
      <FeedContainer>
        <aside>
          <div className='XFeedIcon'>
            <img src={PremiumIcon} alt='Ícone do X' />
          </div>

          <MenuBar />

          <div onClick={handleToggleMore}>
            <MoreContainer className={moreIsOpen ? "is_open" : "."}>
              <ul>
                <li>
                  <span onClick={logout}>Logout</span>
                </li>
                <li>
                  <span onClick={() => setIsProfileModalOpen(true)}>
                    Editar perfil
                  </span>
                </li>
                <li>
                  <span onClick={() => navigate("/profile")}>Perfil</span>
                </li>
              </ul>
            </MoreContainer>
            {user && (
              <UserCard
                avatar={user.avatar}
                name={user.username}
                handle={user.handle}
              />
            )}
          </div>
        </aside>
        <main>
          <Foryou>
            <div
              className={activeFeed === "foryou" ? "active" : ""}
              onClick={() => handleSwitchFeed("foryou")}
            >
              <span>Para você</span>
            </div>
            <div
              className={activeFeed === "following" ? "active" : ""}
              onClick={() => handleSwitchFeed("following")}
            >
              <span>Seguindo</span>
            </div>
          </Foryou>

          {isProfileModalOpen && (
            <ProfileModal
              currentUser={user}
              onClose={() => setIsProfileModalOpen(false)}
              onSave={handleSaveProfile}
            />
          )}

          <WritePost>
            <div className='cont'>
              <AvatarCont
                src={
                  Avatar ||
                  (user.avatar
                    ? `https://felipe0l.pythonanywhere.com/media/${user.avatar}`
                    : Avatar)
                }
                alt={user?.username}
              />
              <PostTextArea
                maxLength={280}
                placeholder='O que está acontencendo?'
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <BlackButton onClick={handlePost}>Post</BlackButton>
          </WritePost>
          {activeFeed === "foryou" ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={user}
                onDelete={() => handleDeletePost(post.id)}
                onLike={() =>
                  handleToggleLike(post.id, post.liked_by_me, post.my_like_id)
                }
                onFollow={() =>
                  handleToggleFollow(
                    post.author.id,
                    post.author.is_following,
                    post.author.follow_id
                  )
                }
                onDeleteComment={(commentId) =>
                  handleDeleteComment(commentId, post.id)
                }
                onAddComment={
                  (newComment) => handleAddComment(newComment, post.id) // 🔑 aqui passa junto o id do post
                }
              />
            ))
          ) : (
            <Myfeed />
          )}
        </main>
        <aside>
          <RightSideBar />
        </aside>
      </FeedContainer>
      <MobileMenuContainer>
        <MobileMenu>
          <li>
            <a onClick={() => navigate("/profile")}>Perfil</a>
          </li>
          <li>
            <a onClick={() => setIsProfileModalOpen(true)}>Editar Perfil</a>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </MobileMenu>
      </MobileMenuContainer>
    </>
  )
}

export default Feed

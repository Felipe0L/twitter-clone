import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FollowersModal from "../../components/FollowersModal"
import FollowingModal from "../../components/FollowingModal"
import DefaultAvatar from "../../assets/avatar.png"
import {
  ProfileContainer,
  Avatar,
  Info,
  Username,
  Handle,
  Counters,
  CountButton,
  ProfilePageContainer
} from "./styles"
import HomeIcon from "../../assets/xmenu_home.png"
import PremiumIcon from "../../assets/xmenu_premium.png"
import { MButton } from "../../components/MenuButton/styles"
import MenuBar from "../../components/MenuBar"
import RightSideBar from "../../components/RightSideBar"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  // 🔥 Buscar dados do usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://felipe0l.pythonanywhere.com/api/profile/",
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )

        if (!res.ok) throw new Error("Erro ao carregar perfil")
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
      }
    }

    if (token) fetchUser()
  }, [token])

  if (!user) {
    return (
      <ProfileContainer>
        <p style={{ color: "#888", textAlign: "center" }}>
          Carregando perfil...
        </p>
      </ProfileContainer>
    )
  }

  return (
    <ProfilePageContainer>
      <aside>
        <div className='XFeedIcon'>
          <img src={PremiumIcon} alt='Ícone do X' />
        </div>
        <MenuBar />
      </aside>
      <ProfileContainer>
        <div className='header'>
          <Avatar
            src={
              user?.avatar
                ? `https://felipe0l.pythonanywhere.com/media/${user.avatar}`
                : DefaultAvatar
            }
            alt={user.username}
          />
          <Info>
            <Username>{user.username}</Username>
            <Handle>@{user.handle}</Handle>
          </Info>
        </div>

        <Counters>
          <CountButton onClick={() => setShowFollowing(true)}>
            <strong>{user.following_count || 0}</strong> Seguindo
          </CountButton>
          <CountButton onClick={() => setShowFollowers(true)}>
            <strong>{user.followers_count || 0}</strong> Seguidores
          </CountButton>
          <MButton onClick={() => navigate("/feed")}>
            <img src={HomeIcon} />
          </MButton>
        </Counters>

        {showFollowers && (
          <FollowersModal
            userId={user.id}
            token={token}
            onClose={() => setShowFollowers(false)}
          />
        )}

        {showFollowing && (
          <FollowingModal
            userId={user.id}
            token={token}
            onClose={() => setShowFollowing(false)}
          />
        )}
      </ProfileContainer>
      <aside>
        <RightSideBar />
      </aside>
    </ProfilePageContainer>
  )
}

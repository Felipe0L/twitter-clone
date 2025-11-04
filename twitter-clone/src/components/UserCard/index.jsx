// components/UserCard/index.jsx

import {
  CardContainer,
  Avatar,
  UserInfo,
  Username,
  Handle,
  MoreIcon
} from "./styles"
import MoreIconImg from "../../assets/xmenu_more.png"
import DefaultAvatar from "../../assets/avatar.png"

const BASE_URL = "https://felipe0l.pythonanywhere.com/media/"

const UserCard = ({ avatar, name, handle }) => {
  // 🔧 Monta a URL completa apenas se o avatar vier do backend
  const avatarSrc = avatar
    ? avatar.startsWith("http") // já vem com domínio completo?
      ? avatar
      : `${BASE_URL}${avatar}` // concatena domínio se for relativo
    : DefaultAvatar

  return (
    <CardContainer>
      <Avatar src={avatarSrc} alt={name || handle} />
      <UserInfo>
        <Username>{name || "Usuário"}</Username>
        <Handle>@{handle || "handle"}</Handle>
      </UserInfo>
      <MoreIcon src={MoreIconImg} alt='Mais opções' />
    </CardContainer>
  )
}

export default UserCard

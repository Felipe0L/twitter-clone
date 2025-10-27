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

const UserCard = ({ avatar, name, handle }) => {
  return (
    <CardContainer>
      <Avatar src={avatar || DefaultAvatar} alt={name || handle} />
      <UserInfo>
        <Username>{name || "Usuário"}</Username>
        <Handle>@{handle || "handle"}</Handle>
      </UserInfo>
      <MoreIcon src={MoreIconImg} alt='Mais opções' />
    </CardContainer>
  )
}

export default UserCard

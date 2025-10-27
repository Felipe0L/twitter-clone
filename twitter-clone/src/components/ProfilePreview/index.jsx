import {
  CardContainer,
  Avatar,
  UserInfo,
  Username,
  Handle,
  Status
} from "./styles"
import DefaultAvatar from "../../assets/avatar.png"

export default function ProfilePreview({ user }) {
  return (
    <CardContainer>
      <div className='user-left'>
        <Avatar src={user.avatar || DefaultAvatar} alt={user.username} />
        <UserInfo>
          <Username>{user.username}</Username>
          <Handle>@{user.handle}</Handle>
        </UserInfo>
      </div>
      {user.is_following && <Status>Seguindo</Status>}
    </CardContainer>
  )
}

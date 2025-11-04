import { AvatarCont } from "../../pages/Feed/styles"
import DefaultAvatar from "../../assets/avatar.png"
import {
  CommentContainer,
  CommentContent,
  CommentUsername,
  CommentText,
  DelBt
} from "./styles"

const BASE_URL = "https://felipe0l.pythonanywhere.com/"

// 🔧 Helper para montar URL do avatar
const getAvatarUrl = (avatar) => {
  if (!avatar) return DefaultAvatar
  return avatar.startsWith("http") ? avatar : `${BASE_URL}${avatar}`
}

const CommentCard = ({ comment, onDelete, currentUser }) => {
  const author = comment.author || {}

  return (
    <CommentContainer>
      <AvatarCont
        src={getAvatarUrl(author.avatar)}
        alt={author.username || "avatar"}
        style={{ width: "32px", height: "32px" }}
      />

      <CommentContent>
        <CommentUsername>@{author.username || "Anônimo"}</CommentUsername>
        <CommentText>{comment.content}</CommentText>

        {comment.is_owner && (
          <DelBt onClick={() => onDelete(comment.id)}>🗑️</DelBt>
        )}
      </CommentContent>
    </CommentContainer>
  )
}

export default CommentCard

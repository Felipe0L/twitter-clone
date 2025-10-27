import { AvatarCont } from "../../pages/Feed/styles"
import DefaultAvatar from "../../assets/avatar.png"
import {
  CommentContainer,
  CommentContent,
  CommentUsername,
  CommentText,
  DelBt
} from "./styles"

const CommentCard = ({ comment, onDelete, currentUser }) => {
  // Garante compatibilidade: se tiver author, usa; se não, usa fallback
  const author = comment.author || {}

  return (
    <CommentContainer>
      <AvatarCont
        src={
          author.avatar
            ? author.avatar.startsWith("http")
              ? author.avatar
              : `http://localhost:8000${author.avatar}`
            : DefaultAvatar
        }
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

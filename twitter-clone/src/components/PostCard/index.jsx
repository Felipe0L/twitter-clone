import { useState, useEffect } from "react"
import { AvatarCont } from "../../pages/Feed/styles"
import DefaultAvatar from "../../assets/avatar.png"
import Comments from "../Comments"

import {
  Content,
  PostCardContainer,
  Text,
  Username,
  BtDelete,
  Actions,
  FollowButton,
  LikeButton
} from "./styles"

const PostCard = ({
  post,
  onDelete,
  avatar,
  onLike,
  onFollow,
  onDeleteComment,
  onAddComment,
  currentUser
}) => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  // Atualiza os comentários do post sempre que o post mudar
  useEffect(() => {
    if (Array.isArray(post.comments)) {
      setComments(post.comments)
    } else {
      setComments([])
    }
  }, [post])

  const toggleComments = () => setShowComments((prev) => !prev)

  return (
    <PostCardContainer>
      <AvatarCont
        src={
          avatar ||
          (post.author.avatar
            ? `https://felipe0l.pythonanywhere.com/media/${post.author.avatar}`
            : DefaultAvatar)
        }
        alt={post.author.username || "avatar"}
      />

      <Content>
        <Username>@{post.author.username}</Username>
        <Text>{post.content}</Text>

        <Actions>
          {onLike && (
            <LikeButton onClick={onLike}>
              {post.liked_by_me ? "💙" : "🤍"} {post.likes_count}
            </LikeButton>
          )}

          {!post.author.is_me && onFollow && (
            <FollowButton onClick={onFollow}>
              {post.author.is_following ? "Deixar de seguir" : "Seguir"}
            </FollowButton>
          )}

          {post.is_owner && onDelete && (
            <BtDelete onClick={onDelete}>🗑️ Delete</BtDelete>
          )}

          {/* 💬 Botão de abrir/fechar comentários */}
          <button onClick={toggleComments}>
            {showComments ? "🔽 Ocultar" : "💬"} {comments?.length || 0}
          </button>
        </Actions>

        {/* 🔽 Exibe comentários apenas se showComments for true */}
        {showComments && (
          <Comments
            postId={post.id}
            comments={comments}
            onDeleteComment={(commentId) => onDeleteComment(commentId, post.id)}
            onAddComment={(newComment) => {
              setComments((prev) => [...prev, newComment])
              onAddComment(newComment, post.id)
            }}
            currentUser={currentUser}
          />
        )}
      </Content>
    </PostCardContainer>
  )
}

export default PostCard

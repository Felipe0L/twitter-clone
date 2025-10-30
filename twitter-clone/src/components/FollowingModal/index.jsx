import React, { useEffect, useState } from "react"
import ProfilePreview from "../ProfilePreview"
import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  CloseButton,
  EmptyText
} from "./styles"

export default function FollowingModal({ userId, token, onClose }) {
  const [following, setFollowing] = useState([])

  useEffect(() => {
    async function loadFollowing() {
      try {
        const res = await fetch(
          `https://felipe0l.pythonanywhere.com/api/users/${userId}/following/`,
          {
            headers: { Authorization: `Token ${token}` }
          }
        )
        if (res.ok) {
          const data = await res.json()
          setFollowing(data)
        }
      } catch (error) {
        console.error("Erro ao buscar seguindo:", error)
      }
    }
    loadFollowing()
  }, [userId, token])

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Seguindo</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        {following.length === 0 ? (
          <EmptyText>Você ainda não segue ninguém.</EmptyText>
        ) : (
          following.map((f) => <ProfilePreview key={f.id} user={f} />)
        )}
      </ModalContainer>
    </Overlay>
  )
}

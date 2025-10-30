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

export default function FollowersModal({ userId, token, onClose }) {
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    async function loadFollowers() {
      try {
        const res = await fetch(
          `https://felipe0l.pythonanywhere.com/api/users/${userId}/followers/`,
          {
            headers: { Authorization: `Token ${token}` }
          }
        )

        if (res.ok) {
          const data = await res.json()
          setFollowers(data)
        }
      } catch (error) {
        console.error("Erro ao buscar seguidores:", error)
      }
    }
    loadFollowers()
  }, [userId, token])

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Seguidores</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        {followers.length === 0 ? (
          <EmptyText>Nenhum seguidor encontrado.</EmptyText>
        ) : (
          followers.map((f) => <ProfilePreview key={f.id} user={f} />)
        )}
      </ModalContainer>
    </Overlay>
  )
}

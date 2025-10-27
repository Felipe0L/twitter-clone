import { useState } from "react"
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  Input,
  SaveButton
} from "./styles"

const ProfileModal = ({ onClose, currentUser, onSave }) => {
  const [username, setUsername] = useState(currentUser?.username || "")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)

  const handleSave = () => {
    const formData = new FormData()
    if (username) formData.append("username", username)
    if (password) formData.append("password", password)
    if (avatar) formData.append("avatar", avatar)

    onSave(formData)
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Configuração de Perfil</h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <Input
          type='text'
          placeholder='Novo nome de usuário'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type='password'
          placeholder='Nova senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type='file'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <SaveButton onClick={handleSave}>Salvar Alterações</SaveButton>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ProfileModal

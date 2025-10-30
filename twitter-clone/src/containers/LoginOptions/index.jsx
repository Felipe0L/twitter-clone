import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ButtonLink from "../../components/ButtonLink"
import Title from "../../components/Title"
import BlackButton from "../../components/BlackButton"
import {
  CadLogContainer,
  Titulo2,
  Modal,
  ModalContent,
  FormContainer,
  ErrorMsg
} from "./styles"
import Close from "../../assets/close.png"
import XLogo from "../../assets/XLogo.png"

const LoginOptions = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [joinIsOpen, setJoinIsOpen] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [loginUser, setLoginUser] = useState("")
  const [loginPass, setLoginPass] = useState("")

  const navigate = useNavigate()

  // Função reutilizável de login
  const login = async (username, password) => {
    try {
      const res = await fetch(
        "https://felipe0l.pythonanywhere.com/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        }
      )

      const data = await res.json()

      if (res.ok) {
        console.log("Token recebido:", data.token)
        localStorage.setItem("token", data.token)
        return true
      } else {
        console.error("Erro no login:", data)
        return false
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error)
      return false
    }
  }

  // Cadastro + login
  const handleCadastroELogin = async () => {
    if (user.length > 3 && pass.length > 4) {
      try {
        const res = await fetch(
          "https://felipe0l.pythonanywhere.com/api/register/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: user,
              password: pass
            })
          }
        )

        if (!res.ok) {
          const data = await res.json()
          console.error("Erro ao criar usuário:", data)
          return
        }

        console.log("Usuário criado com sucesso")

        const sucesso = await login(user, pass)
        if (sucesso) {
          setCreateIsOpen(false)
          navigate("/feed")
        }
      } catch (error) {
        console.error("Erro na requisição de cadastro:", error)
      }
    }
  }

  // Login simples do modal "Entrar"
  const handleLoginSimples = async () => {
    if (loginUser.length > 3 && loginPass.length > 4) {
      const sucesso = await login(loginUser, loginPass)
      if (sucesso) {
        setJoinIsOpen(false)
        navigate("/feed")
      }
    }
  }

  return (
    <>
      <CadLogContainer>
        <Title> Acontecendo Agora</Title>
        <Titulo2>Inscreva-se hoje</Titulo2>
        <ButtonLink
          onClick={() => setCreateIsOpen(true)}
          children='Criar conta'
        />
        <span>Já tem uma conta?</span>
        <ButtonLink
          onClick={() => setJoinIsOpen(true)}
          principal
          children='Entrar'
        />
      </CadLogContainer>

      {/* Modal Criar Conta */}
      <Modal className={createIsOpen ? "visible" : ""}>
        <ModalContent className='container'>
          <header>
            <img
              onClick={() => setCreateIsOpen(false)}
              className='closebt'
              src={Close}
              alt='Clique para fechar'
            />
            <img className='xlogo' src={XLogo} alt='Logo do X' />
          </header>
          <FormContainer>
            <h3>Criar sua conta</h3>
            <form>
              <input
                required
                onChange={(event) => setUser(event.target.value)}
                type='text'
                placeholder='Usuário'
              />
              {user.length > 0 && user.length < 4 && (
                <ErrorMsg>Usuário deve conter pelo menos 4 caracteres</ErrorMsg>
              )}
              <input
                required
                onChange={(event) => setPass(event.target.value)}
                type='password'
                placeholder='Senha'
              />
              {pass.length > 0 && pass.length < 5 && (
                <ErrorMsg>A senha deve conter pelo menos 5 caracteres</ErrorMsg>
              )}
            </form>
            <BlackButton onClick={handleCadastroELogin}>Confirmar</BlackButton>
          </FormContainer>
        </ModalContent>
        <div className='overlay'></div>
      </Modal>

      {/* Modal Entrar */}
      <Modal className={joinIsOpen ? "visible" : ""}>
        <ModalContent className='container'>
          <header>
            <img
              onClick={() => setJoinIsOpen(false)}
              className='closebt'
              src={Close}
              alt='Clique para fechar'
            />
            <img className='xlogo' src={XLogo} alt='Logo do X' />
          </header>
          <FormContainer>
            <h3>Entrar</h3>
            <form>
              <input
                required
                type='text'
                placeholder='Login'
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
              />
              {user.length > 0 && user.length < 4 && (
                <ErrorMsg>Usuário deve conter pelo menos 4 caracteres</ErrorMsg>
              )}
              <input
                required
                type='password'
                placeholder='Senha'
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              {pass.length > 0 && pass.length < 5 && (
                <ErrorMsg>A senha deve conter pelo menos 5 caracteres</ErrorMsg>
              )}
            </form>
            <BlackButton onClick={handleLoginSimples}>Entrar</BlackButton>
          </FormContainer>
        </ModalContent>
        <div className='overlay'></div>
      </Modal>
    </>
  )
}

export default LoginOptions

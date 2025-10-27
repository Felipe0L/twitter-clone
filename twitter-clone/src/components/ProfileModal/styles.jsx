import styled from "styled-components"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
`

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const SaveButton = styled.button`
  background: black;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #333;
  }
`

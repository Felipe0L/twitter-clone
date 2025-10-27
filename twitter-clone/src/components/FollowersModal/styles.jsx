import styled from "styled-components"

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

export const ModalContainer = styled.div`
  background: #fff;
  width: 380px;
  max-height: 80vh;
  border-radius: 20px;
  padding: 16px;
  overflow-y: auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 12px;
`

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #444;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`

export const EmptyText = styled.p`
  text-align: center;
  color: #777;
  padding: 24px 0;
`

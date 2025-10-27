import styled from "styled-components"

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  margin-left: 40px; /* recuo p/ parecer resposta */
  border-bottom: 1px solid #e6ecf0;
`

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const CommentUsername = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`

export const CommentText = styled.p`
  margin: 2px 0 0 0;
  font-size: 0.9rem;
  color: #14171a;
`
export const DelBt = styled.button`
  background-color: transparent;
  border: none;
`

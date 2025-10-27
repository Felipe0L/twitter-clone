import styled from "styled-components"

export const PostCardContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  position: relative;

  @media (max-width: 426px) {
    max-width: 272px;
    padding: 12px 0 12px 0;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const Username = styled.strong`
  margin-bottom: 0.3rem;
`

export const Text = styled.p`
  margin: 0;
  overflow-wrap: break-word;
  max-width: 482px;

  @media (max-width: 1025px) {
    max-width: 420px;
  }

  @media (max-width: 426px) {
    max-width: 120px;
    font-size: 12px;
  }
`
export const BtDelete = styled.button`
  margin-top: 8px;
  background: white;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 4px 8px;
  cursor: pointer;
  max-width: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
`
export const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`

export const LikeButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
`

export const FollowButton = styled.button`
  border: none;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: #ddd;
  }
`

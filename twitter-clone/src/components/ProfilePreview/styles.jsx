import styled from "styled-components"

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f2f2f2;
  }

  .user-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const Username = styled.span`
  font-weight: 600;
`

export const Handle = styled.span`
  font-size: 0.9rem;
  color: #555;
`

export const Status = styled.span`
  color: #1d9bf0;
  font-size: 0.9rem;
  font-weight: 600;
`

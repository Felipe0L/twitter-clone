import styled from "styled-components"
import { MButton } from "../../components/MenuButton/styles"
import { BBLink } from "../../components/BlackButton/styles"

export const ProfilePageContainer = styled.div`
  padding: 0 88px 0 88px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  column-gap: 16px;

  & .XFeedIcon {
    padding-left: 8px;
    padding-bottom: 16px;
  }

  ${BBLink} {
    max-width: 275px;
  }

  aside {
    padding-top: 8px;

    @media (max-width: 426px) {
      display: none;
    }
    @media (max-width: 769px) {
      display: none;
    }
  }
  main {
    @media (max-width: 426px) {
      max-width: 350px;
    }
  }
  @media (max-width: 426px) {
    padding: 0 12px 0 12px;
  }
`
export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .header {
    display: flex;
    align-items: center;
    gap: 18px;
  }
`

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`

export const Username = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`

export const Handle = styled.span`
  color: #666;
`

export const Counters = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;

  ${MButton} {
    max-width: 44px;
  }
`

export const CountButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #444;
  transition: color 0.2s;

  &:hover {
    color: #1d9bf0;
  }

  strong {
    font-weight: 700;
  }
`

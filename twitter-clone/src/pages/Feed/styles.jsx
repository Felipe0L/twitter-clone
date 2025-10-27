import styled from "styled-components"
import { BBLink } from "../../components/BlackButton/styles"

export const FeedContainer = styled.div`
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
      margin-top: 64px;
    }
  }
  @media (max-width: 426px) {
    padding: 0 12px 0 12px;
  }
`

export const Foryou = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  height: 64px;
  border: 1px solid rgb(240, 240, 240);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: rgb(240, 240, 240);
      font-weight: bold;
    }

    &.active {
      font-weight: 700;
      border-bottom: 3px solid #1d9bf0;
    }
  }
  @media (max-width: 426px) {
    max-width: 300px;
  }
`

export const WritePost = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 138px;
  position: relative;
  border: 1px solid rgb(240, 240, 240);

  ${BBLink} {
    max-width: 60px;
    padding: 0 24px;
    position: absolute;
    bottom: 0;
    right: 40px;
    margin: 0 auto;
  }

  .cont {
    display: flex;
  }
  @media (max-width: 426px) {
    max-width: 50%;
  }
`
export const PostTextArea = styled.textarea`
  width: 512px;
  height: 82px;
  resize: none;
`
export const AvatarCont = styled.img`
  max-width: 100%;
  width: 40px;
  max-height: 40px;
  margin-right: 16px;
  border-radius: 50%;
`
export const MoreContainer = styled.div`
  display: none;
  position: relative;
  width: 100%;

  &.is_open {
    display: block;
  }

  ul {
    position: absolute;
    right: 0;
    top: -16px;
    background-color: #fff;
    border: 1px solid rgb(200, 200, 200);
    cursor: pointer;
  }
`
export const MobileMenuContainer = styled.div`
  display: none;
  position: sticky;
  bottom: 0;
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
  @media (max-width: 769px) {
    display: block;
  }
  @media (max-width: 376px) {
    max-width: 200px;
  }
`
export const MobileMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold.;
`

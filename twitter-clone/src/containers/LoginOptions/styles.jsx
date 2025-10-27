import styled from "styled-components"
import { BBLink } from "../../components/BlackButton/styles"

export const CadLogContainer = styled.section`
  padding: 32px;
  display: flex;
  flex-direction: column;

  span {
    padding: 24px 0 12px 0;
  }
`

export const Titulo2 = styled.h2`
  font-size: 32px;
  font-weight: bold;
  padding: 20px 0 20px 0;

  @media (max-width: 425px) {
    font-size: 24px;
  }
`

export const CadLink = styled.a`
  color: ${(props) => (props.principal ? "#fff" : "rgb(29, 155, 240)")};
  background-color: ${(props) =>
    props.principal ? "rgb(29, 155, 240)" : "#fff"};
  border: ${(props) => (props.principal ? "none" : "1px solid #dadce0")};
  border-radius: 9999px;
  font-size: 16px;
  text-decoration: none;
  width: 300px;
  min-width: 36px;
  max-width: 380px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;

  &.visible {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`
export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;

  header {
    display: flex;
    justify-content: center;
    .closebt {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 8px;
      left: 8px;
      cursor: pointer;
    }
    .xlogo {
      width: 28px;
      height: 26px;
      padding-top: 8px;
    }
  }

  h3 {
    font-size: 32px;
    padding-top: 32px;
    padding-bottom: 32px;
  }

  @media (max-width: 426px) {
    max-width: 70%;
  }
`
export const FormContainer = styled.div`
  max-width: 440px;
  margin: 0 auto;

  input {
    display: block;
    padding: 12px 8px 8px 8px;
    margin: 16px auto 0;
    width: 440px;

    @media (max-width: 426px) {
      max-width: 80%;
    }
  }

  ${BBLink} {
    margin: 32px auto 32px auto;

    @media (max-width: 426px) {
      max-width: 80%;
    }
  }
`
export const ErrorMsg = styled.span`
  color: #ff0000;
  font-size: 12px;
`

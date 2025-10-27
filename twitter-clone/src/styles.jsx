import styled, { createGlobalStyle } from "styled-components"

const EstiloGlobal = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  list-style: none;
}
`
export default EstiloGlobal

export const ContainerLogin = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 64px;
  display: grid;
  grid-template-columns: 30% 70%;

  @media (min-width: 1440px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 768px) {
    display: inline;
  }
`

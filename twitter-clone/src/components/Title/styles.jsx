import styled from "styled-components"

export const Titulo = styled.span`
  font-size: ${(props) => (props.font ? `${props.font}px` : "64px")};
  font-weight: bold;

  @media (max-width: 425px) {
    font-size: 40px;
  }
`

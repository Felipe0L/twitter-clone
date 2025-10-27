import styled from "styled-components"

export const CadLogImgContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
  }
  @media (min-width: 1440px) {
    img {
      max-width: 60%;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: left;
    padding: 32px 0 0 32px;

    img {
      max-width: 20%;
    }
  }
`

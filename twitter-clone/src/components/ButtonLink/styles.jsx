import styled from "styled-components"

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
  cursor: pointer;
`

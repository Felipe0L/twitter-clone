import styled from "styled-components"

export const MButton = styled.button`
  font-size: 20px;
  color: #0f1419;
  border: none;
  background-color: #fff;
  border-radius: 9999px;
  padding: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 12px;
    width: 22px;
    height: 22px;
  }

  &:hover {
    background-color: rgb(240, 240, 240);
    font-weight: bold;
  }
`

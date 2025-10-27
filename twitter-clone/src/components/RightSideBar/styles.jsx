import styled from "styled-components"
import { CadLink } from "../ButtonLink/styles"
import { Titulo } from "../Title/styles"

export const SubscribeContainer = styled.div`
  border: 1px solid rgb(240, 240, 240);
  padding-left: 8px;
  padding-bottom: 8px;

  span {
    display: block;
    padding: 8px 0;
  }

  ${CadLink} {
    max-width: 40%;
  }
`
export const TrendContainer = styled.div`
  padding: 8px 0 8px 8px;
  border: 1px solid rgb(240, 240, 240);

  ${Titulo} {
    padding-top: 16px;
  }
`

export const TrendItem = styled.li`
  padding: 8px 0;

  &:hover {
    background-color: rgb(240, 240, 240);
  }
  cursor: pointer;

  span {
    display: block;
  }
`
export const Trendspan = styled.span`
  color: ${(props) => (props.principal ? "#000" : "rgb(190, 190, 190)")};
  font-weight: ${(props) => (props.principal ? "bold" : "normal")};
  padding-top: 4px;
`

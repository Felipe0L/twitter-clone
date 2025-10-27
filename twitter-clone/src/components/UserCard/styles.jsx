// components/UserCard/styles.js

import styled from "styled-components"

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
  border-radius: 9999px;
  &:hover {
    background-color: #f7f7f7;
  }
`

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  flex: 1;
`

export const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #000;
`

export const Handle = styled.span`
  font-size: 14px;
  color: gray;
`

export const MoreIcon = styled.img`
  width: 20px;
  height: 20px;
`

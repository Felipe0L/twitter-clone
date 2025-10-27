import styled from "styled-components"

export const FormContainer = styled.form`
  display: flex;
  gap: 8px;
  margintop: 10px;
`
export const CommentInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  borderradius: 6px;
  border: 1px solid #ccc;
`
export const SubmitBt = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 9999px;
  cursor: pointer;
`
export const NoCommentText = styled.p`
  color: #888;
  fontsize: 14px;
  margin: 4px 0;
`

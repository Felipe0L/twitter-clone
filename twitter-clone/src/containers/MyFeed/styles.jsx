import styled from "styled-components"

export const FeedContainer = styled.div`
  padding: 0 88px;
  display: flex;
  justify-content: center;
`

export const FeedWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
`

export const PostInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  font-family: inherit;
  outline: none;

  &:focus {
    border-color: #1d9bf0;
    box-shadow: 0 0 0 2px rgba(29, 155, 240, 0.2);
  }
`

export const PostButton = styled.button`
  align-self: flex-end;
  background: #1d9bf0;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1a8cd8;
  }

  &:disabled {
    background: #a0d8ff;
    cursor: not-allowed;
  }
`

export const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const NFMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`

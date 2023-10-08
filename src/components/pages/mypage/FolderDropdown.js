import React from "react";
import styled from "styled-components";

const FolderDropdown = () => {
    return (
      <Wrapper>
        <ListItem>북마크 공개</ListItem>
        <ListItem>북마크 이름 변경</ListItem>
        <ListItem>북마크 삭제</ListItem>
      </Wrapper>
    );
};

export default FolderDropdown;

const Wrapper = styled.div`
  list-style: none;
  background-color: #ffffff; 
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  padding-top: 8px; 
  padding-bottom: 8px;
`

const ListItem = styled.li`
  padding: 15px;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  transition: background-color 0.2s; 
  color: #54595E;
  &:hover {
    background-color: #EBE5FC;
    cursor: pointer;
  }
`;
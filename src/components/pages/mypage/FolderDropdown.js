import React from "react";
import styled from "styled-components";

const FolderDropdown = () => {
    return (
      <Wrapper>
        <li>북마크 공개</li>
        <li>북마크 이름 변경</li>
        <li>북마크 삭제</li>
      </Wrapper>
    );
};

export default FolderDropdown;

const Wrapper = styled.div`
  list-style: none;
  max-width: 116px;
  max-height: 32px
`
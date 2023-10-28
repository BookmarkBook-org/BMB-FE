import React, { useState } from "react";
import styled from "styled-components";

const HomeBookmarkMenu = ({ items }) => {

  return (
    <Wrapper>
      <p className="title">{items}</p>
    </Wrapper>
  );
};

export default HomeBookmarkMenu;

const Wrapper = styled.div`
  padding-left: 170px;
  padding-right: 170px;
  .title{
    color: #212529;
    font-size: 36px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    line-height: 40px;
    word-wrap: break-word;
  }
`;

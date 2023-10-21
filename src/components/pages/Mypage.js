import React from "react";
import styled from "styled-components";

import BookmarkTitle from "./mypage/BookmarkTitle";
import BookmarkUserInfo from "./mypage/BookmarkUserInfo";
import BookmarkPages from "./mypage/BookmarkPages";

const Mypage = () => {

    return (
        <Wrapper>
            <BookmarkTitle />
            <hr className="hr"/>
            <BookmarkUserInfo />
            <BookmarkPages />
        </Wrapper>
    );
};

export default Mypage;

const Wrapper = styled.div`
  .hr {
    border-top: dashed 1px #dddddd;
  }
`
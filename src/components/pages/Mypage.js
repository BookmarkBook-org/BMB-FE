import React, { useState } from "react";
import styled from "styled-components";

import Title from "./mypage/Title";
import UserInfo from "./mypage/UserInfo";
import BookmarkMenu from "./mypage/BookmarkMenu";
import BookmarkFolder from "./mypage/BookmarkFolder";
import BookmarkList from "./mypage/BookmarkList";

const Mypage = () => {

    return (
        <Wrapper>
            <Title />
            <hr />
            <UserInfo />
            <BookmarkMenu />
            <BookmarkFolder />
            <BookmarkList />
        </Wrapper>
    );
};

export default Mypage;

const Wrapper = styled.div`
`
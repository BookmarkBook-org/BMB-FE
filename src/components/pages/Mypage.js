import React, { useState } from "react";
import Title from "./mypage/Title";
import UserInfo from "./mypage/UserInfo";
import BookmarkMenu from "./mypage/BookmarkMenu";
import BookmarkFolder from "./mypage/BookmarkFolder";
import BookmarkList from "./mypage/BookmarkList";

const Mypage = () => {

    return (
        <div>
            <Title />
            <UserInfo />
            <BookmarkMenu />
            <BookmarkFolder />
            <BookmarkList />
        </div>
    );
};

export default Mypage;
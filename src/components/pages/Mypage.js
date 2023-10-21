import React, { useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import BookmarkTitle from "./mypage/BookmarkTitle";
import BookmarkUserInfo from "./mypage/BookmarkUserInfo";
import BookmarkPages from "./mypage/BookmarkPages";

const Mypage = () => {

  // 쿠키 확인 후 로그인되어있지 않으면 /login으로 리다이렉트
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedin = document.cookie.includes('loggedIn=true');
    if (!isLoggedin) {
      navigate('/login');
    }
  }, [navigate]);

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
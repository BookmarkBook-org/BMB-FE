import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";

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
          <Helmet>
            <title>마이페이지 - 북마크북</title>
            <meta
              name="description"
              content="북마크 설정을 할 수 있는 페이지"
            />
            <meta
              name="keywords"
              content="북마크, 수정, 마이페이지, 폴더"
            />
            <meta
              name="og:site_name"
              content="Bookmarkbook"
            />
            <meta
              name="og:title"
              content="마이페이지 - 북마크북"
            />
            <meta
              name="og:description"
              content="북마크 설정을 할 수 있는 페이지"
            />
            <meta
              name="og:type"
              content="website"
            />
            <meta
              name="og:url"
              content="https://bookmarkbook/mypage.swygbro.com"
            />
            <meta
              name="og:image"
              content="%PUBLIC_URL%/assets/images/ic_logo.png"
            />
            <meta
              name="twitter:title"
              content="마이페이지 - 북마크북"
            />
            <link
              rel="apple-touch-icon"
              href="%PUBLIC_URL%/assets/images/ic_logo.png"
            />
            <link
              rel="shortcut icon"
              href="%PUBLIC_URL%/assets/images/ic_logo.png"
            />
          </Helmet>

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
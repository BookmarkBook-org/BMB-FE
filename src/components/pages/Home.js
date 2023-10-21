import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import HomeTitle from './home/HomeTitle';
import HomeUserInfo from './home/HomeUserInfo';
import HomeBookmarkPages from './home/HomeBookmarkPages';

const Home = () => {

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
                <title>홈 - 북마크북</title>
                <meta
                name="description"
                content="북마크북 메인 페이지"
                />
                <meta
                name="keywords"
                content="북마크북, 북마크, 폴더, 링크"
                />
                <meta
                name="og:site_name"
                content="Bookmarkbook"
                />
                <meta
                name="og:title"
                content="홈 - 북마크북"
                />
                <meta
                name="og:description"
                content="북마크북 메인 페이지"
                />
                <meta
                name="og:type"
                content="website"
                />
                <meta
                name="og:url"
                content="https://bookmarkbook.swygbro.com"
                />
                <meta
                name="og:image"
                content="%PUBLIC_URL%/assets/images/ic_logo.png"
                />
                <meta
                name="twitter:title"
                content="홈 - 북마크북"
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

            <HomeTitle />
            <hr className="hr"/>
            <HomeUserInfo />
            <HomeBookmarkPages />
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
.hr {
    border-top: dashed 1px #dddddd;
  }
`
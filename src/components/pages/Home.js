import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <HomeTitle />
            <hr className="hr"/>
            <HomeUserInfo />
            <HomeBookmarkPages />
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
`
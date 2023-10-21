import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";

const Login = () => {
    const [title, setTitle] = useState("");

    const [isBlocking, setIsBlocking] = useState(false);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        setTitle("로그인");
        const unblock = navigate((loc, action) => {
            if (action === 'POP' && isBlocking) {
                return window.confirm('뒤로 가겠습니까');
            }
            return true;
        });
        return unblock;
    }, [isBlocking, navigate]);

    useEffect(() => {
      setIsBlocking(true)
    }, [isBlocking]);


    return (
        <Wrapper>
          <Helmet>
            <title>로그인 - 북마크북</title>
            <meta
              name="description"
              content="북마크북 로그인 페이지"
            />
            <meta
              name="keywords"
              content="북마크북, 로그인, 구글, 정보입력, 업로드"
            />
            <meta
              name="og:site_name"
              content="Bookmarkbook"
            />
            <meta
              name="og:title"
              content="로그인 - 북마크북"
            />
            <meta
              name="og:description"
              content="북마크북 로그인 페이지"
            />
            <meta
              name="og:type"
              content="website"
            />
            <meta
              name="og:url"
              content="https://bookmarkbook/login.swygbro.com"
            />
            <meta
              name="og:image"
              content="%PUBLIC_URL%/assets/images/ic_logo.png"
            />
            <meta
              name="twitter:title"
              content="로그인 - 북마크북"
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
            <div>
            <p className="title">{title}</p>
              <Outlet context={[title, setTitle]} />
            </div>
        </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
.title {
    color: #212529;
    font-size: 32px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    line-height: 40px;
    word-wrap: break-word;
    padding-left: 170px;
    padding-right: 170px; 
  }
  .progress-bar {
    width: 100%; 
    background: #ddd; 
  }
  .hr {
    text-align: left;
    margin-left: 0;
    height: 4px; 
    background: linear-gradient(to right, #7749F8 0%, #7749F8 50%);
    transition: width 0.5s; 
  }
`
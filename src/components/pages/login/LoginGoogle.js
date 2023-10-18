import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import styled from "styled-components";
import Cookies from "js-cookie";
import LoginUserInfo from "./LoginUserInfo";

const LoginGoogle = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = Cookies.get("loggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleSuccess = (res) => {
    console.log(res);

    Cookies.set("loggedIn", "true");
    setLoggedIn(true);
  };

  return (
    <Wrapper>
      {loggedIn ? (
        <LoginUserInfo />
      ) : (
        <div>
          <p className="title">로그인</p>
          <hr className="hr"/>
          <div className="login-components">
          <p className="login-intro">안녕하세요<br /> 북마크를 공유하는 서비스,<br /> 북마크북입니다.</p>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_API_KEY} className="login-button">
            <GoogleLogin
              onSuccess={handleSuccess}
              onFailure={(err) => {
                console.log(err);
              }}
            />
          </GoogleOAuthProvider>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LoginGoogle;

const Wrapper = styled.div`
.login-components{
  max-width: 375px;
  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
}
.login-intro{
  color: #212529;
  font-size: 29px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 32px;
  word-wrap: break-word;
}
  .title {
    color: #212529;
    font-size: 32px;
    font-family: Pretendard Variable;
    font-weight: 700;
    line-height: 40px;
    word-wrap: break-word;
    padding-left: 170px;
    padding-right: 170px; 
  }
  .hr{
    border-top: dashed 1px #dddddd;
  }
`;

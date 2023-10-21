import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";

const LoginGoogle = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("로그인"); 
  }, []); 
  
  const handleSuccess = (res) => {
    console.log(res);
    navigate("/login/user");
  };

  return (
    <Wrapper>
      <div className="progress-bar">
          <hr className="hr" />
      </div>
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
  font-size: 34px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 32px;
  word-wrap: break-word;
}
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
  width: 0%;
  background: #7749F8;
  transition: width 0.5s; 
}
`;

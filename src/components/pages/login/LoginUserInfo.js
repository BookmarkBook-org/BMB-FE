import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext } from 'react-router-dom';

const LoginUserInfo = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setTitle("개인정보 입력"); 
    const hrElement = document.querySelector(".hr");
    if (hrElement) {
      setTimeout(() => {
        hrElement.style.width = "33%";
      }, 10); 
    }
  }, []); 

  const onNextPage = () => {
    if (nickname.length > 1 && nickname.length < 7){
      navigate("/login/upload");
    }
  };

  return (
    <Wrapper>
      <div className="progress-bar">
        <hr className="hr" />
      </div>
      <div className="login-components">
        <div className="info-wrapper">
          <p className="login-intro">사용하실 <br />닉네임을 입력해주세요</p>
          <p className="nickname-intro">닉네임</p>
          <input
            type="text"
            className="input-nickname"
            maxLength="6"
            value = {nickname}
            onChange = {(e) => setNickname(e.target.value)}
            placeholder="2~6자의 한글만 입력 가능합니다."
          ></input>
          <button className="button-nickname" onClick={onNextPage}>
            다음 
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginUserInfo;

const Wrapper = styled.div`
.login-components{
  max-width: 375px;
  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  padding: 15px;
}
.info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login-intro{
  color: #212529;
  font-size: 34px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 32px;
  word-wrap: break-word;
  width: 100%; 
  height: 100%; 
}
.nickname-intro {
}
.input-nickname {
  background-color: #ffffff; 
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  width: 311px;
  height: 24px;
  padding: 18px;
  color: #6c757d;
}
.button-nickname{
  color: white;
  font-size: 16px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  background-color: #7749F8; 
  border-radius: 10px;
  border: 0px solid #DDDDDD;
  width: 100%; 
  height: 100%; 
  padding-left: 24px; 
  padding-right: 24px; 
  padding-top: 12px; 
  padding-bottom: 16px;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 20px;
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
`
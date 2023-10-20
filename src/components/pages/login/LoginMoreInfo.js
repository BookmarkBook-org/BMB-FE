import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";

const LoginMoreInfo = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("내 북마크 업로드"); 
    const hrElement = document.querySelector(".hr");
    if (hrElement) {
      setTimeout(() => {
        hrElement.style.width = "100%";
      }, 10); 
    }
  }, []); 

  const getLogin = () =>{
    navigate("/home");
  }

  return (
    <Wrapper>
      <div className="progress-bar">
        <hr className="hr" />
      </div>
      <div className="more-components">
        <div className="info-wrapper">
          <p className="more-intro">추가로 작성하고 싶은 <br />자기 소개를 입력해주세요</p>
          <textarea className="input-intro" placeholder="운영하고 있는 인스타그램, 링크드인, 브런치 주소를 알려주세요." />
          <button className="button-nickname" onClick={getLogin}>
            다음 
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginMoreInfo;

const Wrapper = styled.div`
.more-components{
  padding-left: 170px;
  padding-right: 170px;
  max-width: 375px;
  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  padding: 15px;
}
.more-intro{
  color: #212529;
  font-size: 30px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 32px;
  word-wrap: break-word;
  width: 100%; 
  height: 100%; 
}
.progress-bar {
  width: 100%; 
  background: #ddd; 
}
.hr {
  text-align: left;
  margin-left: 0;
  height: 4px; 
  width: 66%;
  background: #7749F8;
  transition: width 0.5s; 
}
`
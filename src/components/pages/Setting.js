import React, { useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Setting = () => {

  // 쿠키 확인 후 로그인되어있지 않으면 /login으로 리다이렉트
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedin = document.cookie.includes('loggedIn=true');
    if (!isLoggedin) {
      navigate('/login');
    }
  }, [navigate]);

  const logout = () =>{
    // 쿠키를 만료시켜버림
    document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  }
  const userDelete = () =>{
    //삭제
  }
  return (
    <Wrapper>
      <p className="title" >설정</p>
      <hr className="hr"/>
      <div className="setting-contents">
        <div className="setting-list">
          <div className="version">
            버전 확인
            <p>v. 1.0.0</p>
          </div>
          <hr />
          <div className="logout" onClick={logout}>
            로그아웃
          </div>
          <hr />
          <div className="delete" onClick={userDelete}>
            회원 탈퇴
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Setting;

const Wrapper = styled.div`
.title, .setting-contents{
  padding-left: 170px;
  padding-right: 170px;
}
.setting-contents{
  padding-left: 170px;
  padding-right: 170px;
  padding-top: 16px;
}
.title{
  color: #212529;
  font-size: 32px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 46px;
  word-wrap: break-word;
}
.setting-list{
  width: 100%; 
  height: 100%; 
  border-radius: 8px; 
  overflow: hidden; 
  border: 1px #E9ECEF solid; 
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: flex-start; 
  display: inline-flex
}
.version, .logout, .delete{
  color: #343A40;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.hr {
  border-top: dashed 1px #dddddd;
}
`
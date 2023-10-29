import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";


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
      <Helmet>
        <title>설정 - 북마크북</title>
        <meta
          name="description"
          content="북마크북 회원 정보 관리 페이지"
        />
        <meta
          name="keywords"
          content="북마크북, 프로그램 버전, 로그아웃, 회원탈퇴"
        />
        <meta
          name="og:site_name"
          content="Bookmarkbook"
        />
        <meta
          name="og:title"
          content="설정 - 북마크북"
        />
        <meta
          name="og:description"
          content="북마크북 회원 정보 관리 페이지"
        />
        <meta
          name="og:type"
          content="website"
        />
        <meta
          name="og:url"
          content="https://bookmarkbook/setting.swygbro.com"
        />
        <meta
          name="og:image"
          content="%PUBLIC_URL%/assets/images/ic_logo.png"
        />
        <meta
          name="twitter:title"
          content="설정 - 북마크북"
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

      <p className="title" >설정</p>
      <hr className="hr"/>
      <div className="setting-contents">
        <div className="setting-list">
          <div className="version">
            버전 확인
            <p className='version-num'>v. 1.0.0</p>
          </div>
          <hr className="hr-list" />
          <div className="logout" onClick={logout}>
            로그아웃
          </div>
          <hr className="hr-list" />
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
.version-num{
  color: #6C757D;
  font-size: 15px;
  font-family: 'Pret-reg';
  font-weight: 400;
  margin-top: 5px;
  margin-bottom: 5px;
}
.hr {
  border-top: dashed 1px #dddddd;
}
.hr-list {
    border: 0.5px #eeeeee solid; 
    width: 100%; 
  }
`
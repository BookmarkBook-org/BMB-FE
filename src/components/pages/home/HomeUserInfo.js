import React, { useState } from "react";
import styled from "styled-components";

const HomeUserInfo = () => {
  const [nickname, setNickname] = useState("닉네임");
  const [introduction, setIntroduction] = useState("안녕하세요.");
  return (
    <Wrapper>
      <p className="title">{nickname}</p>
      <p className="user-intro">{introduction}</p>
    </Wrapper>
  );
};

export default HomeUserInfo;

const Wrapper = styled.div`
padding-left: 170px;
padding-right: 170px;

.title{
  color: #212529;
  font-size: 36px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 52px;
  word-wrap: break-word;
}
.user-intro{
  color: #6C757D;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}
`;

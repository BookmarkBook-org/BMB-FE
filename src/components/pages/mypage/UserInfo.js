import React, { useState } from "react";
import styled from "styled-components";

const UserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("닉네임");
  const [introduction, setIntroduction] = useState("안녕하세요.");

  // 수정하기 버튼 클릭
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 수정완료
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  return (
    <Wrapper>
      {isEditing ? (
        <UserInfoMod
          onSave={handleSaveClick}
          nickname={nickname}
          introduction={introduction}
          onNicknameChange={handleNicknameChange}
          onIntroductionChange={handleIntroductionChange}
        />
      ) : (
        <div>
          <p className="title">{nickname}</p>
          <p className="user-intro">{introduction}</p>
          <button className="button-modify" onClick={handleEditClick}>수정하기</button>
        </div>
      )}
    </Wrapper>
  );
};

export default UserInfo;

// 수정 모드에서 표시될 컴포넌트
const UserInfoMod = ({ onSave, nickname, introduction, onNicknameChange, onIntroductionChange }) => {
  const handleSaveClick = () => {
    onSave();
  };

  return (
    <Wrapper>
      <p className="text-modify">닉네임</p>
      <textarea className="input-nickname" placeholder="내가 지은 닉네임" value={nickname} onChange={onNicknameChange} />
      <p>자기소개</p>
      <textarea className="input-intro" placeholder="운영하고 있는 인스타그램, 링크드인, 브런치 주소를 알려주세요." value={introduction} onChange={onIntroductionChange} />
      <button className="button-modify-set" onClick={handleSaveClick}>수정 완료</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`

.title{
  color: #212529;
  font-size: 36px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 52px;
  word-wrap: break-word;
}
.user-intro{
  color: #6C757D;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}
.input-nickname, .input-intro {
  background-color: #ffffff; 
  border-radius: 10px;
  border: 1px solid #DDDDDD;
}
.input-nickname{
  width: 100%;
  height: 50px; 
  color: #6C757D;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word
}
.input-intro{
  width: 100%;
  height: 72px; 
  color: #6C757D;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word
}
.text-modify{
  color: black;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
}
.button-modify{
  width: 200px;
  margin: 10px;
  padding-right: 12px;
  padding-left: 12px;
  background-color: #ffffff; 
  border-radius: 8px;
  border: 1px #7749F8 solid;
  justify-content: center; 
  align-items: center; 
}
.button-modify-set{
  color: white;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word
  width: 100%; 
  height: 100%; 
  padding-left: 12px; 
  padding-right: 12px; 
  padding-top: 10px; 
  padding-bottom: 10px; 
  background: #7749F8; 
  border-radius: 8px; 
  border: 0px;;
  justify-content: center; 
  align-items: center; 
  gap: 4px; 
  display: inline-flex;
}
`;

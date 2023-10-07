import React, { useState } from "react";
import styled from "styled-components";

const UserInfo = () => {
  // 보여주기 / 수정 상태
  const [isEditing, setIsEditing] = useState(false);

  // 수정하기 버튼 클릭했을 때
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 수정완료
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <Wrapper>
      {isEditing ? (
        <UserInfoMod onSave={handleSaveClick} />
      ) : (
        <div>
          <div>
            <h1>닉네임 #1</h1>
            <button onClick={handleEditClick}>수정하기</button>
          </div>
          <p>안녕하세요</p>
        </div>
      )}
    </Wrapper>
  );
};

export default UserInfo;

// 수정 모드에서 표시될 컴포넌트
const UserInfoMod = ({ onSave }) => {
  const handleSaveClick = () => {
    // 수정된 내용을 저장한 후, 부모 컴포넌트의 상태를 업데이트하여 복귀합니다.
    onSave();
  };

  return (
    <Wrapper>
      <p>닉네임</p>
      <input type="text" placeholder="내가 지은 닉네임" />
      <p>소개</p>
      <input type="text" placeholder="안녕하세요, 디자이너 이우재입니다." />
      <button onClick={handleSaveClick}>저장</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`

`
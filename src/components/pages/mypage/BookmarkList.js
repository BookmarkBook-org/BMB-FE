import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const BookmarkList = () => {
  const receivedArrayObject = useSelector((state) => state.data);
  const receivedArray = Object.values(receivedArrayObject);
  const logTest = () => {
    console.log(receivedArray);
  }
  return (
    <Wrapper>
      <div className="list-container">
        <p onClick={logTest}>hello</p>
        {receivedArray.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-info">
              <div className="item-name">{item.title}</div>
              <div className="item-num">{item.url}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
    );
};

export default BookmarkList;

const Wrapper = styled.div`
.list-container {
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  position: relative; /* 아이템 이름과 개수의 상대적인 위치 */
  width: calc(33.33% - 16px); /* 3개의 아이템을 가로로 정렬하고 간격을 조절 */
  height: 100px; 
  margin: 8px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-info {
  position: absolute; /* 드롭다운 메뉴가 열릴 때 위치를 고정 */
  left: 16px; /* 왼쪽 여백 */
  top: 50%; /* 상단 여백 */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  z-index: 1; /* 드롭다운 메뉴보다 위에 표시 */
}
.more-button {
  position: absolute;
  height: 24px;
  right: 0;
  cursor: pointer;
}

.dropdown-container {
  position: absolute;
  top: 100%; /* 드롭다운 메뉴가 아이템 아래쪽에 표시됨 */
  right: 0;
  z-index: 2;
}
`
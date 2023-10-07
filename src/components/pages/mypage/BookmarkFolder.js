import React, { useState } from "react";
import styled from "styled-components";
import FolderDropdown from "./FolderDropdown";

const items = [
  {
    id: 1,
    name: '기획, IA',
    num: 3
  },
  {
    id: 2,
    name: '개발',
    num: 2
  },
  {
    id: 3,
    name: '디자인',
    num: 3
  },
  {
    id: 4,
    name: '레퍼런스',
    num: 4
  },
  {
    id: 5,
    name: '기획, IA',
    num: 3
  },
  {
    id: 6,
    name: '기획, IA',
    num: 3
  },
  {
    id: 7,
    name: '기획, IA',
    num: 8
  }
];

const BookmarkFolder = () => {
  const [itemToggles, setItemToggles] = useState(Array(items.length).fill(false));

  const toggleItem = (index) => {
    const newToggles = [...itemToggles];
    newToggles[index] = !newToggles[index];
    setItemToggles(newToggles);
  };

  return (
    <Wrapper>
      <div className="list-container">
        {items.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-num">{item.num}</div>
            </div>
            <img src="/assets/images/more_dot.png" className="more-button" onClick={() => toggleItem(index)} />
            {itemToggles[index] && (
              <div className="dropdown-container">
                <FolderDropdown />
              </div>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
    );
};

export default BookmarkFolder;

const Wrapper = styled.div`
.list-container {
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  position: relative; /* 아이템 이름과 개수의 상대적인 위치 설정 */
  width: calc(33.33% - 16px); /* 3개의 아이템을 가로로 정렬하고 간격을 조절 */
  height: 100px; /* 원하는 높이로 조절 */
  margin: 8px; /* 아이템 간격 조절 */
  background-color: #ccc; /* 아이템 배경색 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-info {
  position: absolute; /* 드롭다운 메뉴가 열릴 때 위치를 고정 */
  left: 16px; /* 왼쪽 여백 조절 */
  top: 50%; /* 상단 여백 조절 */
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
  z-index: 2; /* 드롭다운 메뉴의 z-index 값을 높임 */
}
`
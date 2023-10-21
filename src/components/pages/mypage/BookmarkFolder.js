import React, { useState } from "react";
import styled from "styled-components";
import FolderDropdown from "./FolderDropdown";
import { useNavigate } from "react-router-dom";

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

const BookmarkFolder = ({ folder }) => {
  const navigate = useNavigate();
  const [itemToggles, setItemToggles] = useState(Array(items.length).fill(false));

  const toggleItem = (index) => {
    const newToggles = [...itemToggles];
    newToggles[index] = !newToggles[index];
    setItemToggles(newToggles);
  };

  const moveFolder = (folderName) => {
    navigate('/mypage?folder='+folderName);
  }

  return (
    <Wrapper>
      <div className="list-container">
        {items.map((item, index) => (
          <div key={index} className="list-item" onClick={()=>moveFolder(item.name)}>
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-num">총 {item.num}개의 북마크</div>
            </div>
            <img alt="folder" src="/assets/images/more_dot.png" className="more-button" onClick={() => toggleItem(index)} />
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
padding-left: 170px;
padding-right: 170px;

.list-container {
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  position: relative; 
  width: calc(33% - 16px); /* 3개의 아이템을 가로로 정렬하고 간격을 조절 */
  height: 90px; 
  margin: 8px; 
  background-color: #ffffff; 
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-info {
  position: absolute; 
  left: 16px; 
  top: 50%; /* 상단 여백 조절 */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  z-index: 1; 
  padding:10px;
  font-family: 'Pret-reg';
}
.item-name{
  padding-right: 24px;
  font-size: 16px;
  font-weight: 700;  
  font-family: 'Pret-Bold';
}
.item-num{
  padding-right: 24px;
  color: #6C757D;
  font-size: 14px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 20px;
}
.more-button {
  position: absolute;
  height: 24px;
  right: 10px;
  cursor: pointer;
}

.dropdown-container {
  position: absolute;
  top: 60%; /* 드롭다운 메뉴가 아이템 아래쪽 */
  right: 3%;
  z-index: 2; 
}
`
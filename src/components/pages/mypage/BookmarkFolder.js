import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FolderDropdown from "./FolderDropdown";
import { useNavigate } from "react-router-dom";

import { gql } from '@apollo/client';
import { client } from "../../../client";

const GET_MYPAGE = gql`
  query getAllListByParentFolderName($parent_folder_name: String!, $user_id: Float!) {
    getAllListByParentFolderName(parent_folder_name: $parent_folder_name, user_id: $user_id) {
      bookmarks {
        id
        title
        url
        parentFolderName
      }
    }
  }
`;

const BookmarkFolder = ({ items }) => {
  const navigate = useNavigate();
  const [itemToggles, setItemToggles] = useState(Array(items.length).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 레이어 상태

  const toggleItem = (index) => {
    const newToggles = [...itemToggles];
    newToggles[index] = !newToggles[index];
    setItemToggles(newToggles);

    // 드롭다운 메뉴가 열릴 때 모달 레이어를 활성화
    setIsModalOpen(true);
  };

  const closeDropdown = () => {
    // 모달 레이어를 클릭했을 때 드롭다운 메뉴를 닫고 모달 레이어 비활성화
    setItemToggles(Array(items.length).fill(false));
    setIsModalOpen(false);
  };

  const moveFolder = (folderName) => {
    navigate('/mypage?folder=' + folderName);
  };

  const [bookmarkCounts, setBookmarkCounts] = useState({});

  useEffect(() => {
    const fetchBookmarkCounts = async () => {
      const counts = {};
      for (const item of items) {
        try {
          const res = await client.query({
            query: GET_MYPAGE,
            variables: {
              parent_folder_name: item.folderName,
              user_id: 1,
            },
            fetchPolicy: 'no-cache',
          });

          const bookmarkList = res.data?.getAllListByParentFolderName.bookmarks;
          counts[item.folderName] = bookmarkList ? bookmarkList.length : 0;
        } catch (err) {
          console.log(err);
          counts[item.folderName] = 0;
        }
      }
      setBookmarkCounts(counts);
    };

    fetchBookmarkCounts();
  }, [items]);

  return (
    <Wrapper>
      <div className="list-container">
        {items && items.length > 0 && items.map((item, index) => (
          <div key={index} className="list-item" onClick={() => moveFolder(item.folderName)}>
            <div className="item-info">
              <div className="item-name">{item.folderName}</div>
              <div className="item-num">총 {bookmarkCounts[item.folderName] || 0}개의 북마크</div>
            </div>
            <img
              alt="folder"
              src="/assets/images/more_dot.png"
              className="more-button"
              onClick={(e) => {
                e.stopPropagation(); 
                toggleItem(index);
              }}
            />
            {itemToggles[index] && (
              <div className="dropdown-container">
                <FolderDropdown />
              </div>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && ( // 모달 레이어
        <div className="dropdown-background" onClick={closeDropdown}></div>
      )}
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
.dropdown-background {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); 
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dropdown-container {
  position: absolute;
  top: 60%; /* 드롭다운 메뉴가 아이템 아래쪽 */
  right: 3%;
  z-index: 2; 
}
`
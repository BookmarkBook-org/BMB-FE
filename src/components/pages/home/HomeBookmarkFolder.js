import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const HomeBookmarkFolder = ({ items }) => {

  const navigate = useNavigate();
  const moveFolder = (folderName) => {
    navigate('?folder='+folderName);
  }

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
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default HomeBookmarkFolder;

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
`
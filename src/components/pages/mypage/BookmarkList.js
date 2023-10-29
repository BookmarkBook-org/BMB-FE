import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import { gql } from '@apollo/client';
import { client } from "../../../client";

const GET_MYPAGE = gql`
  query getSharedListByParentFolderName($parent_folder_name: String!, $user_id: Float!) {
    getSharedListByParentFolderName(parent_folder_name: $parent_folder_name, user_id: $user_id) {
      bookmarks {
        id
        title
        url
        parentFolderName
      }
    }
  }
`;

const BookmarkList = ({ items }) => {

  const moveUrl = (url) => {
    window.open(url, '_blank'); 
  }

  // 날짜 계산 함수
  const getTimeGap = (a) => {

    if (a == null){
      return <p>날짜를 불러올 수 없음</p>
    }

    const date = new Date(parseInt(a));
    const now = new Date();
    const timeDifference = now - date;
    const minuteDifference = Math.floor(timeDifference / (1000 * 60));
    const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (minuteDifference < 1) {
      return <p>방금 전</p>;
    } else if (minuteDifference < 60) {
      return <p>{minuteDifference}분 전</p>;
    } else if (hourDifference < 24) {
      return <p>{hourDifference}시간 전</p>;
    } else if (dayDifference < 30) {
      return <p>{dayDifference}일 전</p>;
    } else {
      // 형식화된 날짜 문자열 사용
      const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
      return <p>{formattedDate}</p>;
    }
};

  return (
    <Wrapper>
      <div className="list-container">
      {items && items.length > 0 && items.map((item, index) => (
          <div key={index} className="list-item" onClick={() => moveUrl(item.url)}>
            <img 
              src="/assets/images/img_example_thumbnail.png" 
              className='list-thumbnail'
              alt={`Image ${index}`} 
            />
            <div className="item-info">
              <div className="item-name">{item.title}</div>
              <div className="item-date">{getTimeGap(item.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
    );
};

export default BookmarkList;

const Wrapper = styled.div`
padding-left: 170px;
padding-right: 170px;

.list-container {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  position: relative; /* 아이템 이름과 개수의 상대적인 위치 */
  width: calc(33% - 16px); /* 3개의 아이템을 가로로 정렬하고 간격을 조절 */
  height: 329px; 
  margin: 8px;
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}
.list-thumbnail {
  width:100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
.item-info {
  position: absolute; 
  bottom: 0%;
  height: 68px;
  width: 100%;
  background: #fff;
  padding: 12px;
  z-index: 1; /* 드롭다운 메뉴보다 위에 표시 */
}
.item-name{
  color: #343A40;
  font-size: 16px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-left: 24px;
}
.item-date{
  color: #6C757D;
  font-size: 14px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin-left: 24px
}
`
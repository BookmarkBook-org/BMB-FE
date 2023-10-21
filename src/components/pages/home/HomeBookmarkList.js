import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const items = [
  {
    id: 1,
    name: '네이버',
    url: 'https://www.naver.com',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  },
  {
    id: 2,
    name: '유튜브',
    url: 'https://www.youtube.com/',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  },
  {
    id: 3,
    name: '이미 push된 file .gitignore 적용하기',
    url: 'https://cjh5414.github.io/gitignore-update/',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  },
  {
    id: 3,
    name: '이미 push된 file .gitignore 적용하기',
    url: 'https://cjh5414.github.io/gitignore-update/',
    thumbnail: '/assets/images/img_example_thumbnail.png' 
  },
  {
    id: 1,
    name: '네이버',
    url: 'https://www.naver.com',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  },
  {
    id: 2,
    name: '유튜브',
    url: 'https://www.youtube.com/',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  },
  {
    id: 1,
    name: '네이버',
    url: 'https://www.naver.com',
    thumbnail: '/assets/images/img_example_thumbnail.png'  
  },
  {
    id: 2,
    name: '유튜브',
    url: 'https://www.youtube.com/',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  },
  {
    id: 3,
    name: '이미 push된 file .gitignore 적용하기',
    url: 'https://cjh5414.github.io/gitignore-update/',
    thumbnail: '/assets/images/img_example_thumbnail.png'
  }
];

const HomeBookmarkList = ({ folder }) => {

  const moveUrl = (url) => {
    window.open(url, '_blank'); 

  }
  return (
    <Wrapper>
      <div className="list-container">
      {items.map((item, index) => (
          <div key={index} className="list-item" onClick={()=>moveUrl(item.url)}>
            <img 
              src={item.thumbnail} 
              className='list-thumbnail'
              alt={`Image ${index}`} 
            />
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-date">{}일 전 추가됨</div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
    );
};

export default HomeBookmarkList;

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
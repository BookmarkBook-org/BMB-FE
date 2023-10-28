import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { gql } from '@apollo/client';
import { client } from "../../../client";

import HomeBookmarkMenu from './HomeBookmarkMenu';
import HomeBookmarkFolder from './HomeBookmarkFolder';
import HomeBookmarkList from './HomeBookmarkList';

const GET_MYPAGE = gql`
  query getAllListByParentFolderName($parent_folder_name: String!, $user_id: Float!) {
    getAllListByParentFolderName(parent_folder_name: $parent_folder_name, user_id: $user_id) {
      folders {
        id
        folderName
        parentFolderName
      }
      bookmarks {
        id
        title
        url
        parentFolderName
      }
    }
  }
`;

const GET_MYPAGE_BASE = gql`
  query getMyPage($user_id: Float!) {
    getMyPage(user_id: $user_id) {
      folders {
        id
        folderName
        parentFolderName
      }
      bookmarks {
        id
        title
        url
        parentFolderName
        createdAt
      }
    }
  }
`;

const HomeBookmarkPages = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folderName = query.get('folder') || '전체 북마크';

  const [ folderList, setFolderList ] = useState([]);
  const [ bookmarkList, setBookmarkList ] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    setLoading(true);
    if(folderName === '전체 북마크'){
      client
      .query({
        query: GET_MYPAGE_BASE,
        variables: {
          user_id: 1
        },
        fetchPolicy: 'no-cache'
      })
      .then((res) => {
        console.log(res.data?.getMyPage);
        const thisFolder = res.data?.getMyPage.folders.filter(item => item.parentFolderName === null);
        setFolderList(thisFolder);
        const thisBookmark = res.data?.getMyPage.bookmarks.filter(item => item.parentFolderName === null);
        setBookmarkList(thisBookmark);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else{
      client
      .query({
        query: GET_MYPAGE,
        variables: {
          parent_folder_name: folderName,
          user_id: 1
        },
        fetchPolicy: 'no-cache'
      })
      .then((res) => {
        console.log(res.data?.getAllListByParentFolderName);
        setFolderList(res.data?.getAllListByParentFolderName.folders);
        setBookmarkList(res.data?.getAllListByParentFolderName.bookmarks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }

  }, [folderName])

  return (
    <Wrapper>
      <Helmet>
        <title>내 북마크 - 북마크북</title>
        <meta
          name="description"
          content="북마크북 회원이 나의 북마크를 볼 수 있는 페이지"
        />
        <meta
          name="keywords"
          content="북마크북, 사용자, 열람"
        />
        <meta
          name="og:site_name"
          content="Bookmarkbook"
        />
        <meta
          name="og:title"
          content="내 북마크 - 북마크북"
        />
        <meta
          name="og:description"
          content="북마크북 회원이 나의 북마크를 볼 수 있는 페이지"
        />
        <meta
          name="og:type"
          content="website"
        />
        <meta
          name="og:url"
          content="https://bookmarkbook.swygbro.com"
        />
        <meta
          name="og:image"
          content="%PUBLIC_URL%/assets/images/ic_logo.png"
        />
        <meta
          name="twitter:title"
          content="내 북마크 - 북마크북"
        />
        <link
          rel="apple-touch-icon"
          href="%PUBLIC_URL%/assets/images/ic_logo.png"
        />
        <link
          rel="shortcut icon"
          href="%PUBLIC_URL%/assets/images/ic_logo.png"
        />
      </Helmet>

      {loading ? ( 
        <div>

        </div>
      ) : (
        <div>
      <HomeBookmarkMenu items={folderName} />
      <HomeBookmarkFolder items={folderList} />
      <HomeBookmarkList items={bookmarkList} />
      </div>
      )}
    </Wrapper>
    );
};

export default HomeBookmarkPages;

const Wrapper = styled.div`

`
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import BookmarkMenu from './BookmarkMenu';
import BookmarkFolder from './BookmarkFolder';
import BookmarkList from './BookmarkList';


const BookmarkPages = () => {
  const location = useLocation();

  // 쿼리에서 폴더 이름 가져옴 ->  폴더, 리스트 부분에 폴더이름 넘겨줌
  const query = new URLSearchParams(location.search);
  const folder = query.get('folder') || '전체 북마크';

  return (
    <Wrapper>
      <Helmet>
        <title>북마크 목록 - 북마크북</title>
        <meta
          name="description"
          content="북마크 목록을 보고 수정할 수 있는 페이지"
        />
        <meta
          name="keywords"
          content="북마크, 폴더, 링크, 커스텀"
        />
        <meta
          name="og:site_name"
          content="Bookmarkbook"
        />
        <meta
          name="og:title"
          content="북마크 목록 - 북마크북"
        />
        <meta
          name="og:description"
          content="북마크 목록을 보고 수정할 수 있는 페이지"
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
          content="북마크 목록 - 북마크북"
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

      <BookmarkMenu folder={folder} />
      <BookmarkFolder folder={folder} />
      <BookmarkList folder={folder} />
    </Wrapper>
    );
};

export default BookmarkPages;

const Wrapper = styled.div`

`
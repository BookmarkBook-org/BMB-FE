import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import HomeBookmarkMenu from './HomeBookmarkMenu';
import HomeBookmarkFolder from './HomeBookmarkFolder';
import HomeBookmarkList from './HomeBookmarkList';

const HomeBookmarkPages = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folder = query.get('folder') || '전체 북마크';

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

      <HomeBookmarkMenu folder={folder} />
      <HomeBookmarkFolder folder={folder} />
      <HomeBookmarkList folder={folder} />
    </Wrapper>
    );
};

export default HomeBookmarkPages;

const Wrapper = styled.div`

`
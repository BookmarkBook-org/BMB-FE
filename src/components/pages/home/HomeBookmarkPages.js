import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import HomeBookmarkMenu from './HomeBookmarkMenu';
import HomeBookmarkFolder from './HomeBookmarkFolder';
import HomeBookmarkList from './HomeBookmarkList';

const HomeBookmarkPages = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folder = query.get('folder') || '전체 북마크';

  return (
    <Wrapper>
      <HomeBookmarkMenu folder={folder} />
      <HomeBookmarkFolder folder={folder} />
      <HomeBookmarkList folder={folder} />
    </Wrapper>
    );
};

export default HomeBookmarkPages;

const Wrapper = styled.div`

`
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import BookmarkMenu from './BookmarkMenu';
import BookmarkFolder from './BookmarkFolder';
import BookmarkList from './BookmarkList';
import { useLocation } from 'react-router-dom';

const BookmarkPages = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folder = query.get('folder') || '전체 북마크';

  return (
    <Wrapper>
      <BookmarkMenu folder={folder} />
      <BookmarkFolder folder={folder} />
      <BookmarkList folder={folder} />
    </Wrapper>
    );
};

export default BookmarkPages;

const Wrapper = styled.div`

`
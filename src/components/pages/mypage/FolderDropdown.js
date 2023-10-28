import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { gql } from '@apollo/client';
import { client } from "../../../client";

const DELETE_FOLDER = gql`
  mutation deleteFolder($folder_id: Float!) {
    deleteFolder(folder_id: $folder_id) 
  }
`;

const FolderDropdown = ({index}) => {

  const changeView =()=>{
    console.log(index, "changeView");
  }
  const changeName =()=>{
    console.log(index, "changeName");
  }
  const removeItem =()=>{
    client 
    .mutate({
      mutation: DELETE_FOLDER,
      variables: {
       folder_id: index
      },
      fetchPolicy: 'no-cache'
    })
    .then((res) => {
      console.log(index, res.data);
      window.location.reload(); // 폴더 삭제 후 새로고침하여 목록 다시 불러옴
    })
    .catch((err) => {
      console.log(err);
    });
  }

    return (
      <Wrapper>
        <ListItem onClick={changeView}>북마크 공개</ListItem>
        <ListItem onClick={changeName}>북마크 이름 변경</ListItem>
        <ListItem onClick={removeItem}>북마크 삭제</ListItem>
      </Wrapper>
    );
};

export default FolderDropdown;

const Wrapper = styled.div`
  list-style: none;
  background-color: #ffffff; 
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  padding-top: 8px; 
  padding-bottom: 8px;
`

const ListItem = styled.li`
  padding: 15px;
  font-size: 16px;
  font-family: 'Pret-Bold';
  font-weight: 400;
  transition: background-color 0.2s; 
  color: #54595E;
  &:hover {
    background-color: #EBE5FC;
    cursor: pointer;
  }
`;
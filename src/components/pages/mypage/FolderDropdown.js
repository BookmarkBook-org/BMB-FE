import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import { gql } from '@apollo/client';
import { client } from "../../../client";

const CHANGE_FOLDER_VIEW = gql`
  mutation changeFolderStatus($folder_id: Float!) {
    changeFolderStatus(folder_id: $folder_id) 
  }
`;

const CHANGE_FOLDER_NAME = gql`
  mutation updateFolder($folder_id: Float!, $title: String!, $is_shared: Boolean!) {
    updateFolder(folder_id: $folder_id, title: $title, is_shared: $is_shared) 
  }
`;

const DELETE_FOLDER = gql`
  mutation deleteFolder($folder_id: Float!) {
    deleteFolder(folder_id: $folder_id) 
  }
`;

const FolderDropdown = ({index}) => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folderName = query.get('folder') || null;

  const changeView =()=>{
    client 
    .mutate({
      mutation: CHANGE_FOLDER_VIEW,
      variables: {
       folder_id: parseFloat(index)
      },
      fetchPolicy: 'no-cache'
    })
    .then((res) => {
      console.log(res.data?.changeFolderStatus);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const changeName =()=>{
    console.log(index, changedFolderName, folderName)
    client 
    .mutate({
      mutation: CHANGE_FOLDER_NAME,
      variables: {
       folder_id: parseFloat(index),
       title: changedFolderName,
       is_shared: false
      },
      fetchPolicy: 'no-cache'
    })
    .then((res) => {
      console.log(res.data?.updateFolder);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const removeItem =()=>{
    client 
    .mutate({
      mutation: DELETE_FOLDER,
      variables: {
       folder_id: parseFloat(index)
      },
      fetchPolicy: 'no-cache'
    })
    .then((res) => {
      window.location.reload(); // 폴더 삭제 후 새로고침하여 목록 다시 불러옴
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [changedFolderName, setChangedFolderName] = useState('');
  const openViewModal = () => {
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setViewModalOpen(false);
  };
  const handleViewModalBackgroundClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeViewModal();
    }
  };

  return (
    <Wrapper>
      <ListItem onClick={changeView}>폴더 공개</ListItem>
      <ListItem onClick={openViewModal}>폴더 이름 변경</ListItem>
      <ListItem onClick={removeItem}>폴더 삭제</ListItem>

        {isViewModalOpen && (
        <div className="modal" onClick={handleViewModalBackgroundClick}>
          <div className="modal-box">
            <div className="modal-title">
              <span className="modal-close" onClick={closeViewModal}>&times;</span>
              <p className="modal-title">폴더 이름 변경하기</p>
            </div>
            <hr />
            <div className="modal-content">
              <p>폴더 제목</p>
              <input
                className="modal-input"
                type="text"
                value={changedFolderName}
                onChange={(e) => setChangedFolderName(e.target.value)} // input url 변경 시 상태 업데이트
              />
            </div>
            <hr />
            <div className="modal-footer">
              <button className="btn-exit" onClick={closeViewModal}>취소</button>
              <button className="btn-upload" onClick={changeName}>변경하기</button>
            </div>
          </div>
        </div>
      )}  

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

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 배경 어두운 처리 */
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-title{
    font-family: 'Pret-Bold';
    color: black;
    font-size: 16px;
    font-weight: 600;
  }
  .modal-box {
    width: 388px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
  }
  .modal-title{
    padding-left: 10px;
    padding-right: 10px;
  }
  .modal-content{
    padding-left: 20px;
    padding-right: 30px;
    padding-bottom: 20px;
  }
  .modal-input {
    width: 100%; 
    height: 38px; 
    border-radius: 4px; 
    border: 1px #ced4da solid; 
    justify-content: flex-start; 
    align-items: center; 
    display: inline-flex;

    color: #212529; 
    font-size: 15px; 
    font-family: Helvetica Neue; 
    font-weight: 400; 
    line-height: 24px; 
    word-wrap: break-word;
  }
  .modal-footer{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
    float: right;
    align-items: flex-start; 
    gap: 8px; 
    display: inline-flex;
  }
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .btn-exit{
    padding-left: 16px; 
    padding-right: 16px; 
    padding-top: 10px; 
    padding-bottom: 10px; 
    background: #CED4DA; 
    border-radius: 4px; 
    border: 0px;
    justify-content: flex-start; 
    align-items: center; 
    display: flex;

    color: white;
    font-size: 16px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    line-height: 24px;
    word-wrap: break-word
  }
  .btn-upload{
    padding-left: 16px; 
    padding-right: 16px; 
    padding-top: 10px; 
    padding-bottom: 10px; 
    background: #7749F8; 
    border-radius: 4px;
    border: 0px;
    justify-content: flex-start; 
    align-items: center; 
    display: flex;

    color: white;
    font-size: 16px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    line-height: 24px;
    word-wrap: break-word
  }
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
import React, { useState } from "react";
import styled from "styled-components";

const BookmarkMenu = ({ folder }) => {

  // 모달창 부분
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModalBackgroundClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  const [inputUrl, setInputUrl] = useState(""); 
  const [inputTitle, setInputTitle] = useState("");
  
  const addBookMark = () =>{
    // inputUrl, inputTitle 서버에 저장
    closeModal();
  }

  return (
    <Wrapper>
      <p className="title">{folder}</p>
      <div>
        <button className="add-button" onClick={openModal}><p className="add-button-font">+ 북마크 추가하기</p></button>
        <button className="add-button"><p className="add-button-font">+ 폴더 추가하기</p></button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleModalBackgroundClick}>
          <div className="modal-box">
            <div className="modal-title">
              <span className="modal-close" onClick={closeModal}>&times;</span>
              <p className="modal-title">북마크 추가하기</p>
            </div>
            <hr />
            <div className="modal-content">
              <p>URL 링크</p>
              <input
                className="modal-input"
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)} // input url 변경 시 상태 업데이트
              />
              <p>메모(북마크 제목)</p>
              <input
                className="modal-input"
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)} // input 메모 변경 시 상태 업데이트
              />
            </div>
            <hr />
            <div className="modal-footer">
              <button className="btn-exit" onClick={closeModal}>취소</button>
              <button className="btn-upload" onClick={addBookMark}>업로드하기</button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default BookmarkMenu;

const Wrapper = styled.div`
  padding-left: 170px;
  padding-right: 170px;
  .title{
    color: #212529;
    font-size: 36px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    line-height: 40px;
    word-wrap: break-word;
  }
  .add-button{
    width: 130px;
    margin: 8px;
    padding-right: 12px;
    padding-left: 12px;
    background-color: #ffffff; 
    border-radius: 8px;
    border: 1px #7749F8 solid;
    justify-content: center; 
    align-items: center; 
  }
  .add-button-font{
    color: #6610F2;
    font-size: 14px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    align: center;
  }
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 배경 어두운 처리 */
    z-index: 3;
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
`;

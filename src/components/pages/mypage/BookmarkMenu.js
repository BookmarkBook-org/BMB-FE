import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setData } from "../bookmarkPage/actions";
import styled from "styled-components";

const BookmarkMenu = () => {
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

  // Redux
  const dispatch = useDispatch();
  const [myArray, setMyArray] = useState([
    {
      url: "https://www.example.com",
      title: "예시"
    },
    {
      url: "https://www.example.com",
      title: "예시"
    },
  ]);
  const [inputUrl, setInputUrl] = useState(""); 
  const [inputTitle, setInputTitle] = useState("");

  const handleDataTransfer = () => {
    // input url과 input 메모(북마크 제목) 값을 배열로 만들어서 Redux에 전달
    const bookmarkData = {
      url: inputUrl,
      title: inputTitle,
    };

    setMyArray([...myArray, bookmarkData]);
    dispatch(setData(myArray)); // Redux에 업데이트된 배열 전달
    closeModal(); 
  };

  // 사이트 타이틀 가져오기
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

  useEffect(() => {
    // URL이 변경될 때마다 타이틀 가져오기
    const fetchTitle = async () => {
      try {
        if (inputUrl) { // inputUrl이 정의되었을 때만 실행
          console.log("url changed");
          const response = await fetch(corsProxyUrl + inputUrl); // CORS 프록시를 사용하여 요청
          if (response.ok) {
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const pageTitle = doc.querySelector("title").textContent;
            setInputTitle(pageTitle);
          } else {
            setInputTitle(""); // URL이 잘못된 경우 빈 타이틀로 설정
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (inputUrl) {
      fetchTitle();
    }
  }, [inputUrl]);
  

  return (
    <Wrapper>
      <p className="title">전체 북마크</p>
      <div>
        <button className="add-button" onClick={openModal}><p className="add-button-font">+ 북마크 추가하기</p></button>
        <button className="add-button"><p className="add-button-font">+ 폴더 추가하기</p></button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleModalBackgroundClick}>
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <h2>북마크 추가하기</h2>
            <p>URL 링크</p>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)} // input url 변경 시 상태 업데이트
            />
            <p>메모(북마크 제목)</p>
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)} // input 메모 변경 시 상태 업데이트
            />
            <button onClick={closeModal}>취소</button>
            <button onClick={handleDataTransfer}>업로드하기</button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default BookmarkMenu;

const Wrapper = styled.div`
  .title{
    color: #212529;
    font-size: 36px;
    font-family: Pretendard Variable;
    font-weight: 700;
    line-height: 52px;
    word-wrap: break-word;
  }
  .add-button{
    width: 200px;
    margin: 10px;
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
    font-size: 16px;
    font-family: Pretendard Variable;
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

  .modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

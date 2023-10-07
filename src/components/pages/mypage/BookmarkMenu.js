import React, { useState } from "react";
import styled from "styled-components";

const BookmarkMenu = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalBackgroundClick = (e) => {
    // 모달 배경을 클릭했을 때 모달을 닫는 로직
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <Wrapper>
      <p>전체 북마크</p>
      <div>
        <button>북마크 추가하기</button>
        <button onClick={openModal}>폴더 추가하기</button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleModalBackgroundClick}>
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <h2>북마크 추가하기</h2>
            <p>URL 링크</p>
            <input type="text"></input>
            <p>메모(북마크 제목)</p>
            <input type="text"></input>
            <button onClick={closeModal}>취소</button>
            <button>업로드하기</button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default BookmarkMenu;

const Wrapper = styled.div`
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 배경 어두운 처리 */
  z-index: 2;
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

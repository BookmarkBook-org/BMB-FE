import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';
import { useNavigate, useOutletContext } from "react-router-dom";

const LoginBookmark = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("내 북마크 업로드"); 
    const hrElement = document.querySelector(".hr");
    if (hrElement) {
      setTimeout(() => {
        hrElement.style.width = "66%";
      }, 10); 
    }
  }, []); 

  const onDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  };

  const resetUploadedFiles = () => {
    setUploadedFiles([]); 
  }
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noKeyboard: true, // 키보드로 업로드할 수 없도록 설정
  });

  const onNextPage = () => {
    navigate("/login/more");
  };

  return (
    <Wrapper>
      <div className="progress-bar">
        <hr className="hr" />
      </div>
      <div className="upload-wrapper" >
        <p className="upload-intro">그동안 모아둔 북마크 목록을 <br />다운받은 후, 업로드해주세요.</p>
        <div className="upload" {...getRootProps()}>
          <input multiple="" type="file" {...getInputProps()} />
          <img
            className="img-upload"
            src="/assets/images/ic_upload.png"
            alt="logoImg" />
          <p className="text-upload-1">Click to upload</p>
          <p className="text-upload-2">or drag and drop</p>
          <p className="text-upload-3">html파일만 업로드 가능합니다.</p>
        </div>
        <button onClick={resetUploadedFiles}>초기화</button>
        <button onClick={onNextPage}>업로드</button>
        <div>
          <p>업로드된 파일 목록:</p>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginBookmark;

const Wrapper = styled.div`
.upload-wrapper{
  padding-left: 170px;
  padding-right: 170px;
  max-width: 375px;
  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  padding: 15px;
}
.upload-intro{
  color: #212529;
  font-size: 30px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 32px;
  word-wrap: break-word;
  width: 100%; 
  height: 100%; 
}
.upload {
  background-color: #ffffff; 
  border: 1px dashed #cccccc;
  max-width: 100%;
  width: 311px;
  height: 132px;
  color: #6c757d;

  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  padding: 24px;
}
.img-upload{
  width: 40px;
  height: 40px;
}
.text-upload-1{
  color: #7749F8;
  font-size: 20px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 1px;
  word-wrap: break-word
}
.text-upload-2{
  color: #212529;
  font-size: 20px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 1px;
  word-wrap: break-word
}
.text-upload-3{
  color: #6C757D;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 0px;
  word-wrap: break-word
}
.progress-bar {
  width: 100%; 
  background: #ddd; 
}
.hr {
  text-align: left;
  margin-left: 0;
  height: 4px; 
  width: 33%;
  background: #7749F8;
  transition: width 0.5s; 
}
`
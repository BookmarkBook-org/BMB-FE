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

  // Dropzone 설정 함수들
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
        <div {...getRootProps()}>
          <input multiple="" type="file" {...getInputProps()} />
          {uploadedFiles.length > 0 ? (
            <div className="upload-files">
            <ul>
              {uploadedFiles.map((file, index) => (
                <li className="upload-list" key={index}>
                  <img 
                    src="/assets/images/ic_wrapper.svg"
                  />
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <div className="upload">
              <img
                className="img-upload"
                src="/assets/images/ic_upload.png"
                alt="logoImg" />
              <p className="text-upload-1">Click to upload</p>
              <p className="text-upload-2">or drag and drop</p>
              <p className="text-upload-3">html파일만 업로드 가능합니다.</p>
            </div>
          )}
        </div>
        <div>
          <button className="btn-reset" onClick={resetUploadedFiles}>초기화</button>
          <button className="btn-upload" onClick={onNextPage}>업로드</button>
        </div>
        <div className="div-info">
          <p className="div-info-title">내 북마크 다운받는 법</p>
          <ol className="div-info-cont">
            <li>인터넷 창에서 북마크 바 우클릭</li>		
            <li>[북마크 관리자] 클릭</li>
            <li>[북마크 내보내기] 클릭 후, html로 저장</li>
          </ol>
        </div>
        <p className="div-info-more">* 공개하고 싶지 않은 북마크는 북마크북에서 비공개 설정이 가능합니다.</p>
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
.upload-files {
  background-color: #ffffff; 
  border: 1px dashed #cccccc;
  max-width: 100%;
  width: 311px;
  height: 132px;
  color: #6c757d;

  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  list-style: none;
  padding: 24px;
}
.upload-list{
  color: black;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 400;
  list-style: none;
  line-height: 2px;
  word-wrap: break-word;
}
.img-upload{
  width: 40px;
  height: 40px;
}
.text-upload-1{
  color: #7749F8;
  font-size: 20px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 1px;
  word-wrap: break-word
}
.text-upload-2{
  color: #212529;
  font-size: 20px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 1px;
  word-wrap: break-word
}
.text-upload-3{
  color: #6C757D;
  font-size: 14px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 0px;
  word-wrap: break-word
}
.btn-reset{ 
  width: 65px; 
  height: 100%; 
  padding-left: 8px;
  padding-right: 8px; 
  padding-top: 10px; 
  padding-bottom: 10px; 
  background: white; 
  border-radius: 8px; 
  border: 1px #7749F8 solid; 
  justify-content: center; 
  align-items: center; 
  gap: 4px; 
  display: inline-flex;
  margin: 8px;
  margin-left: 0;
  
  color: #5227CC;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word
}
.btn-upload{
  width: 238px; 
  height: 100%; 
  padding-left: 12px; 
  padding-right: 12px; 
  padding-top: 10px; 
  padding-bottom: 10px; 
  background: #7749F8; 
  border-radius: 8px; 
  border: 1px #7749F8 solid; 
  justify-content: center; 
  align-items: center; 
  gap: 4px; 
  display: inline-flex;
  margin: 8px;

  color: white;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word
}
.div-info{
  width: 100%; 
  height: 100%; 
  background: #F8F9FA; 
  border-radius: 20px; 
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: flex-start; 
  gap: 1px; 
  padding: 8px;
}
.div-info-title{
  color: #212529;
  font-size: 20px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 28px;
  word-wrap: break-word;
  padding-left: 8px;
}
.div-info-cont{
  color: #212529;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 30px;
  word-wrap: break-word
}
.div-info-more{
  color: #212529;
  font-size: 14px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 20px;
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
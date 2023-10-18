import React, { useState } from "react";
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';

const LoginUserInfo = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleNextClick = () => {
    setIsNextClicked(true);
  }
  const onDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);

    // 함
  };

  const resetUploadedFiles = () => {
    setUploadedFiles([]); // 파일 업로드 목록 초기화
  }
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noKeyboard: true, // 키보드로 업로드할 수 없도록 설정
  });

    return (
      <Wrapper>
      <p className="title">개인정보 입력</p>
      <div className="progress-bar">
        <hr className="hr" style={{ width: isNextClicked ? "75%" : "35%" }} />
      </div>
      <div className="login-components">
        {!isNextClicked ? (
          <div className="intro-wrapper">
            <p className="login-intro">사용하실 <br />닉네임을 입력해주세요</p>
            <p className="nickname-intro">닉네임</p>
            <input
              type="text"
              className="input-nickname"
              maxLength="6"
              placeholder="2~6자의 한글만 입력 가능합니다."
            ></input>
            <button className="button-nickname" onClick={handleNextClick}>
              다음
            </button>
          </div>
        ) : (
          <div className="upload-wrapper" {...getRootProps()}>
            <p className="login-intro">그동안 모아둔 북마크 목록을 <br />다운받은 후, 업로드해주세요.</p>
            <div className="upload">
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
            <button>업로드</button>
            <div>
              <p>업로드된 파일 목록:</p>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
            <div>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
    );
};

export default LoginUserInfo;

const Wrapper = styled.div`
.login-components{
  max-width: 375px;
  margin: 0 auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  padding: 15px;
}
.intro-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login-intro{
  color: #212529;
  font-size: 24px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 32px;
  word-wrap: break-word;
  width: 100%; 
  height: 100%; 
}
.nickname-intro {
}
.input-nickname {
  background-color: #ffffff; 
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  width: 311px;
  height: 24px;
  padding: 18px;
  color: #6c757d;
}
.button-nickname{
  color: white;
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 700;
  background-color: #7749F8; 
  border-radius: 10px;
  border: 0px solid #DDDDDD;
  width: 100%; 
  height: 100%; 
  padding-left: 24px; 
  padding-right: 24px; 
  padding-top: 16px; 
  padding-bottom: 16px;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 40px;
}
.upload {
  background-color: #ffffff; 
  border: 1px dashed #cccccc;
  max-width: 100%;
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
  .title {
    color: #212529;
    font-size: 32px;
    font-family: Pretendard Variable;
    font-weight: 700;
    line-height: 40px;
    word-wrap: break-word;
    padding-left: 170px;
    padding-right: 170px; 
  }
  .progress-bar {
    width: 100%; 
    background: #ddd; 
  }
  .hr {
    text-align: left;
    margin-left: 0;
    height: 4px; 
    background: linear-gradient(to right, #7749F8 0%, #7749F8 50%);
    transition: width 0.5s; 
  }
`
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as Cheerio from "cheerio";
import { client } from "../../../client";
import { gql, useQuery } from "@apollo/client";

// 여기에 북마크 리스트가 저장됨.
const bookmarks = [];

const LoginBookmark = () => {
  const GET_USER_ID = gql`
  query GetUserId {
    getUserId
  }
`;

const CREATE_FOLDER = gql`
  mutation createFolder($create_folder_input: createFolderInput!, $user_id: Float!) {
    createFolder(create_folder_input: $create_folder_input, user_id: $user_id) 
  }
`;

const CREATE_BOOKMARK = gql`
  mutation createBookmark($create_bookmark_input: createBookmarkInput!, $user_id: Float!) {
    createBookmark(create_bookmark_input: $create_bookmark_input, user_id: $user_id)
  }
`;

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();

  const { data, loading, error } =  useQuery(GET_USER_ID);
  const userId = data?.getUserId;

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
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noKeyboard: true, // 키보드로 업로드할 수 없도록 설정
  });

  const onNextPage = () => {
    console.log(userId)
    getBookmarkList();
    navigate("/login/more");
  };

  const getBookmarkList = () => {
    const file = uploadedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const htmlContent = e.target.result;
        console.log(htmlContent);
        const $ = Cheerio.load(htmlContent);

        const allFolders = $("H3");
        const folders = [...allFolders].slice(1);
        console.log(folders);

        for (const folder of folders) {
          var folderName = $(folder).text().trim();
          var parentFolderName = $(folder)
            .parent()
            .parent()
            .prev()
            .text()
            .trim();
          const isRootFolder = $(folder)
            .parent()
            .parent()
            .prev()
            .attr("personal_toolbar_folder");

          if (isRootFolder === "true") {
            parentFolderName = null;
          }

          console.log(
            "폴더 이름 :",
            folderName,
            "상위 폴더 이름 :",
            parentFolderName
          );
          client
            .mutate({
              mutation: CREATE_FOLDER,
              variables: {
                create_folder_input: {
                  folderName: folderName,
                  parentFolderName: parentFolderName,
                  isShared: true,
                },
                user_id: userId,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          }
          const bookmarks = $("A");

          for (const bookmark of bookmarks) {
            const bookmarkName = $(bookmark).text().trim() || null;
            const bookmarkUrl = $(bookmark).attr("href");
            var parentFolderName = $(bookmark)
              .parent()
              .parent()
              .prev()
              .text()
              .trim();

            const isRookFolder = $(bookmark)
              .parent()
              .parent()
              .prev()
              .attr("personal_toolbar_folder");

            if (isRookFolder === "true") {
              parentFolderName = null;
            }
            console.log(
              "북마크 이름 :",
              bookmarkName,
              "북마크 URL :",
              bookmarkUrl,
              "상위 폴더 이름 :",
              parentFolderName
            );

            client
              .mutate({
                mutation: CREATE_BOOKMARK,
                variables: {
                  create_bookmark_input: {
                    title: bookmarkName,
                    url: bookmarkUrl,
                    parentFolderName: parentFolderName,
                  },
                  user_id: userId,
                },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        };
      reader.readAsText(file);
      console.log('북마크와 폴더 정보가 저장되었습니다.');
    }
  };

  return (
    <Wrapper>
      <script
        defer
        src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
      ></script>
      <div className="progress-bar">
        <hr className="hr" />
      </div>
      <div className="upload-wrapper">
        <p className="upload-intro">
          그동안 모아둔 북마크 목록을 <br />
          다운받은 후, 업로드해주세요.
        </p>
        <div {...getRootProps()}>
          <input multiple="" type="file" {...getInputProps()} />
          {uploadedFiles.length > 0 ? (
            <div className="upload-files">
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li className="upload-list" key={index}>
                    <img src="/assets/images/ic_wrapper.svg" alt="파일" />
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
                alt="logoImg"
              />
              <p className="text-upload-1">Click to upload</p>
              <p className="text-upload-2">or drag and drop</p>
              <p className="text-upload-3">html파일만 업로드 가능합니다.</p>
            </div>
          )}
        </div>
        <div>
          <button className="btn-reset" onClick={resetUploadedFiles}>
            초기화
          </button>
          <button className="btn-upload" onClick={onNextPage}>
            업로드
          </button>
        </div>
        <div className="div-info">
          <p className="div-info-title">내 북마크 다운받는 법</p>
          <ol className="div-info-cont">
            <li>인터넷 창에서 북마크 바 우클릭</li>
            <li>[북마크 관리자] 클릭</li>
            <li>[북마크 내보내기] 클릭 후, html로 저장</li>
          </ol>
        </div>
        <p className="div-info-more">
          * 공개하고 싶지 않은 북마크는 북마크북에서 비공개 설정이 가능합니다.
        </p>
      </div>
    </Wrapper>
  );
};

export default LoginBookmark;

const Wrapper = styled.div`
  .upload-wrapper {
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
  .upload-intro {
    color: #212529;
    font-size: 30px;
    font-family: "Pret-Bold";
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
  .upload-list {
    color: black;
    font-size: 16px;
    font-family: "Pret-reg";
    font-weight: 400;
    list-style: none;
    line-height: 2px;
    word-wrap: break-word;
  }
  .img-upload {
    width: 40px;
    height: 40px;
  }
  .text-upload-1 {
    color: #7749f8;
    font-size: 20px;
    font-family: "Pret-Bold";
    font-weight: 700;
    line-height: 1px;
    word-wrap: break-word;
  }
  .text-upload-2 {
    color: #212529;
    font-size: 20px;
    font-family: "Pret-Bold";
    font-weight: 700;
    line-height: 1px;
    word-wrap: break-word;
  }
  .text-upload-3 {
    color: #6c757d;
    font-size: 14px;
    font-family: "Pret-reg";
    font-weight: 400;
    line-height: 0px;
    word-wrap: break-word;
  }
  .btn-reset {
    width: 65px;
    height: 100%;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: white;
    border-radius: 8px;
    border: 1px #7749f8 solid;
    justify-content: center;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    margin: 8px;
    margin-left: 0;

    color: #5227cc;
    font-size: 16px;
    font-family: "Pret-reg";
    font-weight: 700;
    line-height: 24px;
    word-wrap: break-word;
  }
  .btn-upload {
    width: 238px;
    height: 100%;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #7749f8;
    border-radius: 8px;
    border: 1px #7749f8 solid;
    justify-content: center;
    align-items: center;
    gap: 4px;
    display: inline-flex;
    margin: 8px;

    color: white;
    font-size: 16px;
    font-family: "Pret-reg";
    font-weight: 700;
    line-height: 24px;
    word-wrap: break-word;
  }
  .div-info {
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    border-radius: 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1px;
    padding: 8px;
  }
  .div-info-title {
    color: #212529;
    font-size: 20px;
    font-family: "Pret-Bold";
    font-weight: 700;
    line-height: 28px;
    word-wrap: break-word;
    padding-left: 8px;
  }
  .div-info-cont {
    color: #212529;
    font-size: 16px;
    font-family: "Pret-reg";
    font-weight: 400;
    line-height: 30px;
    word-wrap: break-word;
  }
  .div-info-more {
    color: #212529;
    font-size: 14px;
    font-family: "Pret-reg";
    font-weight: 400;
    line-height: 20px;
    word-wrap: break-word;
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
    background: #7749f8;
    transition: width 0.5s;
  }
`;


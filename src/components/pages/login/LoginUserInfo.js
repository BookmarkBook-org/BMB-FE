import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { redirect, useNavigate, useOutletContext } from "react-router-dom";
import { gql,  useQuery } from "@apollo/client";
import { client } from "../../../client";

const LoginUserInfo =  () => {
  const GET_USER_ID = gql`
  query GetUserId {
    getUserId
  }
`;
const UPDATE_USER_NICKNAME = gql`
  mutation UpdateUserNickname($user_id: Float!, $nickname: String!) {
    updateUserNickname(user_id: $user_id, nickname: $nickname)
  }
`;
  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();
  const [nickname, setNickname] = useState("");
  const { data, loading, error } =  useQuery(GET_USER_ID);
  const userId = data?.getUserId;


  useEffect(() => {
    setTitle("개인정보 입력");
    const hrElement = document.querySelector(".hr");
    if (hrElement) {
      setTimeout(() => {
        hrElement.style.width = "33%";
      }, 10);
    }
  }, []);
  
  const onNextPage = async() => {
    try {
      // userId를 사용하려면 이렇게 접근할 수 있습니다.
      console.log('User ID:', userId, nickname);
      if(error || userId === undefined) {
        navigate("/login");
      }

      if (nickname.length > 1 && nickname.length < 7) {

        await client
        .mutate({
          mutation: UPDATE_USER_NICKNAME,
          variables: {
            user_id: userId,
            nickname: nickname
          },
          fetchPolicy: 'no-cache'
        })
        .then((res) => {
          console.log(res.data?.updateUserNickname);
        })
        .catch((err) => {
          console.log(err);
        });

          navigate("/login/upload");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="progress-bar">
        <hr className="hr" />
      </div>
      <div className="login-components">
        <div className="info-wrapper">
          <p className="login-intro">
            사용하실 <br />
            닉네임을 입력해주세요
          </p>
          <p className="nickname-intro">닉네임</p>
          <input
            type="text"
            className="input-nickname"
            maxLength="6"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="2~6자의 한글만 입력 가능합니다."
          ></input>
          <button className="button-nickname" onClick={onNextPage}>
            다음
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginUserInfo;

const Wrapper = styled.div`
  .login-components {
    max-width: 375px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }
  .info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .login-intro {
    color: #212529;
    font-size: 34px;
    font-family: "Pret-Bold";
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
    border: 1px solid #dddddd;
    width: 311px;
    height: 24px;
    padding: 18px;
    color: #6c757d;
  }
  .button-nickname {
    color: white;
    font-size: 16px;
    font-family: "Pret-Bold";
    font-weight: 700;
    background-color: #7749f8;
    border-radius: 10px;
    border: 0px solid #dddddd;
    width: 100%;
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 12px;
    padding-bottom: 16px;
    line-height: 24px;
    word-wrap: break-word;
    margin-top: 20px;
  }
  .progress-bar {
    width: 100%;
    background: #ddd;
  }
  .hr {
    text-align: left;
    margin-left: 0;
    height: 4px;
    width: 0%;
    background: #7749f8;
    transition: width 0.5s;
  }
`;

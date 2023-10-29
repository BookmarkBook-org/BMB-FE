import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../../client";

const LoginMoreInfo = () => {
  const GET_USER_ID = gql`
    query GetUserId {
      getUserId
    }
  `;

  const WRITE_SELF_INTRO = gql`
    mutation WriteSelfIntro($user_id: Float!, $self_intro: String!) {
      writeSelfIntro(user_id: $user_id, self_intro: $self_intro)
    }
  `;

  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selfIntro, setSelfIntro] = useState("");
  const { data, loading, error } = useQuery(GET_USER_ID);
  const userId = data?.getUserId;

  useEffect(() => {
    setTitle("내 북마크 업로드");
    const hrElement = document.querySelector(".hr");
    if (hrElement) {
      setTimeout(() => {
        hrElement.style.width = "99.9%";
      }, 10);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const getLogin = () => {
    if (isCheckboxChecked) {
      client
        .mutate({
          mutation: WRITE_SELF_INTRO,
          variables: {
            user_id: userId,
            self_intro: selfIntro,
          },
          fetchPolicy: "no-cache",
        })
        .then((res) => {
          console.log(res.data?.writeSelfIntro);
        })
        .catch((err) => {
          console.log(err);
        });

      navigate("/");
      // 개인정보 설정까지 완료 시 쿠키에 저장
      Cookies.set("loggedIn", "true");
    }
  };

  return (
    <Wrapper>
      <div className="progress-bar">
        <hr className="hr" />
      </div>
      <div className="more-components">
        <div className="info-wrapper">
          <p className="more-intro">
            추가로 작성하고 싶은 <br />
            자기 소개를 입력해주세요
          </p>
          <textarea
            className="txtarea-intro"
            placeholder="운영하고 있는 인스타그램, 링크드인, 브런치 주소를 알려주세요."
            value={selfIntro}
            onChange={(e) => setSelfIntro(e.target.value)}
          />
          <div className="chkbox-agree">
            <label>
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              개인정보 수집 및 사용에 동의합니다.
            </label>
          </div>
          <button className="btn-next" onClick={getLogin}>
            완료
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginMoreInfo;

const Wrapper = styled.div`
  .more-components {
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
  .more-intro {
    color: #212529;
    font-size: 30px;
    font-family: "Pret-Bold";
    font-weight: 700;
    line-height: 32px;
    word-wrap: break-word;
    width: 100%;
    height: 100%;
  }
  .txtarea-intro {
    width: 90%;
    height: 120px;
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 7px;
    padding-bottom: 7px;
    background: white;
    border-radius: 4px;
    border: 1px #ced4da solid;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: inline-flex;

    font-family: "Pret-reg";
  }
  .chkbox-agree {
    margin-top: 28px;
    color: #212529;
    font-size: 16px;
    font-family: "Pret-reg";
    font-weight: 400;
    line-height: 24px;
    word-wrap: break-word;
  }
  .btn-next {
    width: 100%;
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-top: 16px;
    background: #7749f8;
    border-radius: 14px;
    border: 0px #ced4da solid;
    justify-content: center;
    align-items: center;
    gap: 8px;
    display: inline-flex;

    color: white;
    font-size: 16px;
    font-family: "Pret-Bold";
    font-weight: 700;
    line-height: 24px;
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
    width: 66%;
    background: #7749f8;
    transition: width 0.5s;
  }
`;

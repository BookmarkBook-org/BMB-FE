import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql } from '@apollo/client';
import { client } from "../../../client";

const GET_USERINFO = gql`
  query getUserInfo($user_id: Float!) {
    getUserInfo(user_id: $user_id) {
      id
      nickname
      selfIntroduction
    }
  }
`;

const HomeUserInfo = (props) => {

  const { user } = props;

  const [nickname, setNickname] = useState();
  const [introduction, setIntroduction] = useState();

  useEffect(() => {
    client
    .query({
      query: GET_USERINFO,
      variables: {
        user_id: user
      },
      fetchPolicy: 'no-cache'
    })
    .then((res) => {
      const thisUser = res.data?.getUserInfo;
      setNickname(thisUser.nickname);
      setIntroduction(thisUser.selfIntroduction);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [user])

  return (
    <Wrapper>
      <p className="title">{nickname}</p>
      <p className="user-intro">{introduction}</p>
    </Wrapper>
  );
};

export default HomeUserInfo;

const Wrapper = styled.div`
padding-left: 170px;
padding-right: 170px;

.title{
  color: #212529;
  font-size: 36px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 52px;
  word-wrap: break-word;
}
.user-intro{
  color: #6C757D;
  font-size: 16px;
  font-family: 'Pret-reg';
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}
`;

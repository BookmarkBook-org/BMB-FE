import React from "react";
import styled from "styled-components";
import { gql,  useQuery } from "@apollo/client";
import { client } from "../../../client";

const ALL_USERS = gql`
  query getAllUserId {
    getAllUserId
  }
`;

const HomeTitle = (props) => {

  const { data, loading, error } =  useQuery(ALL_USERS);
  const {randUser, setRandUser} = props;

  const OtherUser = () =>{
    
    const userIdList = data?.getAllUserId;
    const randomInt = userIdList[Math.floor(Math.random() * userIdList.length)];

    console.log("랜덤유저 아이디:", randomInt);
    setRandUser(randomInt);
  }

    return (
        <Wrapper>
          <p className="title">홈</p>
          <button className="btn-others" onClick={()=>OtherUser()} >
            <div className="button-cont">
              다음 유저의 북마크 보기
              <img className="img-btn-others" src="/assets/images/ic_next_btn.png" onClick={OtherUser} />
            </div>
          </button>
        </Wrapper>
    );
};

export default HomeTitle;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 170px;
padding-right: 170px;

.title{
  color: #212529;
  font-size: 32px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  word-wrap: break-word;
}
.img-btn-others{
  width: 18px; height: 18px;
}
.button-cont{
  align-items: center; 
  gap: 4px; 
  display:flex;
  justify-content: center; 
}
.btn-others{
  width: 224px; 
  height: 100%; 
  padding-left: 24px; 
  padding-right: 24px; 
  padding-top: 14px; 
  padding-bottom: 14px; 

  background: white; 
  border-radius: 8px; 
  border: 1px #7749F8 solid; 
  
  color: #6610F2;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  font-family: 'Pret-Bold';
}
`
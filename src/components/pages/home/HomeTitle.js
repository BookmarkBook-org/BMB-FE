import React from "react";
import styled from "styled-components";

const HomeTitle = (props) => {
  const {randUser, setRandUser} = props;

  const otherUser = () =>{
    const min = 1;
    const max = 10;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandUser(randomInt);
  }

    return (
        <Wrapper>
          <p className="title">홈</p>
          <button className="btn-others" onClick={()=>otherUser()} >
            <div className="button-cont">
              다음 유저의 북마크 보기
              <img className="img-btn-others" src="/assets/images/ic_next_btn.png" onClick={otherUser} />
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
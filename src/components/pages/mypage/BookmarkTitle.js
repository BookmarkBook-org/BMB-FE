import React from "react";
import styled from "styled-components";

const Title = () => {
    return (
        <Wrapper>
          <p className="title">마이페이지</p>
        </Wrapper>
    );
};

export default Title;

const Wrapper = styled.div`
padding-left: 170px;
padding-right: 170px;
.title{
  color: #212529;
  font-size: 32px;
  font-family: 'Pret-Bold';
  font-weight: 700;
  line-height: 46px;
  word-wrap: break-word;
}
`
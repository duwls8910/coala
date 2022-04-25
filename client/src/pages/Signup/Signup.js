import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    userName: '',
    profile: null,
    email: '',
    password: '',
    passwordChecked: '',
  });

  const handleInputValue = (key, e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  return (
    <>
      <AcceptDiv>
        <AcceptLogo to="/">Coala</AcceptLogo>
        <TermsBox>
          <AcceptTitle>코알라 이용약관에 모두 동의합니다</AcceptTitle>
        </TermsBox>

        <TermsBox>
          <AcceptTitle>코알라 이용약관 동의</AcceptTitle>
          <AcceptBox type="text" />
        </TermsBox>
        <TermsBox>
          <AcceptTitle>개인정보 수집 및 이용동의</AcceptTitle>
          <AcceptBox type="text" />
        </TermsBox>
        <TermsBox>
          <AcceptTitle>위치정보 이용약관 동의</AcceptTitle>
          <AcceptBox type="text" />
        </TermsBox>
        <TermsBox>
          <AcceptTitle>프로모션 정보 수신 동의</AcceptTitle>
          <AcceptBox type="text" />
        </TermsBox>
        <AcceptBtn to="/signup">확인</AcceptBtn>
      </AcceptDiv>

      {/* <SignupDiv>
      <SignLogo to="/">Coala</SignLogo>
      <InputNameBox>
        <InputTitle>이름</InputTitle>
        <InputName
          type="text"
          name="inputName"
          placeholder="이름을 입력하세요."
          onChange={e => handleInputValue('userName', e)}
        />
      </InputNameBox>

      <InputEmailBox>
        <InputTitle>이메일</InputTitle>
        <InputEmail
          type="text"
          name="inputEmail"
          placeholder="이메일을 입력하세요."
          onChange={e => handleInputValue('email', e)}
        />
      </InputEmailBox>

      <InputPasswordBox>
        <InputTitle>비밀번호</InputTitle>
        <InputPassword
          type="password"
          name="inputPassword"
          placeholder="비밀번호를 입력하세요."
          onChange={e => handleInputValue('password', e)}
        />
      </InputPasswordBox>
      <SuccesPasswordBox>
        <InputTitle>비밀번호 확인</InputTitle>
        <InputPassword
          type="password"
          name="inputPassword"
          placeholder="비밀번호를 입력하세요."
          onChange={e => handleInputValue('passwordChecked', e)}
        />
      </SuccesPasswordBox>
      <SignupBtn>회원가입</SignupBtn>
    </SignupDiv> */}
    </>
  );
}

const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 80px; */
  /* height: 100%; */
  /* margin-bottom: 80px; */
`;

const InputNameBox = styled.div`
  margin-top: 40px;
`;
const InputPasswordBox = styled.div`
  margin-top: 40px;
`;
const SuccesPasswordBox = styled.div`
  margin-top: 40px;
`;

const InputEmailBox = styled.div`
  margin-top: 40px;
`;

const InputTitle = styled.div`
  text-align: left;
  font-size: 15px;
  font-weight: bold;
`;

const InputName = styled.input`
  margin-top: 5px;
  width: 350px;
  height: 45px;
  border-color: #999999;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`;
const InputPassword = styled.input`
  margin-top: 5px;
  width: 350px;
  height: 45px;
  border-color: #999999;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`;

const InputEmail = styled.input`
  margin-top: 5px;
  width: 350px;
  height: 45px;
  border-color: #999999;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`;

const SignupBtn = styled.button`
  margin-top: 45px;
  border-radius: 10px;
  border: none;
  width: 350px;
  height: 55px;
  font-size: 20px;
  font-weight: bold;
  background-color: #555555;
  color: white;
  cursor: pointer;
`;
const SignLogo = styled(Link)`
  color: black;
  text-decoration-line: none;
  font-size: 50px;
  margin-top: 80px;
  font-weight: 600;
  font-style: italic;
  text-align: center;
  cursor: pointer;
  transition: 1s;
  /* &:hover {
    color: #555555;
  } */
`;
// Accept
const AcceptDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 80px;
  .Logo:hover {
    color: red;
  }
`;

const TermsBox = styled.div`
  margin-top: 20px;
`;

const AcceptTitle = styled.div`
  margin-bottom: 10px;
  text-align: left;
  font-size: 17px;
  font-weight: bold;
`;

const AcceptBox = styled.div`
  overflow: auto;
  margin-top: 1px;
  width: 350px;
  height: 100px;
  border: 1px solid grey;
  border-width: 1px;
`;

const AcceptBtn = styled(Link)`
  padding-top: 10px;
  text-align: center;
  margin-top: 45px;
  border-radius: 10px;
  border: none;
  width: 350px;
  height: 55px;
  font-size: 20px;
  font-weight: bold;
  background-color: #555555;
  color: white;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const AcceptLogo = styled(Link)`
  color: black;
  text-decoration-line: none;
  font-size: 50px;
  font-weight: 600;
  font-style: italic;
  text-align: center;
  cursor: pointer;
  transition: 2s;
  &:hover {
    color: #555555;
  }
`;

export default Signup;

/* <div className="fonts">아이디</div>
          <div className="fail-message hide">
            아이디는 4글자 이상이어야 합니다
          </div>
          <div className="success-message hide">사용가능한 아이디 입니다</div>
          <Input type="password" />
          <div className="fonts">비밀번호</div>
          <Input type="password" />
          <div className="fonts">비밀번호 확인</div>
          <div className="success-pw hide">비밀번호가 일치합니다</div>
          <div className="mismatch-message hide">
            비밀번호가 일치하지 않습니다
          </div> */

import { Link } from "react-router-dom";
import styled from "styled-components";
import { backgroundWhite, darkGray, lightBlueAccent, lightGreenAccent } from "../../constants/DesignConstant";
import { NodeProps } from "../../types/CommonType";


export const Container = styled.div`
  background: ${backgroundWhite}
  width: 100%;
  height: 100vh;
  padding: 25px;
  display: grid;
  place-items: center;
`;

export const CardWrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  display: grid;
  place-items: center;
  grid-template-rows: auto; 
  grid-template-columns: 1fr 1fr;
`;

export const ImageContainer = styled.div`
  background: ${lightGreenAccent};
  border-radius: 11px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const Card = styled.div`
  background-color: ${darkGray};
  border-radius: 11px;
  width: 50%;
  height: auto;
  margin: 5% 10%;
`;

export const CardContainer = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const ForgetContainer = styled.div`
  display: flex
  justify-content: start;
  align-items: left;
  .forgetpw-text{
    color: white;
    font-style: italic;
  }
`;

export const Image = styled.img<NodeProps>`
  width: ${(props) => props.imageSize ? props.imageSize : '50%'};
  height: auto;
  margin-bottom: 40px;
  // border-radius: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 40%;
  }
  @media screen and (max-width: 425px) {
    width: 50%;
  }
`;

export const Input = styled.input`
  position: relative;
  outline: none;
  border: none;
  width: 100%;
  padding: 17px;
  padding-left: 50px;
  color: grey;
  border-radius: 10px;
`;

export const Icon = styled.div`
  position: absolute;
  z-index: 999;
  color: grey;
  top: 14px;
  left: 3%;
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: ${lightBlueAccent};
  color: #000;
  margin-top: 30px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #007aec;
  }
  @media screen and (max-width: 768px) {
    width: 40%;
  }
  @media screen and (max-width: 425px) {
    width: 50%;
  }
`;

export const ErrorText = styled.small`
  color: red;
  font-weight: 500;
  padding-top: 5px;
  align-self: flex-start;
`;
export const SuccessText = styled.small`
  color: green;
  font-weight: 500;
  padding-top: 5px;
  align-self: flex-start;
`;

export const Title = styled.h2`
    color: #FFFFFF;
    font-weight: bold;
    font-size: 150%;
    margin-bottom: 30px;
    align-self: start;
`;

export const InputTitle = styled.h3`
    color: #FFFFFF;
    // font-weight: bold;
    font-size: 115%;
    text-align: left;
    width: 100%;
    padding-bottom: 10px;
`;


export const LoginLink = styled.small`
  margin-top: 20px;
  color: #98fb98;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;


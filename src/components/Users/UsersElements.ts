import styled from "styled-components";
import { backgroundWhite, lightBlueAccent } from "../../constants/DesignConstant";

// Page Body container
export const Container = styled.div`
  background-color: ${backgroundWhite};
  padding: 30px 30px 0px 30px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

export const MyTableContainer = styled.div`
  background-color: transparent;
  padding-top: 30px;
  padding-bottom: 30px;
  // width: 100%;
  height: 95vh;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormSectionContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// * Page Title
export const Title = styled.h2`
  color: #00000;
  margin: 0px 0px 10px 0px;
`;

// * Page secondary title
export const TitleH3 = styled.h3`
  margin: 0px;
  margin-bottom: 10px;
  color: #00000;
`;
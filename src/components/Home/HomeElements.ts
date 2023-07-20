import styled from "styled-components";

// Page Body container
export const Container = styled.div`
  background-color: transparent;
  padding: 30px 30px 0px 30px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
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
import styled from "styled-components";
import { backgroundWhite, lightGray } from "../../constants/DesignConstant";

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

export const OverallChartsContainer = styled.div`
  margin-top: 80px;
  padding-bottom: 100px;
`;

export const FilterDateRangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 20px;
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

export const SelectInputLabel = styled.label`
  color: #00000;
  font-size: 120%;
  // align-self: center;
  background-color: lightgrey;
  border: 1px solid lightgrey;
  padding: 15px;
  border-radius: 11px 0 0 11px;
  font-weight: bold;
`;
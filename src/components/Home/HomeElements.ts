import styled from "styled-components";
import { backgroundWhite } from "../../constants/DesignConstant";

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
export const ProgressCircleContainer = styled.div`
  height: 75%;
  width: auto;
`;
export const OverallDataContainer = styled.div`
  width: 100%;
  height: 25%;
  // background-color: lightblue;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const OverallValuesContainer = styled.div`
  width: 100%;
  border-radius: 11px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const OverallItemContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 11px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const OverallChartsContainer = styled.div`
  margin-top: 80px;
  padding-bottom: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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

export const TimeTakenTitleValue = styled.h3`
  margin: 0px;
  margin-bottom: 10px;
  color: #00000;
  font-size: 200%;
`;

export const TimeTakenTitle = styled.h3`
  margin: 0px;
  margin-bottom: 10px;
  color: #00000;
  font-size: 150%;
`;
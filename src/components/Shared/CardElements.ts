import styled from "styled-components";
import { backgroundWhite } from "../../constants/DesignConstant";
import { NodeProps } from "../../types/CommonType";

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

export const CardContainer = styled.div<NodeProps>`
  width: 100%;
  background-color: lightblue;
  border-radius: 11px;
  padding: 10px;
`;
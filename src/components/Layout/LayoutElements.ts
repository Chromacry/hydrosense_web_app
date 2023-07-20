import styled from "styled-components";
import { NodeProps } from "../../types/CommonType";
import { Link } from "react-router-dom";

export const Container = styled.div<NodeProps>`
  background-color: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 5%;
`;

export const InnerContainer = styled.div<NodeProps>`
  background-color: transparent;
  color: #fff;
  height: 70px;
  display: flex;
  flex-direction: column;
  gap: 5%;
`;
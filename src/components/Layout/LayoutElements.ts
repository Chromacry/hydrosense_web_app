import styled from "styled-components";
import { NodeProps } from "../../types/CommonType";
import { Link } from "react-router-dom";

export const Container = styled.div<NodeProps>`
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

export const SideNavContainer = styled.div<NodeProps>`
  width: 25%;
  height: 100%;
`;
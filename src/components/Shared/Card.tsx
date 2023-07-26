import { FC, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import {
  Container,
  CardContainer
} from "./CardElements";
const Card: FC<NodeProps> = ({children}) => {
  return (
    <>
      <CardContainer>
        {children}
      </CardContainer>
    </>
  );
};

export default Card;

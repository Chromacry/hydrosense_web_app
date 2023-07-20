import React, { useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import Layout from "../Layout/Layout";
import {
  Container,
  Title,
  TitleH3,
} from "./HomeElements";
import { STATUS_CODES } from "../../constants/GlobalConstant";
const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <Container>
          <Title>Dashboard</Title>
          <TitleH3>Today's Data</TitleH3>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

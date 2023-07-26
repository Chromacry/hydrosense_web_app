import { FC, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import Layout from "../Layout/Layout";
import { Bar, Doughnut, } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartJSTile,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Container,
  OverallDataContainer,
  OverallValuesContainer,
  TimeTakenTitle,
  TimeTakenTitleValue,
  Title,
  TitleH3,
  OverallItemContainer,
  ProgressCircleContainer,
  OverallChartsContainer,
} from "./HomeElements";
import { STATUS_CODES } from "../../constants/GlobalConstant";
import Card from "../Shared/Card";
import { lightGreen, lightGreenAccent } from "../../constants/DesignConstant";
import { OverallPercentageOptions, OverallPercentageData } from "./OverallPercentageChartConstant.";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartJSTile,
  Tooltip,
  Legend
);



const Home: FC = () => {
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
      label: 'Water',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Average Water Usage',
      },
    },
  };
  return (
    <>
      <Layout>
        <Container>
          <Title>Dashboard</Title>
          <TitleH3>Today's Data</TitleH3>
          <OverallDataContainer>
            <Card>
              <OverallItemContainer>
                <OverallValuesContainer>
                  <TimeTakenTitleValue>0 m3</TimeTakenTitleValue>
                  <TimeTakenTitle>Water Used</TimeTakenTitle>
                </OverallValuesContainer>
                <ProgressCircleContainer>
                  <Doughnut data={OverallPercentageData([50,50])} options={OverallPercentageOptions} />
                </ProgressCircleContainer>
              </OverallItemContainer>
            </Card>
            <Card>
              <OverallItemContainer>
                <OverallValuesContainer>
                  <TimeTakenTitleValue>0 hr</TimeTakenTitleValue>
                  <TimeTakenTitle>Time Spent</TimeTakenTitle>
                </OverallValuesContainer>
                <ProgressCircleContainer>
                  <Doughnut data={OverallPercentageData()} options={OverallPercentageOptions} />
                </ProgressCircleContainer>
              </OverallItemContainer>
            </Card>
            <Card>
              <OverallItemContainer>
                <OverallValuesContainer>
                  <TimeTakenTitleValue>$4.50</TimeTakenTitleValue>
                  <TimeTakenTitle>Estimated Cost</TimeTakenTitle>
                </OverallValuesContainer>
                <ProgressCircleContainer>
                  <Doughnut data={OverallPercentageData()} options={OverallPercentageOptions} />
                </ProgressCircleContainer>
              </OverallItemContainer>
            </Card>
          </OverallDataContainer>
          <OverallChartsContainer>
            <Card>
              <Bar
                height={200}
                data={data}
                options={options}
              />
            </Card>
            <Card>
              <Bar
              height={200}
                data={data}
                options={options}
              />
            </Card>
          </OverallChartsContainer>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

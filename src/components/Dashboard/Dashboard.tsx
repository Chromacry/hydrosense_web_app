import { FC, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import Layout from "../Layout/Layout";
import { Bar, Doughnut, Line, } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartJSTile,
  Tooltip,
  Legend,
  ChartData,
  Point,
  BubbleDataPoint,
  LineController,
  LineElement,
  PointElement,
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
} from "./DashboardElements";
import { STATUS_CODES } from "../../constants/GlobalConstant";
import Card from "../Shared/Card";
import { lightGreen, lightGreenAccent } from "../../constants/DesignConstant";
import { OverallPercentageOptions, OverallPercentageData } from "./OverallPercentageChartConstant.";
import { getOverallDashboardDataApi, getWaterUsageDataApi } from "../../services/RouteServices/DashboardApi";
import { ResponseWaterLogApiDataType, ResponseWaterLogApiType, ResponseWaterLogData, waterUsageChartBodyType } from "../../types/DashboardType";
import { convertToLocaleDate, convertToReadableDate, convertToReadableDateTime, convertToReadableTime } from "../../utils/DateTimeUtil";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartJSTile,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

const Dashboard: FC = () => {
  const [totalWaterUsage, setTotalWaterUsage] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
  
  const [waterLogData, setWaterLogData] = useState<ResponseWaterLogData[]>();

  const barAverageWaterUsageChartOptions = {
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

  const lineEstimatedCostChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Estimated Cost of Water Usage',
      },
    },
  };
  const getOverallDashboardApi = async () => {
    const currentDateNow: string = new Date().toString();
    let currentLocaleDateNow : string | null = convertToLocaleDate(currentDateNow);
    const body : waterUsageChartBodyType = {
      
      startDate: currentLocaleDateNow + ' 00:00:00' ?? '',
      endDate: currentLocaleDateNow + '24:00:00' ?? ''
    }
    await getOverallDashboardDataApi(body)
    .then((res) => {
      const responseApiData = res?.data;
      const responseData = responseApiData?.data;
      console.log(responseData);
      setTotalWaterUsage(responseData?.totalWaterUsage)
      setTotalTimeSpent(responseData?.totalTimeUsed)
      setTotalEstimatedCost(responseData?.totalEstimatedCost)
    })
    .catch((err) => console.error(err));
  }

  const getWaterUsageApi = async () => {
    const currentDateNow: string = new Date().toString();
    let currentLocaleDateNow : string | null = convertToLocaleDate(currentDateNow);
    console.log(currentLocaleDateNow);
    const body : waterUsageChartBodyType = {
      startDate: currentLocaleDateNow + ' 00:00:00' ?? '',
      endDate: currentLocaleDateNow + '24:00:00' ?? ''
    }

    await getWaterUsageDataApi(body)
    .then((res : ResponseWaterLogApiType) => {
      const responseApiData : ResponseWaterLogApiDataType = res?.data;
      const responseData : ResponseWaterLogData[] = responseApiData?.data;
      console.log(responseData);
      if (responseApiData?.status === STATUS_CODES.SUCCESS_CODE) {
        setWaterLogData(responseData);
      }
    })
  }
  


  const displayWaterUsageData = () => {
    console.log('first')
    if (waterLogData === undefined) return;
    let labels = waterLogData?.map((waterlog) => convertToReadableTime(waterlog?.created_at));
    let data = waterLogData?.map((waterlog) => waterlog?.waterUsage);
    const barWaterUsageData = {
      labels,
      datasets: [
        {
        label: 'Water Usage',
        data: data,
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
    return <Bar
    height={200}
    data={barWaterUsageData}
    options={barAverageWaterUsageChartOptions}
  />
  }
  
  const displayEstimatedCostData = () => {
    if (waterLogData === undefined) return;
    let labels = waterLogData?.map((waterlog) => convertToReadableTime(waterlog?.created_at));
    let data = waterLogData?.map((waterlog) => waterlog?.estimatedCost);
    const barWaterUsageData = {
      labels,
      datasets: [
        {
        label: `Estimated Cost`,
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1
      }
    ]
    };
    return <Line
    height={200}
    options={lineEstimatedCostChartOptions}
    data={barWaterUsageData}
  />
  }

  useEffect(() => {
    getOverallDashboardApi();
    getWaterUsageApi();
  } ,[])
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
                  <TimeTakenTitleValue>{totalWaterUsage} m3</TimeTakenTitleValue>
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
                  <TimeTakenTitleValue>{totalTimeSpent} hr</TimeTakenTitleValue>
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
                  <TimeTakenTitleValue>$ {totalEstimatedCost.toFixed(2)}</TimeTakenTitleValue>
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
              {displayWaterUsageData()}
            </Card>
            <Card>
              {displayEstimatedCostData()}
            </Card>
          </OverallChartsContainer>
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;

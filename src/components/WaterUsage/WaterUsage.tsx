import { FC, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import Layout from "../Layout/Layout";
import { Bar, Line } from 'react-chartjs-2';
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
  PointElement,
  BubbleDataPoint,
  LineElement,
} from 'chart.js';

import {
  Container,
  Title,
  TitleH3,
  OverallChartsContainer,
  SelectInputLabel,
  FilterDateRangeContainer,
} from "./WaterUsageElements";
import { STATUS_CODES } from "../../constants/GlobalConstant";
import Card from "../Shared/Card";
import { lightGreen, lightGreenAccent } from "../../constants/DesignConstant";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { convertToLocaleDate, convertToLocaleDateTime, convertToReadableTime } from "../../utils/DateTimeUtil";
import { ResponseWaterLogApiDataType, ResponseWaterLogApiType, ResponseWaterLogData, waterUsageChartBodyType } from "../../types/DashboardType";
import { getWaterUsageDataApi } from "../../services/RouteServices/DashboardApi";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ChartJSTile,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);


const WaterUsage: FC = () => {
  const [waterLogData, setWaterLogData] = useState<ResponseWaterLogData[]>();
  const [fromDateRangeValue, setFromDateRangeValue] = useState<Dayjs | null>(dayjs(new Date()));
  const [toDateRangeValue, setToDateRangeValue] = useState<Dayjs | null>(dayjs(new Date()));
  
  const onChangeFromDateRange = (newvalue : any) => {
    if (toDateRangeValue?.isBefore(dayjs(newvalue))) return setToDateRangeValue(newvalue)
    setFromDateRangeValue(newvalue)
    console.log('wwoo')
  }
  const onChangeToDateRange = (newvalue : any) => {
    if (fromDateRangeValue?.isBefore(dayjs(newvalue))) return setFromDateRangeValue(newvalue)
    setToDateRangeValue(newvalue)
    console.log('dwadwa')
  }

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

  const getWaterUsageApi = async () => {
    const currentDateNow: string = new Date().toString();
    let currentLocaleDateNow : string | null = convertToLocaleDate(currentDateNow);
    console.log(currentLocaleDateNow);
    const body : waterUsageChartBodyType = {
      startDate: convertToLocaleDateTime(fromDateRangeValue?.toString() ?? '') ?? '',
      endDate: convertToLocaleDateTime(toDateRangeValue?.toString() ?? '') ?? ''
    }

    await getWaterUsageDataApi(body)
    .then((res : ResponseWaterLogApiType) => {
      const responseApiData : ResponseWaterLogApiDataType = res?.data;
      const responseData : ResponseWaterLogData[] = responseApiData?.data;
      console.log(responseApiData);
      if (responseApiData?.status === STATUS_CODES.SUCCESS_CODE) {
        setWaterLogData(responseData);
      }
    })
  }

  const displayWaterUsageData = () => {
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
    getWaterUsageApi();
  }, [fromDateRangeValue, toDateRangeValue, ])
  return (
    <>
      <Layout>
        <Container>
          <Title>Water Usage</Title>
          {/* <SelectInputLabel>Select Device</SelectInputLabel>
          <Select
            value={0}
            label="Select Device"
            onChange={() => console.log(' dw')}
          >
            <MenuItem value={0}>All Devices</MenuItem>
            <MenuItem value={20}>Device 1</MenuItem>
            <MenuItem value={30}>Device 2</MenuItem>
          </Select> */}
          <FilterDateRangeContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="From"
                value={fromDateRangeValue}
                defaultValue={dayjs(new Date())}
                onChange={onChangeFromDateRange}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
              <DateTimePicker
                label="To"
                value={toDateRangeValue}
                defaultValue={dayjs(new Date())}
                onChange={onChangeToDateRange}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </LocalizationProvider>
          </FilterDateRangeContainer>
          <OverallChartsContainer>
            <TitleH3>Average Water Usage</TitleH3>
            <Card>
              {displayWaterUsageData()}
            </Card>
          </OverallChartsContainer>
          <OverallChartsContainer>
            <TitleH3>Estimated cost of Water Used</TitleH3>
            <Card>
              {displayEstimatedCostData()}
            </Card>
          </OverallChartsContainer>
        </Container>
      </Layout>
    </>
  );
};

export default WaterUsage;

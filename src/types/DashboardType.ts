export interface waterUsageChartBodyType {
  startDate: string;
  endDate: string;
}

//* WaterLogBy Data API
export interface ResponseWaterLogApiType {
  status: number;
  data: ResponseWaterLogApiDataType
}

export interface ResponseWaterLogApiDataType {
  message: string;
  status: number;
  data: ResponseWaterLogData[]
  isAuthorized: boolean;
}

export interface ResponseWaterLogData {
  id: string;
  device_id: string;
  flow_rate: string;
  time_used: string;
  waterUsage: number;
  estimatedCost: number;
  created_at: string;
}
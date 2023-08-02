import { waterUsageChartBodyType } from "../../types/DashboardType";
import http from "../apiServices";

export const getOverallDashboardDataApi = async (inputData : any) => {
    return await http.post("/get/overalldashboarddata", inputData)
}

export const getWaterUsageDataApi = async (inputData : waterUsageChartBodyType) => {
  return await http.post("/get/all/waterlogbydate", inputData)
}
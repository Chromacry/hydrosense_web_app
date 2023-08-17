export interface ResponseDevicesApiType {
  status: number;
  data: ResponseDevicesApiDataType
}

export interface ResponseDevicesApiDataType {
  message: string;
  status: number;
  data: ResponseDevicesData[]
  isAuthorized: boolean;
}

export interface ResponseDevicesData {
  device_id: string;
  device_name: string;
  device_serialnumber: string;
  device_location_id: string;
  household_id: string;
  created_at: string;
  actions: any;
}
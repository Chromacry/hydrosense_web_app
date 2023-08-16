export interface ResponseHouseholdsApiType {
  status: number;
  data: ResponseHouseholdsApiDataType
}

export interface ResponseHouseholdsApiDataType {
  message: string;
  status: number;
  data: ResponseHouseholdsData[]
  isAuthorized: boolean;
}

export interface ResponseHouseholdsData {
  household_id: string;
  household_address: string;
  household_name: string;
  household_postalcode: string;
  created_at: string;
}
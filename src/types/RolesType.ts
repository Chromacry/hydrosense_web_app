export interface ResponseRolesApiType {
  status: number;
  data: ResponseRolesApiDataType
}

export interface ResponseRolesApiDataType {
  message: string;
  status: number;
  data: ResponseRolesData[]
  isAuthorized: boolean;
}

export interface ResponseRolesData {
  role_id: string;
  role_name: string;
  created_at: string;
}
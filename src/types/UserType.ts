export interface ResponseUsersApiType {
  status: number;
  data: ResponseUsersApiDataType
}

export interface ResponseUsersApiDataType {
  message: string;
  status: number;
  data: ResponseUsersData[]
  isAuthorized: boolean;
}

export interface ResponseUsersData {
  user_id: string;
  email_address: string;
  username: string;
  phone_number: string;
  user_status: string;
  last_login: string;
  role_name: string;
  household_name: string;
  created_at: string;
}

export interface UserFormValues {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
}

export interface UserFormprops {
  initialUsername?: string;
  initialPassword?: string;
  initialEmail?: string;
  initialPhone?: string;
}

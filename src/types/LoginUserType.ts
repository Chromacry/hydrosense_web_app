export interface LoginUserValues {
  username?: string;
  password?: string;
  email?: string;
}

export interface LoginFormprops {
  initialUsername?: string;
  initialPassword?: string;
  initialEmail?: string;
}

export interface LoginApiBody {
  username?: string;
  userPassword?: string;
  emailAddress?: string;
}

//* Login API
export interface ResponseLoginApiType {
  status: number;
  data: ResponseLoginApiDataType
}

export interface ResponseLoginApiDataType {
  message: string;
  status: number;
  data: ResponseLoginData[]
  isAuthorized: boolean;
}

export interface ResponseLoginData {
  user_id: string;
  username: string;
  access_token: string;
  roleId: string;
  email_address: string;
}
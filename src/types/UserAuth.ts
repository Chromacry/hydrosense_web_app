export interface UserInfo {
  id: number;
  name: string;
  token: string;
}

export type UserAuthType = {
  userInfo: UserInfo;
  getUserInfo: () => UserInfo;
  saveUserInfo: (userInfo: UserInfo) => void;
  handleLogin: (username: any) => void;
  handleLogout: () => void;
  isAuth: () => boolean;
};

export const DefaultUserInfo: UserInfo = {
  id: 0,
  name: "",
  token: "",
};

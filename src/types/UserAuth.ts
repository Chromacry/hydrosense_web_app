export interface UserInfo {
  id: string;
  name: string;
  token: string;
  email: string;
  roleId: string;
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
  id: "",
  name: "",
  token: "",
  email: "",
  roleId: "",
};

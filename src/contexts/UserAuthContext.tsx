import { createContext, FC, useState } from "react";
import { NodeProps } from "../types/CommonType";
import { UserAuthType, UserInfo, DefaultUserInfo } from "../types/UserAuth";

export const UserAuthContext = createContext<UserAuthType | null>(null);

const UserAuthProvider: FC<NodeProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(DefaultUserInfo);

  const getUserInfo = () => {
    return userInfo;
  };

  const saveUserInfo = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
  };

  const handleLogin = (username: string) => {
    saveUserInfo({
      id: 1,
      name: username,
      token: "token",
    });
    // localStorage.setItem("username", userInfo.name);
  };

  const handleLogout = () => {
    setUserInfo(DefaultUserInfo);
  };

  const isAuth = (): boolean => {
    if (userInfo.name) {
      return true;
    }
    return false;
  };

  return (
    <UserAuthContext.Provider
      value={{
        userInfo,
        isAuth,
        getUserInfo,
        saveUserInfo,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;

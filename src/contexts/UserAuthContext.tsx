import { createContext, FC, useState } from "react";
import { NodeProps } from "../types/CommonType";
import { UserAuthType, UserInfo, DefaultUserInfo } from "../types/UserAuth";

export const UserAuthContext = createContext<UserAuthType | null>(null);

const UserAuthProvider: FC<NodeProps> = ({ children }) => {
  const getUserInfoFromLocal = () => {
    const oldUserAuth = JSON.parse(localStorage.getItem("hydrosenseUser") || "{}");
    return oldUserAuth;
  }
  const [userInfo, setUserInfo] = useState<UserInfo>(getUserInfoFromLocal());


  const getUserInfo = () => {
    return userInfo;
  };

  const saveUserInfo = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
  };
  
  const handleLogin = (loginUserInfo: UserInfo) => {
    saveUserInfo({
      id: loginUserInfo?.id,
      name: loginUserInfo?.name,
      token: loginUserInfo?.token,
      email: loginUserInfo?.email,
      roleId: loginUserInfo?.roleId,
    });
    localStorage.setItem("hydrosenseUser", JSON.stringify(loginUserInfo));
  };

  const handleLogout = () => {
    setUserInfo(DefaultUserInfo);
    localStorage.removeItem("hydrosenseUser");
  };

  const isAuth = (): boolean => {
    if (userInfo.token) {
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

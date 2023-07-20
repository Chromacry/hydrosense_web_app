import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserAuthContext } from "../contexts/UserAuthContext";
import { UserAuthType } from "../types/UserAuth";

const PrivateRoute = () => {
  const { isAuth } = useContext(UserAuthContext) as UserAuthType;
  const location = useLocation();

  return isAuth() ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;

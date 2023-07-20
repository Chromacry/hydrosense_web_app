import { FC, useContext, useEffect } from 'react';
import { UserAuthContext } from '../contexts/UserAuthContext';
import Routes from '../routes/Routes';
import { UserAuthType } from '../types/UserAuth';

const AppContainer: FC = () => {
  const { userInfo } = useContext(UserAuthContext) as UserAuthType;

  useEffect(() => {
    // console.log(userInfo);
  },[]);

  return(
    <>
    <Routes />
    </>
  );
};

export default AppContainer;
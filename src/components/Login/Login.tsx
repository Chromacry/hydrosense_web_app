import React, { FC, useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps } from "formik";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { UserAuthType, UserInfo } from "../../types/UserAuth";
import { TbUserCircle } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginApiBody, LoginFormprops, LoginUserValues, ResponseLoginApiDataType, ResponseLoginApiType, ResponseLoginData } from "../../types/LoginUserType";
import { STATUS_CODES } from "../../constants/GlobalConstant";

import {
    Container,
    Card,
    InputContainer,
    Icon,
    Input,
    Button,
    ErrorText,
    Title,
    InputTitle,
    Image,
    CardContainer,
    ForgetContainer,
    SuccessText,
    CardWrapperContainer,
    ImageContainer,
} from "./LoginElements";
import { loginApi } from "../../services/RouteServices/LoginApi";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';

const LogoImg = "HydroSense_logo_nobg.png";
const LoginImg = "loginIlustration.png";

const Login: FC = () => {
    const { userInfo, handleLogin } = useContext(UserAuthContext) as UserAuthType;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");

    const loginHandler = async (userEmail: string, password: string) => {
        const loginValues: LoginApiBody = {
            emailAddress: userEmail,
            userPassword: password
        }
        setOpen(true);
        await loginApi(loginValues)
        .then((res : any) => {
            const resData : ResponseLoginApiType = res;
            const resApiData : ResponseLoginApiDataType = resData?.data;
            console.log(resApiData);
            if (resApiData.status === STATUS_CODES.SUCCESS_CODE){
            if (resApiData){
                if (resApiData?.status === STATUS_CODES.SUCCESS_CODE){
                    const responseData : ResponseLoginData[] = resApiData?.data;
                    const loginUserInfo : UserInfo = {
                    id : responseData[0]?.user_id,
                    name : responseData[0]?.username,
                    email : responseData[0]?.email_address,
                    token : responseData[0]?.access_token,
                    roleId: responseData[0]?.roleId,
                }
                setSuccessText(resApiData?.message)
                handleLogin(loginUserInfo);
                setOpen(false);
                navigate("/dashboard", { replace: true });
            }
            else{
                // TODO: Show error message
                setOpen(false);
                setSuccessText("");
                setErrorText(resApiData?.message);
            }
            }

        }
        else{
            setErrorText(resApiData.message);
        }
        })
        .catch((error) => {
            console.log (error);
            // TODO: Show error message
        });
    }

    const InnerForm = (props: FormikProps<LoginUserValues>) => {
        const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
            props;
        return (
            <>
                <Container>
                    <Card>
                        <CardWrapperContainer>
                            <ImageContainer>
                                <Image src={LoginImg} imageSize='100%' />
                            </ImageContainer>
                            <form onSubmit={handleSubmit}>
                                <CardContainer>
                                    <Image src={LogoImg} alt="logo" />
                                    <Title>Welcome Back!</Title>
                                    <SuccessText>{successText}</SuccessText>
                                    <ErrorText>{errorText}</ErrorText>
                                    <InputTitle>Email</InputTitle>
                                    <InputContainer>
                                        <Icon>
                                            <TbUserCircle size={"25px"} />
                                        </Icon>
                                        <Input
                                            placeholder="Email Address"
                                            // autoFocus
                                            name="email"
                                            value={values?.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </InputContainer>
                                    <InputTitle>Password</InputTitle>
                                    <InputContainer>
                                        <Icon>
                                            <RiLockPasswordLine size={"25px"} />
                                        </Icon>
                                        <Input
                                            type={"password"}
                                            placeholder="Password"
                                            name="password"
                                            value={values?.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </InputContainer>
                                    <ForgetContainer>
                                        <Link to="/forgetpassword" className="forgetpw-text">forget password?</Link>
                                    </ForgetContainer>
                                    <Button type="submit">Login</Button>
                                </CardContainer>
                            </form>
                        </CardWrapperContainer>
                    </Card>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        // onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container>
            </>
        );
    };

    const LoginForm = withFormik<LoginFormprops, LoginUserValues>({
        mapPropsToValues: (props) => ({
            email: props.initialEmail || "",
            password: props.initialPassword || "",
        }),
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Email is required!"),
            password: Yup.string().required("Password is required!"),
        }),
        handleSubmit({ email, password }: LoginUserValues) {
            loginHandler(email as string, password as string);
        },
    })(InnerForm);

    return (
        <>
            <LoginForm />
        </>
    );
}
export default Login;

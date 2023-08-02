import { LoginApiBody } from "../../types/LoginUserType";
import http from "../apiServices";

export const loginApi = async (inputData : LoginApiBody) => {
    return await http.post("/user/login", inputData)
}
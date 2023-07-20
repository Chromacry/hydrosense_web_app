import http from "../apiServices";

export const loginApi = async (inputData : any) => {
    return await http.post("/login", inputData)
}
import http from "../apiServices";

export const getAllUsersDataApi = async (inputData : any) => {
    return await http.post("/get/all/user", inputData)
}

export const addUserDataApi = async (inputData : any) => {
    return await http.post("/user", inputData)
}

export const editUserDataApi = async (inputData : any) => {
    return await http.put('/user', inputData)
}

export const deleteUserDataApi = async (inputData : any) => {
    return await http.delete('/user', inputData)
}
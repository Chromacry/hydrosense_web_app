import http from "../apiServices";

export const getAllRolesDataApi = async (inputData : any) => {
    return await http.post("/get/all/role", inputData)
}

export const addRoleDataApi = async (inputData : any) => {
    return await http.post("/role", inputData)
}

export const editRoleDataApi = async (inputData : any) => {
    return await http.put("/role", inputData)
}

export const deleteRoleDataApi = async (inputData : any) => {
    return await http.delete("/role", inputData)
}
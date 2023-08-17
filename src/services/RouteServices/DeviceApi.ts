import http from "../apiServices";

export const getAllDevicesDataApi = async (inputData : any) => {
    return await http.post("/get/all/device", inputData)
}

export const addDeviceDataApi = async (inputData : any) => {
    return await http.post("/device", inputData)
}

export const editDeviceDataApi = async (inputData : any) => {
    return await http.put("/device", inputData)
}

export const deleteDeviceDataApi = async (inputData : any) => {
    return await http.delete("/device", inputData)
}
import http from "../apiServices";

export const getAllHouseholdsDataApi = async (inputData : any) => {
    return await http.post("/get/all/household", inputData)
}

export const addHouseholdsDataApi = async (inputData : any) => {
    return await http.post("/household", inputData)
}

export const editHouseholdsDataApi = async (inputData : any) => {
    return await http.put("/household", inputData)
}

export const deleteHouseholdsDataApi = async (inputData : any) => {
    return await http.delete("/household", inputData)
}
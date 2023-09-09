import axiosClient from "../axios/AxiosClient";
import { agencyEndPoints } from './agency.endpoints';

export const getAgencies = async () => {
    const results = await axiosClient.get(agencyEndPoints.getAgencies);
    return results?.data
}

export const getAgencyDetails = async (agencyId) => {
    const results = await axiosClient.get(agencyEndPoints.getAgencyDetails(agencyId));
    return results?.data
}
export const createAgency = async (agencyData) => {
    const results = await axiosClient.post(agencyEndPoints.createAgency, agencyData)
    return results?.data

}
export const getAgencyTypes = async () => {
    const results = await axiosClient.get(agencyEndPoints.getAgencyTypes);
    return results?.data
}

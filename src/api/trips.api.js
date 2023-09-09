import { getCookie } from "../utils/cookies";
import axiosClientFormData from "../axios/AxiosClientFormData";
import axiosClient from "../axios/AxiosClient";
import { tripEndpoints } from './trips.endpoints';

export const getFeaturedTrips = async () => {
    const results = await axiosClient.get(tripEndpoints.getFeatured);
    return results?.data
}

export const getAllTrips = async () => {
    const results = await axiosClient.get(tripEndpoints.getAllTrips);
    return results?.data
}

export const getAgencyTrips = async () => {
    const {agencyId} = getCookie("UserInfo")
    const results = await axiosClient.get(tripEndpoints.getAgencyTrips(agencyId));
    return results?.data
}

export const getTrip = async (tripId) => {
    const results = await axiosClient.get(tripEndpoints.getTrip(tripId));
    return results?.data
}

export const getTripPromotions = async () => {
    const results = await axiosClient.get(tripEndpoints.getTripPromotions);
    return results?.data
}

export const getPromotedTrips = async (promotionId) => {
    const results = await axiosClient.get(tripEndpoints.getPromotedTrips(promotionId));
    return results?.data
}

export const getTripCategories = async () => {
    const results = await axiosClient.get(tripEndpoints.getCategories);
    return results?.data
}

export const createTrip = async (tripDetails) => {
    const results = await axiosClientFormData.post(tripEndpoints.postTrip, tripDetails);
    return results?.data
}

export const updateTrip = async (tripDetails) => {
    const results = await axiosClientFormData.put(tripEndpoints.putTrip, tripDetails);
    return results?.data
}
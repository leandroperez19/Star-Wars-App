import BaseService from "./baseService"
import Starship, { AllStarships } from '../types/Starship';

const baseService = new BaseService();

export const getAllStarships = async (url: string = '/starships/') => {
    const res = await baseService.doGet<AllStarships>(url)
    if (res.error) throw new Error(res.error);
    return res.data
}

export const getStarshipById = async (id: string) => {
    const res = await baseService.doGet<Starship>(`/starships/${id}`)
    if (res.error) throw new Error(res.error);
    return res.data
}
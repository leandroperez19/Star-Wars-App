import BaseService from "./baseService"
import Planet, { AllPlanets } from '../types/Planet';

const baseService = new BaseService();

export const getAllPlanets = async (url: string = '/planets/') => {
    const res = await baseService.doGet<AllPlanets>(url)
    if (res.error) throw new Error(res.error);
    return res.data;
}

export const getPlanetById = async (id: string) => {
    const res = await baseService.doGet<Planet>(`/planets/${id}`)
    if (res.error) throw new Error(res.error);
    return res.data;
}
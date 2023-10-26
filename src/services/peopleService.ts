import Person, { AllStarships } from '../types/Person';
import BaseService from "./baseService"

const baseService = new BaseService();

export const getAllPeople = async (url: string = '/people/') => {
    const res = await baseService.doGet<AllStarships>(url)
    if (res.error) throw new Error(res.error);
    return res.data
}

export const getPeopleById = async (id: string) => {
    const res = await baseService.doGet<Person>(`/people/${id}`)
    if (res.error) throw new Error(res.error);
    return res.data
}
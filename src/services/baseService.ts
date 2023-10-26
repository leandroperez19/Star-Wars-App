import axios, { AxiosInstance, isAxiosError, AxiosError, AxiosResponse } from 'axios';
import DataResponse from '../types/DataResponse';

const base: AxiosInstance = axios.create({
    baseURL: 'https://swapi.dev/api'
});

export default class BaseService {
    private async _doRequest<T>(promise: () => Promise<AxiosResponse<any, any>>) {
        let data: T | null = null;
        let error: string | null = null;

        try {
            const res = await promise();
            data = res.data;
        } catch (e) {
            const err: AxiosError | any = e;
            error = isAxiosError(err) ? err.message : `Unknown error: ${e}`;
        }

        return { data, error };
    }

    async doGet<T>(url: string): Promise<DataResponse<T>> {
        return this._doRequest<T>(() => base.get(url))
    }
}
export default interface DataResponse<T> {
    data: T | null;
    error: string | null;
}
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpError extends Error {
    public status: number;
    public data: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'HttpError';
    }
}

export class HttpClient {
    public instance: AxiosInstance;

    constructor(baseUrl: string, timeout: number = 10000) {
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout,
        });

        this.setupInterceptors();
    }

    //interceptors for logging and error handling
    private setupInterceptors(): void {
        this.instance.interceptors.request.use(
            (config) => {
                const token = this.getAuthToken();

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                console.log(`${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(
                    `${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
                );
                return response;
            },
            (error) => {
                console.error('Response error:', error);

                if (error.response) {
                    
                    throw new HttpError(
                        error.response.data?.message || 'Request failed',
                        error.response.status,
                        error.response.data
                    );
                } else if (error.request) {
                    // Network error
                    throw new HttpError('Network error', 0);
                } else {
                    // Other error
                    throw new HttpError(error.message, 0);
                }
            }
        );
    }

    private getAuthToken(): string | null {
        //implement latter
        return null;
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(endpoint, config);
        return response.data;
    }

    async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(endpoint, data, config);
        return response.data;
    }

    async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(endpoint, data, config);
        return response.data;
    }

    async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.patch<T>(endpoint, data, config);
        return response.data;
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(endpoint, config);
        return response.data;
    }
}

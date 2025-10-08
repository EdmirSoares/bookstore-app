import { HttpClient } from './HttpCLient';

export class HttpClientFactory {
    private static instance: HttpClient;

    private static readonly BASE_URL: string = 'http://localhost:3000/api';

    static create(baseUrl: string = this.BASE_URL): HttpClient {
        if (!this.instance) {
            this.instance = new HttpClient(baseUrl);
        }
        return this.instance;
    }

    static createNew(baseUrl: string = this.BASE_URL): HttpClient {
        return new HttpClient(baseUrl);
    }
}

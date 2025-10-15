import { CategoriesApiResponse } from '../../models/CategoryApiModel';
import { HttpClientFactory } from '@/src/shared/services/Http/HttpClientFactory';
import { HttpClient } from '@/src/shared/services/Http/HttpClient';

export class CategoriesApiClient {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = HttpClientFactory.create();
    }

    async getCategories(): Promise<CategoriesApiResponse> {

        return this.httpClient.get<CategoriesApiResponse>('/books/categories');
    }
}

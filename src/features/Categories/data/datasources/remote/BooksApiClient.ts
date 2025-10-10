
import { HttpClient } from '@/src/shared/services/Http/HttpClient';
import { BookApiModel } from '../../models/BookApiModel';
import { HttpClientFactory } from '@/src/shared/services/Http/HttpClientFactory';

export class BooksApiClient {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = HttpClientFactory.create();
    }

    async getBooks(): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>('/books/listar');
    }

    async getBooksById(id: string): Promise<BookApiModel> {
        return this.httpClient.get<BookApiModel>(`/books/${id}`);
    }

    async createBook(book: Omit<BookApiModel, 'id'>): Promise<BookApiModel> {
        return this.httpClient.post<BookApiModel>('/books/adicionar', book);
    }

    async updateBook(id: string, book: Partial<BookApiModel>): Promise<BookApiModel> {
        return this.httpClient.put<BookApiModel>(`/books/${id}`, book);
    }

    async deleteBook(id: string): Promise<void> {
        return this.httpClient.delete<void>(`/books/${id}`);
    }

    async getBooksWithPagination(page: number = 1, limit: number = 10): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>('/books', {
            params: { page, limit }
        });
    }

    async searchBooks(query: string): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>('/books/search', {
            params: { q: query }
        });
    }

    async getBooksByCategory(categoryId: string): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>(`/books/category/${categoryId}`);
    }
}
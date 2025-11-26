import { HttpClient } from '@/src/shared/services/Http/HttpClient';
import { BookApiModel } from '../../models/BookApiModel';
import { HttpClientFactory } from '@/src/shared/services/Http/HttpClientFactory';
import { ExpoFileUpload, createFormDataFile } from '@/src/shared/types/file-upload';

export class BooksApiClient {
    private httpClient: HttpClient;
    private uploadClient: HttpClient;

    constructor() {
        this.httpClient = HttpClientFactory.create();
        this.uploadClient = HttpClientFactory.createUploadClient();
    }

    async getBooks(): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>('/books');
    }

    async getBooksById(id: string): Promise<BookApiModel> {
        return this.httpClient.get<BookApiModel>(`/books/${id}`);
    }

    async createBook(book: Omit<BookApiModel, 'id'>): Promise<BookApiModel> {
        return this.httpClient.post<BookApiModel>('/books', book);
    }

    async updateBook(id: string, book: Partial<BookApiModel>): Promise<BookApiModel> {
        return this.httpClient.put<BookApiModel>(`/books/${id}/stock`, book);
    }

    async deleteBook(id: string): Promise<void> {
        return this.httpClient.delete<void>(`/books/${id}`);
    }

    async getBooksWithPagination(page: number = 1, limit: number = 10): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>('/books', {
            params: { page, limit },
        });
    }

    async searchBooks(query: string): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>('/books/search', {
            params: { q: query },
        });
    }

    async getBooksByCategory(categoryId: string): Promise<BookApiModel[]> {
        return this.httpClient.get<BookApiModel[]>(`/books/category/${categoryId}`);
    }

    async uploadBookCover(bookId: string, file: ExpoFileUpload): Promise<void> {
        const formData = new FormData();

        const fileToUpload = createFormDataFile(file, `book-cover-${bookId}.jpg`);

        formData.append('coverImage', fileToUpload as any);

        return this.uploadClient.post<void>(`/api/books/${bookId}/cover`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

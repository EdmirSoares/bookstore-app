import { BookRepository } from '../../../books/domain/repositories/BookRepository';
import { BooksApiClient } from '../../../books/data/datasources/remote/BooksApiClient';
import { BookRepositoryImpl } from '../../../books/data/repositories/BookRepositoryImpl';

export class HomeFactory {
    private static bookRepository: BookRepository | null = null;
    private static booksApiClient: BooksApiClient | null = null;

    static getBooksApiClient(): BooksApiClient {
        if (!this.booksApiClient) {
            this.booksApiClient = new BooksApiClient();
        }
        return this.booksApiClient;
    }

    static getBookRepository(): BookRepository {
        if (!this.bookRepository) {
            this.bookRepository = new BookRepositoryImpl(this.getBooksApiClient());
        }
        return this.bookRepository!;
    }

}
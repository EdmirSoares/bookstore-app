import { Book } from '../../domain/entities/Book';
import { BookRepository } from '../../domain/repositories/BookRepository';
import { BooksApiClient } from '../datasources/remote/BooksApiClient';
import { BookMapper } from '../mappers/BookMapper';

export class BookRepositoryImpl implements BookRepository {
    constructor(
        private apiClient: BooksApiClient,
        private mapper: BookMapper = new BookMapper()
    ) {}

    async getBooks(): Promise<Book[]> {
        const apiBooks = await this.apiClient.getBooks();
        return apiBooks.map(this.mapper.toDomain);
    }

    async getBookById(id: string): Promise<Book | null> {
        try {
            const apiBook = await this.apiClient.getBooksById(id);
            return this.mapper.toDomain(apiBook);
        } catch (error) {
            return null;
        }
    }

    async createBook(book: Omit<Book, 'id'>): Promise<Book> {
        const apiBook = this.mapper.toApi(book as Book);
        const createdApiBook = await this.apiClient.createBook(apiBook);
        return this.mapper.toDomain(createdApiBook);
    }

    async updateBook(id: string, book: Partial<Book>): Promise<Book> {
        const apiBook = this.mapper.toApiPartial(book);
        const updatedApiBook = await this.apiClient.updateBook(id, apiBook);
        return this.mapper.toDomain(updatedApiBook);
    }

    async deleteBook(id: string): Promise<void> {
        await this.apiClient.deleteBook(id);
    }
}
import { Book } from '../../../books/domain/entities/Book';
import { BookRepository } from '../../../books/domain/repositories/BookRepository';
import { ExpoFileUpload } from '@/src/shared/types/file-upload';

export class ManageBooksUseCase {
    constructor(private bookRepository: BookRepository) {}

    async getAllBooks(): Promise<Book[]> {
        return await this.bookRepository.getBooks();
    }

    async createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
        return await this.bookRepository.createBook(bookData);
    }

    async uploadBookCover(bookId: string, coverImage: ExpoFileUpload): Promise<void> {
        return await this.bookRepository.uploadBookCover(bookId, coverImage);
    }

    async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
        return await this.bookRepository.updateBook(id, bookData);
    }

    async deleteBook(id: string): Promise<void> {
        return await this.bookRepository.deleteBook(id);
    }

    async getBooksByCategory(category: string): Promise<Book[]> {
        const books = await this.bookRepository.getBooks();
        return books.filter(book => book.gender === category);
    }

    async getBooksCategories(): Promise<string[]> {
        const books = await this.bookRepository.getBooks();
        const categories = books.map(book => book.gender);
        
        return [...new Set(categories)].filter(category => category.trim() !== '');
    }

}
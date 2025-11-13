import { BookApiModel } from '../../data/models/BookApiModel';
import { Book } from '../entities/Book';
import { BookRepository } from '../repositories/BookRepository';

export class GetBooksUseCase {
    constructor(private bookRepository: BookRepository) {}

    async execute(): Promise<Book[]> {
        const books = await this.bookRepository.getBooks();
        return books;
    }

    async update(id: string, book: Partial<BookApiModel>): Promise<any> {
        const bookResponse = await this.bookRepository.updateBook(id, book);
        return bookResponse;
    }

    async delete(id: string): Promise<any> {
        const book = await this.bookRepository.deleteBook(id);
        return book;
    }

    async create(
        book: Omit<BookApiModel, 'id' | 'coverImage' | 'createdAt' | 'updatedAt'>
    ): Promise<BookApiModel> {
        const bookCreate = await this.bookRepository.createBook(book);
        return bookCreate;
    }
}

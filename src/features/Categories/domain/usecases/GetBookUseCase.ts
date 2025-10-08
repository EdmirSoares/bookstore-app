import { Book } from '../entities/Book';
import { BookRepository } from '../repositories/BookRepository';

export class GetBooksUseCase {
    constructor(private bookRepository: BookRepository) {}

    async execute(): Promise<Book[]> {
        const books = await this.bookRepository.getBooks();
        
        return books.filter((book) => book.isAvailable);
    }
}

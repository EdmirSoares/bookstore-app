import { Book } from '../entities/Book';

export interface BookRepository {
  getBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  createBook(book: Omit<Book, 'id'>): Promise<Book>;
  updateBook(id: string, book: Partial<Book>): Promise<Book>;
  deleteBook(id: string): Promise<void>;
}
import { Book } from '../entities/Book';
import { ExpoFileUpload } from '@/src/shared/types/file-upload';

export interface BookRepository {
  getBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  createBook(book: Omit<Book, 'id'| 'coverImage' | 'createdAt'|'updatedAt'>): Promise<Book>;
  uploadBookCover(bookId: string, coverImage: ExpoFileUpload): Promise<void>;
  updateBook(id: string, book: Partial<Book>): Promise<Book>;
  deleteBook(id: string): Promise<void>;
}
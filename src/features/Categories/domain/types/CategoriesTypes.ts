import { Book } from '../../../books/domain/entities/Book';

export interface CategoriesActions {
    filterByCategory: (category: string) => Promise<Book[]>;
    getAvailableBooks: () => Promise<Book[]>;
    getRentedBooks: () => Promise<Book[]>;
}
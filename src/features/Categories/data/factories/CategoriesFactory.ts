import { BookRepository } from '../../../books/domain/repositories/BookRepository';
import { BooksApiClient } from '../../../books/data/datasources/remote/BooksApiClient';
import { BookRepositoryImpl } from '../../../books/data/repositories/BookRepositoryImpl';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { CategoriesApiClient } from '../datasources/remote/CategoriesApiClient';
import { CategoryRepositoryImpl } from '../repositories/CategoryRepositoryImpl';

export class CategoriesFactory {
    private static bookRepository: BookRepository | null = null;
    private static booksApiClient: BooksApiClient | null = null;
    private static categoryRepository: CategoryRepository | null = null;
    private static categoriesApiClient: CategoriesApiClient | null = null;

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

    static getCategoriesApiClient(): CategoriesApiClient {
        if (!this.categoriesApiClient) {
            this.categoriesApiClient = new CategoriesApiClient();
        }
        return this.categoriesApiClient;
    }

    static getCategoryRepository(): CategoryRepository {
        if (!this.categoryRepository) {
            this.categoryRepository = new CategoryRepositoryImpl(this.getCategoriesApiClient());
        }
        return this.categoryRepository!;
    }
}
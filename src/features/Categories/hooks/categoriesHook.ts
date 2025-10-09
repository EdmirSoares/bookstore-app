import { useCallback, useEffect, useState } from 'react';
import { GetBooksUseCase } from '../domain/usecases/GetBookUseCase';
import { Book } from '../domain/entities/Book';
import { BookRepositoryImpl } from '../data/repositories/BookRepositoryImpl';
import { BooksApiClient } from '../data/datasources/remote/BooksApiClient';

const CategoriesHook = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const booksApiClient = new BooksApiClient();
    const bookRepository = new BookRepositoryImpl(booksApiClient);
    const getBooksUseCase = new GetBooksUseCase(bookRepository);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const availableBooks = await getBooksUseCase.execute();
            setBooks(availableBooks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const refetch = useCallback(() => {
        fetchBooks();
    }, [fetchBooks]);

    return {
        books,
        loading,
        error,
        refetch
    };
};

export default CategoriesHook;

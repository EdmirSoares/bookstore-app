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

    const createBook = useCallback(async (newBook: Omit<Book, 'id'>) => {
        try {
            setLoading(true);
            setError(null);
            const createdBook = await getBooksUseCase.create(newBook);
            setBooks((prevBooks) => [...prevBooks, createdBook]);
            return createdBook;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create book';
            setError(errorMessage);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, []);

    const updateBook = useCallback(async (id: string, updatedFields: Partial<Book>) => {
        try {
            setLoading(true);
            setError(null);
            const updatedBook = await getBooksUseCase.update(id, updatedFields);
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id.toString() === id ? updatedBook : book))
            );
            return updatedBook;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update book';
            setError(errorMessage);
            throw err; // Re-throw the error so it bubbles up
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteBook = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await getBooksUseCase.delete(id);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id.toString() !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete book';
            setError(errorMessage);
            throw err; // Re-throw the error so it bubbles up
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        //fetchBooks();
    }, [fetchBooks]);

    const refetch = useCallback(() => {
        fetchBooks();
    }, [fetchBooks]);

    return {
        books,
        loading,
        error,
        refetch,
        createBook,
        updateBook,
        deleteBook,
    };
};

export default CategoriesHook;

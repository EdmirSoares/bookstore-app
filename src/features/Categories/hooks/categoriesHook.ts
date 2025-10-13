import { useCallback, useEffect, useState, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GetBooksUseCase } from '../domain/usecases/GetBookUseCase';
import { Book } from '../domain/entities/Book';
import { BookRepositoryImpl } from '../data/repositories/BookRepositoryImpl';
import { BooksApiClient } from '../data/datasources/remote/BooksApiClient';

const CategoriesHook = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { getBooksUseCase } = useMemo(() => {
        const booksApiClient = new BooksApiClient();
        const bookRepository = new BookRepositoryImpl(booksApiClient);
        const getBooksUseCase = new GetBooksUseCase(bookRepository);
        return { getBooksUseCase };
    }, []);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const availableBooks = await getBooksUseCase.execute();
            console.log('Fetched books:', availableBooks);
            setBooks(availableBooks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, [getBooksUseCase]);

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
    }, [getBooksUseCase]);

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
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getBooksUseCase]);

    const deleteBook = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await getBooksUseCase.delete(id);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id.toString() !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete book';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getBooksUseCase]);

    // Usar useFocusEffect para garantir que fetchBooks seja chamado sempre que a tela receber foco
    useFocusEffect(
        useCallback(() => {
            fetchBooks();
        }, [fetchBooks])
    );

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

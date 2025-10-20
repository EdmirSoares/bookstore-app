import { Book } from '@/src/features/books/domain/entities/Book';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { HomeFactory } from '../../data/factories/HomeFactory';
import { GetBooksUseCase } from '@/src/features/books/domain/usecases/GetBookUseCase';
import useCategories from '@/src/design/components/Categories/useCategories';

export const useHomePresentation = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const manageBooksUseCase = useMemo(() => {
        const bookRepository = HomeFactory.getBookRepository();
        return new GetBooksUseCase(bookRepository);
    }, []);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const availableBooks = await manageBooksUseCase.execute();

            console.log('Fetched books:', availableBooks);

            setBooks(availableBooks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, [manageBooksUseCase]);

    useFocusEffect(
        useCallback(() => {
            fetchBooks();
        }, [fetchBooks])
    );

    return {
        books,
        loading,
        error,
        fetchBooks,
    };
};

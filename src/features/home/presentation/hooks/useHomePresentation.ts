import { Book } from '@/src/features/books/domain/entities/Book';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HomeFactory } from '../../data/factories/HomeFactory';
import { GetBooksUseCase } from '@/src/features/books/domain/usecases/GetBookUseCase';
import { useCategoriesStore } from '@/src/shared/stores/categoriesStore';

export const useHomePresentation = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    
    const currentFilter = useCategoriesStore((state) => state.currentFilter);

    const manageBooksUseCase = useMemo(() => {
        const bookRepository = HomeFactory.getBookRepository();
        return new GetBooksUseCase(bookRepository);
    }, []);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const availableBooks = await manageBooksUseCase.execute();

            setBooks(availableBooks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, [manageBooksUseCase]);

    useEffect(() => {
        
        const filtered = books.filter((book) => {
            if (!currentFilter || currentFilter.key === "ALL") {
                return true;
            }
            return book.gender === currentFilter.name;
        });
        
        setFilteredBooks(filtered);
    }, [currentFilter, books]);

    useFocusEffect(
        useCallback(() => {
            fetchBooks();
        }, [fetchBooks])
    );

    return {
        filteredBooks,
        loading,
        error,
        fetchBooks,
    };
};

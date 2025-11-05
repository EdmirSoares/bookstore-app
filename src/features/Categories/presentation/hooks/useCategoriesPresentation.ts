import { useCallback, useState, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Book } from '../../../books/domain/entities/Book';
import { ManageBooksUseCase } from '../../domain/usecases/ManageBooksUseCase';
import { CategoriesFactory } from '../../data/factories/CategoriesFactory';
import { useCategoriesStore } from '@/src/shared/stores/categoriesStore';

export const useCategoriesPresentation = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { 
        categories, 
        loading: categoriesLoading, 
        error: categoriesError, 
        fetchCategories 
    } = useCategoriesStore();

    const manageBooksUseCase = useMemo(() => {
        const bookRepository = CategoriesFactory.getBookRepository();
        return new ManageBooksUseCase(bookRepository);
    }, []);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const availableBooks = await manageBooksUseCase.getAllBooks();
            console.log('Fetched books:', availableBooks);
            setBooks(availableBooks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, [manageBooksUseCase]);

    const createBook = useCallback(
        async (newBook: Omit<Book, 'id'>) => {
            try {
                setLoading(true);
                setError(null);
                const createdBook = await manageBooksUseCase.createBook(newBook);
                setBooks((prevBooks) => [...prevBooks, createdBook]);
                return createdBook;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to create book';
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [manageBooksUseCase]
    );

    const updateBook = useCallback(
        async (id: string, updatedFields: Partial<Book>) => {
            try {
                setLoading(true);
                setError(null);
                const updatedBook = await manageBooksUseCase.updateBook(id, updatedFields);
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
        },
        [manageBooksUseCase]
    );

    const deleteBook = useCallback(
        async (id: string) => {
            try {
                setLoading(true);
                setError(null);
                await manageBooksUseCase.deleteBook(id);
                setBooks((prevBooks) => prevBooks.filter((book) => book.id.toString() !== id));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to delete book';
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [manageBooksUseCase]
    );

    const getBooksByCategory = useCallback(
        async (category: string) => {
            try {
                setLoading(true);
                setError(null);
                const categoryBooks = await manageBooksUseCase.getBooksByCategory(category);
                setBooks(categoryBooks);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Failed to filter books by category';
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [manageBooksUseCase]
    );

    useFocusEffect(
        useCallback(() => {
            fetchBooks();
            fetchCategories();
        }, [fetchBooks, fetchCategories])
    );
    console.log('Categories in presentation hook:', categories);

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
        getBooksByCategory,
    };
};

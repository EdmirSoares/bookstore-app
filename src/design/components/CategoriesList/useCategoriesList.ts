import { useCategoriesPresentation } from '@/src/features/Categories/presentation/hooks/useCategoriesPresentation';
import { use, useCallback, useEffect, useMemo, useState } from 'react';
export interface CategoriesListItem {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    gender: string;
    qttEstoque: number;
    qttAlugados: number;
    rented: boolean;
    sobre: string;
}

const useCategoriesList = () => {
    const { books } = useCategoriesPresentation();

    const [currentFilter, setCurrentFilter] = useState<'all' | 'available' | 'unavailable'>('all');
    const [showAddBookModal, setShowAddBookModal] = useState(false);

    const filterFunction = useCallback((orderBy: 'all' | 'available' | 'unavailable') => {
        return (item: CategoriesListItem) => {
            if (orderBy === 'available') {
                return item.qttEstoque > item.qttAlugados;
            }
            if (orderBy === 'unavailable') {
                return item.qttEstoque === item.qttAlugados;
            }
            return true;
        };
    }, []);

    const getFilteredData = useCallback(
        (orderBy: 'all' | 'available' | 'unavailable') => {
            return books.filter(filterFunction(orderBy));
        },
        [books, filterFunction]
    );

    const handleChangeCurrentFilter = (newFilter: 'all' | 'available' | 'unavailable') => {
        setCurrentFilter(newFilter);
    };

    const handleShowAddBookModal = () => {
        setShowAddBookModal(!showAddBookModal);
    };

    const currentBooks = getFilteredData(currentFilter);

    useEffect(() => {
        console.log('Current Books:', books);
    }, [books]);

    return {
        currentBooks,
        getFilteredData,
        currentFilter,
        handleChangeCurrentFilter,
        showAddBookModal,
        handleShowAddBookModal,
        books,
    };
};

export default useCategoriesList;

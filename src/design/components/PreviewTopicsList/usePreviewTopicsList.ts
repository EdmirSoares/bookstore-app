import { Book } from '@/src/features/books/domain/entities/Book';
import { useCallback, useMemo } from 'react';

const usePreviewTopicsList = ({ orderBy, data }: { orderBy: string; data: Book[] }) => {

    const filterFunction = useCallback(
        (item: Book) => {
            if (orderBy === 'available') {
                return item.qttEstoque > item.qttAlugados;
            }
            if (orderBy === 'unavailable') {
                return item.qttEstoque === item.qttAlugados;
            }
            return true;
        },
        [orderBy]
    );

    const filteredData = useMemo(() => {
        return data.filter(filterFunction);
    }, [data, filterFunction]);

    return {
        data,
        filteredData,
    };
};

export default usePreviewTopicsList;

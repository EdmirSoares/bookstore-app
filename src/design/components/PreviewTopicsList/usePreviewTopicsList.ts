import { useCallback, useMemo } from 'react';
export interface PreviewTopicsItem {
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

const usePreviewTopicsList = ({ orderBy, data }: { orderBy: string; data: PreviewTopicsItem[] }) => {

    const filterFunction = useCallback(
        (item: PreviewTopicsItem) => {
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

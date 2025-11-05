import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useCategoriesStore } from '@/src/shared/stores/categoriesStore';

const useCategories = () => {
    const {
        categories,
        currentFilter,
        loading,
        error,
        setCurrentFilter,
        fetchCategories
    } = useCategoriesStore();

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }, [fetchCategories])
    );

    return {
        categories,
        currentFilter,
        loading,
        error,
        handleChangeCurrentFilter: setCurrentFilter,
    };
};

export default useCategories;

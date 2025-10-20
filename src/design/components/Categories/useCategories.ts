import { useCategoriesManagement } from '@/src/features/Categories';
import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { set } from 'zod';

const useCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('0');
    const { categories, handleChangeCurrentFilter } = useCategoriesManagement();

    useFocusEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].key);
        }
    });

    return {
        categories,
        handleChangeCurrentFilter,
        selectedCategory,
    };
};

export default useCategories;

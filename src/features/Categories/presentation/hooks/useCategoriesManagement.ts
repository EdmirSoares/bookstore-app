import { useCallback, useState, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Category } from '../../domain/entities/Category';
import { ManageCategoriesUseCase } from '../../domain/usecases/ManageCategoriesUseCase';
import { CategoriesFactory } from '../../data/factories/CategoriesFactory';


export const useCategoriesManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const manageCategoriesUseCase = useMemo(() => {
        const categoryRepository = CategoriesFactory.getCategoryRepository();
        return new ManageCategoriesUseCase(categoryRepository);
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const availableCategories = await manageCategoriesUseCase.getAllCategories();
            setCategories(availableCategories);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }, [manageCategoriesUseCase]);

    const getCategoryByName = useCallback(async (name: string) => {
        try {
            return await manageCategoriesUseCase.getCategoryByName(name);
        } catch (err) {
            console.error('Error getting category by name:', err);
            return undefined;
        }
    }, [manageCategoriesUseCase]);

    const getCategoryKeys = useCallback(async () => {
        try {
            return await manageCategoriesUseCase.getCategoryKeys();
        } catch (err) {
            console.error('Error getting category keys:', err);
            return [];
        }
    }, [manageCategoriesUseCase]);

    const getCategoryNames = useCallback(async () => {
        try {
            return await manageCategoriesUseCase.getCategoryNames();
        } catch (err) {
            console.error('Error getting category names:', err);
            return [];
        }
    }, [manageCategoriesUseCase]);

    const refetch = useCallback(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        refetch,
        getCategoryByName,
        getCategoryKeys,
        getCategoryNames,
    };
};
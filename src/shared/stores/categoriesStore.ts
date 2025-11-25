import { create } from 'zustand';
import { Category } from '@/src/features/categories/domain/entities/Category';
import { CategoriesFactory } from '@/src/features/categories/data/factories/CategoriesFactory';
import { ManageCategoriesUseCase } from '@/src/features/categories/domain/usecases/ManageCategoriesUseCase';

interface CategoriesState {
  categories: Category[];
  currentFilter: Category | null;
  loading: boolean;
  error: string | null;
  
  setCurrentFilter: (filter: Category | null) => void;
  fetchCategories: () => Promise<void>;
  getCategoryByName: (name: string) => Promise<Category | undefined>;
  getCategoryKeys: () => Promise<string[]>;
  getCategoryNames: () => Promise<string[]>;
  reset: () => void;
}

const initialState = {
  categories: [],
  currentFilter: null,
  loading: false,
  error: null,
};

export const useCategoriesStore = create<CategoriesState>((set, get) => {

  const categoryRepository = CategoriesFactory.getCategoryRepository();
  const manageCategoriesUseCase = new ManageCategoriesUseCase(categoryRepository);

  return {
    ...initialState,

    setCurrentFilter: (filter) => {
      console.log('Zustand: Filter changed to:', filter);
      set({ currentFilter: filter });
    },

    fetchCategories: async () => {
      const { categories } = get();
      
      if (categories.length > 0) {
        console.log('Zustand: Categories already loaded, skipping fetch');
        return;
      }

      try {
        set({ loading: true, error: null });
        console.log('Zustand: Fetching categories...');
        
        const availableCategories = await manageCategoriesUseCase.getAllCategories();
        console.log('Zustand: Fetched categories:', availableCategories);

        const allCategory = { key: "ALL", name: "Todas" };
        const categoriesWithAll = [allCategory, ...availableCategories];

        set({ 
          categories: categoriesWithAll, 
          loading: false,
          error: null,
          currentFilter: get().currentFilter || allCategory
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
        console.error('Zustand: Error fetching categories:', errorMessage);
        set({ error: errorMessage, loading: false });
      }
    },

    getCategoryByName: async (name: string) => {
      try {
        return await manageCategoriesUseCase.getCategoryByName(name);
      } catch (error) {
        console.error('Zustand: Error getting category by name:', error);
        return undefined;
      }
    },

    getCategoryKeys: async () => {
      try {
        return await manageCategoriesUseCase.getCategoryKeys();
      } catch (error) {
        console.error('Zustand: Error getting category keys:', error);
        return [];
      }
    },

    getCategoryNames: async () => {
      try {
        return await manageCategoriesUseCase.getCategoryNames();
      } catch (error) {
        console.error('Zustand: Error getting category names:', error);
        return [];
      }
    },

    reset: () => {
      set(initialState);
    },
  };
});

// Exportações do domínio de Categories
export { ManageBooksUseCase } from './domain/usecases/ManageBooksUseCase';
export { ManageCategoriesUseCase } from './domain/usecases/ManageCategoriesUseCase';
export type { Category } from './domain/entities/Category';
export type { CategoriesActions } from './domain/types/CategoriesTypes';
export { bookSchema, type BookFormData } from './domain/forms/AddBookFormSchema';

// Exportações da camada de dados
export { CategoriesFactory } from './data/factories/CategoriesFactory';
export { CategoryMapper } from './data/mappers/CategoryMapper';

// Exportações da camada de apresentação
export { useCategoriesPresentation } from './presentation/hooks/useCategoriesPresentation';
export { useCategoriesManagement } from './presentation/hooks/useCategoriesManagement';
export { useAddBookForm } from './presentation/hooks/useAddBookForm';
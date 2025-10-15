import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { Category } from '../../domain/entities/Category';
import { CategoriesApiClient } from '../datasources/remote/CategoriesApiClient';
import { CategoryMapper } from '../mappers/CategoryMapper';

export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private apiClient: CategoriesApiClient) {}

    async getCategories(): Promise<Category[]> {
        const apiResponse = await this.apiClient.getCategories();
        return CategoryMapper.arrayToDomain(apiResponse.categories);
    }
}
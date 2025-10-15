import { CategoryRepository } from '../repositories/CategoryRepository';
import { Category } from '../entities/Category';

export class ManageCategoriesUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getCategories();
    }

    async getCategoryByName(name: string): Promise<Category | undefined> {
        const categories = await this.getAllCategories();
        return categories.find(category => 
            category.name.toLowerCase() === name.toLowerCase()
        );
    }

    async getCategoryKeys(): Promise<string[]> {
        const categories = await this.getAllCategories();
        return categories.map(category => category.key);
    }

    async getCategoryNames(): Promise<string[]> {
        const categories = await this.getAllCategories();
        return categories.map(category => category.name);
    }
}
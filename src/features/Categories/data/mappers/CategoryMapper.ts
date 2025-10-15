import { CategoryItemApiModel } from '../models/CategoryApiModel';
import { Category } from '../../domain/entities/Category';

export class CategoryMapper {
    static toDomain(apiModel: CategoryItemApiModel): Category {
        return {
            key: apiModel.key,
            name: apiModel.value,
        };
    }

    static arrayToDomain(apiModels: CategoryItemApiModel[]): Category[] {
        return apiModels.map(this.toDomain);
    }
}

export interface CategoryItemApiModel {
    key: string;
    value: string;
}

export interface CategoriesApiResponse {
    categories: CategoryItemApiModel[];
    total: number;
}
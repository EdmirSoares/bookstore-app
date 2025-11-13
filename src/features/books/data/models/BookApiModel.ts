export interface BookApiModel {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    gender: string;
    qttEstoque: number;
    qttAlugados: number;
    rented: boolean;
    sobre: string;
    coverImage?: string;
    createdAt?: string;
    updatedAt?: string; 
}
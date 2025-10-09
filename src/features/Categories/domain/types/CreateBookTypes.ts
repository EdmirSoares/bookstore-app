export interface CreateBookDTO {
    title: string;
    author: string;
    publicationYear: number;
    gender: string;
    qttEstoque: number;
    qttAlugados: number;
    rented: boolean;
    sobre: string;
}

export interface CreateBookFormData {
    title: string;
    author: string;
    publicationYear: string;
    gender: string;
    qttEstoque: string;
    qttAlugados: string;
    rented: boolean;
    sobre: string;
}
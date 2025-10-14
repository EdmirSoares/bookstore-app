import { Book } from '../../domain/entities/Book';
import { BookApiModel } from '../models/BookApiModel';

export class BookMapper {
    /**
     * Convert API model to Domain entity
     */
    toDomain(apiModel: BookApiModel): Book {
        return {
            id: apiModel.id,
            title: apiModel.title,
            author: apiModel.author,
            publicationYear: apiModel.publicationYear,
            gender: apiModel.gender,
            qttEstoque: apiModel.qttEstoque,
            qttAlugados: apiModel.qttAlugados,
            rented: apiModel.rented,
            sobre: apiModel.sobre,
        };
    }

    /**
     * Convert Domain entity to API model
     */
    toApi(domainEntity: Book): BookApiModel {
        return {
            id: domainEntity.id,
            title: domainEntity.title,
            author: domainEntity.author,
            publicationYear: domainEntity.publicationYear,
            gender: domainEntity.gender,
            qttEstoque: domainEntity.qttEstoque,
            qttAlugados: domainEntity.qttAlugados,
            rented: domainEntity.rented,
            sobre: domainEntity.sobre,
        };
    }

    /**
     * Convert partial Domain entity to partial API model for updates
     */
    toApiPartial(domainEntity: Partial<Book>): Partial<BookApiModel> {
        const apiModel: Partial<BookApiModel> = {};

        if (domainEntity.id !== undefined) apiModel.id = domainEntity.id;
        if (domainEntity.title !== undefined) apiModel.title = domainEntity.title;
        if (domainEntity.author !== undefined) apiModel.author = domainEntity.author;
        if (domainEntity.publicationYear !== undefined) apiModel.publicationYear = domainEntity.publicationYear;
        if (domainEntity.gender !== undefined) apiModel.gender = domainEntity.gender;
        if (domainEntity.qttEstoque !== undefined) apiModel.qttEstoque = domainEntity.qttEstoque;
        if (domainEntity.qttAlugados !== undefined) apiModel.qttAlugados = domainEntity.qttAlugados;
        if (domainEntity.rented !== undefined) apiModel.rented = domainEntity.rented;
        if (domainEntity.sobre !== undefined) apiModel.sobre = domainEntity.sobre;

        return apiModel;
    }
}
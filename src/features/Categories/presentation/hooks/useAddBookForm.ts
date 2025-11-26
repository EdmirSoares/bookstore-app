import { useState } from 'react';
import { bookSchema, BookFormData } from '../../domain/forms/AddBookFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { useCategoriesPresentation } from './useCategoriesPresentation';
import { BookCoverFormData, bookCoverSchema } from '../../domain/forms/AddBookCoverFormSchema';

export const useAddBookForm = ({ onClose }: { onClose: () => void }) => {
    const { createBook, uploadCoverImage } = useCategoriesPresentation();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            author: '',
            publicationYear: new Date().getFullYear(),
            gender: '',
            qttEstoque: 0,
            qttAlugados: 0,
            sobre: '',
            rented: false,
        },
    });

    const {
        control: coverControl,
        handleSubmit: handleCoverSubmit,
        formState: { errors: coverErrors, isSubmitting: isCoverSubmitting },
        reset: resetCover,
        getValues: getCoverValues,
    } = useForm<BookCoverFormData>({
        resolver: zodResolver(bookCoverSchema),
        defaultValues: {
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookFormData) => {
        try {
            console.info('Creating book:', data);

            const response = await createBook(data);
            console.info('Book created:', response);

            const coverImage = getCoverValues().coverImage;
            if (coverImage) {
                console.info('Uploading cover image for book:', response.id);
                await uploadCoverImage(response.id.toString(), coverImage);
                console.info('Cover image uploaded successfully');
            }

            Alert.alert('Sucesso', 'Livro cadastrado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => {
                        reset();
                        resetCover();
                        onClose();
                    },
                },
            ]);
        } catch (error) {
            console.error('Error creating book:', error);
            Alert.alert('Erro', 'Erro ao cadastrar livro. Tente novamente.');
        }
    };

    const handleReset = () => {
        Alert.alert('Limpar formulário', 'Tem certeza que deseja limpar todos os campos?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Limpar', onPress: () => reset() },
        ]);
    };

    return {
        control,
        reset,
        errors,
        isSubmitting,
        handleSubmit,
        handleReset,
        onSubmit,
        coverControl,
        coverErrors,
        isCoverSubmitting,
        resetCover,
    };
};

import { useState } from 'react';
import { bookSchema, BookFormData } from '../forms/AddBookFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import CategoriesHook from '../../hooks/categoriesHook';

export const useAddBookForm = ({ onClose }: { onClose: () => void }) => {
    const { createBook } = CategoriesHook();

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

    const onSubmit = async (data: BookFormData) => {
        try {
            console.log('Creating book:', data);

            const response = await createBook(data);

            Alert.alert('Sucesso', 'Livro cadastrado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => {
                        reset();
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
    };
};

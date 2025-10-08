import { useState } from 'react';

const useCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('0');

    const categories = [
        {
            id: '0',
            name: 'Todos',
        },
        {
            id: '1',
            name: 'Ficção',
        },
        {
            id: '2',
            name: 'Romance',
        },
        {
            id: '3',
            name: 'Aventura',
        },
        {
            id: '4',
            name: 'Terror',
        },
        {
            id: '5',
            name: 'Fantasia',
        },
        {
            id: '6',
            name: 'Sci-Fi',
        },
        {
            id: '7',
            name: 'Biografia',
        },
        {
            id: '8',
            name: 'Autoajuda',
        },
        {
            id: '9',
            name: 'História',
        },
    ];

    const changeCategory = (category: string) => {
        setSelectedCategory(category);
        console.log(`Categoria selecionada: ${category}`);
    };

    return {
        categories,
        changeCategory,
        selectedCategory,
    };
};

export default useCategories;

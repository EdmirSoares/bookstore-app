import CategoriesHook from '@/src/features/Categories/hooks/categoriesHook';
import { use, useCallback, useEffect, useMemo, useState } from 'react';
export interface CategoriesListItem {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    gender: string;
    qttEstoque: number;
    qttAlugados: number;
    rented: boolean;
    sobre: string;
}

const mockedData: CategoriesListItem[] = [
    {
        id: 1,
        title: 'O Enigma das Sombras',
        author: 'Clara Mendonça',
        publicationYear: 2018,
        gender: 'Suspense',
        qttEstoque: 25,
        qttAlugados: 7,
        rented: true,
        sobre: 'Um thriller psicológico ambientado em uma pequena cidade, onde segredos antigos começam a vir à tona após o desaparecimento de um jovem jornalista.',
    },
    {
        id: 2,
        title: 'Luzes de Inverno',
        author: 'Marcelo Duarte',
        publicationYear: 2020,
        gender: 'Romance',
        qttEstoque: 18,
        qttAlugados: 18,
        rented: true,
        sobre: 'Uma história de amor e superação que se passa em meio às montanhas geladas do sul do Chile, onde dois estranhos encontram um novo sentido para a vida.',
    },
    {
        id: 3,
        title: 'O Último Guardião',
        author: 'Helena Tavares',
        publicationYear: 2015,
        gender: 'Fantasia',
        qttEstoque: 40,
        qttAlugados: 20,
        rented: true,
        sobre: 'Um jovem órfão descobre ser o último descendente de uma antiga ordem responsável por proteger o equilíbrio entre o mundo humano e o mágico.',
    },
    {
        id: 4,
        title: 'Fragmentos do Amanhã',
        author: 'Caio Ribeiro',
        publicationYear: 2022,
        gender: 'Ficção Científica',
        qttEstoque: 30,
        qttAlugados: 10,
        rented: true,
        sobre: 'Em um futuro dominado pela inteligência artificial, uma cientista luta para recuperar memórias perdidas que podem mudar o destino da humanidade.',
    },
    {
        id: 5,
        title: 'Entre o Céu e o Mar',
        author: 'Juliana Castro',
        publicationYear: 2017,
        gender: 'Drama',
        qttEstoque: 22,
        qttAlugados: 6,
        rented: true,
        sobre: 'Um drama comovente sobre perda, perdão e recomeços, ambientado em uma vila litorânea marcada por tragédias e amores inacabados.',
    },
    {
        id: 6,
        title: 'O Código da Verdade',
        author: 'Rafael Almeida',
        publicationYear: 2019,
        gender: 'Mistério',
        qttEstoque: 35,
        qttAlugados: 14,
        rented: true,
        sobre: 'Um investigador enfrenta uma rede de conspirações ao tentar decifrar uma sequência de crimes conectados a uma antiga sociedade secreta.',
    },
    {
        id: 7,
        title: 'As Cores do Vento',
        author: 'Beatriz Lopes',
        publicationYear: 2016,
        gender: 'Poesia',
        qttEstoque: 12,
        qttAlugados: 2,
        rented: true,
        sobre: 'Uma coletânea de poemas que exploram a natureza, o amor e o tempo, com versos delicados e reflexivos.',
    },
    {
        id: 8,
        title: 'O Eco do Passado',
        author: 'Eduardo França',
        publicationYear: 2021,
        gender: 'Drama Histórico',
        qttEstoque: 28,
        qttAlugados: 9,
        rented: true,
        sobre: 'Durante a Segunda Guerra Mundial, um soldado brasileiro narra suas memórias e reflexões sobre coragem, medo e humanidade.',
    },
    {
        id: 9,
        title: 'Horizonte Digital',
        author: 'Larissa Furtado',
        publicationYear: 2023,
        gender: 'Techno-Thriller',
        qttEstoque: 26,
        qttAlugados: 15,
        rented: true,
        sobre: 'Um hacker idealista descobre que o sistema que ajudou a criar está sendo usado para manipular milhões de pessoas no mundo todo.',
    },
    {
        id: 10,
        title: 'Sombras do Vale',
        author: 'André Silveira',
        publicationYear: 2014,
        gender: 'Terror',
        qttEstoque: 15,
        qttAlugados: 5,
        rented: true,
        sobre: 'Moradores de uma vila isolada enfrentam uma presença sombria que desperta apenas durante a lua cheia, revelando segredos há muito esquecidos.',
    },
];

const useCategoriesList = () => {
    const { books } = CategoriesHook();

    const [currentFilter, setCurrentFilter] = useState<'all' | 'available' | 'unavailable'>('all');
    const [showAddBookModal, setShowAddBookModal] = useState(false);

    const filterFunction = useCallback((orderBy: 'all' | 'available' | 'unavailable') => {
        return (item: CategoriesListItem) => {
            if (orderBy === 'available') {
                return item.qttEstoque > item.qttAlugados;
            }
            if (orderBy === 'unavailable') {
                return item.qttEstoque === item.qttAlugados;
            }
            return true;
        };
    }, []);

    const getFilteredData = useCallback(
        (orderBy: 'all' | 'available' | 'unavailable') => {
            return mockedData.filter(filterFunction(orderBy));
        },
        [mockedData, filterFunction]
    );

    const handleChangeCurrentFilter = (newFilter: 'all' | 'available' | 'unavailable') => {
        setCurrentFilter(newFilter);
    };

    const handleShowAddBookModal = () => {
        setShowAddBookModal(!showAddBookModal);
    };

    const currentBooks = getFilteredData(currentFilter);

    useEffect(() => {
        console.log('Current Books:', books);
    }, [books]);

    return {
        mockedData,
        currentBooks,
        getFilteredData,
        currentFilter,
        handleChangeCurrentFilter,
        showAddBookModal,
        handleShowAddBookModal,
        books,
    };
};

export default useCategoriesList;

import { Container } from '@/src/design/components/Container/Container';
import PreviewTopicList from '@/src/design/components/PreviewTopicsList';
import Categories from '@/src/design/components/Categories';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@/src/design/components/common/Text/Text';
import Header from '@/src/design/components/Header';
import CategoriesList from '@/src/design/components/CategoriesList';

const CategoriesScreen = () => {
    return (
        <Container>
            <Header
                isHome={false}
                screen={{
                    title: 'Categorias',
                    hasGoBack: false,
                    buttonAction: () => {},
                }}
            />
            <Categories />

            <CategoriesList navigateTo="/(tabs)/Categories/index" />
        </Container>
    );
};

export default CategoriesScreen;

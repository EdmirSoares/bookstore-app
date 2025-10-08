import React from 'react';
import Header from '@/src/design/components/Header';
import { Container } from '@/src/design/components/Container/Container';
import Categories from '@/src/design/components/Categories';
import PreviewTopicList from '@/src/design/components/PreviewTopicsList';
import { ScrollView } from 'react-native';

const Home = () => {
    return (
        <Container>
            <Header user={{ name: 'User' }} />
            <Categories />
            <ScrollView 
            showsVerticalScrollIndicator={false}
            snapToAlignment='start'
            decelerationRate='fast'
            contentContainerStyle={{ gap: 24 }}
            bounces={false}
            overScrollMode='never'
            >
                <PreviewTopicList title="Últimos" orderBy="last" navigateTo='/(tabs)/Books/index' />
                <PreviewTopicList title="Disponíveis" orderBy="available" navigateTo='/categories' />
                <PreviewTopicList title="Emprestados" orderBy="unavailable" navigateTo='/details' />
            </ScrollView>
        </Container>
    );
};

export default Home;

import React from 'react';
import Header from '@/src/design/components/Header';
import { Container } from '@/src/design/components/Container/Container';
import Categories from '@/src/design/components/Categories';
import PreviewTopicList from '@/src/design/components/PreviewTopicsList';
import { ScrollView } from 'react-native';

const Home = () => {
    return (
        <Container>
            <Header
                isHome
                screen={{
                    user: {
                        name: 'User',
                    },
                }}
            />
            <Categories />
            <ScrollView
                showsVerticalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                contentContainerStyle={{ gap: 24, paddingBottom: 24 }}
                bounces={false}
                overScrollMode="never">
                <PreviewTopicList
                    title="Últimos"
                    orderBy="last"
                    navigateTo="/(tabs)/Categories/index"
                />
                <PreviewTopicList
                    title="Disponíveis"
                    orderBy="available"
                    navigateTo="/(tabs)/Categories/index"
                />
                <PreviewTopicList
                    title="Emprestados"
                    orderBy="unavailable"
                    navigateTo="/(tabs)/Categories/index"
                />
            </ScrollView>
        </Container>
    );
};

export default Home;

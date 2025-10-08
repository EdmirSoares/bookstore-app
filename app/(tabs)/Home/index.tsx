import React from 'react';
import Header from '@/src/design/components/Header';
import { Container } from '@/src/design/components/Container/Container';
import Categories from '@/src/design/components/Categories';

const Home = () => {
    return (
        <Container>
            <Header user={{ name: 'User' }} />
            <Categories />
        </Container>
    );
};

export default Home;

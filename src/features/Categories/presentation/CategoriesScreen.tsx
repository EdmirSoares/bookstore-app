import { Container } from '@/src/design/components/Container/Container';
import Categories from '@/src/design/components/Categories';
import React from 'react';
import { Modal } from 'react-native';
import Header from '@/src/design/components/Header';
import CategoriesList from '@/src/design/components/CategoriesList';
import useCategoriesList from '@/src/design/components/CategoriesList/useCategoriesList';
import AddBookScreen from './AddBookScreen';

const CategoriesScreen = () => {
    const { showAddBookModal, handleShowAddBookModal } = useCategoriesList();
    return (
        <Container>
            <Header
                isHome={false}
                screen={{
                    title: 'Categorias',
                    hasGoBack: false,
                    buttonAction: handleShowAddBookModal,
                }}
            />
            <Categories />

            <CategoriesList navigateTo="/(tabs)/Categories/index" />
            <Modal
                visible={showAddBookModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={handleShowAddBookModal}>
                <AddBookScreen onClose={handleShowAddBookModal} />
            </Modal>
        </Container>
    );
};

export default CategoriesScreen;

import {StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { HStack } from '../common/HStack';
import { Text } from '../common/Text/Text';
import { VStack } from '../common/VStack';
import useCategories from './useCategories';
import { TouchableOpacity } from '../common/TouchableOpacity/TouchableOpacity';

const Categories = () => {
    const { colors, currentTheme, toggleTheme, styles: createStyles } = useTheme();
    const { categories, changeCategory, selectedCategory } = useCategories();

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: createStyles.padding16.padding,
            paddingVertical: createStyles.padding20.padding,
        },
        content: {
            gap: createStyles.margin8.margin,
        },
        text: {
            fontSize: 14,
            fontFamily: 'PoppinsMedium',
            letterSpacing: 0.4,
        },
        descriptionText: {
            fontSize: 12,
            fontFamily: 'PoppinsMedium',
            letterSpacing: 0.2,
            lineHeight: 18,
        },
        TouchableOpacity: {
            paddingVertical: createStyles.padding6.padding,
            width: 75,
            borderRadius: 999,
            backgroundColor: colors.primary['400'],
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
        },
    });

    return (
        <HStack style={styles.container}>
            <VStack style={styles.content}>
                <Text style={styles.text}>Gêneros</Text>
                <FlatList
                    data={Object.values(categories)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    overScrollMode="never" 
                    snapToAlignment="start"
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.TouchableOpacity,
                                {
                                    borderColor:
                                        selectedCategory === item.id
                                            ? 'transparent'
                                            : colors.primary['400'],
                                    backgroundColor:
                                        selectedCategory === item.id
                                            ? colors.primary['400']
                                            : 'transparent',
                                    opacity: selectedCategory === item.id ? 1 : 0.25,
                                },
                            ]}
                            onPress={() => changeCategory(item.id)}>
                            <Text style={styles.descriptionText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap: 10 }}
                />
            </VStack>
        </HStack>
    );
};

export default Categories;

import { StyleSheet, FlatList, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { HStack } from '../common/HStack';
import { Text } from '../common/Text/Text';
import { VStack } from '../common/VStack';
import useCategories from './useCategories';
import { TouchableOpacity } from '../common/TouchableOpacity/TouchableOpacity';

interface CategoriesProps {
    onFilterChange?: (filter: string) => void;
}

const Categories = ({ onFilterChange }: CategoriesProps) => {
    const { colors, currentTheme, toggleTheme, styles: createStyles } = useTheme();
    const { categories, handleChangeCurrentFilter, currentFilter } = useCategories();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: createStyles.padding16.padding,
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
                    paddingVertical: createStyles.padding8.padding,
                    width: 90,
                    borderRadius: 999,
                    backgroundColor: colors.primary['400'],
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                },
            }),
        [colors, createStyles]
    );

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
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                handleChangeCurrentFilter(item);
                            }}
                            style={[
                                styles.TouchableOpacity,
                                {
                                    borderColor:
                                        currentFilter?.key === item.key
                                            ? 'transparent'
                                            : colors.primary['400'],
                                    backgroundColor:
                                        currentFilter?.key === item.key
                                            ? colors.primary['400']
                                            : 'transparent',
                                    opacity: currentFilter?.key === item.key ? 1 : 0.25,
                                },
                            ]}>
                            <Text style={styles.descriptionText}>{item.name.split(' ')[0]}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    contentContainerStyle={{ paddingRight: createStyles.margin16.margin }}
                />
            </VStack>
        </HStack>
    );
};

export default Categories;

import { View, StyleSheet, FlatList, Modal } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { VStack } from '../common/VStack';
import { TouchableOpacity } from '../common/TouchableOpacity/TouchableOpacity';
import { Text } from '../common/Text/Text';
import { CategoriesListItem } from './useCategoriesList';
import CheckIcon from '@/src/design/assets/common/icons/check-icon.svg';
import BlockIcon from '@/src/design/assets/common/icons/block-icon.svg';
import useCategoriesList from './useCategoriesList';

const RenderItem = ({ item }: { item: CategoriesListItem & { isPlaceholder?: boolean } }) => {
    const { colors, styles: createStyles } = useTheme();

    if (item.isPlaceholder) {
        return <View style={{ width: '48%', height: 320 }} />;
    }

    const styles = useMemo(
        () =>
            StyleSheet.create({
                TouchableOpacity: {
                    width: '48%',
                    height: 320,
                    justifyContent: 'center',
                },
                container: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.backgroundForeground + '50',
                    ...createStyles.rounded8,
                    height: 184,
                    flex: 1,
                },
                titleAbbreviation: {
                    fontSize: 32,
                    fontFamily: 'PoppinsMedium',
                    letterSpacing: 0.2,
                    textAlign: 'center',
                },
                title: {
                    fontSize: 12,
                    fontFamily: 'PoppinsMedium',
                    letterSpacing: 0.2,
                    lineHeight: 16,
                    textAlign: 'left',
                    marginTop: createStyles.margin6.margin,
                    marginBottom: createStyles.margin2.margin,
                },
                authorTitle: {
                    fontSize: 10,
                    fontFamily: 'PoppinsLight',
                    letterSpacing: 0.2,
                    lineHeight: 18,
                    textAlign: 'left',
                },
                statusTag: {
                    marginTop: createStyles.margin8.margin,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 8,
                },
                statusTagText: {
                    fontSize: 10,
                    fontFamily: 'PoppinsLight',
                    color: colors.neutral['100'],
                },
            }),
        [colors, createStyles]
    );

    const StatusTag = () => (
        <View style={styles.statusTag}>
            {item.qttEstoque === item.qttAlugados ? (
                <>
                    <BlockIcon />
                    <Text style={styles.statusTagText}>Indisponível</Text>
                </>
            ) : (
                <>
                    <CheckIcon />
                    <Text style={styles.statusTagText}>Disponível</Text>
                </>
            )}
        </View>
    );

    return (
        <TouchableOpacity style={styles.TouchableOpacity}>
            <View style={styles.container}>
                <Text style={styles.titleAbbreviation}>{item.author.split(' ').length > 1
                        ? item.author.split(' ')[0].charAt(0).toUpperCase() +
                          item.author.split(' ')[1].charAt(0).toUpperCase()
                        : item.author.charAt(0).toUpperCase()}
                </Text>
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {item.title}
            </Text>
            <Text style={styles.authorTitle}>{item.author}</Text>
            <StatusTag />
        </TouchableOpacity>
    );
};

const CategoriesList = ({ navigateTo }: { navigateTo: string }) => {
    const { colors, styles: createStyles } = useTheme();
    const { currentBooks, getFilteredData, currentFilter, handleChangeCurrentFilter, books } =
        useCategoriesList();

    const dataWithPlaceholder = useMemo(() => {
        const data = [...currentBooks];
        if (data.length % 2 !== 0) {
            data.push({
                id: -1,
                title: '',
                author: '',
                publicationYear: 0,
                gender: '',
                qttEstoque: 0,
                qttAlugados: 0,
                rented: false,
                sobre: '',
                isPlaceholder: true,
            } as CategoriesListItem & { isPlaceholder: boolean });
        }
        return data;
    }, [currentBooks]);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: createStyles.padding16.padding,
                },
                content: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                header: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                },
                headerText: {
                    color: colors.primary['400'],
                    fontFamily: 'PoppinsBold',
                    fontSize: 12,
                },
                text: {
                    fontSize: 20,
                    fontFamily: 'PoppinsBold',
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
                TouchableOpacityFilter: {
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    borderRadius: 999,
                },
            }),
        [colors, createStyles]
    );

    return (
        <>
            <VStack style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginBottom: 20,
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}>
                    <TouchableOpacity
                        onPress={() => handleChangeCurrentFilter('all')}
                        style={[
                            styles.TouchableOpacityFilter,
                            {
                                backgroundColor:
                                    currentFilter === 'all'
                                        ? colors.primary['400'] + '40'
                                        : colors.neutral['800'] + '40',
                            },
                        ]}>
                        <Text style={{ fontSize: 10 }}>Todos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleChangeCurrentFilter('available')}
                        style={[
                            styles.TouchableOpacityFilter,
                            {
                                backgroundColor:
                                    currentFilter === 'available'
                                        ? colors.primary['400'] + '40'
                                        : colors.neutral['800'] + '40',
                            },
                        ]}>
                        <CheckIcon />
                        <Text style={{ fontSize: 10 }}>Disponíveis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleChangeCurrentFilter('unavailable')}
                        style={[
                            styles.TouchableOpacityFilter,
                            {
                                backgroundColor:
                                    currentFilter === 'unavailable'
                                        ? colors.primary['400'] + '40'
                                        : colors.neutral['800'] + '40',
                            },
                        ]}>
                        <BlockIcon />
                        <Text style={{ fontSize: 10 }}>Indisponíveis</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    key="two-columns"
                    data={dataWithPlaceholder}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    bounces={false}
                    overScrollMode="never"
                    snapToAlignment="start"
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({
                        item,
                    }: {
                        item: CategoriesListItem & { isPlaceholder?: boolean };
                    }) => <RenderItem item={item} />}
                    contentContainerStyle={{
                        gap: 10,
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'flex-start',
                        gap: 10,
                        marginBottom: 10,
                        width: '100%',
                    }}
                    ListEmptyComponent={
                        <VStack style={{ marginTop: 50 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'PoppinsBold', color: colors.neutral['300'] }}>
                                Nenhum livro encontrado!
                            </Text>
                        </VStack>
                    }
                />
            </VStack>
        </>
    );
};

export default CategoriesList;

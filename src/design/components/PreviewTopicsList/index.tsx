import { View, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { router, Href } from 'expo-router';
import React, { useMemo } from 'react';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { HStack } from '../common/HStack';
import { VStack } from '../common/VStack';
import { TouchableOpacity } from '../common/TouchableOpacity/TouchableOpacity';
import { Text } from '../common/Text/Text';
import usePreviewTopicsList from './usePreviewTopicsList';
import CheckIcon from '@/src/design/assets/common/icons/check-icon.svg';
import BlockIcon from '@/src/design/assets/common/icons/block-icon.svg';
import ArrowRounded from '@/src/design/assets/common/icons/arrow-rounded.svg';
import AlertIcon from '@/src/design/assets/common/icons/exclamation-icon.svg';
import { Book } from '@/src/features/books/domain/entities/Book';
import { HttpClientFactory } from '@/src/shared/services/Http/HttpClientFactory';

const BASE_URL_UPLOADS = HttpClientFactory.getBaseUrlUploads();

const RenderItem = ({ item }: { item: Book }) => {
    const { colors, styles: createStyles } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                TouchableOpacity: {
                    width: 128,
                    height: 256,
                    justifyContent: 'center',
                    flex: 1,
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
    console.log('BASE_URL:', BASE_URL_UPLOADS + '/' + item.coverImage);

    return (
        <TouchableOpacity style={styles.TouchableOpacity}>
            <View style={styles.container}>
                {item.coverImage ? (
                    <Image
                        source={{ uri: `${BASE_URL_UPLOADS}/${item.coverImage}` }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                ) : (
                    <Text style={styles.titleAbbreviation}>
                        {item.author.split(' ').length > 1
                            ? item.author.split(' ')[0].charAt(0).toUpperCase() +
                              item.author.split(' ')[1].charAt(0).toUpperCase()
                            : item.author.charAt(0).toUpperCase()}
                    </Text>
                )}
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {item.title}
            </Text>
            <Text style={styles.authorTitle}>{item.author}</Text>
            <StatusTag />
        </TouchableOpacity>
    );
};

const PreviewTopicList = ({
    title,
    orderBy,
    navigateTo,
    data,
}: {
    title: string;
    orderBy: 'last' | 'available' | 'unavailable';
    navigateTo: string;
    data: Book[];
}) => {
    const { colors, styles: createStyles } = useTheme();
    const { filteredData } = usePreviewTopicsList({ orderBy, data });
    const widthScreen = Dimensions.get('window').width;

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: createStyles.padding16.padding,
                },
                content: {
                    gap: createStyles.margin8.margin,
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
            }),
        [colors, createStyles]
    );

    return (
        <HStack style={styles.container}>
            <VStack style={styles.content}>
                <HStack style={styles.header}>
                    <Text style={styles.text}>{title}</Text>
                    <HStack>
                        <TouchableOpacity
                            onPress={() => router.push(navigateTo as any)}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={styles.headerText}>Ver Todos</Text>
                            <ArrowRounded />
                        </TouchableOpacity>
                    </HStack>
                </HStack>
                <FlatList
                    data={filteredData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    overScrollMode="never"
                    snapToAlignment="start"
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: { item: Book }) => <RenderItem item={item} />}
                    contentContainerStyle={{ gap: 10 }}
                    ListEmptyComponent={
                        <VStack
                            style={{
                                flex: 1,
                                minWidth: widthScreen,
                                height: 156,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 8,
                            }}>
                            <AlertIcon />
                            <Text style={[styles.descriptionText]}>Nenhum item encontrado</Text>
                        </VStack>
                    }
                />
            </VStack>
        </HStack>
    );
};

export default PreviewTopicList;

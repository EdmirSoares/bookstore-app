import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Switch,
    Alert,
    Button,
    Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Feather } from '@expo/vector-icons';
import { Container } from '../../../design/components/Container/Container';
import { useTheme } from '../../../shared/hooks/useTheme';
import { HStack } from '../../../design/components/common/HStack';
import { VStack } from '../../../design/components/common/VStack';
import { useAddBookForm } from './hooks/useAddBookForm';
import { useImagePicker } from '@/src/shared/hooks/useImagePicker';

interface AddBookScreenProps {
    onClose: () => void;
}

const AddBookScreen = ({ onClose }: AddBookScreenProps) => {
    const { colors, styles: createStyles } = useTheme();
    const { control, errors, isSubmitting, handleSubmit, handleReset, onSubmit, coverControl } =
        useAddBookForm({
            onClose,
        });

    const { selectedImage, pickImage, takePhoto, clearImage } = useImagePicker();
    const formStyles = useMemo(
        () =>
            StyleSheet.create({
                header: {
                    paddingBottom: 16,
                    marginBottom: 20,
                    alignItems: 'flex-start',
                    paddingHorizontal: 16,
                },
                closeButton: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                },
                closeButtonText: {
                    fontSize: 16,
                    fontWeight: '500',
                },
                title: {
                    fontSize: 24,
                    fontFamily: 'PoppinsBold',
                    textAlign: 'center',
                    marginTop: 16,
                    color: colors.primary['400'],
                    lineHeight: 36,
                },
                subtitle: {
                    fontSize: 14,
                    fontFamily: 'PoppinsRegular',
                    color: colors.neutral['300'],
                    lineHeight: 24,
                },
                content: {
                    flex: 1,
                    paddingHorizontal: 16,
                },
                fieldContainer: {
                    flex: 1,
                },
                fieldContainerCompound: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                },
                input: {
                    height: 50,
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingTop: 14,
                    fontSize: 14,
                    fontFamily: 'PoppinsRegular',
                    color: colors.text,
                    backgroundColor: colors.neutral['700'] + '40',
                },
                textArea: {
                    minHeight: 100,
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 14,
                    fontFamily: 'PoppinsRegular',
                    color: colors.text,
                    backgroundColor: colors.neutral['700'] + '40',
                },
                switchContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                },
                errorText: {
                    fontSize: 12,
                    marginTop: 4,
                },
                errorContainer: {
                    minHeight: 20,
                    paddingBottom: 12,
                    justifyContent: 'flex-start',
                },
                buttonContainer: {
                    gap: 12,
                    marginTop: 20,
                    marginBottom: 40,
                },
                button: {
                    flex: 1,
                    height: 48,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                primaryButton: {
                    backgroundColor: colors.primary['400'],
                },
                secondaryButton: {
                    borderWidth: 1,
                    borderColor: colors.primary['400'] + '60',
                    backgroundColor: 'transparent',
                },
                neutralButton: {
                    backgroundColor: colors.neutral['700'] + '40',
                },
                buttonText: {
                    fontSize: 14,
                    fontFamily: 'PoppinsBold',
                },
                imageDisplay: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    backgroundColor: colors.neutral['700'] + '10',
                },
            }),
        [colors]
    );

    return (
        <Container>
            <StatusBar backgroundColor={colors.background} />

            <View style={[formStyles.header]}>
                <HStack style={{ paddingVertical: createStyles.padding16.padding }}>
                    <TouchableOpacity onPress={onClose} style={formStyles.closeButton}>
                        <Feather name="chevron-left" size={20} color={colors.neutral['200']} />
                        <Text
                            style={[formStyles.closeButtonText, { color: colors.neutral['200'] }]}>
                            Voltar
                        </Text>
                    </TouchableOpacity>
                </HStack>
                <Text style={formStyles.title}>Cadastrar Livro</Text>
                <Text style={formStyles.subtitle}>Informe os dados para cadastro</Text>
            </View>

            <ScrollView
                style={formStyles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <VStack>
                    <View style={formStyles.fieldContainer}>
                        <Controller
                            control={control}
                            name="title"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[formStyles.input]}
                                    placeholder="Título"
                                    placeholderTextColor={colors.neutral['500']}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <View style={formStyles.errorContainer}>
                            {errors.title && (
                                <Text
                                    style={[
                                        formStyles.errorText,
                                        { color: colors.warning500 || '#ff0000' },
                                    ]}>
                                    {errors.title.message}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={formStyles.fieldContainer}>
                        <Controller
                            control={control}
                            name="author"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[formStyles.input]}
                                    placeholder="Digite o nome do autor"
                                    placeholderTextColor={colors.neutral['500']}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <View style={formStyles.errorContainer}>
                            {errors.author && (
                                <Text
                                    style={[
                                        formStyles.errorText,
                                        { color: colors.warning500 || '#ff0000' },
                                    ]}>
                                    {errors.author.message}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={formStyles.fieldContainerCompound}>
                        <View style={formStyles.fieldContainer}>
                            <Controller
                                control={control}
                                name="publicationYear"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[formStyles.input]}
                                        maxLength={4}
                                        placeholder="Ex: 2023"
                                        placeholderTextColor={colors.neutral['500']}
                                        value={value.toString()}
                                        onChangeText={(text) => onChange(parseInt(text) || 0)}
                                        keyboardType="numeric"
                                    />
                                )}
                            />
                            <View style={formStyles.errorContainer}>
                                {errors.gender && !errors.publicationYear && (
                                    <Text style={[formStyles.errorText]}> </Text>
                                )}
                                {errors.publicationYear && (
                                    <Text
                                        style={[
                                            formStyles.errorText,
                                            { color: colors.warning500 || '#ff0000' },
                                        ]}>
                                        {errors.publicationYear.message}
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View style={[formStyles.fieldContainer, { flex: 2 }]}>
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[formStyles.input]}
                                        placeholder="Ex: Romance, Ficção, Suspense"
                                        placeholderTextColor={colors.neutral['500']}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            <View style={formStyles.errorContainer}>
                                {errors.gender && (
                                    <Text
                                        style={[
                                            formStyles.errorText,
                                            { color: colors.warning500 || '#ff0000' },
                                        ]}>
                                        {errors.gender.message}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={formStyles.fieldContainerCompound}>
                        <View style={formStyles.fieldContainer}>
                            <Controller
                                control={control}
                                name="qttEstoque"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[formStyles.input]}
                                        placeholder="Qtd. Estoque"
                                        placeholderTextColor={colors.neutral['500']}
                                        value={value === 0 ? '' : value.toString()}
                                        onChangeText={(text) => onChange(parseInt(text) || 0)}
                                        keyboardType="numeric"
                                    />
                                )}
                            />
                            <View style={formStyles.errorContainer}>
                                {errors.qttEstoque && (
                                    <Text
                                        style={[
                                            formStyles.errorText,
                                            { color: colors.warning500 || '#ff0000' },
                                        ]}>
                                        {errors.qttEstoque.message}
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View style={formStyles.fieldContainer}>
                            <Controller
                                control={control}
                                name="qttAlugados"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[formStyles.input]}
                                        placeholder="Qtd. Alugados"
                                        placeholderTextColor={colors.neutral['500']}
                                        value={value === 0 ? '' : value.toString()}
                                        onChangeText={(text) => onChange(parseInt(text) || 0)}
                                        keyboardType="numeric"
                                    />
                                )}
                            />
                            <View style={formStyles.errorContainer}>
                                {errors.qttAlugados && (
                                    <Text
                                        style={[
                                            formStyles.errorText,
                                            { color: colors.warning500 || '#ff0000' },
                                        ]}>
                                        {errors.qttAlugados.message}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <View style={formStyles.fieldContainer}>
                        <Controller
                            control={control}
                            name="sobre"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[formStyles.textArea]}
                                    placeholder="Informe a descrição do livro"
                                    placeholderTextColor={colors.neutral['500']}
                                    value={value}
                                    onChangeText={onChange}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            )}
                        />
                        {errors.sobre && (
                            <Text
                                style={[
                                    formStyles.errorText,
                                    { color: colors.warning500 || '#ff0000' },
                                ]}>
                                {errors.sobre.message}
                            </Text>
                        )}
                    </View>

                    <Controller
                        control={coverControl}
                        name="coverImage"
                        render={({ field: { onChange } }) => (
                            <VStack>
                                <Text style={[formStyles.subtitle, { marginTop: 20 }]}>
                                    Capa do Livro
                                </Text>
                                <HStack style={formStyles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[formStyles.button, formStyles.neutralButton]}
                                        onPress={async () => {
                                            await pickImage();
                                            if (selectedImage) {
                                                onChange(selectedImage);
                                            }
                                        }}>
                                        <Feather
                                            name="image"
                                            size={22}
                                            color={colors.primary['400']}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[formStyles.button, formStyles.neutralButton]}
                                        onPress={async () => {
                                            await takePhoto();
                                            if (selectedImage) {
                                                onChange(selectedImage);
                                            }
                                        }}>
                                        <Feather
                                            name="camera"
                                            size={22}
                                            color={colors.primary['400']}
                                        />
                                    </TouchableOpacity>
                                </HStack>
                                {selectedImage && (
                                    <HStack style={formStyles.imageDisplay}>
                                    <Image
                                        source={{ uri: selectedImage.uri }}
                                        style={{ width: 200, height: 266 }}
                                    />
                                    </HStack>
                                )}
                            </VStack>
                        )}
                    />

                    <HStack style={[formStyles.buttonContainer]}>
                        <TouchableOpacity
                            onPress={handleReset}
                            style={[formStyles.button, formStyles.secondaryButton]}
                            disabled={isSubmitting}>
                            <Feather name="trash-2" size={16} color={colors.text} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            style={[
                                formStyles.button,
                                formStyles.primaryButton,
                                isSubmitting && { opacity: 0.7 },
                                { flex: 4 },
                            ]}
                            disabled={isSubmitting}>
                            <Text style={[formStyles.buttonText, { color: 'white' }]}>
                                {isSubmitting ? 'Salvando...' : 'Salvar'}
                            </Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </ScrollView>
        </Container>
    );
};

export default AddBookScreen;

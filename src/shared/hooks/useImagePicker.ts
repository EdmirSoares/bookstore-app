import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ExpoFileUpload } from '@/src/shared/types/file-upload';
import { Alert } from 'react-native';

export interface UseImagePickerReturn {
  selectedImage: ExpoFileUpload | null;
  pickImage: () => Promise<void>;
  takePhoto: () => Promise<void>;
  clearImage: () => void;
  isLoading: boolean;
}

export const useImagePicker = (): UseImagePickerReturn => {
  const [selectedImage, setSelectedImage] = useState<ExpoFileUpload | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async (type: 'camera' | 'library'): Promise<boolean> => {
    try {
      const permission = type === 'camera' 
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permissão necessária',
          `Precisamos de acesso ${type === 'camera' ? 'à câmera' : 'à galeria'} para selecionar uma imagem.`
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  const pickImage = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions('library');
      if (!hasPermission) {
        setIsLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const file: ExpoFileUpload = {
          uri: asset.uri,
          type: asset.type || 'image',
          name: asset.fileName || `image-${Date.now()}.jpg`,
          mimeType: asset.mimeType || 'image/jpeg',
          size: asset.fileSize,
        };
        setSelectedImage(file);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Erro', 'Erro ao selecionar imagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions('camera');
      if (!hasPermission) {
        setIsLoading(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const file: ExpoFileUpload = {
          uri: asset.uri,
          type: asset.type || 'image',
          name: asset.fileName || `photo-${Date.now()}.jpg`,
          mimeType: asset.mimeType || 'image/jpeg',
          size: asset.fileSize,
        };
        setSelectedImage(file);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Erro', 'Erro ao tirar foto. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  return {
    selectedImage,
    pickImage,
    takePhoto,
    clearImage,
    isLoading,
  };
};

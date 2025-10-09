import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from '@/src/design/components/common/TouchableOpacity/TouchableOpacity'
import { useTheme } from '@/src/shared/hooks/useTheme'
import Feather from '@expo/vector-icons/Feather'

interface AddBookScreenProps {
  onClose: () => void;
}

const AddBookScreen = ({ onClose }: AddBookScreenProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Adicionar Livro</Text>
        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: colors.primary['400'] + '20' }]}>
          <Feather name="x" size={24} color={colors.primary['400']} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>Formulário para adicionar livro aqui...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
    borderRadius: 999,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
  },
});

export default AddBookScreen
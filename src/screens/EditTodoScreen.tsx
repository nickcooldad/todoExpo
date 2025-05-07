// src/screens/EditTodoScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import PrioritySelector from '../components/PrioritySelector';
import { updateTodo } from '../storage/todoStorage';

const EditTodoScreen = ({ route, navigation }) => {
  const { todo } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [completed, setCompleted] = useState(false);

  // Инициализация данных из полученной задачи
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setPriority(todo.priority || 'normal');
      setCompleted(todo.completed || false);
    }
  }, [todo]);

  // Сохранение изменений
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Название задачи не может быть пустым');
      return;
    }

    try {
      const updatedTodo = {
        title: title.trim(),
        description: description.trim(),
        priority,
        completed,
      };
      
      await updateTodo(todo.id, updatedTodo);
      Alert.alert(
        'Успех', 
        'Задача обновлена', 
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
      Alert.alert('Ошибка', 'Не удалось обновить задачу');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Название</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Введите название задачи"
            placeholderTextColor="#C7C7CC"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Описание</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Введите описание задачи (необязательно)"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Приоритет</Text>
          <PrioritySelector 
            selectedValue={priority} 
            onSelect={setPriority} 
          />
        </View>
        
        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.completedToggle}
            onPress={() => setCompleted(!completed)}
          >
            <View style={[
              styles.checkbox,
              completed && styles.checkboxChecked
            ]} />
            <Text style={styles.completedLabel}>
              Задача выполнена
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Отмена</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 15,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  textArea: {
    minHeight: 100,
  },
  completedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  completedLabel: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 18,
  },
});

export default EditTodoScreen;
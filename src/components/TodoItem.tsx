// src/components/TodoItem.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  // Функция для получения стиля приоритета
  const getPriorityStyle = () => {
    if (todo.priority === 'low') return styles.lowPriority;
    if (todo.priority === 'high') return styles.highPriority;
    return styles.normalPriority;
  };

  return (
    <View style={[styles.todoItem, todo.completed && styles.completedItem]}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => onToggleComplete(todo.id)}
      >
        <View style={[
          styles.checkboxInner,
          todo.completed && styles.checkboxChecked
        ]} />
      </TouchableOpacity>
      
      <View style={styles.todoContent}>
        <Text style={[
          styles.todoTitle,
          todo.completed && styles.completedText
        ]}>
          {todo.title}
        </Text>
        
        {todo.description ? (
          <Text style={[
            styles.todoDescription,
            todo.completed && styles.completedText
          ]}>
            {todo.description}
          </Text>
        ) : null}
        
        <View style={[styles.priorityBadge, getPriorityStyle()]}>
          <Text style={styles.priorityText}>
            {todo.priority === 'high' ? 'Высокий' : 
             todo.priority === 'normal' ? 'Средний' : 'Низкий'}
          </Text>
        </View>
      </View>
      
      <View style={styles.todoActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onEdit(todo)}
        >
          <Text style={styles.editText}>Изменить</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(todo.id)}
        >
          <Text style={styles.deleteText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedItem: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  priorityBadge: {
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  lowPriority: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  normalPriority: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  highPriority: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  priorityText: {
    fontSize: 12,
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  editText: {
    color: '#007AFF',
    fontSize: 14,
  },
  deleteText: {
    color: 'rgb(255, 59, 48)',
    fontSize: 14,
  },
});

export default TodoItem;
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface EmptyListProps {
  loading: boolean;
}

const EmptyList: React.FC<EmptyListProps> = ({ loading }) => {
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Список задач пуст
      </Text>
      <Text style={styles.emptySubText}>
        Нажмите "+" чтобы добавить задачу
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
});

export default EmptyList;
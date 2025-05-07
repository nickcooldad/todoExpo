// src/components/FilterBar.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'all' && styles.activeFilter
        ]}
        onPress={() => onFilterChange('all')}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === 'all' && styles.activeFilterText
          ]}
        >
          Все
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'active' && styles.activeFilter
        ]}
        onPress={() => onFilterChange('active')}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === 'active' && styles.activeFilterText
          ]}
        >
          Активные
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'completed' && styles.activeFilter
        ]}
        onPress={() => onFilterChange('completed')}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === 'completed' && styles.activeFilterText
          ]}
        >
          Завершенные
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  activeFilter: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  filterText: {
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#007AFF',
  },
});

export default FilterBar;
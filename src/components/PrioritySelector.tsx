// src/components/PrioritySelector.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrioritySelector = ({ selectedValue, onSelect }) => {
  // Функция для получения стиля выбранного приоритета
  const getPriorityStyle = (value) => {
    if (value === 'low') return styles.lowPrioritySelected;
    if (value === 'normal') return styles.normalPrioritySelected;
    if (value === 'high') return styles.highPrioritySelected;
    return {};
  };

  // Компонент для кнопки выбора приоритета
  const PriorityButton = ({ value, label }) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        value === selectedValue && getPriorityStyle(value)
      ]}
      onPress={() => onSelect(value)}
    >
      <Text
        style={[
          styles.priorityButtonText,
          value === selectedValue && styles.priorityButtonTextSelected
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.priorityContainer}>
      <PriorityButton
        value="low"
        label="Низкий"
      />
      
      <PriorityButton
        value="normal"
        label="Средний"
      />
      
      <PriorityButton
        value="high"
        label="Высокий"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  lowPrioritySelected: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderColor: 'rgb(52, 199, 89)',
  },
  normalPrioritySelected: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderColor: 'rgb(0, 122, 255)',
  },
  highPrioritySelected: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderColor: 'rgb(255, 59, 48)',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  priorityButtonTextSelected: {
    fontWeight: '500',
    color: '#000',
  },
});

export default PrioritySelector;
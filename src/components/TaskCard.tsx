import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../theme/colors';
import { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  const isHighPriority = task.priority === 'High';

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxChecked]}
          onPress={() => onToggle(task.id, task.completed)}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, task.completed && styles.textStrikethrough]}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
          
          {/* Display DateTime / Deadline nicely */}
          {task.dateTime ? (
            <Text style={styles.timeText}>🕒 {task.dateTime}</Text>
          ) : null}

          <Text style={[styles.priority, isHighPriority && styles.highPriorityText]}>
            Priority: {task.priority}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: COLORS.done,
    borderColor: COLORS.done,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  priority: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  highPriorityText: {
    color: COLORS.error,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: COLORS.error,
    fontWeight: 'bold',
  },
});

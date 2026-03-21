import React, { useContext, useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { COLORS } from '../theme/colors';

export const TodoListScreen = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useContext(TaskContext);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [deadlineStr, setDeadlineStr] = useState(''); // e.g. "YYYY-MM-DD"
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  // --- BONUS: Mixed Sorting Algorithm (Time + Deadline + Priority) ---
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filtering logic
    if (filter === 'Pending') result = result.filter(t => !t.completed);
    if (filter === 'Completed') result = result.filter(t => t.completed);

    // Search logic
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        t => t.title.toLowerCase().includes(lowerQuery) || (t.description && t.description.toLowerCase().includes(lowerQuery))
      );
    }

    // Sort by priority and deadline combined
    return result.sort((a, b) => {
      // 1. Give Heavy weightage to Priority (High=3000, Medium=2000, Low=1000)
      const pMap = { High: 3000, Medium: 2000, Low: 1000 };
      const scoreA = pMap[a.priority] || 0;
      const scoreB = pMap[b.priority] || 0;

      // 2. Deadline proximity logic (Sooner deadlines = higher bonus score)
      // Using a large base to invert timestamps (smaller timestamp = sooner = higher value)
      const baseVal = 100000000000000;
      const timeScoreA = a.deadline ? (baseVal - a.deadline) / 1000000000 : 0;
      const timeScoreB = b.deadline ? (baseVal - b.deadline) / 1000000000 : 0;

      const totalA = scoreA + timeScoreA;
      const totalB = scoreB + timeScoreB;

      // Descending order sort
      return totalB - totalA;
    });
  }, [tasks, filter, searchQuery]);

  // Handle saving new task
  const handleSaveTask = async () => {
    if (!title.trim()) return;
    
    // Pseudo parsing of deadline to timestamp (for sorting)
    const deadlineTimestamp = deadlineStr ? new Date(deadlineStr).getTime() : Date.now() + 86400000;

    const taskToSave = {
      title,
      description,
      dateTime,
      deadline: deadlineTimestamp,
      priority,
    };

    // Optimistic UI updates (Reset form and close modal instantly)
    setTitle('');
    setDescription('');
    setDateTime('');
    setDeadlineStr('');
    setPriority('Medium');
    setModalVisible(false);

    // Call add task in background
    await addTask(taskToSave);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        placeholderTextColor={COLORS.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterRow}>
        {['All', 'Pending', 'Completed'].map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f as any)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskCard task={item} onToggle={toggleTaskCompletion} onDelete={deleteTask} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* --- ADD TASK MODAL (Glassmorphism & Proper Fields) --- */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Task</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput style={styles.input} placeholder="Task Title" placeholderTextColor={COLORS.textSecondary} value={title} onChangeText={setTitle} />
              <TextInput style={styles.input} placeholder="Description" placeholderTextColor={COLORS.textSecondary} value={description} onChangeText={setDescription} multiline />
              <TextInput style={styles.input} placeholder="Date & Time (e.g. Tomorrow 10 AM)" placeholderTextColor={COLORS.textSecondary} value={dateTime} onChangeText={setDateTime} />
              <TextInput style={styles.input} placeholder="Deadline (YYYY-MM-DD for sorting)" placeholderTextColor={COLORS.textSecondary} value={deadlineStr} onChangeText={setDeadlineStr} />

              <Text style={styles.label}>Select Priority</Text>
              <View style={styles.priorityRow}>
                {['High', 'Medium', 'Low'].map(p => (
                  <TouchableOpacity key={p} style={[styles.priorityBtn, priority === p && { backgroundColor: COLORS.primary }]} onPress={() => setPriority(p as any)}>
                    <Text style={[styles.priorityText, priority === p && { color: COLORS.background }]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTask}>
                <Text style={styles.saveBtnText}>Save Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20, paddingTop: 60 },
  header: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  searchInput: { backgroundColor: COLORS.surface, color: COLORS.text, padding: 14, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: COLORS.surfaceBorder, fontSize: 16 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  filterBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: COLORS.surface, marginHorizontal: 4, borderWidth: 1, borderColor: 'transparent' },
  filterBtnActive: { borderColor: COLORS.primary, backgroundColor: 'rgba(187, 134, 252, 0.1)' },
  filterText: { color: COLORS.textSecondary, fontWeight: '600' },
  filterTextActive: { color: COLORS.primary },
  fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 5, elevation: 8 },
  fabIcon: { fontSize: 32, color: COLORS.background, fontWeight: 'bold' },
  
  // Modal Styles
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContainer: { height: '80%', backgroundColor: COLORS.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.08)', color: COLORS.text, padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16 },
  label: { color: COLORS.textSecondary, marginBottom: 8, fontSize: 14, fontWeight: '600' },
  priorityRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  priorityBtn: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: COLORS.surface, marginHorizontal: 4, alignItems: 'center' },
  priorityText: { color: COLORS.textSecondary, fontWeight: 'bold' },
  saveBtn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  saveBtnText: { color: COLORS.background, fontSize: 18, fontWeight: 'bold' },
  cancelBtn: { padding: 16, alignItems: 'center' },
  cancelBtnText: { color: COLORS.error, fontSize: 16, fontWeight: 'bold' },
});

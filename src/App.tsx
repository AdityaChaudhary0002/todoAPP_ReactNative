import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { TodoListScreen } from './screens/TodoListScreen';
import { COLORS } from './theme/colors';

import { AuthScreen } from './screens/AuthScreen';

const MainApp = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Show a splash screen or loading spinner in production

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AuthScreen />
      </SafeAreaView>
    );
  }

  // Once navigated to App screens
  return (
    <SafeAreaView style={styles.safeArea}>
      <TodoListScreen />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <MainApp />
      </TaskProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

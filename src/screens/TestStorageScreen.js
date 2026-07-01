import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT_SIZES } from '../constants';

const TestStorageScreen = () => {
  const [status, setStatus] = useState('Not tested');
  const [data, setData] = useState(null);

  const testWrite = async () => {
    try {
      await AsyncStorage.setItem('@test_key', 'Hello AsyncStorage!');
      setStatus('✅ Write successful');
    } catch (error) {
      setStatus(`❌ Write failed: ${error.message}`);
    }
  };

  const testRead = async () => {
    try {
      const value = await AsyncStorage.getItem('@test_key');
      setData(value);
      setStatus(value ? '✅ Read successful' : '⚠️ No data found');
    } catch (error) {
      setStatus(`❌ Read failed: ${error.message}`);
    }
  };

  const testClear = async () => {
    try {
      await AsyncStorage.removeItem('@test_key');
      setStatus('✅ Clear successful');
      setData(null);
    } catch (error) {
      setStatus(`❌ Clear failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Test</Text>
      
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>Status: {status}</Text>
        {data && <Text style={styles.dataText}>Data: {data}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={testWrite}>
        <Text style={styles.buttonText}>Test Write</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={testRead}>
        <Text style={styles.buttonText}>Test Read</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={testClear}>
        <Text style={styles.buttonText}>Clear Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.gray[50],
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 24,
    textAlign: 'center',
  },
  statusBox: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  statusText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[900],
    marginBottom: 8,
  },
  dataText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
  },
  button: {
    backgroundColor: COLORS.primary[600],
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: COLORS.green[600],
  },
  buttonDanger: {
    backgroundColor: COLORS.red[600],
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TestStorageScreen;

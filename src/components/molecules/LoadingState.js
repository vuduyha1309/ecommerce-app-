import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES } from '../../constants';

const LoadingState = ({ message = 'Loading...', style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={COLORS.primary[600]} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    color: COLORS.gray[600],
    marginTop: 16,
  },
});

export default LoadingState;

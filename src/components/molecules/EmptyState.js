import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, FONT_SIZES } from '../../constants';
import Button from '../atoms/Button';

const EmptyState = ({ 
  icon = 'cart-outline',
  title = 'No items found',
  description,
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={64} color={COLORS.gray[300]} />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          style={styles.button}
        />
      )}
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
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    minWidth: 200,
  },
});

export default EmptyState;

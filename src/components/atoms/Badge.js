import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES } from '../../constants';

const Badge = ({ count, variant = 'primary', size = 'medium', style }) => {
  if (!count || count === 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View style={[styles.badge, styles[`badge_${variant}`], styles[`badge_${size}`], style]}>
      <Text style={[styles.text, styles[`text_${size}`]]}>
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
  },
  
  // Variants
  badge_primary: {
    backgroundColor: COLORS.primary[600],
  },
  badge_danger: {
    backgroundColor: COLORS.red[600],
  },
  badge_success: {
    backgroundColor: COLORS.green[600],
  },
  
  // Sizes
  badge_small: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 16,
  },
  badge_medium: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
  },
  badge_large: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
  },
  
  // Text
  text: {
    color: COLORS.white,
    // fontFamily removed to use system default
  },
  text_small: {
    fontSize: 10,
  },
  text_medium: {
    fontSize: 12,
  },
  text_large: {
    fontSize: 14,
  },
});

export default Badge;

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, FONT_SIZES } from '../../constants';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Ionicons name="trash-outline" size={20} color={COLORS.red[600]} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Ionicons 
                name="remove" 
                size={18} 
                color={item.quantity <= 1 ? COLORS.gray[400] : COLORS.gray[700]} 
              />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrement}
            >
              <Ionicons name="add" size={18} color={COLORS.gray[700]} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.total}>${itemTotal}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.gray[50],
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.gray[900],
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  price: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.gray[900],
    paddingHorizontal: 12,
    minWidth: 32,
    textAlign: 'center',
  },
  total: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.gray[900],
  },
});

export default CartItem;

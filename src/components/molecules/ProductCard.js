import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, FONT_SIZES } from '../../constants';
import Button from '../atoms/Button';

const ProductCard = ({ product, onPress, onAddToCart, isInCart }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        {isInCart && (
          <View style={styles.inCartBadge}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.green[600]} />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.rating && (
              <View style={styles.rating}>
                <Ionicons name="star" size={14} color={COLORS.yellow[500]} />
                <Text style={styles.ratingText}>
                  {product.rating.rate} ({product.rating.count})
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.addButton, isInCart && styles.addButtonActive]}
            onPress={handleAddToCart}
          >
            <Ionicons 
              name={isInCart ? "checkmark" : "add"} 
              size={20} 
              color={COLORS.white} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.gray[50],
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inCartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
    color: COLORS.primary[600],
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.gray[900],
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[600],
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: COLORS.primary[600],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonActive: {
    backgroundColor: COLORS.green[600],
  },
});

export default ProductCard;

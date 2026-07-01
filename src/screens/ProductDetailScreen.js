import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks';
import { Button } from '../components/atoms';
import { COLORS, FONTS, FONT_SIZES } from '../constants';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.gray[900]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{product.category}</Text>
            {product.rating && (
              <View style={styles.rating}>
                <Ionicons name="star" size={16} color={COLORS.yellow[500]} />
                <Text style={styles.ratingText}>
                  {product.rating.rate} ({product.rating.count} reviews)
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {inCart ? (
          <View style={styles.footerContent}>
            <View style={styles.inCartInfo}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.green[600]} />
              <Text style={styles.inCartText}>
                {quantity} item{quantity > 1 ? 's' : ''} in cart
              </Text>
            </View>
            <Button
              title="Go to Cart"
              onPress={handleGoToCart}
              style={styles.cartButton}
            />
          </View>
        ) : (
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[900],
  },
  placeholder: {
    width: 32,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary[600],
    textTransform: 'uppercase',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginLeft: 4,
  },
  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 12,
    lineHeight: 32,
  },
  price: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    color: COLORS.primary[600],
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.gray[900],
    marginBottom: 8,
  },
  description: {
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[600],
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    backgroundColor: COLORS.white,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inCartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inCartText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    color: COLORS.gray[900],
    marginLeft: 8,
  },
  cartButton: {
    minWidth: 150,
  },
  addButton: {
    width: '100%',
  },
});

export default ProductDetailScreen;

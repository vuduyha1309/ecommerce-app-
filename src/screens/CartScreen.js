import React from 'react';
import { 
  View, 
  Text,
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks';
import { CartItem, PriceSummary, EmptyState } from '../components/molecules';
import { Button } from '../components/atoms';
import { COLORS, FONTS, FONT_SIZES } from '../constants';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateItemQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    alert('Checkout functionality coming soon!');
  };

  const handleClearCart = () => {
    clearCart();
  };

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onUpdateQuantity={updateItemQuantity}
      onRemove={removeFromCart}
    />
  );

  const renderEmpty = () => (
    <EmptyState
      icon="cart-outline"
      title="Your cart is empty"
      description="Add some products to get started"
      actionLabel="Start Shopping"
      onAction={() => navigation.goBack()}
    />
  );

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
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          {cartItems.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearCart}
            >
              <Ionicons name="trash-outline" size={24} color={COLORS.red[600]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {cartItems.length === 0 ? (
        renderEmpty()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <PriceSummary subtotal={totalPrice} />
            <Button
              title="Proceed to Checkout"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
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
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  checkoutButton: {
    marginTop: 16,
  },
});

export default CartScreen;

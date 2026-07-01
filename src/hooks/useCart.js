import { useCartContext } from '../context/CartContext';

/**
 * Custom hook for cart management
 * Provides all cart operations and computed values
 */
export const useCart = () => {
  const context = useCartContext();

  return {
    // Cart items
    cartItems: context.items,
    
    // Cart operations
    addToCart: context.addItem,
    removeFromCart: context.removeItem,
    updateItemQuantity: context.updateQuantity,
    clearCart: context.clearCart,
    
    // Cart queries
    getItemQuantity: context.getItemQuantity,
    isInCart: context.isInCart,
    
    // Cart computed values
    totalItems: context.getTotalItems(),
    totalPrice: context.getTotalPrice(),
    itemCount: context.items.length,
  };
};

export default useCart;

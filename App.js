import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('ProductList');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigation = {
    navigate: (screenName, params) => {
      if (screenName === 'ProductDetail' && params?.product) {
        setSelectedProduct(params.product);
        setCurrentScreen('ProductDetail');
      } else if (screenName === 'Cart') {
        setCurrentScreen('Cart');
      } else {
        setCurrentScreen(screenName);
      }
    },
    goBack: () => {
      setCurrentScreen('ProductList');
      setSelectedProduct(null);
    },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'ProductDetail':
        return (
          <ProductDetailScreen 
            navigation={navigation} 
            route={{ params: { product: selectedProduct } }} 
          />
        );
      case 'Cart':
        return <CartScreen navigation={navigation} />;
      default:
        return <ProductListScreen navigation={navigation} />;
    }
  };

  return (
    <SafeAreaProvider>
      <CartProvider>
        {renderScreen()}
        <StatusBar style="auto" />
      </CartProvider>
    </SafeAreaProvider>
  );
}

import React from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProducts, useCart, useSearch, usePagination } from '../hooks';
import { ProductCard } from '../components/molecules';
import { SearchInput, Badge } from '../components/atoms';
import { LoadingState, ErrorState, EmptyState } from '../components/molecules';
import { COLORS } from '../constants';

const ProductListScreen = ({ navigation }) => {
  const { products, loading, error, refreshing, refresh } = useProducts();
  const { addToCart, isInCart, totalItems } = useCart();
  const { searchQuery, setSearchQuery, filteredItems } = useSearch(products, ['title', 'category']);
  const { paginatedItems, hasMore, loadMore, reset } = usePagination(filteredItems, 10);

  // Reset pagination when search changes
  React.useEffect(() => {
    reset();
  }, [searchQuery]);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      onAddToCart={handleAddToCart}
      isInCart={isInCart(item.id)}
    />
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.primary[600]} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <EmptyState
        icon="search-outline"
        title="No products found"
        description={searchQuery ? `No results for "${searchQuery}"` : 'No products available'}
      />
    );
  };

  if (loading && paginatedItems.length === 0) {
    return <LoadingState message="Loading products..." />;
  }

  if (error && paginatedItems.length === 0) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
          <Ionicons name="cart-outline" size={28} color={COLORS.gray[900]} />
          <Badge count={totalItems} style={styles.badge} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginatedItems}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={COLORS.primary[600]}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  searchInput: {
    flex: 1,
    marginRight: 12,
  },
  cartButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default ProductListScreen;

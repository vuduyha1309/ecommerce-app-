import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://fakestoreapi.com/products';
const CACHE_KEY = '@products_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

/**
 * Custom hook for fetching and managing products with caching
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load products from cache
  const loadFromCache = async () => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
        
        if (!isExpired && Array.isArray(data)) {
          setProducts(data);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log('Cache load skipped:', err.message);
      return false;
    }
  };

  // Save products to cache
  const saveToCache = async (data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.log('Cache save skipped:', err.message);
    }
  };

  // Fetch products from API
  const fetchProducts = async (useCache = true) => {
    try {
      setError(null);

      // Try to load from cache first
      if (useCache) {
        const cacheLoaded = await loadFromCache();
        if (cacheLoaded) {
          setLoading(false);
          return;
        }
      }

      // Fetch from API
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      
      // Save to cache
      await saveToCache(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh products (force fetch from API)
  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refreshing,
    refresh,
  };
};

export default useProducts;

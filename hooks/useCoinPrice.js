"use client";

import { useState, useEffect } from 'react';
import { fetchCoinPrice } from '@/lib/api/coinPrice';

export function useCoinPrice() {
  const [price, setPrice] = useState({
    usd: null,
    btc: null,
    timestamp: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    const fetchPrice = async () => {
      const result = await fetchCoinPrice();
      setPrice({
        ...result,
        loading: false
      });
    };

    fetchPrice();
    // Refresh price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return price;
}
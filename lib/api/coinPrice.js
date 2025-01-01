// API service for coin price
export async function fetchCoinPrice() {
  try {
    const response = await fetch('https://ubitscan.io/api?module=stats&action=coinprice');
    const data = await response.json();
    
    if (data.status === "1") {
      return {
        usd: data.result.coin_usd,
        btc: data.result.coin_btc,
        timestamp: data.result.coin_usd_timestamp,
        error: null
      };
    }
    
    return {
      usd: null,
      btc: null,
      timestamp: null,
      error: data.message || 'Failed to fetch price'
    };
  } catch (error) {
    return {
      usd: null,
      btc: null,
      timestamp: null,
      error: 'Failed to fetch price'
    };
  }
}
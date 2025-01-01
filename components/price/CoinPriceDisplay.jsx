"use client";

import { useCoinPrice } from '@/hooks/useCoinPrice';
import { Card } from '@/components/ui/card';

export function CoinPriceDisplay() {
  const { usd, btc, error, loading } = useCoinPrice();

  if (loading) {
    return (
      <Card className="p-4 bg-secondary">
        <div className="text-sm text-muted-foreground">Loading price...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 bg-secondary">
        <div className="text-sm text-destructive">Failed to load price</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-secondary">
      <div className="text-sm text-muted-foreground">USC Price</div>
      <div className="text-2xl font-bold">
        ${usd} / {btc} BTC
      </div>
    </Card>
  );
}
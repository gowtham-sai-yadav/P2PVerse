"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from 'date-fns';
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "../../style/custom.module.scss"

export default function MyAdsPage() {
  const { user } = useAuth();
  const [selectedCoin, setSelectedCoin] = useState("all");
  const [selectedAction, setSelectedAction] = useState("buy");
  const [ads, setAds] = useState([]);

  const fetchMyAds = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/ads/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setAds(data);
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchMyAds();
  }, [fetchMyAds]);

  const handleActionBuy = () => {
    setSelectedAction("buy");
  };

  const handleActionSell = () => {
    setSelectedAction("sell");
  };

  const updateAdStatus = async (adId, newStatus) => {
    try {
      const response = await fetch(`/api/ads/${adId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setAds(ads.map(ad => 
          ad._id === adId ? { ...ad, status: newStatus } : ad
        ));
        
        toast({
          title: "Success",
          description: `Ad marked as ${newStatus}`,
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ad status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4 mr-1" /> Open
        </span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <CheckCircle className="w-4 h-4 mr-1" /> Completed
        </span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-4 h-4 mr-1" /> Cancelled
        </span>;
      default:
        return null;
    }
  };

  const filteredListings = selectedCoin === "all" 
    ? ads.filter(listing => listing.action === selectedAction.toLowerCase())
    : ads.filter(listing => 
        listing.coinType === selectedCoin && 
        listing.action === selectedAction.toLowerCase()
      );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Ads</h1>
        <Select value={selectedCoin} onValueChange={setSelectedCoin}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select coin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Coins</SelectItem>
            <SelectItem value="UBIT">UBIT</SelectItem>
            <SelectItem value="USC">USC</SelectItem>
            <SelectItem value="ULTRAVERSE">Ultraverse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 mb-8">
        <Button
          onClick={handleActionBuy}
          variant={selectedAction === "buy" ? "default" : "outline"}
        >
          Buy
        </Button>
        <Button
          onClick={handleActionSell}
          variant={selectedAction === "sell" ? "default" : "outline"}
        >
          Sell
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredListings.map((ad) => (
          <Card key={ad._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{ad.coinType}</h3>
                  {getStatusBadge(ad.status)}
                </div>
                <p className="text-muted-foreground">Price: ${ad.price}</p>
                <p className="text-muted-foreground">Quantity: {ad.quantity}</p>
                <p className="text-muted-foreground">Type: {ad.action}</p>
              </div>
              <div>
                {ad.status === 'open' && (
                  <>
                    <Button
                      onClick={() => updateAdStatus(ad._id, 'completed')}
                      variant="outline"
                      className={`bg-green-500 text-white hover:bg-green-600 ${styles.myAdsAction}`}
                    >
                      Mark Completed
                    </Button>
                    <Button
                      onClick={() => updateAdStatus(ad._id, 'cancelled')}
                      variant="outline"
                      className={`bg-red-500 mx-2 text-white hover:bg-red-600 ${styles.myAdsAction}`}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                 <p className="mt-2 text-end">
                     {format(new Date(ad.createdAt), 'dd-MM-yy HH:mm:ss')}
                </p>
              </div>
            </div>
          </Card>
        ))}
        {filteredListings.length === 0 && (
          <p className="text-center text-muted-foreground">
            No {selectedAction} ads found for {selectedCoin === "all" ? "any coin" : selectedCoin}
          </p>
        )}
      </div>
    </div>
  );
} 
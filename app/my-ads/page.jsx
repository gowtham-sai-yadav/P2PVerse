"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function MyAdsPage() {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMyAds();
    }
  }, [user]);

  const fetchMyAds = async () => {
    try {
      const response = await fetch(`/api/ads/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setAds(data);
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const updateAdStatus = async (adId, newStatus) => {
    try {
      const response = await fetch(`/api/ads/${adId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchMyAds(); // Refresh ads list
        toast({
          title: "Success",
          description: `Ad marked as ${newStatus}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ad status",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Ads</h1>
      <div className="grid gap-4">
        {ads.map((ad) => (
          <Card key={ad._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{ad.coinType}</h3>
                  {getStatusIcon(ad.status)}
                </div>
                <p className="text-muted-foreground">Price: ${ad.price}</p>
                <p className="text-muted-foreground">Quantity: {ad.quantity}</p>
                <p className="text-muted-foreground">Type: {ad.action}</p>
              </div>
              <div className="space-x-2">
                {ad.status === 'open' && (
                  <>
                    <Button 
                      onClick={() => updateAdStatus(ad._id, 'completed')}
                      variant="outline"
                    >
                      Mark Completed
                    </Button>
                    <Button 
                      onClick={() => updateAdStatus(ad._id, 'cancelled')}
                      variant="outline"
                      className="text-yellow-500"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
        {ads.length === 0 && (
          <p className="text-center text-muted-foreground">No ads found</p>
        )}
      </div>
    </div>
  );
} 
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoinPriceDisplay } from "@/components/price/CoinPriceDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from '../../style/custom.module.scss';

export default function TradePage() {
  const [selectedCoin, setSelectedCoin] = useState("all");
  const [selectedAction, setSelectedAction] = useState("Buy");
  const [ads, setAds] = useState([]);

  const handleActionBuy = () => {
    setSelectedAction("Buy");
  };

  const handleActionSell = () => {
    setSelectedAction("Sell");
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/postAd');
        if (response.ok) {
          const data = await response.json();
          setAds(data);
          console.log('Fetched ads:', data); // Debugging line
        } else {
          console.error('Failed to fetch ads');
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    

    fetchAds();
  }, []);

  useEffect(() => {
   console.log("ebfr", ads)
  }, [ads]);
  

  const filteredListings = selectedCoin === "all" 
    ? ads.filter(listing => listing.action === selectedAction) 
    : ads.filter(listing => listing.coinType === selectedCoin && listing.action === selectedAction);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">P2P Trading</h1>
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

      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Live Market Prices</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">UBIT/INR</div>
              <div className="text-2xl font-bold">₹7.20 / $0.08</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">USC/INR</div>
              <div className="text-2xl font-bold">₹270.00 / $3.00</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">ULTRAVERSE/INR</div>
              <div className="text-2xl font-bold">₹270.00 / $3.00</div>
            </div>
          </div>
        </div>
      </Card>

      <div className={styles.choose}>
        <div className={styles.choosecard} onClick={handleActionBuy}>Buy</div>
        <div className={styles.choosecard} onClick={handleActionSell}>Sell</div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Price (INR)</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.coinType}</TableCell>
                <TableCell>₹{listing.price}</TableCell>
                <TableCell>{listing.quantity}</TableCell>
                <TableCell>{listing.userName}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Contact Seller
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

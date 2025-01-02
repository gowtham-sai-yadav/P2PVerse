import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Users, Wallet } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to P2PVerse
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          The secure way to trade UBIT, USC, and Ultraverse Coins peer-to-peer
        </p>
        <p className=" mb-4">
          For Better Experience Open in Laptop/Computer
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/trade">
            <Button size="lg">
              Start Trading <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/post-ad">
            <Button size="lg" variant="outline">
              Post an Ad
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <Shield className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
          <p className="text-muted-foreground">
            KYC verification ensures safe and legitimate trading between users
          </p>
        </Card>
        <Card className="p-6">
          <Users className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Direct P2P</h3>
          <p className="text-muted-foreground">
            Connect directly with other traders for the best deals
          </p>
        </Card>
        <Card className="p-6">
          <Wallet className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Multiple Coins</h3>
          <p className="text-muted-foreground">
            Trade UBIT, USC, and Ultraverse Coins at competitive prices
          </p>
        </Card>
      </div>
     <div>
      <p className="text-xl text-center text-muted-foreground mt-16">
          Made with love ❤️ by Gowtham for the Community
        </p>
        </div>
        <div>
      <p className="text-xl text-center text-muted-foreground mt-2">
              For Feedback - gowthamyadav022@gmail.com / +91 9391758678
        </p>
        </div>
        
    </div>
  );
}
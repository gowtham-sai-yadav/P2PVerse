"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function KYCVerificationForm({ isVerified, onUpload }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">KYC Verification</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="aadhar">Aadhar Card</Label>
          <Input id="aadhar" type="file" className="cursor-pointer" />
        </div>
        <div>
          <Label htmlFor="pan">PAN Card</Label>
          <Input id="pan" type="file" className="cursor-pointer" />
        </div>
        <div>
          <Label htmlFor="selfie">Selfie</Label>
          <Input id="selfie" type="file" className="cursor-pointer" />
        </div>
        <Button 
          className="w-full" 
          onClick={onUpload}
          disabled={isVerified}
        >
          {isVerified ? "Verified" : "Submit for Verification"}
        </Button>
      </div>
    </Card>
  );
}
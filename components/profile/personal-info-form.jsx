"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter your phone number" />
        </div>
        <Button className="w-full">Update Profile</Button>
      </div>
    </Card>
  );
}
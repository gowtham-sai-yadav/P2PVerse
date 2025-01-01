"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { KYCVerificationForm } from "@/components/profile/kyc-verification-form";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const handleFileUpload = () => {
    toast({
      title: "Documents Uploaded",
      description: "Your documents have been submitted for verification.",
    });
  };

  const handleLogout = () => {
    // Here you would clear the user's session/tokens
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/auth/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile & Verification</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <PersonalInfoForm />
        <KYCVerificationForm isVerified={isVerified} onUpload={handleFileUpload} />
      </div>
    </div>
  );
}
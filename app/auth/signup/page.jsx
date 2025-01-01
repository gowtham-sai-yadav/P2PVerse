"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emailOtp: "",
    phoneOtp: "",
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "Please check your email and phone for OTP verification.",
        });
        setStep(2);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user);
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        router.push("/");
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        
        {step === 1 ? (
          <form onSubmit={handleSubmitDetails} className="space-y-4">
            <div>
              <label className="block mb-2">First Name</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Last Name</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Phone Number</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block mb-2">Email OTP</label>
              <Input
                type="text"
                name="emailOtp"
                value={formData.emailOtp}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Phone OTP</label>
              <Input
                type="text"
                name="phoneOtp"
                value={formData.phoneOtp}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
} 
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { isValidPhoneNumber } from 'libphonenumber-js';
import { LoadingButton } from "@/components/ui/loading-button";

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
    emailOtp: ""
  });
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Name validation
    if (formData.firstName.trim().length < 2) {
      toast({
        title: "Error",
        description: "First name must be at least 2 characters long",
        variant: "destructive",
      });
      return false;
    }

    if (formData.lastName.trim().length < 2) {
      toast({
        title: "Error",
        description: "Last name must be at least 2 characters long",
        variant: "destructive",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    // Phone validation
    try {
      if (!isValidPhoneNumber(formData.phone, 'IN')) { // 'IN' for India, adjust if needed
        toast({
          title: "Error",
          description: "Please enter a valid phone number",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "Please check your email for OTP verification.",
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        
        {step === 1 ? (
          <form onSubmit={handleSubmitDetails} className="space-y-4">
            <div>
              <label className="block mb-2">First Name <span className="text-red-500">*</span></label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block mb-2">Last Name <span className="text-red-500">*</span></label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block mb-2">Email <span className="text-red-500">*</span></label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-2">Phone Number <span className="text-red-500">*</span></label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block mb-2">Password <span className="text-red-500">*</span></label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter password (min. 8 characters)"
              />
            </div>
            <div>
              <label className="block mb-2">Confirm Password <span className="text-red-500">*</span></label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Confirm your password"
              />
            </div>
            <LoadingButton type="submit" className="w-full" loading={isLoading}>
              Send OTP
            </LoadingButton>
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
            {/* <div>
              <label className="block mb-2">Phone OTP</label>
              <Input
                type="text"
                name="phoneOtp"
                value={formData.phoneOtp}
                onChange={handleChange}
                required
              />
            </div> */}
            <LoadingButton type="submit" className="w-full" loading={isLoading}>
              Verify OTP
            </LoadingButton>
          </form>
        )}
      </Card>
    </div>
  );
} 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/ui/loading-button";
import { isValidPhoneNumber } from 'libphonenumber-js';

export function PostAdForm({ onSubmit }) {
  const { user } = useAuth();
  const form = useForm({
    defaultValues: {
      coinType: "",
      action: "",
      price: "",
      quantity: "",
      contactNumber: "",
      email: "",
    },
    // Add validation rules
    resolver: async (data) => {
      const errors = {};
      if (!data.coinType) errors.coinType = { message: "Coin type is required" };
      if (!data.action) errors.action = { message: "Buy/Sell selection is required" };
      if (!data.price) errors.price = { message: "Price is required" };
      if (!data.quantity) errors.quantity = { message: "Quantity is required" };
      if (!data.contactNumber) errors.contactNumber = { message: "Contact number is required" };
      if (!data.email) errors.email = { message: "Email is required" };
      
      return {
        values: data,
        errors,
      };
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (data) => {
    // Coin type validation
    if (!data.coinType) {
      toast({
        title: "Error",
        description: "Please select a coin type",
        variant: "destructive",
      });
      return false;
    }

    // Action validation
    if (!data.action) {
      toast({
        title: "Error",
        description: "Please select buy or sell",
        variant: "destructive",
      });
      return false;
    }

    // Price validation
    if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return false;
    }

    // Quantity validation
    if (!data.quantity || isNaN(data.quantity) || parseFloat(data.quantity) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return false;
    }

    // Phone number validation
    try {
      if (!isValidPhoneNumber(data.contactNumber, 'IN')) {
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleposting = async (data) => {
    if (!validateForm(data)) {
      return;
    }

    setIsLoading(true);
    try {
      const formValues = form.getValues();
      const response = await fetch('/api/postAd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
          action: formValues.action.toLowerCase(),
          userId: user.id,
          userName: `${user.firstName} ${user.lastName}`,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        onSubmit(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to post advertisement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Form {...form}>
      <form 
        className="space-y-8 w-full" 
        onSubmit={form.handleSubmit(handleposting)}
      >
        <FormField
          control={form.control}
          name="coinType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Coin Type <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select coin type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USC">USC</SelectItem>
                  <SelectItem value="ULTRAVERSE">Ultraverse</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Buy / Sell <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Buy / Sell" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Price per Coin (INR) <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quantity <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Contact Number <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="tel"
                  placeholder="Enter your phone number" 
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} type="email"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton 
          type="submit" 
          className="w-full" 
          loading={isLoading}
        >
          Post Advertisement
        </LoadingButton>
      </form>
    </Form>
  );
}

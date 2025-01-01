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
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";

export function PostAdForm({ form, onSubmit }) {
  const { user } = useAuth();

  const handleposting = async () => {
    const response = await fetch('/api/postAd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form.getValues(),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      onSubmit(data);
    } else {
      const errorData = await response.json();
      console.error('Failed to post ad:', errorData.message);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleposting)} className="space-y-8">
        <FormField
          control={form.control}
          name="coinType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coin Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coin type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UBIT">UBIT</SelectItem>
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
            <FormItem>
              <FormLabel>Buy / Sell</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
            <FormItem>
              <FormLabel>Price per Coin (INR)</FormLabel>
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
            <FormItem>
              <FormLabel>Quantity</FormLabel>
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
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" onClick={handleposting}>
          Post Advertisement
        </Button>
      </form>
    </Form>
  );
}

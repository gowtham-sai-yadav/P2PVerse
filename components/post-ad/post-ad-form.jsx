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
import { LoadingButton } from "@/components/ui/loading-button";

export function PostAdForm({ onSubmit }) {
  const { user } = useAuth();
  const form = useForm({
    // ... existing form configuration ...
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleposting = async () => {
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
        description: error.message || "Failed to post ad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Form {...form}>
      <form className="space-y-8">
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

        <LoadingButton 
          type="submit" 
          className="w-full" 
          onClick={handleposting}
          loading={isLoading}
        >
          Post Advertisement
        </LoadingButton>
      </form>
    </Form>
  );
}

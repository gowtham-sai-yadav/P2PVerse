"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { PostAdForm } from "@/components/post-ad/post-ad-form";
import { useState } from "react";
import { Action } from "@radix-ui/react-toast";
import styles from "../../style/custom.module.scss"

const formSchema = z.object({
  coinType: z.string(),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  contactNumber: z.string().min(10, "Invalid contact number"),
  email: z.string().email("Invalid email address"),
  buyOrSell: z.string(),
});

export default function PostAdPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coinType: "",
      action: "",
      price: "",
      quantity: "",
      contactNumber: "",
      email: ""
      
    },
  });

  const [isPosted, setIsPosted] = useState(false);

  function onSubmit(values) {
    toast({
      title: "Ad Posted Successfully",
      description: "Your P2P trading advertisement has been posted.",
    });
    setIsPosted(true);
    console.log("rrtuvrhuvt", form.getValues());
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post a P2P Trading Ad</h1>
      <Card className={`max-w-2xl mx-auto p-6 ${styles.formContainer}`}>
        {!isPosted ? (<PostAdForm form={form} onSubmit={onSubmit} />) : (<h1>Ad has been Posted...</h1>)}
      </Card>
    </div>
  );
}
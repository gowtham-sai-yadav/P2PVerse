"use client";

import { AuthProvider } from "@/contexts/AuthContext";

export function ClientProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
} 
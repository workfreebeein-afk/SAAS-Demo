"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { StorageAPI, initializeStorage } from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_CREDENTIALS = { email: "demo@jcscrm.com", password: "demo123" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const currentUser = StorageAPI.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 1200));
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const users = StorageAPI.getUsers();
      const found = users.find(u => u.email === email);
      if (found) {
        setUser(found);
        StorageAPI.setCurrentUser(found);
        return { success: true };
      }
    }
    const users = StorageAPI.getUsers();
    const found = users.find(u => u.email === email);
    if (found) {
      setUser(found);
      StorageAPI.setCurrentUser(found);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Try demo@jcscrm.com / demo123" };
  };

  const logout = () => {
    setUser(null);
    StorageAPI.setCurrentUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

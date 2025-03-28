"use client";

import { Authenticate, AuthenticateResponse, TestAuthRequest } from "@/lib/dtos";
import { JsonApiClient, JsonServiceClient } from "@servicestack/client";
import { usePathname } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

interface AuthContextData {
  user?: AuthenticateResponse;
  getClient: () => JsonServiceClient | undefined;
  login: (userName: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// useAuth Hook
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// AuthProvider Component
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useLocalStorage<AuthenticateResponse | undefined>("user", undefined);
  const clientRef = useRef<JsonServiceClient | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const client = JsonApiClient.create(process.env.NEXT_PUBLIC_API_URL as string);

    client.onAuthenticationRequired = async () => {
      setUser(undefined);
      console.log("Authentication required");
      return Promise.resolve();
    };
    clientRef.current = client;
  }, [pathname]);

  const getClient = () => clientRef.current;

  const clearError = () => setError(null);

  const login = async (userName: string, password: string, rememberMe: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const req = new Authenticate({
        provider: "credentials",
        userName,
        password,
        rememberMe,
      });
      const client = getClient();
      if (!client) throw new Error("Client not initialized");

      const response = await client.api(req);
      if (response?.error) throw response.error;
      if (!response || !response.response) throw new Error("No response from server");

      setUser(response.response);
      console.log(response.response);

      const test = await client.get(new TestAuthRequest());
      console.log(test);

    } catch (error:any) {
      setUser(undefined);
      setError(  error?.message ?? 'An unexpected error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = getClient();
      if (!client) throw new Error("Client not initialized");

      await client.api(new Authenticate({ provider: "logout" }));
      setUser(undefined);
    } catch (error) {
      console.error("Logout failed", error);
      setError(error instanceof Error ? error.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

 

  const value = {
    user,
    getClient,
    login,
    logout,
    loading,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

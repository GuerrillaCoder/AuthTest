"use client";

import { Authenticate, AuthenticateResponse } from "@/lib/dtos";
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

  const login = async (userName: string, password: string, rememberMe: boolean) => {
    setLoading(true);
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


      // checking the user has companies or resellers
    
    } catch (error) {
      console.error(error);
      setUser(undefined);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const client = getClient();
      if (!client) throw new Error("Client not initialized");

      await client.api(new Authenticate({ provider: "logout" }));
      setUser(undefined);
    } catch (error) {
      console.error("Logout failed", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

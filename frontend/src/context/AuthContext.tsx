import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/api/auth";

/* =====================
   TYPES
===================== */

export interface User {
  id?: number;        // optional because backend doesn't return it on login
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => void;
}


/* =====================
   CONTEXT
===================== */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =====================
   PROVIDER
===================== */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /* =====================
     LOGIN
  ===================== */

  const login = async (data: { email: string; password: string }): Promise<boolean> => {
  const result = await authApi.login(data);

  const accessToken = result.access_token;
  if (!accessToken) {
    throw new Error("No access token received");
  }

  localStorage.setItem("access_token", accessToken);

  const fakeUser = {
    name: data.email.split("@")[0],
    email: data.email,
  };

  localStorage.setItem("user", JSON.stringify(fakeUser));
  setUser(fakeUser);

  return true;
};

  /* =====================
     SIGNUP
  ===================== */

  const signup = async (data: any) => {
    await authApi.signup(data);
  };

  /* =====================
     LOGOUT
  ===================== */

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  /* =====================
     REFRESH USER
  ===================== */

  const refreshUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =====================
   HOOK
===================== */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

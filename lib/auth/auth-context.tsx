"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: "ADMINISTRADOR" | "CONTADOR" | "TESORERIA" | "OPERADOR";
  avatarInitials: string;
}

export interface CompanyProfile {
  id: string;
  legalName: string;
  commercialName: string;
  taxId: string; // RUC
  address: string;
  phone: string;
  email: string;
  currency: "PEN" | "USD";
  currencySymbol: string;
  accountingPeriod: string;
}

interface AuthContextType {
  user: UserProfile | null;
  company: CompanyProfile;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  registerUserAndCompany: (user: Partial<UserProfile>, comp: Partial<CompanyProfile>) => void;
}

const DEFAULT_COMPANY: CompanyProfile = {
  id: "comp-001",
  legalName: "LIBERTAD S.A.",
  commercialName: "FINCONT Demo S.A.C.",
  taxId: "20304050601",
  address: "Calle Industrial 2429 - Trujillo, Perú",
  phone: "+51 (044) 284-920",
  email: "contacto@libertad.pe",
  currency: "PEN",
  currencySymbol: "S/",
  accountingPeriod: "2025 - Diciembre",
};

const DEFAULT_USER: UserProfile = {
  id: "usr-001",
  name: "Juan",
  lastName: "Martínez",
  email: "demo@fincont.pe",
  role: "ADMINISTRADOR",
  avatarInitials: "JM",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [company, setCompany] = useState<CompanyProfile>(DEFAULT_COMPANY);

  useEffect(() => {
    // Check localStorage if available
    try {
      const savedUser = localStorage.getItem("fincont_user");
      const savedCompany = localStorage.getItem("fincont_company");
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedCompany) setCompany(JSON.parse(savedCompany));
    } catch {
      // ignore
    }
  }, []);

  const login = (email: string) => {
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: email.split("@")[0].toUpperCase(),
      lastName: "Administrador",
      email: email,
      role: "ADMINISTRADOR",
      avatarInitials: email.substring(0, 2).toUpperCase(),
    };
    setUser(newUser);
    localStorage.setItem("fincont_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fincont_user");
  };

  const registerUserAndCompany = (newUser: Partial<UserProfile>, newComp: Partial<CompanyProfile>) => {
    const finalUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: newUser.name || "Usuario",
      lastName: newUser.lastName || "Demo",
      email: newUser.email || "usuario@fincont.pe",
      role: "ADMINISTRADOR",
      avatarInitials: ((newUser.name?.[0] || "U") + (newUser.lastName?.[0] || "D")).toUpperCase(),
    };

    const finalComp: CompanyProfile = {
      ...DEFAULT_COMPANY,
      ...newComp,
      id: "comp-" + Date.now(),
    };

    setUser(finalUser);
    setCompany(finalComp);
    localStorage.setItem("fincont_user", JSON.stringify(finalUser));
    localStorage.setItem("fincont_company", JSON.stringify(finalComp));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        isAuthenticated: !!user,
        login,
        logout,
        registerUserAndCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

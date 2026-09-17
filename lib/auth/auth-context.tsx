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

export interface RegisteredAccount {
  email: string;
  password?: string;
  user: UserProfile;
  company: CompanyProfile;
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

const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  {
    email: "demo@fincont.pe",
    password: "admin123",
    user: DEFAULT_USER,
    company: DEFAULT_COMPANY,
  },
  {
    email: "cristhianpuescas@gmail.com",
    password: "admin",
    user: {
      id: "usr-cp",
      name: "Cristhian",
      lastName: "Puescas",
      email: "cristhianpuescas@gmail.com",
      role: "ADMINISTRADOR",
      avatarInitials: "CP",
    },
    company: DEFAULT_COMPANY,
  },
];

const getStoredAccounts = (): RegisteredAccount[] => {
  if (typeof window === "undefined") return DEFAULT_ACCOUNTS;
  try {
    const raw = localStorage.getItem("fincont_accounts");
    if (!raw) {
      localStorage.setItem("fincont_accounts", JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACCOUNTS;
  } catch {
    return DEFAULT_ACCOUNTS;
  }
};

const saveAccount = (account: RegisteredAccount) => {
  if (typeof window === "undefined") return;
  try {
    const accounts = getStoredAccounts();
    const index = accounts.findIndex(
      (a) => a.email.toLowerCase() === account.email.trim().toLowerCase()
    );
    if (index >= 0) {
      accounts[index] = account;
    } else {
      accounts.push(account);
    }
    localStorage.setItem("fincont_accounts", JSON.stringify(accounts));
  } catch (err) {
    console.error("Error saving account to fincont_accounts:", err);
  }
};

interface AuthContextType {
  user: UserProfile | null;
  company: CompanyProfile;
  isAuthenticated: boolean;
  login: (email: string, pass?: string) => { success: boolean; error?: string };
  logout: () => void;
  registerUserAndCompany: (
    user: Partial<UserProfile>,
    comp: Partial<CompanyProfile>,
    password?: string
  ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [company, setCompany] = useState<CompanyProfile>(DEFAULT_COMPANY);

  useEffect(() => {
    const loadAuth = () => {
      try {
        const savedUser = localStorage.getItem("fincont_user");
        const savedCompany = localStorage.getItem("fincont_company");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(DEFAULT_USER);
        }
        if (savedCompany) {
          setCompany(JSON.parse(savedCompany));
        } else {
          setCompany(DEFAULT_COMPANY);
        }
      } catch {
        // ignore
      }
    };

    loadAuth();

    const handleAuthChange = () => {
      loadAuth();
    };

    window.addEventListener("fincont_auth_updated", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("fincont_auth_updated", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const login = (email: string, pass?: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const accounts = getStoredAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (found) {
      // Validate password if configured and passed
      if (pass && found.password && found.password !== pass) {
        return { success: false, error: "Contraseña incorrecta." };
      }
      setUser(found.user);
      setCompany(found.company);
      localStorage.setItem("fincont_user", JSON.stringify(found.user));
      localStorage.setItem("fincont_company", JSON.stringify(found.company));
      window.dispatchEvent(new Event("fincont_auth_updated"));
      return { success: true };
    }

    // If account not registered in list, derive user dynamically from email
    const prefix = cleanEmail.split("@")[0] || "Usuario";
    const formattedName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    const initials = (formattedName.slice(0, 2) || "US").toUpperCase();
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: formattedName,
      lastName: "Usuario",
      email: email.trim(),
      role: "ADMINISTRADOR",
      avatarInitials: initials,
    };

    const newComp = DEFAULT_COMPANY;
    saveAccount({
      email: cleanEmail,
      password: pass || "",
      user: newUser,
      company: newComp,
    });

    setUser(newUser);
    setCompany(newComp);
    localStorage.setItem("fincont_user", JSON.stringify(newUser));
    localStorage.setItem("fincont_company", JSON.stringify(newComp));
    window.dispatchEvent(new Event("fincont_auth_updated"));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fincont_user");
    window.dispatchEvent(new Event("fincont_auth_updated"));
  };

  const registerUserAndCompany = (
    newUser: Partial<UserProfile>,
    newComp: Partial<CompanyProfile>,
    password?: string
  ) => {
    const name = newUser.name?.trim() || "Usuario";
    const lastName = newUser.lastName?.trim() || "";
    const initials = (
      (name[0] || "U") + (lastName[0] || name[1] || "P")
    ).toUpperCase();

    const finalUser: UserProfile = {
      id: "usr-" + Date.now(),
      name,
      lastName,
      email: newUser.email?.trim() || "usuario@fincont.pe",
      role: "ADMINISTRADOR",
      avatarInitials: initials,
    };

    const finalComp: CompanyProfile = {
      ...DEFAULT_COMPANY,
      ...newComp,
      id: "comp-" + Date.now(),
    };

    saveAccount({
      email: finalUser.email.toLowerCase(),
      password: password || "",
      user: finalUser,
      company: finalComp,
    });

    setUser(finalUser);
    setCompany(finalComp);
    localStorage.setItem("fincont_user", JSON.stringify(finalUser));
    localStorage.setItem("fincont_company", JSON.stringify(finalComp));
    window.dispatchEvent(new Event("fincont_auth_updated"));
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

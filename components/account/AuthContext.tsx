"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* ──────────────────────────────────────────────
   احرازِ هویتِ نمایشی (فاز ۱) — بدونِ backend. سشن در localStorage ذخیره می‌شود تا
   با ریلود و جابه‌جاییِ صفحات بماند. ورودِ واقعی (Better Auth / OTP) فازِ بعد است.

   حسابِ نمایشی: موبایل ۰۹۱۲۲۴۰۳۶۶۲ + کُدِ یک‌بارمصرفِ ۱۲۳۴۵۶.
   ────────────────────────────────────────────── */

export type AccountUser = {
  firstName: string;
  lastName: string;
  email: string;
  /** نمایشی، با پیش‌شمارهٔ کشور — مثلِ "+98 9122403662" */
  phone: string;
  title: string;
  country: string;
};

/** حسابِ نمایشیِ از پیش‌ساخته — تنها حسابی که در فاز ۱ می‌تواند وارد شود. */
export const DEMO_USER: AccountUser = {
  firstName: "سپهر",
  lastName: "سیمیاری",
  email: "simiyarisepehr@gmail.com",
  phone: "+98 9122403662",
  title: "آقا",
  country: "ایران",
};

/** شمارهٔ موبایلِ مجازِ حسابِ نمایشی (۱۰ رقمِ بدونِ صفر/پیش‌شماره). */
export const DEMO_PHONE = "9122403662";
/** کُدِ یک‌بارمصرفِ نمایشی. */
export const DEMO_OTP = "12345";

/** هر ورودیِ شماره را به ۱۰ رقمِ خالص (بدونِ +۹۸/۰/فاصله) نرمال می‌کند. */
export function normalizePhone(input: string): string {
  return input
    .replace(/\D/g, "")
    .replace(/^98/, "")
    .replace(/^0/, "");
}

type AuthContextValue = {
  user: AccountUser | null;
  /** پس از خواندنِ localStorage true می‌شود (تا گیتِ صفحات قبلش ریدایرکت نکند). */
  ready: boolean;
  login: (user?: AccountUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "gj-auth-v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [ready, setReady] = useState(false);

  // بارگذاری از localStorage (یک‌بار پس از mount)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AccountUser);
    } catch {
      /* نادیده */
    }
    setReady(true);
  }, []);

  const login = (u: AccountUser = DEMO_USER) => {
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* نادیده */
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* نادیده */
    }
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید درونِ <AuthProvider> استفاده شود");
  return ctx;
}

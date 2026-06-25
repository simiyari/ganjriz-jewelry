import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "حساب کاربری", template: "%s | حساب کاربری" },
  robots: { index: false, follow: false },
};

export default function AccountSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

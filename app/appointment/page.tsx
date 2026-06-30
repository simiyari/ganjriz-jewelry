import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppointmentBooking from "@/components/appointment/AppointmentBooking";

export const metadata: Metadata = {
  title: "رزرو وقت حضوری",
  description:
    "برای مشاورهٔ خصوصی، رویتِ نزدیکِ مجموعه‌ها و راهنماییِ کارشناسانِ گنج‌ریز، در یکی از شعبه‌های کرج وقتِ حضوری رزرو کنید.",
};

export default function AppointmentPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <AppointmentBooking />
      </main>
      <Footer breadcrumb={[{ label: "خانه", href: "/" }, { label: "رزرو وقت حضوری" }]} />
    </>
  );
}

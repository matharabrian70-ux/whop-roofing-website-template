import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoofFlow Roofing — Built Right. Protected for Years.",
  description: "A production-ready roofing website template built on Whop Websites.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import "./globals.css";
import { mono } from "@/fonts/font";

export const metadata = {
  title: "counterfeit",
  description: "Product mix-ups made with Midjourney.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mono.className}>{children}</body>
    </html>
  );
}

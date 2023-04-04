import "./globals.css";
import { mono } from "@/fonts/font";

export const metadata = {
  title: "counterfeit",
  description:
    "These products do not exist. Product mix-ups made with Midjourney by @andynbrooker.",
  twitter: {
    creator: "@andynbrooker",
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://counterfeit.design",
    title: "counterfeit",
    description:
      "These products do not exist. Product mix-ups made with Midjourney by @andynbrooker.",
    images: "https://counterfeit.design/og.png",
  },
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

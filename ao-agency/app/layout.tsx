import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "ao agency",
  description: "ao agency is a digital marketing agency that helps clients grow their business online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

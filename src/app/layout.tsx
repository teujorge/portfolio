import { Analytics } from "@vercel/analytics/react";
import { Nunito } from "next/font/google";
import App from "./app";
import "~/styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Matheus's Portfolio",
  description:
    "Explore my experience and background with software engineering. Browse through my projects and accomplishments to learn more about my skills and expertise.",
  icons: { icon: "/images/mjIcon.webp" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <App>{children}</App>
        <Analytics />
      </body>
    </html>
  );
}

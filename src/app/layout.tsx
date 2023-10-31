import { Nunito } from "next/font/google";
import "~/styles/globals.css";
import App from "./app";
import Head from "next/head";

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
      <Head>
        <meta
          name="ahrefs-site-verification"
          content="9edc99c9920327d31526354a0013ef033ab3ba9aa979a4f9e9d6b5d0fa43adc2"
        />
      </Head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}

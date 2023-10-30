import { EggHeader } from "./components/EggHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EggHeader />
      {children}
    </>
  );
}

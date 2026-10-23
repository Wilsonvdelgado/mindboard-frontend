import { MbNavBar } from "@/src/components/mbNavBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pt-14">
      <MbNavBar />
      {children}
    </main>
  );
}

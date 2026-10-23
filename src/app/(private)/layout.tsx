import { AuthProvider } from "@/src/auth/AuthProvider";
import { PrivateLayoutContent } from "./privateLayoutContent";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex h-screen flex-col">
        <PrivateLayoutContent>{children}</PrivateLayoutContent>
      </div>
    </AuthProvider>
  );
}

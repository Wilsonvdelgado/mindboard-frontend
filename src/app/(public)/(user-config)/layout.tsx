import { MbNavBar } from "@/src/components/mbNavBar";

export default function LayoutLoginForm({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-gray-50">
      {/* Imagem lateral */}
      <div
        className="hidden w-1/2 bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/vector-1738918824734-80b942e4c308?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {children}
    </div>
  );
}

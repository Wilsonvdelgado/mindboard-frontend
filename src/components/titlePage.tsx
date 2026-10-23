interface TitlePageProps {
  children: React.ReactNode;
}
export function TitlePage({ children }: TitlePageProps) {
  return (
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
      {children}
    </h1>
  );
}

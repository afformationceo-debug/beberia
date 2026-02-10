import { Header } from "@/components/layout/header";
import { BottomTabNav } from "@/components/layout/bottom-tab-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <BottomTabNav />
    </div>
  );
}

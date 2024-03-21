import { HomeNavbar } from '@/components/homeNavbar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <header>
        <HomeNavbar />
      </header>
      <main>
        <div className="bg-zinc-100 rounded-3xl p-5">{children}</div>
      </main>
    </div>
  );
}

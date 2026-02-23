export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: Add admin sidebar, header, etc. */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

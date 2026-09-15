export const metadata = {
  robots: { index: false, follow: false },
  title: "Admin",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink text-bone font-body">
      {children}
    </div>
  );
}

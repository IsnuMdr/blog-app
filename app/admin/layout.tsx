import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/admin">
              <h1 className="text-3xl font-bold text-gray-900">
                MDRHub Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your blog posts and content
              </p>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button className="bg-indigo-600 text-white">
                  View Portal
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

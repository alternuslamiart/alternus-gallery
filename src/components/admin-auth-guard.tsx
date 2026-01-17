"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem("adminAuth");

    if (adminAuth === "true") {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // Redirect to login
      router.push("/admin/login");
    }
  }, [router]);

  // Show loading state while checking auth
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Helper function to logout
export function adminLogout() {
  localStorage.removeItem("adminAuth");
  localStorage.removeItem("adminRemember");
  window.location.href = "/admin/login";
}

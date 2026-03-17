"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { LogOut, Zap } from "lucide-react";

export function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="border-b border-white/5 bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-white font-semibold">
          <Zap size={18} className="text-brand-500" />
          NextRole
        </Link>
        <Button variant="ghost" onClick={logout} className="gap-1.5">
          <LogOut size={14} />
          Sign out
        </Button>
      </div>
    </nav>
  );
}

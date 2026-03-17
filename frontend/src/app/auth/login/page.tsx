"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const data = await login(email, password);
      setToken(data.token);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 justify-center">
          <Zap size={20} className="text-brand-500" />
          <span className="font-semibold text-white text-lg">NextRole</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white text-center">Welcome back</h1>
          <p className="text-sm text-slate-500 text-center mt-1">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" type="password" value={password}
            onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">Sign in</Button>
        </form>
        <p className="text-xs text-slate-500 text-center">
          No account?{" "}
          <Link href="/auth/register" className="text-brand-400 hover:text-brand-300">Register</Link>
        </p>
      </div>
    </div>
  );
}

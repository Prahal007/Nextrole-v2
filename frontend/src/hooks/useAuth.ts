"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthed(!!getToken());
  }, []);

  const logout = () => {
    clearToken();
    router.push("/auth/login");
  };

  return { isAuthed, logout };
}

"use client";

import { useRouter } from "next/navigation";
import Calendar from "./components/Calendar/Calendar";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <main>
      <Calendar />
    </main>
  );
}

"use client";

import { usePathname } from "next/navigation";

export function useIsAuthPage() {
  const pathname = usePathname();
  return pathname?.startsWith("/auth");
}
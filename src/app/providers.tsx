"use client";

import { ProfileProvider } from "@/context/ProfileContext";
import { ConsentProvider } from "@/context/ConsentContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </ConsentProvider>
  );
}

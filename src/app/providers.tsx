"use client";

import { ProfileProvider } from "@/context/ProfileContext";
import { ConsentProvider } from "@/context/ConsentContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <ThemeProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </ThemeProvider>
    </ConsentProvider>
  );
}

'use client'
import { CustomThirdwebProvider } from "../components/ThirdwebProvider";
import { ThemeProvider } from "@material-tailwind/react";
import { AudioPlayerProvider } from "@/components/audio-player/audio-player-context";
import { FirebaseAuthProvider } from "@/utils/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CustomThirdwebProvider>
        <FirebaseAuthProvider>
          <AudioPlayerProvider>
            {children}
          </AudioPlayerProvider>
        </FirebaseAuthProvider>
      </CustomThirdwebProvider>
    </ThemeProvider>
  )
}
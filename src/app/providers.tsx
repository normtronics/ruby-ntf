'use client'
import { CustomThirdwebProvider } from "../components/ThirdwebProvider";
import { ThemeProvider } from "@material-tailwind/react";
import { AudioPlayerProvider } from "@/components/audio-player/audio-player-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CustomThirdwebProvider>
        <AudioPlayerProvider>
          {children}
        </AudioPlayerProvider>
      </CustomThirdwebProvider>
    </ThemeProvider>
  )
}
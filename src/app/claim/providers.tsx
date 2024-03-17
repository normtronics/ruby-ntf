'use client'
import { CustomThirdwebProvider } from "../../components/ThirdwebProvider";
import { ThemeProvider } from "@material-tailwind/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CustomThirdwebProvider>
        {children}
      </CustomThirdwebProvider>
    </ThemeProvider>
  )
}
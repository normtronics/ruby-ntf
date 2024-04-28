'use client'
import { CustomThirdwebProvider } from "../components/ThirdwebProvider";
import { ThemeProvider } from "@material-tailwind/react";
import { AudioPlayerProvider } from "@/components/audio-player/audio-player-context";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CustomThirdwebProvider>
        <AudioPlayerProvider>
        <Elements stripe={stripePromise}> 
          {children}
        </Elements>
        </AudioPlayerProvider>
      </CustomThirdwebProvider>
    </ThemeProvider>
  )
}
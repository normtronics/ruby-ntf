import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'
import StyledJsxRegistry from "./registry";

export const metadata: Metadata = {
  title: "Claim NFTs via qr codes | thirdweb Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StyledJsxRegistry>
            {children}
          </StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
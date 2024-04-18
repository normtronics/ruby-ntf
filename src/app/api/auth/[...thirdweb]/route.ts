import { ThirdwebAuthAppRouter } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuthAppRouter({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ''),
  callbacks: {
    onLogin: async (address) => {
      console.log('address', address);
    },
    onUser: async (user) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN}/api/auth/firebase`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: user.address }),
          }
        );

        // Get the returned JWT token to use it to sign in with
        const { token } = await res.json();

        return {
          ...user,
          firebaseToken: token,
        };
      } catch (error) {
        console.log('error', error);

        return {};
      }
    },
    onLogout: async (user) => {
      // Finally, we can run any side-effects whenever a user logs out.
    },
  },
});
export { ThirdwebAuthHandler as GET, ThirdwebAuthHandler as POST };
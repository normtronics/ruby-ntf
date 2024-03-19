import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from 'next/image';
import styles from './Header.module.css'
 
export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant='paragraph'
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder={''}
      >
        <a href="#" className="flex items-center">
          LIVE
        </a>
      </Typography>
      <Typography
        as="li"
        variant='paragraph'
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder={''}
      >
        <a href="#" className="flex items-center">
          RADIO
        </a>
      </Typography>
      <Typography
        as="li"
        variant='paragraph'
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder={''}
      >
        <a href="#" className="flex items-center">
          DROPS
        </a>
      </Typography>
      <Typography
        as="li"
        variant='paragraph'
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder={''}
      >
        <a href="#" className="flex items-center">
          EXPLORE
        </a>
      </Typography>
    </ul>
  );
 
  return (
   <Navbar
    variant='filled'
    color='transparent'
    className="sticky top-0 z-10 h-max mx-auto max-w-screen-2xl from-blue-gray-900 to-blue-gray-800 px-0 py-1"
    placeholder={''}
  >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant='h4'
          color="white"
          className="mr-4 cursor-pointer font-bold"
          placeholder={''}
        >
          <div className="inline-flex gap-3 items-center">
            <Image
              priority
              src="/logo.svg"
              height={16}
              width={16}
              alt="The Rose Crib"
            />
            THE ROSE CRIB
          </div>
        </Typography>
        {/* <div className="hidden lg:block">{navList}</div> */}
        <div className="flex items-center gap-x-1 lg:inline-block">
          <ConnectWallet />
        </div>
        {/* <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          placeholder={''}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton> */}
      </div>
      {/* <MobileNav 
        open={openNav}
        className={`absolute ${styles.mobileContainer}`}
      >
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <ConnectWallet />
          </div>
        </div>
      </MobileNav> */}
    </Navbar>
  );
}
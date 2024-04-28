'use client'

import React from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from 'next/image';
import styles from './Header.module.css'
import Login from "../login/login";
import Link from "next/link";
 
export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  
  return (
    <nav className={styles.nav}>
      <div className={styles.hamburger}>
        <div onClick={() => setOpenNav(true)}>
          <img src='/icons/hamburger.svg' alt="hamburger" className={styles.icon}/>
        </div>
      </div>
      <div className={`${styles.title}`}>
        <Link href='/'>
          RUBY MOUNTAIN
        </Link>
      </div>
      <div className={`${styles.middle}`}> 
        <Link href="/music" >
          Music
        </Link>
        <Link href="/art" >
          Art
        </Link>
        <Link href="/video" >
          Video
        </Link>
      </div>
      <div className={styles.login}>
        <Login />
      </div>
    
      <MobileMenu close={() => setOpenNav(false)} isOpen={openNav}/>
    </nav>
  );
}

export const MobileMenu = ({ close, isOpen }: { close: () => void, isOpen: boolean}) => {
  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
      <div className={styles.header} onClick={close}>
        close
      </div>

      <div className={styles.spacer}></div>
      <div className={styles.spacer}></div>
      <div className={styles.spacer}></div>

      <ul className={styles.mobileList}>
        <li>
          <Link href="">
            Music
          </Link>
        </li>
        <li>
          <Link href="">
            Art
          </Link>
        </li>
        <li>
          <Link href="">
            Video
          </Link>
        </li>
      </ul>

      <ul className={styles.mobileList}>
        <li>
          <Link href="">
            EPK
          </Link>
        </li>
        <li>
          <Link href="">
            Twitter
          </Link>
        </li>
        <li>
          <Link href="">
            Instagram
          </Link>
        </li>
        <li>
          <Link href="">
            Youtube
          </Link>
        </li>
      </ul>

      <div className={styles.spacer}></div>


      <Login />
    </div>
  )
}
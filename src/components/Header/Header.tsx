'use client'

import React from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from 'next/image';
import styles from './Header.module.css'
import Login from "../login/login";
 
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
        RUBY MOUNTAIN
      </div>
      <div className={`${styles.middle}`}> 
        <a href="/music" >
          <div>
            Music
          </div>
        </a>
        <a href="/art" >
          <div>
            Art
          </div>
        </a>
        <a href="/video" >
          <div>
            Video
          </div>
        </a>
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
          <a href="">
            Music
          </a>
        </li>
        <li>
          <a href="">
            Art
          </a>
        </li>
        <li>
          <a href="">
            Video
          </a>
        </li>
      </ul>

      <ul className={styles.mobileList}>
        <li>
          <a href="">
            EPK
          </a>
        </li>
        <li>
          <a href="">
            Twitter
          </a>
        </li>
        <li>
          <a href="">
            Instagram
          </a>
        </li>
        <li>
          <a href="">
            Youtube
          </a>
        </li>
      </ul>

      <div className={styles.spacer}></div>


      <Login />
    </div>
  )
}
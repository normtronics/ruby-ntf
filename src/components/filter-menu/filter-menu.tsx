'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './filter-menu.module.css'

export const FilterMenu = () => {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);
  const [active, setActive] = useState('All')

  const handleScroll = useCallback((elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > (elTopOffset + elHeight)) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  }, [])

  useEffect(() => {
    // @ts-ignore
    var header = headerRef.current?.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height)
    }

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const setActiveFilter = useCallback((option: string) => {
    setActive(option)
  }, [])

  
  return (
    <div id="sticky-header" className={`${sticky.isSticky ? styles.sticky : ''} ${styles.filterMenu}`} ref={headerRef}>
      <div className={styles.innerFilter}>
        <div 
          className={active === 'All' ? styles.active : ''}
          onClick={() => setActive('All')}
        >
          All
        </div>
        <div 
          className={active === 'Music' ? styles.active : ''}
          onClick={() => setActive('Music')}
        >
          Music
        </div>
        <div 
          className={active === 'Art' ? styles.active : ''}
          onClick={() => setActive('Art')}
        >
          Art
        </div>
        <div 
          className={active === 'Video' ? styles.active : ''}
          onClick={() => setActive('Video')}
        >
          Video
        </div>
      </div>
    </div>
  )
}
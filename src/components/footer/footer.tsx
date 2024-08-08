import Link from 'next/link'
import styles from './footer.module.css'
import { items } from '@/contants/nav-item';

export const Footer = () => {
  return (
    <div>
      <div className={`${styles.mobileMenu}`}>
        <div className={styles.container}>
          {items.map((item, i) => (
            <div className={styles.column} key={i}>
              <h5>{item.top}</h5>
              <ul>
                {item.options.map((option, o) => (
                  <li key={o}>
                    <Link href={option.link}>
                      {option.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
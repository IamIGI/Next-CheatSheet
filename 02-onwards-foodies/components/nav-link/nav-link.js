'use client'; // you want to add it only in component that really needs it
// so the majority of the components would be rendered in server instead

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? ` ${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}

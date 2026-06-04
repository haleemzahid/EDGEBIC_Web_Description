'use client';

import * as React from 'react';
import Link from 'next/link';

import { Routes } from '@/constants/routes';

type LoginNavButtonProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

/**
 * Marketing "Login" button.
 *
 * When the visitor is ALREADY logged in, clicking Login kicks off a server
 * redirect chain (/auth/login -> /dashboard -> /dashboard/welcome). Resolving
 * that chain through a soft client-side navigation makes the App Router loop on
 * the Welcome page (repeated welcome?_rsc + manifest fetches). A full-page load
 * resolves the same redirects over plain HTTP and works correctly — which is
 * why a manual refresh fixes it.
 *
 * So: if logged in -> render a native <a> (hard navigation / full reload).
 *     if logged out -> render a normal <Link> (unchanged soft navigation); the
 *     loop never happens in that case because logging in reloads the page anyway.
 *
 * Login state is read from the Auth.js session endpoint because the session
 * cookie is httpOnly and cannot be inspected from the browser.
 */
export function LoginNavButton({
  className,
  onClick,
  children = 'Login'
}: LoginNavButtonProps): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active) {
          setIsAuthenticated(Boolean(data && data.user));
        }
      })
      .catch(() => {
        // Network/parsing error — fall back to normal navigation.
      });
    return () => {
      active = false;
    };
  }, []);

  if (isAuthenticated) {
    return (
      <a
        href={Routes.Login}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={Routes.Login}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

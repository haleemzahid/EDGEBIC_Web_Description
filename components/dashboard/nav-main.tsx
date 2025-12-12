'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarGroupProps
} from '@/components/ui/sidebar';
import { mainNavItems } from '@/constants/nav-items';
import { cn } from '@/lib/utils';

export function NavMain(props: SidebarGroupProps): React.JSX.Element {
  const pathname = usePathname();

  // Check if item is active - exact match for /dashboard (Home), startsWith for others
  const isItemActive = (href: string): boolean => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {mainNavItems.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              asChild
              isActive={isItemActive(item.href)}
              tooltip={item.title}
            >
              <Link
                href={item.disabled ? '#' : item.href}
                target={item.external ? '_blank' : undefined}
              >
                <item.icon
                  className={cn(
                    'size-4 shrink-0',
                    isItemActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                />
                <span>
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

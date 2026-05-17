'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Role } from '@prisma/client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarGroupProps
} from '@/components/ui/sidebar';
import { clientNavItems, mainNavItems } from '@/constants/nav-items';
import { Routes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/nav-item';

export type NavMainProps = SidebarGroupProps & {
  role: Role;
  /** Unseen-count badges keyed by nav item href (client portal only). */
  navBadges?: Record<string, number>;
};

export function NavMain({
  role,
  navBadges,
  ...props
}: NavMainProps): React.JSX.Element {
  const pathname = usePathname();
  const navItems: NavItem[] =
    role === Role.CLIENT ? clientNavItems : mainNavItems;

  // Check if item is active - exact match for Home (admin) and Welcome (client),
  // startsWith for others
  const isItemActive = (href: string): boolean => {
    if (href === Routes.Home || href === Routes.Welcome) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {navItems.map((item, index) => {
          const badgeCount = navBadges?.[item.href] ?? 0;
          return (
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
            {badgeCount > 0 && (
              <SidebarMenuBadge className="bg-primary text-primary-foreground">
                {badgeCount > 99 ? '99+' : badgeCount}
              </SidebarMenuBadge>
            )}
          </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

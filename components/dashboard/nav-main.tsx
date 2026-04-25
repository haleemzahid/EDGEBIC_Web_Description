'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Role } from '@prisma/client';

import {
  SidebarGroup,
  SidebarMenu,
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
};

export function NavMain({ role, ...props }: NavMainProps): React.JSX.Element {
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
        {navItems.map((item, index) => (
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

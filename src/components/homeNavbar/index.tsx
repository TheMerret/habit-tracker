'use client';

import { FunctionComponent } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import {
  HomeIcon,
  PersonIcon,
  ComponentInstanceIcon,
} from '@radix-ui/react-icons';

export const HomeNavbar: FunctionComponent = () => {
  return (
    <NavigationMenu className="bg-zinc-100 rounded-3xl p-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <HomeIcon />
              Домашняя страница
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/habits" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <ComponentInstanceIcon />
              Привычки
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/stats" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <PersonIcon />
              Статистика
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

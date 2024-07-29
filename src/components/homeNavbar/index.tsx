'use client';

import { FC, FunctionComponent, ReactElement } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import Link from 'next/link';
import {
  HomeIcon,
  ComponentInstanceIcon,
  TargetIcon,
  GearIcon,
  BarChartIcon,
  ArchiveIcon,
  StarFilledIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from '@radix-ui/react-icons';
import { ScoreWidget } from '@/components/scoreWidget';
import { Button } from '../ui/button';

type NavigationEntry = {
  href: string;
  title: string;
  icon: ReactElement;
};

export const HomeNavbar: FunctionComponent = () => {
  const navigationEntries: NavigationEntry[] = [
    {
      href: '/home',
      icon: <HomeIcon />,
      title: 'Домашняя страница',
    },
    {
      href: '/habits',
      icon: <ComponentInstanceIcon />,
      title: 'Привычки',
    },
    {
      href: '/quests',
      icon: <TargetIcon />,
      title: 'Квесты',
    },
    {
      href: '/stats',
      icon: <BarChartIcon />,
      title: 'Статистика',
    },
    {
      href: '/shop',
      icon: <ArchiveIcon />,
      title: 'Магазин',
    },
    {
      href: '/leaderboard',
      icon: <StarFilledIcon />,
      title: 'Лидерборд',
    },
    {
      href: '/settings',
      icon: <GearIcon />,
      title: 'Настройки',
    },
  ];
  return (
    <div className="bg-zinc-100 rounded-3xl p-5 flex flex-row justify-between">
      <Navbar className="xl:flex hidden" navEntries={navigationEntries} />
      <Sidebar navEntries={navigationEntries} />
      <ScoreWidget />
    </div>
  );
};

const Sidebar: FC<
  React.ComponentProps<typeof Sheet> & {
    navEntries: NavigationEntry[];
  }
> = function ({ navEntries, ...props }) {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="xl:hidden">
          <HamburgerMenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex h-screen flex-col justify-between p-6">
          <nav className="grid gap-6 text-lg font-medium">
            {navEntries.map((entry, ind) => (
              <SheetTrigger key={ind} asChild>
                <Link
                  href={entry.href}
                  className="flex items-center gap-4 text-primary-foreground"
                  prefetch={false}
                >
                  {entry.icon}
                  {entry.title}
                </Link>
              </SheetTrigger>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Navbar: FC<
  React.ComponentProps<typeof NavigationMenu> & {
    navEntries: NavigationEntry[];
  }
> = function ({ navEntries, ...props }) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        {navEntries.map((entry, ind) => (
          <NavigationMenuItem key={ind}>
            <Link href={entry.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {entry.icon}
                {entry.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

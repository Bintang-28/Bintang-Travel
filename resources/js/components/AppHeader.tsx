import AppLogo from '@/components/AppLogo';
import AppLogoIcon from '@/components/AppLogoIcon';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import UserMenuContent from '@/components/UserMenuContent';
import { getInitials } from '@/composables/useInitials';
import { toUrl, urlIsActive } from '@/lib/utils';
import { index as reservationsIndex } from "@/routes/client/reservations/index";
import { index as supportIndex } from '@/routes/client/support/index';
import { home } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, FileCheck, LifeBuoy } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage<any>();
    const auth = page.props.auth;

    const isCurrentRoute = (url: string) => urlIsActive(url, page.url);

    const activeItemStyles = (url: string) =>
        isCurrentRoute(toUrl(url))
            ? 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
            : '';

    const getRouteUrl = (routeHelper: any): string => {
        if (!routeHelper) return '';
        if (typeof routeHelper === 'string') return routeHelper;
        // RouteDefinition has a "url" property
        if (routeHelper.url) return routeHelper.url;
        return String(routeHelper);
    };

    const mainNavItems: NavItem[] = useMemo(() => {
        if (!auth.user || auth.user.role === 'client') {
            return [
                {
                    title: 'Reservations',
                    href: getRouteUrl(reservationsIndex()),
                    icon: FileCheck,
                },
                {
                    title: 'Support',
                    href: getRouteUrl(supportIndex()),
                    icon: LifeBuoy,
                },
            ];
        }

        return [
            {
                title: 'Dasbor Admin',
                href: '/admin',
                icon: FileCheck,
            },
        ];
    }, [auth.user]);

    return (
        <div>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-9 w-9"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-6">
                                <SheetTitle className="sr-only">
                                    Navigation Menu
                                </SheetTitle>
                                <SheetDescription className="sr-only">
                                    Navigation Menu Description
                                </SheetDescription>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="size-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col justify-between space-y-4 py-6">
                                    <nav className="-mx-3 space-y-1">
                                        {mainNavItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent ${activeItemStyles(item.href)}`}
                                                >
                                                    {Icon && <Icon className="h-5 w-5" />}
                                                    {item.title}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href={home.url ? home.url() : '/'} className="flex items-center gap-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden h-full lg:flex lg:flex-1">
                        <NavigationMenu className="ml-10 flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <NavigationMenuItem
                                            key={index}
                                            className="relative flex h-full items-center"
                                        >
                                            <Link
                                                className={`${navigationMenuTriggerStyle()} ${activeItemStyles(item.href)} h-9 cursor-pointer px-3`}
                                                href={item.href}
                                            >
                                                {Icon && <Icon className="mr-2 h-4 w-4" />}
                                                {item.title}
                                            </Link>
                                            {isCurrentRoute(item.href) && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                            )}
                                        </NavigationMenuItem>
                                    );
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        {auth.user?.avatar && (
                                            <AvatarImage
                                                src={auth.user.avatar}
                                                alt={auth.user.name}
                                            />
                                        )}
                                        <AvatarFallback className="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </div>
    );
}

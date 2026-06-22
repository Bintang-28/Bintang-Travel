import { Link } from '@inertiajs/react';
import { Car, Calendar, User, CreditCard, BarChart, LifeBuoy, Bell, UserCheck  } from 'lucide-react';
import { Wrench } from 'lucide-react';
import NavMain from '@/components/NavMain';
import NavUser from '@/components/NavUser';
import AppLogo from './AppLogo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import { index as carsIndex } from "@/routes/admin/cars/index";
import { index as reservationsIndex } from "@/routes/admin/reservations/index";
import { index as clientsIndex } from "@/routes/admin/clients/index";
import { index as paymentsIndex } from "@/routes/admin/payments/index";
import { index as reportsIndex } from "@/routes/admin/reports/index";
import { index as supportIndex } from "@/routes/admin/support/index";
import { index as driversIndex } from "@/routes/admin/drivers/index";
import { index as remindersIndex } from "@/routes/admin/reminders/index";
import { type NavItem } from '@/types';
import { index as maintenanceIndex } from "@/routes/admin/maintenance/index";

export default function AppSidebar({ children }: { children?: React.ReactNode }) {
    const mainNavItems: NavItem[] = [
        { title: 'Cars', href: carsIndex().url, icon: Car },
        { title: 'Drivers', href: driversIndex().url, icon: UserCheck },
        { title: 'Maintenance', href: maintenanceIndex().url, icon: Wrench },
        { title: 'Reminders', href: remindersIndex().url, icon: Bell },
        { title: 'Reservations', href: reservationsIndex().url, icon: Calendar },
        { title: 'Clients', href: clientsIndex().url, icon: User },
        { title: 'Payments', href: paymentsIndex().url, icon: CreditCard },
        { title: 'Reports', href: reportsIndex().url, icon: BarChart },
        { title: 'Support', href: supportIndex().url, icon: LifeBuoy },
    ];

    return (
        <>
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={home().url}>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
            {children}
        </>
    );
}
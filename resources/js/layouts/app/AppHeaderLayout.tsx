import AppContent from '@/components/AppContent';
import AppHeader from '@/components/AppHeader';
import AppShell from '@/components/AppShell';
import type { BreadcrumbItemType } from '@/types';
import { ReactNode } from 'react';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    children?: ReactNode;
}

export default function AppLayout({ breadcrumbs = [], children }: Props) {
    return (
        <AppShell className="flex-col">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>
                {children}
            </AppContent>
        </AppShell>
    );
}
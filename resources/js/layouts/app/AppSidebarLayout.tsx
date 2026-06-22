import React from 'react';
import AppContent from '@/components/AppContent';
import AppShell from '@/components/AppShell';
import AppSidebar from '@/components/AppSidebar';
import AppSidebarHeader from '@/components/AppSidebarHeader';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    children?: React.ReactNode;
}

export default function AppSidebarLayout({ breadcrumbs = [], children }: Props) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
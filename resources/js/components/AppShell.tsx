import { SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

interface Props {
    variant?: 'header' | 'sidebar';
    children?: ReactNode;
    className?: string;
}

export default function AppShell({ variant = 'header', children, className }: Props) {
    const page = usePage<any>();
    const isOpen = page?.props?.sidebarOpen ?? false;

    return variant === 'header' ? (
        <div className={`flex min-h-screen w-full flex-col ${className || ''}`}>{children}</div>
    ) : (
        <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
    );
}

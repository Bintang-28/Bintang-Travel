import { SidebarInset } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

interface Props {
    variant?: 'header' | 'sidebar';
    className?: string;
    children?: ReactNode;
}

export default function AppContent({ variant = 'header', className, children }: Props) {
    return variant === 'sidebar' ? (
        <SidebarInset className={className}>
            {children}
        </SidebarInset>
    ) : (
        <main className={`mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl ${className || ''}`}>
            {children}
        </main>
    );
}

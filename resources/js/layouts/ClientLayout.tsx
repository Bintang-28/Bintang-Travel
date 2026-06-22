import AppHeaderLayout from '@/layouts/app/AppHeaderLayout';
import type { BreadcrumbItemType } from '@/types';
import { ReactNode } from 'react';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    children?: ReactNode;
}

export default function ClientLayout({ breadcrumbs = [], children }: Props) {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppHeaderLayout>
    );
}
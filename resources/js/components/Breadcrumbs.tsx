import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@inertiajs/react';

interface BreadcrumbItemType {
    title: string;
    href?: string;
}

interface Props {
    breadcrumbs: BreadcrumbItemType[];
}

export default function Breadcrumbs({ breadcrumbs }: Props) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                    <div key={index}>
                        <BreadcrumbItem>
                            {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={item.href ?? '#'}>
                                        {item.title}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

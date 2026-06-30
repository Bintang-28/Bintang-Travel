import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { urlIsActive } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    items: NavItem[];
}

export default function NavMain({ items }: Props) {
    const page = usePage<any>();
    const unreadSupportCount = page.props.unreadSupportCount ?? 0;

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={urlIsActive(item.href, page.url)}
                            >
                                <Link href={item.href} className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        {Icon ? <Icon /> : null}
                                        <span>{item.title}</span>
                                    </div>
                                    {item.title === 'Support' && unreadSupportCount > 0 && (
                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                                            {unreadSupportCount}
                                        </span>
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
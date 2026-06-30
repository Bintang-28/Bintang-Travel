import UserInfo from '@/components/UserInfo';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/routes';
import type { User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

interface Props {
    user: User;
}

export default function UserMenuContent({ user }: Props) {
    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role !== 'client' && (
                <>
                    <DropdownMenuItem asChild className="cursor-pointer font-bold text-blue-600 hover:text-blue-700">
                        <Link href="/admin" className="flex w-full items-center">
                            Dasbor Admin
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </>
            )}
            <DropdownMenuItem
                asChild
                className="cursor-pointer text-red-600 transition-colors focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/40 dark:focus:text-red-300"
            >
                <Link
                    className="flex w-full items-center"
                    href={logout().url}
                    method="post"
                    as="button"
                    data-test="logout-button"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
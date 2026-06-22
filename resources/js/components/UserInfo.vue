import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import { useMemo } from 'react';

interface Props {
    user: User;
    showEmail?: boolean;
}

export default function UserInfo({ user, showEmail = false }: Props) {
    const showAvatar = useMemo(
        () => user.avatar && user.avatar !== '',
        [user.avatar]
    );

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-lg">
                {showAvatar && <AvatarImage src={user.avatar!} alt={user.name} />}
                <AvatarFallback className="rounded-lg text-black dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}

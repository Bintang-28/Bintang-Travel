import AppSidebarLayout from '@/layouts/app/AppSidebarLayout';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

export default function RestrictedActionLayout({ children }: Props) {
    const page = usePage();
    const restrictedAction = (page.props.flash as any)?.restricted_action;
    const [message, setMessage] = useState(restrictedAction);

    useEffect(() => {
        if (restrictedAction) {
            setMessage(restrictedAction);
            const timer = setTimeout(() => setMessage(null), 10000);
            return () => clearTimeout(timer);
        }
    }, [restrictedAction]);

    return (
        <AppSidebarLayout>
            {message && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-yellow-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{message}</span>
                </div>
            )}
            {children}
        </AppSidebarLayout>
    );
}
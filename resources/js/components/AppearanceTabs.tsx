// resources/js/pages/settings/Appearance.tsx
import { Head } from '@inertiajs/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import SettingsLayout from '@/layouts/settings/Layout';
import HeadingSmall from '@/components/HeadingSmall';

type Appearance = 'light' | 'dark' | 'system';

function AppearanceTabs() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    useEffect(() => {
        const saved = localStorage.getItem('appearance') as Appearance | null;
        if (saved) setAppearance(saved);
    }, []);

    const updateAppearance = (value: Appearance) => {
        setAppearance(value);
        localStorage.setItem('appearance', value);

        const root = document.documentElement;
        if (value === 'dark') {
            root.classList.add('dark');
        } else if (value === 'light') {
            root.classList.remove('dark');
        } else {
            // system
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
        }
    };

    const tabs = [
        { value: 'light' as const, Icon: Sun, label: 'Light' },
        { value: 'dark' as const, Icon: Moon, label: 'Dark' },
        { value: 'system' as const, Icon: Monitor, label: 'System' },
    ];

    return (
        <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
            {tabs.map(({ value, Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={`flex items-center rounded-md px-3.5 py-1.5 transition-colors ${
                        appearance === value
                            ? 'bg-white shadow-sm dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60'
                    }`}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}

export default function Appearance() {
    return (
        <HomeLayout>
            <Head title="Appearance settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </HomeLayout>
    );
}
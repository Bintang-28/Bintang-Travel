// resources/js/pages/settings/Appearance.tsx
import { Head } from '@inertiajs/react';
import { Sun } from 'lucide-react';
import HomeLayout from '@/layouts/HomeLayout';
import SettingsLayout from '@/layouts/settings/Layout';
import HeadingSmall from '@/components/HeadingSmall';

function AppearanceTabs() {
    return (
        <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1">
            <button
                className="flex items-center rounded-md px-3.5 py-1.5 bg-white shadow-sm transition-colors"
            >
                <Sun className="-ml-1 h-4 w-4" />
                <span className="ml-1.5 text-sm">Light</span>
            </button>
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
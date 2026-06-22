import { Link, usePage } from '@inertiajs/react';

const sidebarNavItems = [
    { title: 'Profile', href: '/settings/profile' },
    { title: 'Password', href: '/settings/password' },
];

interface Props {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: Props) {
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    return (
        <div className="px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-sm text-gray-500">Manage your profile and account settings</p>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1">
                        {sidebarNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                                    currentPath === item.href
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-600'
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <hr className="my-6 lg:hidden border-gray-200" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import HeadingSmall from '@/components/HeadingSmall';
import SettingsLayout from '@/layouts/settings/Layout';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Profile({ mustVerifyEmail, status }: Props) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch('/settings/profile', { preserveScroll: true });
    };

    return (
        <HomeLayout>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="flex flex-col space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <input
                                id="name"
                                className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email address</label>
                            <input
                                id="email"
                                type="email"
                                className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
                            <input
                                id="phone"
                                type="tel"
                                className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                autoComplete="tel"
                                placeholder="Phone number"
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        {mustVerifyEmail && !user.email_verified_at && (
                            <p className="-mt-4 text-sm text-muted-foreground">
                                Your email address is unverified.{' '}
                                <Link
                                    href="/verification/send"
                                    method="post"
                                    as="button"
                                    className="underline hover:decoration-current"
                                >
                                    Click here to resend the verification email.
                                </Link>
                            </p>
                        )}

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                Save
                            </button>
                            {recentlySuccessful && (
                                <p className="text-sm text-neutral-600">Saved.</p>
                            )}
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </HomeLayout>
    );
}
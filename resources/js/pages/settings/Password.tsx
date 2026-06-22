import { useRef, FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import HomeLayout from '@/layouts/HomeLayout';
import SettingsLayout from '@/layouts/settings/Layout';
import HeadingSmall from '@/components/HeadingSmall';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: FormEvent) => {
        e.preventDefault();

        put('/settings/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors: any) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <HomeLayout>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="flex flex-col space-y-6">
                    <HeadingSmall
                        title="Update password"
                        description="Ensure your account is using a long, random password to stay secure"
                    />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="current_password" className="text-sm font-medium">
                                Current password
                            </label>
                            <input
                                id="current_password"
                                ref={currentPasswordInput}
                                type="password"
                                className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                autoComplete="current-password"
                                placeholder="Current password"
                            />
                            {errors.current_password && (
                                <p className="text-sm text-red-500">{errors.current_password}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                New password
                            </label>
                            <input
                                id="password"
                                ref={passwordInput}
                                type="password"
                                className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="new-password"
                                placeholder="New password"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="password_confirmation" className="text-sm font-medium">
                                Confirm password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />
                            {errors.password_confirmation && (
                                <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                data-test="update-password-button"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                Save password
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
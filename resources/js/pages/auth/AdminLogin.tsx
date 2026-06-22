import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Lock, Shield } from 'lucide-react';
import { ChangeEvent, FormEventHandler } from 'react';

// Jika Anda masih menggunakan controller helper ini untuk URL, Anda bisa mengimportnya:
// import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';

interface Props {
    status?: string;
    canResetPassword?: boolean;
}

export default function AdminAccess({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        // Ubah URL tujuan post menjadi '/admin-secret-url'
        post('/admin-secret-url', {
            onSuccess: () => reset('password'),
        });
    };

    return (
        <div>
            <Head title="Admin Access" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Background Pattern */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl"></div>
                    </div>

                    <div className="relative space-y-8">
                        {/* Header */}
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-600 bg-slate-700">
                                <Shield className="h-8 w-8 text-orange-400" />
                            </div>
                            <h1 className="mb-2 text-2xl font-bold text-white">
                                Administrative Access
                            </h1>
                        </div>

                        {/* Login Form */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-xl">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-200"
                                    >
                                        Administrator Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="admin@domain.com"
                                        className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-orange-500 focus:bg-slate-700 focus:ring-2 focus:ring-orange-500/20"
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-slate-200"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Lock className="h-4 w-4" />
                                                <span>Secure Password</span>
                                            </div>
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Enter secure password"
                                        className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-orange-500 focus:bg-slate-700 focus:ring-2 focus:ring-orange-500/20"
                                    />
                                    <InputError message={errors.password} className="mt-1" />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 px-4 py-3 font-semibold text-white transition-all duration-200 hover:from-orange-700 hover:to-orange-800 hover:shadow-lg hover:shadow-orange-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="admin-login-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    )}
                                    {processing ? 'Authenticating...' : 'Access System'}
                                </Button>

                                {/* Security Notice */}
                                <div className="border-t border-slate-700 pt-6 text-center">
                                    <div className="flex items-center justify-center space-x-2 text-slate-400">
                                        <Shield className="h-4 w-4" />
                                        <p className="text-xs">
                                            Secure connection established
                                        </p>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">
                                        All administrative actions are logged and monitored
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Footer Warning */}
                        <div className="text-center">
                            <div className="inline-flex items-center space-x-2 rounded-lg border border-amber-800/50 bg-amber-900/20 px-4 py-2 backdrop-blur-sm">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                                <p className="text-xs text-amber-300">
                                    Unauthorized access is strictly prohibited
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import AppLogoIcon from '@/components/AppLogoIcon';

export default function AppLogo() {
    return (
        <div className="flex items-center">
            <AppLogoIcon />
            <div className="ml-1 grid flex-1 text-left text-sm">
                {/* Mengubah warna teks utama span menjadi putih (text-white) */}
                <span className="mb-0.5 truncate leading-tight font-semibold text-white">
                    Bintang<span className="text-blue-600">Travel</span>
                </span>
            </div>
        </div>
    );
}
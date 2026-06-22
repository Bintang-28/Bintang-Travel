import type { HTMLAttributes } from 'react';
import logoBintangTravel from '@/assets/logobintangtravel.png';

interface Props extends HTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function AppLogoIcon({ className = 'h-5', ...props }: Props) {
    // Panggil variabel gambarnya di dalam src (tanpa tanda kutip ganda)
    return <img src={logoBintangTravel} alt="Logo Bintang Travel" className={className} {...props} />;
}
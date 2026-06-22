import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function AppLogoIcon({ className = 'h-5', ...props }: Props) {
    return <img src="/logo/logo.png" alt="" className={className} {...props} />;
}

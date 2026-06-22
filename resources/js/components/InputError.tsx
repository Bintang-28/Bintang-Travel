import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    message?: string;
}

export default function InputError({ message, className = '', ...props }: Props) {
    if (!message) {
        return null;
    }

    return (
        <div className={className} {...props}>
            <p className="text-sm text-red-600 dark:text-red-500">
                {message}
            </p>
        </div>
    );
}
import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';

export default function BadgeHeader({ title, children }: { title: string, children: ReactNode }) {
    return <Badge
        variant="secondary"
        className="md:mb-4 rounded-full font-bold px-2 py-1 md:px-4 text-xs shadow-md shadow-red-800"
        style={{ color: "#1C1629" }}
    >
        {children}
        <span className='ml-2'>{title}</span>

    </Badge>

}

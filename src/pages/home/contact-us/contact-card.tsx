import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ContactCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}

export default function ContactCard({ icon: Icon, title, description, linkText, linkHref }: ContactCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="card-elevated p-6 hover:shadow-lg transition-all duration-300"
        >
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
                {description}
            </p>
            <a
                href={linkHref}
                className="text-red-500 hover:text-red-600 font-medium transition-colors"
            >
                {linkText}
            </a>
        </motion.div>
    );
}

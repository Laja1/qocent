import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

export default function SplitTextByChar({
    text,
    className = '',
    delay = 0,
    splitBy = 'character'
}: {
    text: string;
    className?: string;
    delay?: number;
    splitBy?: 'character' | 'word';
}) {
    const elements = splitBy === 'word' ? text.split(' ') : text.split('');

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay,
            },
        },
    };

    const child: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.h1
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: 'inline-block' }}
                >
                    {splitBy === 'word'
                        ? (index < elements.length - 1 ? element + '\u00A0' : element)
                        : (element === ' ' ? '\u00A0' : element)
                    }
                </motion.span>
            ))}
        </motion.h1>
    );
}

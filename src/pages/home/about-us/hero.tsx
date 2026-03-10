import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { HeroComponent } from '../home/hero';

export function AboutHero() {
    return (
        <HeroComponent
            title="What is"
            subtitle="Qocent?"
            description="Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers."
            buttonText="Learn More"
            buttonIcon={<ArrowDownRight />}
            showButton={true}
            className='h-3/5 md:h-4/5 2xl:h-3/5'
        >
            {/* <VideoSection /> */}
            <div>
                <img src="./images/blurwhite.png" className="absolute bottom-0 left-0 w-full h-26 object-fill" alt="" />
            </div>
        </HeroComponent>
    )
}

const VideoSection = () => {
    const statsRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(statsRef, { once: true, amount: 0.3 });

    const stats = [
        { value: 70, suffix: 'k', label: 'Saved in $USD' },
        { value: 24, suffix: '/7', label: 'Live support' },
        { value: 2026, suffix: '', label: 'Qocent founded' }
    ];

    const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
        const motionValue = useMotionValue(0);
        const rounded = useTransform(motionValue, (latest) => Math.floor(latest));
        const [displayValue, setDisplayValue] = useState(0);

        useEffect(() => {
            if (isInView) {
                const controls = animate(motionValue, value, {
                    duration: 2,
                    ease: "easeOut"
                });

                const unsubscribe = rounded.on('change', (latest) => {
                    setDisplayValue(latest);
                });

                return () => {
                    controls.stop();
                    unsubscribe();
                };
            }
        }, [isInView, value, motionValue, rounded]);

        return (
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {displayValue}
                {suffix}
            </motion.span>
        );
    };

    return (
        <div className="w-full relative max-w-6xl mx-auto -mt-24">
            <div className="bg-white rounded-4xl  p-2 md:p-4 md:h-[60vh] max-h-[540px] h-1/3 shadow-2xl mb-10 md:mb-16">
                <div className='size-full bg-gray-400 rounded-3xl grid place-content-center text-xl text-gray-600'>Video placeholder</div>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="text-center"
                    >
                        <div className="text-2xl md:text-6xl lg:text-7xl font-black md:font-bold text-gray-900 mb-3">
                            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-gray-600 text-sm md:text-lg">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
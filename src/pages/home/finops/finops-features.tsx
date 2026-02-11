import { motion } from 'framer-motion';
import CustomSection from "../home/custom-section";

interface FeatureCardProps {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    reversed?: boolean;
    index?: number;
}

const features = [
    {
        title: 'Budget Alerts Before Overspending',
        subtitle: 'OUR VALUE',
        description: 'Navigate your financial journey with our Comprehensive Debt Management system, effective debt reduction strategies.',
        imageUrl: '/api/placeholder/800/600',
        imageAlt: 'Budget alerts dashboard showing spending analytics',
        reversed: false
    },
    {
        title: 'One-Click Optimization Recommendations',
        subtitle: 'OUR VALUE',
        description: 'Stay ahead with our Real-Time Investment Tracker, empowering you to monitor and optimize your portfolio.',
        imageUrl: '/api/placeholder/800/600',
        imageAlt: 'Portfolio optimization dashboard',
        reversed: true
    },
    {
        title: 'AI-Powered Waste Detection',
        subtitle: 'OUR VALUE',
        description: 'Navigate your financial journey with our Comprehensive Debt Management system, effective debt reduction strategies.',
        imageUrl: '/api/placeholder/800/600',
        imageAlt: 'AI waste detection analytics dashboard',
        reversed: false
    }
];

export default function FinopsFeaturesSection() {
    return (
        <CustomSection className="py-6">{features.map((feature, index) => (
            <FeatureCard
                key={index}
                title={feature.title}
                subtitle={feature.subtitle}
                description={feature.description}
                imageUrl={feature.imageUrl}
                imageAlt={feature.imageAlt}
                reversed={feature.reversed}
                index={index}
            />
        ))}</CustomSection>
    )
}

const FeatureCard = ({
    title,
    subtitle,
    description,
    imageUrl,
    imageAlt,
    reversed = false,
}: FeatureCardProps) => {
    return (
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:grid-flow-dense' : ''}`}>
            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={reversed ? 'lg:col-start-2' : ''}
            >
                <div className="mb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <span className="w-8 h-px bg-gray-400"></span>
                        {subtitle}
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                    {description}
                </p>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={reversed ? 'lg:col-start-1 lg:row-start-1' : ''}
            >
                <div className="relative">
                    {/* Main card shadow and container */}
                    <div className="relative">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};


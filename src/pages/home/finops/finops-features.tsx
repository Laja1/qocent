import { motion } from 'framer-motion';
import { Percent } from 'lucide-react';
import BadgeHeader from '../components/Badge';
import CustomSection from "../components/custom-section";
import { VideoPlayer } from '../home/solution';

interface FeatureCardProps {
    title: string;
    subtitle: string;
    description: string;
    imageContainerUrl: string;
    floatImageUrl: string;
    reversed?: boolean;
    index?: number;
}

const features = [
    {
        title: 'Real-Time Cost Visibility Across All Providers',
        subtitle: 'OUR VALUE',
        description: 'Know exactly where every dollar goes — across AWS, Azure, GCP, and Huawei — in one unified view. No more switching dashboards or waiting for end-of-month reports.',
        imageContainerUrl: "/videos/real-time-cost.mp4",
        floatImageUrl: "./images/finops/feature-1.png",
        reversed: true
    },
    {
        title: 'Budget Alerts Before Overspending',
        subtitle: 'OUR VALUE',
        description: 'Set spend thresholds per team, project, or provider. Get notified the moment costs spike — before they become a problem for your CFO.',
        imageContainerUrl: "/videos/budget.mp4",
        floatImageUrl: "./images/finops/feature-2.png",
        reversed: false
    },
    {
        title: 'One-Click Optimization Recommendations',
        subtitle: 'OUR VALUE',
        description: 'Qocent surfaces actionable cost-saving opportunities — idle instances, oversized resources, unused storage — so your team can act fast without deep manual audits.',
        imageContainerUrl: "/videos/one-click-op.mp4",
        floatImageUrl: "./images/finops/feature-3.png",
        reversed: true
    },
    {
        title: 'AI-Powered Waste Detection',
        subtitle: 'OUR VALUE',
        description: 'Our AI continuously scans your infrastructure for waste and inefficiency. Most teams cut cloud spend by 30–40% within 90 days — without touching a single workload.',
        imageContainerUrl: "/videos/value.mp4",
        floatImageUrl: "./images/finops/feature-4.png",
        reversed: false
    }
];

export default function FinopsFeaturesSection() {
    return (
        <>
            <div className='relative'>
                <img src="./images/blurwhite.png" className="absolute bottom-0 left-0 w-full h-26 object-fill" alt="" />
            </div>
            <CustomSection className="py-6 space-y-12">
                {
                    features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            subtitle={feature.subtitle}
                            description={feature.description}
                            imageContainerUrl={feature.imageContainerUrl}
                            floatImageUrl={feature.floatImageUrl}
                            reversed={feature.reversed}
                            index={index}
                        />
                    ))
                }
            </CustomSection >
        </>
    )
}

const FeatureCard = ({
    title,
    subtitle,
    description,
    imageContainerUrl,
    floatImageUrl,
    reversed = false,
}: FeatureCardProps) => {
    return (
        <div className={`grid relative py-16 lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:grid-flow-dense' : ''}`}>
            <img src="./images/bg-blur.png" className="absolute -z-20 top-0 left-0 w-full h-full object-contain" />

            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`${reversed ? 'lg:col-start-2 ml-0 md:ml-16' : 'mr-0 md:mr-16'}`}
            >
                <BadgeHeader title={subtitle}>
                    <Percent />
                </BadgeHeader>

                <h2 className="text-2xl mt-4 md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </motion.div>

            {/* Dashboard Mockup */}
            <div className='relative rounded-xl'>
                <motion.div
                    initial={{ opacity: 0, x: reversed ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`${reversed ? 'lg:col-start-1 lg:row-start-1' : ''} relative bg-white rounded-3xl shadow-2xl overflow-hidden border-red-500 border  w-full md:mb-6`}
                >

                    <VideoPlayer src={imageContainerUrl} />
                </motion.div>
                <img
                    src={floatImageUrl}
                    alt="Modern workspace with red chair"
                    className={`${reversed ? "-right-2 md:-right-12" : "-left-2 md:-left-12"} -bottom-12 md:-bottom-6 w-56 h-64 absolute z-20 shadow-md`}
                />
            </div>
        </div>
    );
};




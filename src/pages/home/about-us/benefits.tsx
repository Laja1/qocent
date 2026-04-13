import { imgLinks } from "@/assets/assetLink";
import { ChartIcon } from "@/assets/icons/chart";
import { HeroHeader } from "@/components/shared/hero-header";
import { motion } from 'framer-motion';
import { useState } from "react";
import CustomSection from "../components/custom-section";
import { VideoPlayer } from "../home/solution";



export default function Benefits() {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const processes = [
        {
            title: 'Connect Your Clouds',
            description: 'Link your AWS, Azure, GCP, or Huawei accounts in minutes using secure OAuth/IAM — no migration, no downtime.',
            image: './images/block.png'
        },
        {
            title: 'Gain Full Visibility',
            description: 'See all your cloud resources, costs, and performance across every provider from a single unified dashboard.',
            image: './images/block.png'
        },
        {
            title: 'Optimize & Scale',
            description: 'Act on AI-driven recommendations to cut waste, reduce costs by up to 40%, and scale your infrastructure with confidence.',
            image: './images/block.png'
        }
    ];
    return (
        <CustomSection className="md:py-20 py-12 relative space-y-6">
            <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />

            <HeroHeader icon={<ChartIcon />} badgeText="The Solution">
                <h2 className="self-center my-6 text-center text-4xl">
                    Benefits of choosing <span className="font-black text-red-600">Qocent</span>
                </h2>
            </HeroHeader>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 place-content-start">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative space-y-4 md:space-y-8"
                >
                    <div className="rounded-3xl relative overflow-hidden shadow-xs max-h-[26rem] border border-red-500 grid place-content-center">
                        <VideoPlayer src="/videos/benefit.mp4" />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-gray-900 text-sm md:text-md leading-relaxed"
                    >
                        Qocent gives you complete control over your multi-cloud infrastructure — from deployment to cost optimization — all from one powerful console built for teams of every size.
                    </motion.p>
                </motion.div>

                {/* Right side - Process list */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-24 space-y-8"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-[0.5] bg-gray-600" />

                    {processes.map((process, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * index, duration: 0.5 }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className="relative group cursor-pointer"
                        >
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{
                                    scaleY: selectedIndex === index ? 1 : 0,
                                    opacity: selectedIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className={`absolute left-0 top-0 border-l ${selectedIndex === index ? "border-red-600" : "border-gray-600"} bottom-0 origin-top`}
                            />

                            <div className={`pl-6 py-2 max-w-md transition-all duration-300`}>
                                <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 mb-3 ${selectedIndex === index ? 'text-red-500' : 'text-gray-900'
                                    }`}>
                                    {process.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-md leading-relaxed">
                                    {process.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>


        </CustomSection>
    )
}

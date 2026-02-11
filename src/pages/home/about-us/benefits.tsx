import { imgLinks } from "@/assets/assetLink";
import { ChartIcon } from "@/assets/icons/chart";
import { HeroHeader } from "@/components/shared/hero-header";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import CustomSection from "../home/custom-section";



export default function Benefits() {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const processes = [
        {
            title: 'Discover & Diagnose',
            description: 'Uncover challenges, opportunities, and root causes with clarity.',
            image: '/path/to/discover-image.jpg'
        },
        {
            title: 'Strategize & Plan',
            description: 'Build actionable roadmaps aligned with your business goals.',
            image: '/path/to/strategize-image.jpg'
        },
        {
            title: 'Execute & Optimize',
            description: 'Build actionable roadmaps aligned with your business goals.',
            image: '/path/to/execute-image.jpg'
        }
    ];
    return (
        <CustomSection className="md:py-10 py-12 relative space-y-6">
            <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />

            <HeroHeader icon={<ChartIcon />} badgeText="The Solution">
                <h2 className="self-center my-6 text-center text-4xl">
                    Benefits of choosing <span className="font-black text-red-600">Qocent</span>
                </h2>
            </HeroHeader>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedIndex}
                                src={processes[selectedIndex].image}
                                alt={processes[selectedIndex].title}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Right side - Process list */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-24"
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

                            <div className={`pl-6 py-2 max-w-sm transition-all duration-300`}>
                                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 mb-1 ${selectedIndex === index ? 'text-red-500' : 'text-gray-900'
                                    }`}>
                                    {process.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {process.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 max-w-lg pr-12"
            >
                <p className="text-gray-900 text-sm md:text-md leading-relaxed">
                    We're not just a security provider — we're your trusted protection partner. When you choose Titan Shield Security,
                </p>
            </motion.div>
        </CustomSection>
    )
}

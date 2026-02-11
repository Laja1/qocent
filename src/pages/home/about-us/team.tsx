import { imgLinks } from "@/assets/assetLink";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Percent } from "lucide-react";
import CustomSection from "../home/custom-section";

const team = [
    {
        name: 'Chinelo Enechi',
        role: 'Product Developer',
        image: '/images/teamImage.png',
        bgColor: 'from-green-100 to-blue-100'
    },
    {
        name: 'Tomiwa',
        role: 'Chief Technology Officer',
        image: '/images/teamImage.png',
        bgColor: 'from-gray-100 to-gray-200'
    },
    {
        name: 'Eniayo Omoregie',
        role: 'Chief Operations Officer',
        image: '/images/teamImage.png',
        bgColor: 'from-blue-100 to-cyan-100'
    },
    {
        name: 'Adelaja',
        role: 'Product Designer',
        image: '/images/teamImage.png',
        bgColor: 'from-gray-200 to-gray-300'
    }
];


export default function TeamSection() {

    return (
        <CustomSection className="md:py-20 py-12 relative">
            <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />
            {/* Section header */}
            <div className="mb-16 w-full">
                <Badge
                    variant="secondary"
                    className="md:mb-4 rounded-full font-bold px-2 py-1 md:px-4 text-xs shadow-md shadow-teal-300"
                    style={{ color: "#1C1629" }}
                >
                    <Percent className="mr-2" /> OUR TALENT
                </Badge>

                <div className="flex gap-12 w-full justify-center items-center">
                    <h2 className="text-2xl whitespace-nowrap md:text-4xl font-bold text-gray-900">
                        Meet <span className="text-red-500 font-black">Our Team</span>
                    </h2>
                    <div className="h-px bg-gray-300 w-full" />
                </div>
            </div>

            {/* Team grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative overflow-hidden rounded-3xl mb-4">
                            {/* Gradient background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${member.bgColor}`} />

                            {/* Image */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-start">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {member.name}
                            </h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </CustomSection>
    );
};

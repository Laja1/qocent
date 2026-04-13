import { imgLinks } from "@/assets/assetLink";
import { HeroHeader } from "@/components/shared/hero-header";
import { Heart, Instagram, Linkedin, Twitter } from 'lucide-react';
import CustomSection from "../components/custom-section";
import { InfiniteSlider } from "../home/solution";

const testimonials = [
    {
        name: 'Ryan harper',
        company: 'Harper education',
        avatar: '/api/placeholder/80/80',
        testimonial: 'Qocent transformed how we manage our cloud infrastructure. One console, full visibility across all our providers — it just works.',
        highlights: ['Qocent'],
        social: 'twitter',
        icon: <Twitter className="w-5 h-5" />,
        iconBg: 'bg-pink-50',
        iconColor: 'text-red-500'
    },
    {
        name: 'Mia emirt',
        company: 'emirt agency',
        avatar: '/api/placeholder/80/80',
        testimonial: 'The perfect partner for AI-driven innovation. They simplified our workflows and gave our marketing team the tools to achieve more with less effort.',
        highlights: [],
        social: 'instagram',
        icon: <Instagram className="w-5 h-5" />,
        iconBg: 'bg-pink-50',
        iconColor: 'text-red-500'
    },
    {
        name: 'Emily johnson',
        company: 'Johnson marketing',
        avatar: '/api/placeholder/80/80',
        testimonial: "We've seen measurable growth in our digital solutions. It's intuitive, fast, and seamlessly integrates with our existing workflows.",
        highlights: ['measurable growth', 'intuitive, fast'],
        social: 'linkedin',
        icon: <Linkedin className="w-5 h-5" />,
        iconBg: 'bg-pink-50',
        iconColor: 'text-red-500'
    }
];

const reviewers = [
    '/api/placeholder/40/40',
    '/api/placeholder/40/40',
    '/api/placeholder/40/40',
    '/api/placeholder/40/40'
];


export default function Customers() {
    return (
        <CustomSection className="md:py-10 py-12 relative space-y-6">
            <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />

            <HeroHeader description="Real feedback from teams and individuals who rely on our platform to power their business with real working analytics " icon={<Heart />} badgeText="CUSTOMERS">
                <h2 className="self-center my-6 text-center text-4xl">
                    Our customers love us
                </h2>
            </HeroHeader>

            <div className="py-8">
                <TestimonialsSection />
            </div>
        </CustomSection>
    )
}




export function TestimonialsSection() {

    const HighlightedText = ({ text, highlights }: { text: string; highlights: string[] }) => {
        if (highlights.length === 0) return <>{text}</>;

        let processedText = text;
        highlights.forEach(highlight => {
            const regex = new RegExp(`(${highlight})`, 'gi');
            processedText = processedText.replace(regex, '<<HIGHLIGHT>>$1<</HIGHLIGHT>>');
        });

        return (
            <>
                {processedText.split(/<<HIGHLIGHT>>|<<\/HIGHLIGHT>>/).map((part, i) => {
                    const isHighlight = highlights.some(h =>
                        part.toLowerCase() === h.toLowerCase()
                    );
                    return isHighlight ? (
                        <span key={i} className="text-gray-400">
                            {part}
                        </span>
                    ) : (
                        part
                    );
                })}
            </>
        );
    };

    return (
        <>
            {/* Testimonials Grid */}
            <InfiniteSlider
                items={testimonials}
                itemWidth={450}
                itemHeight={280}
                duration={20}
                className=""
                renderItem={(item) => {
                    return (
                        <div className="bg-white rounded-3xl h-full flex-col space-y-8 p-6 hover:shadow-xs"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-20 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {item.company}
                                        </p>
                                    </div>
                                </div>

                                <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0 transition-transform hover:scale-110`}>
                                    {item.icon}
                                </div>
                            </div>

                            <div className="h-px w-full bg-gray-300 rounded-3xl" />

                            <p className="text-gray-700 pt-2 leading-relaxed">
                                <HighlightedText
                                    text={item.testimonial}
                                    highlights={item.highlights}
                                />
                            </p>
                        </div>
                    );
                }}
            />

            <div className="flex items-center mt-12 justify-center gap-4">
                <div className="flex -space-x-3 ">
                    {reviewers.map((avatar, index) => (
                        <div
                            key={index}

                            className="w-10 h-10 p-1 rounded-full border-2 border-white overflow-hidden "
                        >
                            <img
                                src={avatar}
                                alt={`Reviewer ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                {/* Review text */}
                <p className="text-gray-600 text-center">
                    Over <span className="font-bold text-gray-900">11,454+</span> people gave us review
                </p>
            </div>
        </>
    );
}




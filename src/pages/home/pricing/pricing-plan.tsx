import { HeroHeader } from "@/components/shared/hero-header";
import { Check, Flame, Tag } from "lucide-react";
import CustomSection from "../components/custom-section";
import { CustomGlassButton } from "../home/hero";

const plans = [
    {
        title: 'Monthly',
        price: '$110',
        period: '/month',
        isPopular: true,
        features: [
            'Full inventory of your cloud assets',
            'Get recommendations to save',
            'Set & manage cloud spend limits',
            'Get notified when costs spike',
            'Breakdown of usage & costs',
            'View your holistic landing zone architecture',
            'View costs by service, region, and more',
            'Predict & plan your cloud spend'
        ]
    },
    {
        title: 'Yearly',
        price: '$1,200',
        period: '/year',
        isPopular: false,
        features: [
            'Full inventory of your cloud assets',
            'Get recommendations to save',
            'Set & manage cloud spend limits',
            'Get notified when costs spike',
            'Breakdown of usage & costs',
            'View your holistic landing zone architecture',
            'View costs by service, region, and more',
            'Predict & plan your cloud spend'
        ]
    }
];

export default function PricingPlan() {
    return (
        <>
            <div className="relative">
                <img src="./images/blurwhite.png" className="absolute bottom-0 left-0 w-full h-26 object-fill" alt="" />
            </div>

            <CustomSection className="">
                <HeroHeader
                    hideLine={false}
                    icon={<Tag />}
                    badgeText="Pricing"
                    description="Our Charges straightforward and equitable, devoid of hidden fees, upgrading to an enhanced plan is always feasible"
                >
                    <h2 className="text-4xl pb-4 text-black">Pricing Plan</h2>
                </HeroHeader>

                <div className="grid my-16 grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br border border-red-400 from-pink-50 via-rose-50 to-pink-100 rounded-xl p-8 shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">{plan.title}</h2>
                                {plan.isPopular && (
                                    <div className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                        <Flame className="w-4 h-4" />
                                        Popular
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                <span className="text-xl text-gray-500 self-start mt-2">{plan.period}</span>
                            </div>

                            {/* CTA Button */}
                            <div className="w-fit mb-8">
                                <CustomGlassButton buttonText="Get Started for Free" onButtonClick={() => window.location.href = '/signin'} />
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-300 mb-8"></div>

                            {/* Description */}
                            <p className="text-gray-800 text-sm font-medium mb-6 leading-relaxed">
                                Complete FinOps toolset with tracking, optimization, alerts, and forecasts.
                            </p>

                            {/* Features List */}
                            <ul className="space-y-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-0.5">
                                            <Check className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-gray-800 leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </CustomSection>
        </>
    )
}


import { HeroHeader } from "@/components/shared/hero-header";
import { ArrowRight, Check, Tag } from "lucide-react";
import CustomSection from "../components/custom-section";
import { Button } from "@/components/ui/button";

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
                            className={`border rounded-2xl p-8 bg-white ${
                                plan.isPopular ? "border-primary" : "border-gray-200"
                            }`}
                        >
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">{plan.title}</h2>
                                {plan.isPopular && (
                                    <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium">
                                        Popular
                                    </div>
                                )}
                            </div>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                <span className="text-xl text-gray-500 self-start mt-2">{plan.period}</span>
                            </div>

                            <p className="text-gray-700 text-sm font-medium mb-6 leading-relaxed">
                                Complete FinOps toolset with tracking, optimization, alerts, and forecasts.
                            </p>

                            <ul className="space-y-3 border-y border-gray-200 py-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-gray-600" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6">
                                <Button className="rounded-xl" onClick={() => window.location.href = '/signin'}>
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CustomSection>
        </>
    )
}


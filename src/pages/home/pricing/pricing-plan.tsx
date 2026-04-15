import { ArrowRight, Check, Tag, Zap, Shield, BarChart3 } from "lucide-react";
import CustomSection from "../components/custom-section";
import { Button } from "@/components/ui/button";

const plans = [
    {
        title: 'Monthly',
        price: '₦145,000',
        period: '/month',
        isPopular: true,
        description: 'Complete FinOps toolset with tracking, optimization, alerts, and forecasts.',
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
        price: '₦1,740,000',
        period: '/year',
        isPopular: false,
        badge: 'Save 20%',
        description: 'Everything in Monthly, billed annually. Best value for committed teams.',
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

const trustSignals = [
    { icon: Shield, text: "SOC 2 compliant infrastructure" },
    { icon: Zap, text: "Real-time data, 99.9% uptime" },
    { icon: BarChart3, text: "Used by cloud teams managing $50k+/month" },
];

export default function PricingPlan() {
    return (
        <section className="bg-[#fafafa]">
            {/* Subtle top gradient */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent" />

            <CustomSection className="py-24">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#c12c27] uppercase tracking-widest mb-4">
                        <Tag className="w-3 h-3" />
                        Pricing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1C1629] mb-4 tracking-tight">
                        Pricing Plan
                    </h2>
                    <p className="text-base text-[#706B6B] leading-relaxed">
                        Charges are straightforward and equitable, devoid of hidden fees.
                        Upgrading to an enhanced plan is always feasible.
                    </p>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                                relative bg-white rounded-none border
                                ${plan.isPopular
                                    ? "border-[#1C1629] shadow-lg shadow-[#1C1629]/8"
                                    : "border-[#e5e5e5] shadow-sm"
                                }
                            `}
                        >
                            {/* Popular indicator */}
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-8">
                                    <span className="inline-block bg-[#1C1629] text-white text-xs font-semibold px-4 py-1 uppercase tracking-wider">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Save badge for yearly */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-8">
                                    <span className="inline-block bg-[#c12c27] text-white text-xs font-semibold px-4 py-1 uppercase tracking-wider">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="p-8 lg:p-10">
                                {/* Plan title */}
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-semibold text-[#1C1629]">
                                        {plan.title}
                                    </h3>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-[#1C1629] tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm text-[#706B6B]">{plan.period}</span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-[#706B6B] leading-relaxed mb-8">
                                    {plan.description}
                                </p>

                                {/* CTA */}
                                <Button
                                    className={`
                                        w-full justify-center gap-2 rounded-none py-6 text-sm font-medium
                                        ${plan.isPopular
                                            ? "bg-[#1C1629] text-white hover:bg-[#1C1629]/90"
                                            : "bg-white border border-[#1C1629] text-[#1C1629] hover:bg-[#fafafa]"
                                        }
                                    `}
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </Button>

                                {/* Divider */}
                                <div className="h-px bg-[#e5e5e5] my-8" />

                                {/* Features */}
                                <ul className="space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                                <Check className="w-5 h-5 text-[#1C1629]" strokeWidth={2.5} />
                                            </div>
                                            <span className="text-sm text-[#4a4a4a] leading-relaxed">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {trustSignals.map((signal, index) => (
                        <div key={index} className="flex items-center gap-4 bg-white border border-[#e5e5e5] p-5">
                            <div className="w-10 h-10 bg-[#f0f0f0] flex items-center justify-center flex-shrink-0">
                                <signal.icon className="w-5 h-5 text-[#706B6B]" />
                            </div>
                            <span className="text-sm text-[#4a4a4a]">{signal.text}</span>
                        </div>
                    ))}
                </div>
            </CustomSection>
        </section>
    )
}

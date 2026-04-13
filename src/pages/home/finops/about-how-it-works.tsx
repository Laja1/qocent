export default function AboutHowItWorks() {
    return (
        <section className="bg-gray-950 mx-auto w-full py-18 grid place-content-center">
            <h2 className="w-full text-white font-bold my-6 text-center text-3xl md:text-5xl">
                How it Works
            </h2>

            <p className="w-full max-w-xs md:pt-6 text-sm mx-auto md:ax-w-lg text-center lg:text-base text-gray-300">
                From first login to measurable savings — in three steps.
            </p>

            <div className="relative w-full max-w-5xl mx-auto mt-12 mb-4 px-6">
                {/* Main frame */}
                <img
                    src="/images/how-it-works-main.png"
                    alt="How it works"
                    className="w-full rounded-2xl"
                />
                {/* Login card — overlapping top-left */}
                <img
                    src="/images/how-it-works-login.png"
                    alt="Login"
                    className="absolute top-24 -left-6 w-[26%] rounded-xl"
                    style={{ animation: "float 4s ease-in-out infinite" }}
                />
            </div>

            <div className="">
                <CloudOptimizer />
            </div>
        </section>
    )
}


import { Cloud, DollarSign, Eye, HeadphonesIcon, Lightbulb, Shield } from 'lucide-react';
import { useState } from 'react';
import { InfiniteSlider } from '../home/solution';

function CloudOptimizer() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: 'Connect',
            description: 'Link your cloud accounts(5 mins). Secure OAuth/IAM',
            icon: Cloud,
            active: true
        },
        {
            title: 'Analyze',
            description: "Qocent's AI scans your infrastructure, finds waste, and builds insights. Results in under 1 hour",
            icon: Eye,
            active: false
        },
        {
            title: 'Optimize',
            description: 'Review Recommendations. Save Money. First savings appear within 24 hours',
            icon: DollarSign,
            active: false
        }
    ];

    const features = [
        {
            title: 'Cost Monitoring',
            icon: Eye
        },
        {
            title: 'Secure',
            icon: Shield
        },
        {
            title: 'Spending Budget',
            icon: DollarSign
        },
        {
            title: '24/7 Assistance',
            icon: HeadphonesIcon
        },
        {
            title: 'Real-time Insights',
            icon: Lightbulb
        }
    ];

    return (
        <>
            {/* Main Steps */}
            <div className="w-screen lg:w-full grid grid-cols-1 mt-12 md:grid-cols-3 mb-16 px-6  lg:px-20 2xl:px-0 max-w-7xl mx-auto">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`relative border-t border-zinc-300/50 p-11 md:p-6 lg:p-11 transition-all duration-300 cursor-pointer ${index === activeStep
                            ? 'bg-gradient-to-br from-amber-900/40 to-amber-950/40'
                            : 'bg-zinc-900/50 hover:border-zinc-700/50'
                            }`}
                        onClick={() => setActiveStep(index)}
                        onMouseEnter={() => setActiveStep(index)}
                    >
                        <h3 className="text-2xl text-white font-semibold mb-4">{step.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {step.description}
                        </p>


                    </div>
                ))}
            </div>

            <div className='px-6 w-full md:px-20 2xl:px-0 max-w-7xl mx-auto'>
                <div className="flex items-center justify-between mb-12">
                    <span className='h-px w-full bg-zinc-500'> </span>
                    <span className='rounded-full size-2 w-4 mx-1 bg-gray-500'></span>
                    <span className="text-zinc-500 mx-4 whitespace-nowrap text-sm font-medium py-3 rounded-full border border-zinc-700 bg-zinc-900/50 px-6">Other Interesting Features</span>
                    <span className='rounded-full size-2 w-4 mx-1 bg-gray-500'></span>
                    <span className='h-px w-full bg-zinc-500'> </span>
                </div>

                <InfiniteSlider
                    items={features}
                    itemWidth={250}
                    itemHeight={56}
                    duration={25}
                    renderItem={(item) => {
                        return (
                            <span className="rounded-md gap-8 bg-stone-800 px-6 py-4 text-gray-600 whitespace-nowrap flex items-start">
                                <item.icon size={24} className="text-red-500" />
                                {item.title}
                            </span>
                        );
                    }}
                />
            </div>
        </>
    );
}
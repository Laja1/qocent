import { ArrowDownRight } from 'lucide-react';
import { HeroComponent } from '../home/hero';

export default function FinopsHero() {
    return (
        <HeroComponent
            title="Stop Guessing Where Your"
            subtitle="Cloud Budget Goes"
            description="See what exactly is consuming your $50k/month across AWS, Azure, GCP, Huawei and cut waste by 30-40% without touching infrastructure"
            buttonText="Learn More"
            buttonIcon={<ArrowDownRight />}
            onButtonClick={() => document.getElementById('finops-content')?.scrollIntoView({ behavior: 'smooth' })}

            showButton={true}
            className='h-full'
        />)
}

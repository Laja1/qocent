import { HeroComponent } from '../home/hero';

export default function PricingHero() {
    return (
        <HeroComponent
            title="Pricing"
            subtitle=""
            description="See exactly what's consuming your $50k/month across AWS, Azure, GCP, Huawei and cut waste by 30-40% without touching infrastructure"
            showButton={false}
            className='h-3/4'
        />)
}

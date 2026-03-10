import { HeroComponent } from '../home/hero';

export default function PricingHero() {
    return (
        <HeroComponent
            title="Documentation"
            subtitle=""
            description="Uncover hidden cloud costs across AWS, Azure, GCP and more. Reduce expenses by 30-40% without altering your setups"
            showButton={false}
            className='h-3/4'
        />)
}

import { HeroComponent } from '../home/hero';

export default function ContactUsHero() {
    return (
        <HeroComponent
            title="Contact Us"
            subtitle=""
            description="Reach out to our team for expert guidance on cloud cost optimization and FinOps strategies"
            showButton={false}
            className='h-3/4'
        />)
}

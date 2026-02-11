import { imgLinks } from "@/assets/assetLink"
import { CcctvIcon } from "@/assets/icons/cctv"
import { ChartIcon } from "@/assets/icons/chart"
import { ExchangeIcon } from "@/assets/icons/exchange"
import { MoneyIcon } from "@/assets/icons/money"
import { HeroHeader } from "@/components/shared/hero-header"
import clsx from 'clsx'
import CustomSection from "./custom-section"

export const ProblemWeSolve = () => {
  const problems = [
    {
      title: 'Hidden Costs', description: `You're paying for idle servers, forgotten 
snapshots, and resources that you 
cannot account for.`, icon: <MoneyIcon />
    },
    {
      title: 'Dashboard Hell', description: `Switching between AWS, Azure, GCP 
consoles wastes nothing less than 4+ 
hours/week.`, icon: <ExchangeIcon />
    },
    {
      title: 'Security Blind spots', description: `Without unified visibility, you make misconfigurations leading to compliance gaps across providers.`, icon: <CcctvIcon />
    }
  ]

  return (
    <CustomSection className="relative items-center z-10 justify-center flex flex-col md:h-screen 2xl:h-fit py-4 2xl:py-20">
      <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />
      <HeroHeader
        icon={<ChartIcon />}
        description="We offer solutions that are suited to the problems you face while navigating the world of Cloud."
        badgeText='Your Business Obstacles'
      >
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
          The Problems We Solve
        </h1>
      </HeroHeader>

      <div className="flex flex-col md:flex-row gap-5 lg:gap-12 mt-10 lg:mt-18">
        {problems.map((problem) => (
          <DataPointCard className="p-5 md:p-8 pb-8 md:pb-12" icon={problem.icon} title={problem.title} description={problem.description} />
        ))}
      </div>
    </CustomSection>
  )
}

export const DataPointCard = ({ icon, title, description, className }: { icon: React.ReactNode; title: string; description: string, className?: string }) => (
  <div className={clsx(
    'bg-gradient-to-r from-[#F6F1FC80] to-[#FFFFFF80] border border-[#FFD5DC] rounded-xl space-y-2 flex-1',
    className
  )}>
    <div className="border border-[#00000010] bg-[#ffffff50] inline-flex rounded-md justify-center items-center mb-6 size-12">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
)

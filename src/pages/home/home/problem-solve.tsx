import { imgLinks } from "@/assets/assetLink"
import { CcctvIcon } from "@/assets/icons/cctv"
import { ChartIcon } from "@/assets/icons/chart"
import { ExchangeIcon } from "@/assets/icons/exchange"
import { MoneyIcon } from "@/assets/icons/money"
import { HeroHeader } from "@/components/shared/hero-header"


export const ProblemWeSolve = () => {
  const problems = [
    {title:'Hidden Costs',description:`You're paying for idle servers, forgotten 
snapshots, and resources that you 
cannot account for.`,icon:<MoneyIcon />},
{title:'Dashboard Hell',description:`Switching between AWS, Azure, GCP 
consoles wastes nothing less than 4+ 
hours/week.`,icon:<ExchangeIcon />},
{title:'Security Blind spots',description:`Without unified visibility, you make 
misconfigurations leading to compliance 
gaps across providers.`,icon:<CcctvIcon />}
  ]
  return (
    <div className="relative px-20 items-center z-10 justify-center flex flex-col h-screen w-full overflow-hidden">
      <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover"/>
      <HeroHeader
  badgeText='Your Business Obstacles'
  title="The Problems We Solve"
  icon={<ChartIcon />}
  description="We offer solutions that are suited to the problems you face while navigating the world of Cloud."
/>

      <div className="flex flex-row gap-5 mt-10">
        {problems.map((problem, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#F6F1FC80] to-[#FFFFFF80] p-8 border border-[#FFD5DC] rounded-xl"
          >
            <div className="border border-[#00000010] bg-[#ffffff50] inline-flex rounded-md p-2 mb-4">
              {problem.icon ? (
                // Render as a React component if icon exists
                problem.icon
              ) : null}
            </div>
            <h3 className="text-xl font-bold">{problem.title}</h3>
            <p>{problem.description}</p>
          </div>
        ))}
      </div>
      </div>
  )
}

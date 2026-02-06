import { imgLinks } from "@/assets/assetLink";
import { ChartIcon } from "@/assets/icons/chart";
import { Badge } from "@/components/ui/badge";

const TEXTS = {
  badge: 'How It works',
  title: {
    prefix: 'From',
    chaos: 'Chaos',
    middle: 'to',
    control: 'Contol',
    suffix: 'in 3 steps'
  },
  steps: ['Sign Up', 'Link your Cloud Account', 'Start Saving Immediately']
};

export default function HowItWorks() {
    return (
      <section className="relative py-16" style={{ backgroundImage: `url(${imgLinks.sectionProject})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 relative z-10">
     
        <Badge
          variant="secondary"
          className="mb-4 rounded-full px-4 py-1.5 text-xs font-medium lg:text-sm"
        >
       <ChartIcon /> {TEXTS.badge}
        </Badge>
 

      {/* Title with divider lines */}
      <div className="flex items-center gap-4 mb-10 w-full">
        <span className="hidden sm:block h-1 rounded-full  flex-1 bg-[#EBEAF6]" />
        <h2 className=" text-center text-4xl font-semibold">
          {TEXTS.title.prefix} <span className="text-red-600">{TEXTS.title.chaos}</span> {TEXTS.title.middle} <span className="text-red-600">{TEXTS.title.control}</span> {TEXTS.title.suffix}
        </h2>
        <span className="hidden sm:block h-1 rounded-full flex-1 bg-[#EBEAF6]" />
      </div>

      
    </div>
        <div className="mx-auto max-w-7xl px-6">
         <div className="gap-2 space-y-3"> {TEXTS.steps.map((item, index)=><div key={index} className="border items-center flex justify-center py-2 border-[#FFD5DC]  rounded-md shadow-md">{item}</div>)}
         </div>  
  
     
        </div>
      </section>
    );
  }
  

import { imgLinks } from "@/assets/assetLink";
import { ChartIcon } from "@/assets/icons/chart";
import { Padlock } from "@/assets/icons/padlock";
import { HeroHeader } from "@/components/shared/hero-header";
import { Asterisk, Banknote, CirclePlus, Database, Layers, LockKeyhole, Rocket } from "lucide-react";
import CustomSection from "./custom-section";
import { DataPointCard } from "./problem-solve";

const tags = [
  { text: "Cost Optimization", icon: Banknote },
  { text: "Starter Packs", icon: Rocket },
  { text: "Security Analysis", icon: LockKeyhole },
  { text: "Scalable Solutions", icon: Layers },
  { text: "Real-Time Insights", icon: CirclePlus },
];


export default function QocentSolution() {
  return (
    <CustomSection className="py-10">
      <img src={imgLinks.container2} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />

      <HeroHeader
        badgeText="The Solution"
        icon={<ChartIcon />}
      >
        <h2 className=" text-center text-4xl font-semibold">
          The <span className="text-red-600">Qocent</span> Solution
        </h2>
      </HeroHeader>


      <div className="mx-auto max-w-7xl pt-12">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
            <SolutionCardDetails
              title="Workflow Automation & Optimization. "
              description="Cut cloud costs 30–40% with AI-powered insights that show:"
              items={["Which resources are burning money", "Exact cost per team/project/environment"]}
            />


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DataPointCard
                icon={<Database color="#CD0A2C" />}
                title="Data-driven"
                description="Turn raw data into actionable insights that drive smarter decisions and measurable growth."
                className="p-3 md:p-5 py-4 md:py-6"
              />

              <DataPointCard
                icon={<ChartIcon />}
                title="Efficient Growth"
                description="Work smarter, not harder. Unlock faster results and lower costs with AI-powered efficiency."
                className="p-3 md:p-5 py-4 md:py-6"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl h-full bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
            <SolutionCardDetails
              title="One Dashboard. Every Cloud"
              description="Stop switching between AWS, Azure Portal, GCP Console, and Huawei Cloud. Deploy VMs, manage VPCs, monitor resources—all from Qocent's
          unified interface that speaks every cloud's language."
            />

            {/* Dashboard Placeholder */}
            <div className="grid place-content-center h-69 rounded-xl bg-white text-sm text-gray-400">
              Dashboard Screenshot Placeholder
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
            <SolutionCardDetails
              title="Link Accounts in 5 Minutes (Not 5 Days)"
              description="No migration. No downtime. No vendor lock-in."
            />

            {/* Cloud logos placeholder */}
            <div className="flex h-48 lg:h-72 items-center justify-center rounded-xl bg-white text-sm text-gray-400">
              Cloud Provider Logos Placeholder
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
            <SolutionCardDetails
              title="Security Score + Compliance"
              description="Get a real-time security score across all your clouds. Catch
          misconfigurations before auditors do."
              items={["Threat detection with instant email alerts", "Role-Based Access Control for multiple users accessing the same cloud environment"]}
            />

            {/* Security score placeholder */}
            <div className="rounded-xl bg-white p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 items-center  justify-center flex rounded-full size-10">
                  <Padlock />
                </div>
                <span className="text-sm font-bold text-gray-700">Security Score</span>
              </div>

              <div className="flex w-full gap-4">
                <div className="mt-2 h-20 flex-4/6 rounded-lg bg-gray-100">
                  <div className="h-full w-[88%] rounded-lg bg-red-700" />
                </div>
                <div className="grid place-content-center text-4xl xl:text-5xl font-black">88%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12">
          <InfiniteSlider
            items={tags}
            itemWidth={250}
            itemHeight={50}
            duration={20}
            renderItem={(item) => {
              return (
                <span className="rounded-full border border-gray-200 bg-red-50 px-10 py-3 text-gray-600 whitespace-nowrap flex items-center gap-2">
                  <span className="w-full"> <item.icon size={24} className="text-red-500" /></span>
                  {item.text}
                </span>
              );
            }}
          />
        </div>
      </div>
    </CustomSection>
  );
}



interface SolutionCardDetailsProps {
  title: string;
  description: string;
  items?: string[];
}

function SolutionCardDetails({ title, description, items }: SolutionCardDetailsProps) {
  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">
        {title}
      </h3>
      <p className="mb-6 text-sm text-[#8A6666]">
        {description}
      </p>

      {items && items.length && <ul className="mb-8 space-y-2 text-sm text-red-600">
        {items.map((item) => (
          <li className="flex size-fit justify-center items-start gap-2" key={item}><Asterisk className="inline self-center mr-2" size={16} /> <span>{item}</span></li>
        ))}
      </ul>}
    </>
  )
}



interface InfiniteSliderProps<T = string> {
  items: T[];
  itemWidth?: number;
  itemHeight?: number;
  duration?: number;
  reverse?: boolean;
  renderItem?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export const InfiniteSlider = <T = string>({
  items,
  itemWidth = 200,
  itemHeight = 50,
  duration = 10,
  reverse = false,
  renderItem,
  className = ""
}: InfiniteSliderProps<T>) => {
  const quantity: number = items.length;

  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes autoRun {
          from { left: 100%; }
          to { left: calc(${itemWidth}px * -1); }
        }
        
        @keyframes reversePlay {
          from { left: calc(${itemWidth}px * -1); }
          to { left: 100%; }
        }
        
        .slider-container:hover .slider-item {
          animation-play-state: paused !important;
          filter: grayscale(1);
        }
        
        .slider-item:hover {
          filter: grayscale(0);
        }
      `}</style>

      <div
        className={`slider-container w-full ${className}`}
        style={{
          height: `${itemHeight}px`,
          maskImage: 'linear-gradient(to right, transparent, #000 10% 90%, transparent)'
        }}
      >
        <div
          className="relative w-full"
          style={{
            minWidth: `${itemWidth * quantity}px`,
            height: `${itemHeight}px`
          }}
        >
          {items.map((item: T, index: number) => (
            <div
              key={index}
              className="slider-item absolute transition-all duration-500"
              style={{
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                left: '100%',
                animation: `${reverse ? 'reversePlay' : 'autoRun'} ${duration}s linear infinite`,
                animationDelay: `calc((${duration}s / ${quantity}) * ${index} - ${duration}s)`
              }}
            >
              {renderItem ? renderItem(item, index) : (
                <div className="w-full h-full flex items-center justify-center">
                  {String(item)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};


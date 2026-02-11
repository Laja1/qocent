import { HeroHeader } from "@/components/shared/hero-header";
import {
  ArrowLeftRight,
  Check,
  Layers,
  X,
} from "lucide-react";
import CustomSection from "./home/custom-section";

const qocent = {
  src: "",
  isQocent: true,
  features: [
    'One-click cloud deployments',
    'Centralized access and governance',
    'AI-driven optimization insights',
    'Multiple cloud platforms under a single control plane',
    'Granular cost monitoring and optimization'
  ]
};

const others = {
  src: "",
  isQocent: false,
  features: [
    'Slower execution and manual setup',
    'Fragmented access control',
    'Limited or delayed reporting',
    'Single-cloud or limited coverage',
    'Generic cost analysis'
  ]
}

export default function Comparison() {
  return (
    <CustomSection className="justify-center items-center flex flex-col py-10 ">
      <HeroHeader
        description="Qocent simplifies how teams deploy, govern, and optimize cloud infrastructure across cloud providers, using automation and intelligence built for scale."
        badgeText="COMPARISON"
        icon={<ArrowLeftRight className="text-red-500 mr-2" />}
      >
        <h2 className="self-center my-6 text-center text-4xl">
          What Makes Us Different
        </h2>
      </HeroHeader>


      <div className="mt-16 w-full grid md:grid-cols-2 gap-8">
        <ComparisonComponent selection={qocent} >
          <div className="grid place-content-center">
            <img src="/images/compare_qocent.png" alt="" />
          </div>
        </ComparisonComponent>
        <ComparisonComponent selection={others} >
          <div className="flex items-center justify-center text-2xl py-2">
            <Layers className="text-red-500 mr-3" size={30} /> <span>Others</span>
          </div>
        </ComparisonComponent>
      </div>
    </CustomSection>
  );
}






function ComparisonComponent({ selection, children }: { selection: typeof qocent | typeof others; children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg w-full">
      {children}

      <div className="space-y-4 w-full">
        {selection.features.map((text: string, index: number) => (
          <div key={index} className="flex items-start gap-3">
            {selection.isQocent ? <Check className="self-center" size={16} /> : <X className="self-center" size={16} />}
            <p className="text-gray-700 leading-relaxed text-sm">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

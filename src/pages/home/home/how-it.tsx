import { imgLinks } from "@/assets/assetLink";
import { HeroHeader } from "@/components/shared/hero-header";
import { LogIn } from "lucide-react";
import CustomSection from "../components/custom-section";

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
    <CustomSection
      className="relative py-16 px-6 md:px-20 max-w-7xl mx-auto w-full space-y-2"
      style={{ backgroundImage: `url(${imgLinks.successStories})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >

      <HeroHeader
        badgeText="Signup"
        icon={<LogIn className="text-red-500 mr-1" />}
        hideLine={true}
      >
        <h2 className="self-center my-6 text-center text-4xl">
          From <span className="font-semibold text-red-600">Chaos</span> to <span className="font-black text-red-600">Control</span> in 3 Steps
        </h2>
      </HeroHeader>

      <p className="w-full text-center">Our Sign Up process is simplified to ensure you focus on what makes your business thrive</p>

      <ul className="mx-auto max-w-3xl space-y-8 mt-18">
        {TEXTS.steps.map((item, index) => <li key={index} className="border items-center flex justify-center py-4 border-red-500 rounded-md shadow-xs">{item}</li>)}
      </ul>
    </CustomSection>
  );
}


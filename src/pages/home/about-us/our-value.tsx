import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Percent } from 'lucide-react';
import BadgeHeader from '../components/Badge';
import CustomSection from '../components/custom-section';
import { CustomGlassButton } from '../home/hero';
import { VideoPlayer } from '../home/solution';


export default function OurValue() {
  const features = [
    'Dive into your financial analytics with us',
    'Get timely notifications for upcoming bills',
    'Define your aspirations goal setting features'
  ];

  return (
    <CustomSection className="md:py-20 py-12 grid lg:grid-cols-2 gap-28 2xl:gap-42 items-center">
      {/* Left side - Product visual */}
      <div className='relative rounded-xl'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-xl md:rounded-3xl border-red-500 border shadow-2xl w-full overflow-hidden md:mb-6"
        >
          <VideoPlayer src="/videos/value.mp4" />
        </motion.div>
        <div className="max-w-[24rem] bg-white overflow-hidden w-36 h-30 md:w-58 md:h-48 absolute grid place-content-start -right-2 -bottom-12 md::-right-12 rounded-3xl md:-bottom-6 z-20 shadow-md">
          <VideoPlayer className="scale-140 h-60 w-64 scale-x-160" src="/videos/save-time.mp4" />
        </div>
      </div>

      {/* Right side - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BadgeHeader title='OUR VALUE'>
          <Percent className="mr-2" />
        </BadgeHeader>

        <h2 className="text-xl md:text-4xl mt-4 md:mt-0 font-bold text-gray-900 mb-6 leading-tight">
          Save Time And Money With Our Powerful Tools.
        </h2>

        <p className="text-gray-600 text-md mb-8">
          We help businesses navigate complexity unlock to growth achieve lasting transformation.
        </p>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <p className="text-gray-700 font-bold text-md">{feature}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=""
        >
          <CustomGlassButton buttonIcon={<ArrowUpRight />} buttonText='Get Started' iconPos='right' />
        </motion.button>
      </motion.div>
    </CustomSection>
  );
};



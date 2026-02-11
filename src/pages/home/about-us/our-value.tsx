import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Percent } from 'lucide-react';
import CustomSection from '../home/custom-section';


export default function OurValue() {
  const features = [
    'Dive into your financial analytics with us',
    'Get timely notifications for upcoming bills',
    'Define your aspirations goal setting features'
  ];

  return (
    <CustomSection className="md:py-20 py-12 grid lg:grid-cols-2 gap-28 2xl:gap-42 items-center">
      {/* Left side - Product visual */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-white rounded-3xl shadow-2xl h-[80vh] 2xl:h-[50vh] overflow-hidden md:mb-6"
      >
        {/* Image container */}
        <img
          src="./images/exhibit1.png"
          alt="Modern workspace with red chair"
          className="w-full h-auto object-cover z-0"
        />
        {/* Floating badge */}
        <img
          src="./images/chart.png"
          alt="Modern workspace with red chair"
          className="w-36 absolute right-0 -bottom-10 z-10"
        />
      </motion.div>

      {/* Right side - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >

        <Badge
          variant="secondary"
          className="md:mb-4 rounded-full font-bold px-2 py-1 md:px-4 text-xs shadow-md shadow-teal-300"
          style={{ color: "#1C1629" }}
        >
          <Percent className="mr-2" /> OUR VALUE
        </Badge>

        <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
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
          className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </CustomSection>
  );
};



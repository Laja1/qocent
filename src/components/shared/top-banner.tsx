import { useState } from "react";
import { X, Star, ArrowRight } from "lucide-react";

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-green-200 to-green-900 text-white px-6 py-2 relative">
      <div className="flex lg:flex-row flex-col  justify-center space-x-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-xs lg:text-sm font-medium">
            Introducing Tymer. The all-in-one project management dashboard your
            team needs.
          </span>
        </div>
        <div>
          
          <button className="inline-flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition-colors">
            <span>Learn More</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 p-1 rounded"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

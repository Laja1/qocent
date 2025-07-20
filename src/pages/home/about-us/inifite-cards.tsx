import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useCallback } from "react";

const cards = [
  {
    id: 1,
    type: "Multi-Cloud Flexibility",
    title:
      "Deploy and manage across AWS, Azure, GCP, Huawei, and more — all from one console. No lock-ins. No silos. Just cloud freedom.",
    theme: "dark",
    bgColor: "bg-black",
  },
  {
    id: 2,
    type: "Simplicity",
    title:
      "Designed for clarity and speed, Qocent’s platform gets out of your way so you can get things done faster with zero guesswork.",
    theme: "blue",
    bgColor: "bg-black",
  },
  {
    id: 3,
    type: "Transparent Pricing",
    title:
      "Straightforward, predictable billing with no surprises. What you see and use is what you pay.",
    theme: "green",
    bgColor: "bg-black",
  },
  {
    id: 4,
    type: "Global Reach",
    title:
      "Qocent is registered in the U.S. and built to serve organizations worldwide. We’re expanding rapidly across key markets.",
    theme: "purple",
    bgColor: "bg-black",
  },
  {
    id: 5,
    type: "Developer-Centric",
    title:
      "Built with modern teams in mind — API-first, CLI-ready, and fully documented for speed, scale, and control.",
    theme: "orange",
    bgColor: "bg-black",
  },
];

export default function InfiniteCardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardCount = cards.length;

  // Create extended array for infinite loop
  const extendedCards = [...cards, ...cards, ...cards];
  const startIndex = cards.length; // Start from the middle set

  const goToCard = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);

        // Handle infinite loop - reset position when at boundaries
        if (index >= cardCount * 2) {
          setCurrentIndex(index - cardCount);
        } else if (index < cardCount) {
          setCurrentIndex(index + cardCount);
        }
      }, 500);
    },
    [isTransitioning, cardCount]
  );

  const nextCard = useCallback(() => {
    goToCard(currentIndex + 1);
  }, [currentIndex, goToCard]);

  const prevCard = useCallback(() => {
    goToCard(currentIndex - 1);
  }, [currentIndex, goToCard]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextCard]);

  // Initialize at the correct starting position
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  const renderCard = (card: (typeof cards)[0], arrayIndex: number) => {
    const isActive = arrayIndex === currentIndex;
    const distance = Math.abs(arrayIndex - currentIndex);

    return (
      <div
        key={`${card.id}-${arrayIndex}`}
        className={`
          relative flex-shrink-0 w-[300px]   h-[310px] rounded-3xl overflow-hidden cursor-pointer
          transition-all duration-500 ease-out
          ${
            isActive
              ? "scale-100 opacity-100 z-10"
              : distance === 1
              ? "scale-95 opacity-70 hover:opacity-85"
              : "scale-90 opacity-40"
          }
        `}
        onClick={() => goToCard(arrayIndex)}
      >
        <div className={`relative h-full p-8 ${card.bgColor}`}>
          {/* Background Elements based on theme */}
          {card.theme === "dark" && (
            <>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-16 left-32 w-32 h-16 bg-purple-500 rounded-lg transform rotate-12 opacity-80" />
                <div className="absolute top-24 left-40 w-40 h-20 bg-purple-600 rounded-lg transform -rotate-6 opacity-70" />
                <div className="absolute top-32 left-52 w-20 h-20 bg-purple-400 rounded-lg transform rotate-45 opacity-60" />
                <div className="absolute top-12 right-16 w-16 h-16 bg-purple-500 rounded-lg transform -rotate-12 opacity-75" />
              </div>
            </>
          )}
          {card.theme === "green" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Hexagonal organic patterns */}
              <div
                className="absolute top-12 left-16 w-24 h-24 bg-gradient-to-br from-lime-400 to-green-500 transform rotate-45 opacity-70"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
              <div
                className="absolute top-32 left-32 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 transform rotate-12 opacity-60"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
              <div
                className="absolute top-8 right-20 w-28 h-28 bg-gradient-to-br from-yellow-400 to-amber-500 transform -rotate-30 opacity-65"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
              <div
                className="absolute bottom-16 left-24 w-36 h-36 bg-gradient-to-br from-cyan-400 to-emerald-500 transform rotate-60 opacity-50"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
              {/* Leaf-like flowing shapes */}
              <div
                className="absolute top-20 right-8 w-20 h-40 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full transform rotate-45 opacity-55"
                style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
              />
            </div>
          )}
          {card.theme === "blue" && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full transform rotate-45 opacity-80" />
              <div className="absolute top-20 -right-16 w-40 h-40 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full transform -rotate-12 opacity-70" />
              <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full transform rotate-12 opacity-60" />
              <div className="absolute -bottom-10 right-20 w-36 h-36 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full transform -rotate-45 opacity-50" />
            </div>
          )}
          {card.theme === "purple" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Crystal/Diamond angular patterns */}
              <div
                className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-violet-400 to-purple-600 transform rotate-45 opacity-75"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
              <div
                className="absolute top-8 left-20 w-24 h-24 bg-gradient-to-br from-fuchsia-400 to-pink-600 transform rotate-12 opacity-70"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
              <div
                className="absolute bottom-20 right-8 w-28 h-28 bg-gradient-to-br from-indigo-400 to-blue-600 transform -rotate-30 opacity-65"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
              {/* Triangular crystal shards */}
              <div
                className="absolute top-32 left-8 w-16 h-32 bg-gradient-to-b from-purple-300 to-violet-500 transform rotate-15 opacity-60"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              <div
                className="absolute bottom-8 left-32 w-20 h-36 bg-gradient-to-b from-pink-300 to-rose-500 transform -rotate-45 opacity-55"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              <div
                className="absolute top-24 right-32 w-18 h-28 bg-gradient-to-b from-indigo-300 to-purple-500 transform rotate-75 opacity-50"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
            </div>
          )}

          {card.theme === "orange" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Flame-like dynamic triangular forms */}
              <div
                className="absolute top-12 left-12 w-20 h-40 bg-gradient-to-t from-red-500 to-orange-400 transform rotate-15 opacity-70"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              <div
                className="absolute top-8 right-16 w-24 h-48 bg-gradient-to-t from-orange-600 to-yellow-400 transform -rotate-12 opacity-75"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              <div
                className="absolute bottom-16 left-20 w-28 h-36 bg-gradient-to-t from-pink-500 to-orange-400 transform rotate-45 opacity-65"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              {/* Dynamic angular shapes */}
              <div
                className="absolute top-20 left-32 w-32 h-16 bg-gradient-to-r from-yellow-400 to-red-500 transform rotate-30 opacity-60"
                style={{
                  clipPath:
                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)",
                }}
              />
              <div
                className="absolute bottom-8 right-12 w-36 h-20 bg-gradient-to-r from-orange-400 to-pink-500 transform -rotate-15 opacity-55"
                style={{
                  clipPath:
                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)",
                }}
              />
              {/* Burst/explosion patterns */}
              <div
                className="absolute top-32 right-8 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 transform rotate-45 opacity-50"
                style={{
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="inline-block bg-black/30 text-white text-xs px-3 py-2 rounded-lg mb-6 w-fit">
              {card.type}
            </div>

            <div className="flex-1">
              <h2 className="text-white text-base text-center font-bold mb-6 leading-loose">
                {card.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="  py-12">
      <div className="w-full mx-auto px-4">
        <Badge
          className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium"
          variant="secondary"
        >
          Our Core Value Propositions
        </Badge>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
          What sets Qocent apart and empowers your cloud journey.
        </h1>

        {/* Infinite Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-6 ${
              isTransitioning
                ? "transition-transform duration-500 ease-out"
                : ""
            }`}
            style={{
              transform: `translateX(calc(50% - 150px - ${
                currentIndex * 324
              }px))`,
            }}
          >
            {extendedCards.map((card, arrayIndex) =>
              renderCard(card, arrayIndex)
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevCard}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            disabled={isTransitioning}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextCard}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            disabled={isTransitioning}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

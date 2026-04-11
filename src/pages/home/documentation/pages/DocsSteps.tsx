// Shared step list component used by Server Site, House, and Room pages.
type Step = { title: string; description: string; image: string; alt: string };

export const StepList = ({ steps }: { steps: Step[] }) => (
  <ol className="relative space-y-0">
    {steps.map((step, index) => (
      <li key={step.title} className="flex gap-5">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
            {index + 1}
          </div>
          {index < steps.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
        </div>
        <div className={index === steps.length - 1 ? "pb-0" : "pb-8"}>
          <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">{step.title}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
          <img src={step.image} alt={step.alt} className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
        </div>
      </li>
    ))}
  </ol>
);

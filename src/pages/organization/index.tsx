import { Header, PricingCard } from "@/components/shared";

export const Organizations = () => {
  const pricingdata = [
    {
      title: "Basic Qoonity",
      text: "Perfect for individual developers and small teams.",
      price: 20,
      cardStyle: "bg-[#0B0C0E]",
      feature: [
        { name: "Unlimited prompts" },
        { name: "Unlimited prompts" },
        { name: "Boilerplate automation" },
        { name: "Code refactor suggestions" },
        { name: "Email support" },
      ],
      buttonLabel: "Current plan",
      buttonState: "tertiary",
    },
    {
      title: "Qoonity Enterprise",
      text: "Designed for teams and organizations with advanced needs.",
      price: 42,
      cardStyle: "bg-[#750505]",
      iconStyle: "bg-[#FFFFFF14]",
      feature: [
        {
          name: "Everything in Basic, plus:",
          //   icon: RiDashboard2Fill,
        },
        { name: "Team collaboration & shared workspaces" },
        { name: "Priority support & dedicated account manager" },
        { name: "Custom model tuning" },
        { name: "API access for integration" },
      ],
      buttonLabel: "Upgrade plan",
      buttonState: "white",
    },
    {
        title: "Qoonity Enterprise",
        text: "Designed for teams and organizations with advanced needs.",
        price: 42,
        cardStyle: "bg-[#000]",
        iconStyle: "bg-[#fff]",
        feature: [
          {
            name: "Everything in Basic, plus:",
            //   icon: RiDashboard2Fill,
          },
          { name: "Team collaboration & shared workspaces" },
          { name: "Priority support & dedicated account manager" },
          { name: "Custom model tuning" },
          { name: "API access for integration" },
        ],
        buttonLabel: "Upgrade plan",
        buttonState: "white",
      },
  ];

  return (
    <div>
      <Header
        title="Organization"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />
      <div className="flex-col lg:flex-row flex gap-10 justify-center pt-10">
        {pricingdata.map((pricing) => (
          <PricingCard
            key={pricing.title}
            title={pricing.title}
            text={pricing.text}
            buttonLabel={pricing.buttonLabel}
            feature={pricing.feature}
            iconStyle={pricing.iconStyle}
            price={pricing.price}
            // buttonState={pricing.buttonState}
            cardStyle={pricing.cardStyle}
          />
        ))}
      </div>
    </div>
  );
};

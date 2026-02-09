import { Button, Header } from "@/components/shared";
import { ModalConstant } from "@/components/shared/modal/register";
import { Card } from "@/components/ui/card-hover-effect";
import NiceModal from "@ebay/nice-modal-react";
import { ArrowRight, CheckCircle2, CloudLightning } from "lucide-react";

export const Finops = () => {
  const metrics = [
    { label: "Monthly Spend", value: "$12,450", change: "+12%", trend: "up" },
    { label: "Cost Savings", value: "$2,340", change: "-18%", trend: "down" },
    {
      label: "Active Resources",
      value: "234",
      change: "+5%",
      trend: "neutral",
    },
  ];

  const benefits = [
    "Reduce cloud costs by up to 30%",
    "Gain complete visibility into spending",
    "Automate cost allocation and chargeback",
    "Eliminate waste and idle resources",
    "Forecast budgets with 95% accuracy",
  ];

  return (
    <div className="flex flex-col h-full ">
      <Header
        title="FinOps"
        description="Track, analyze, and manage your infrastructure in real time"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <CloudLightning className="w-4 h-4" />
                Cloud Cost Management
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Take Control of Your{" "}
                <span className="text-red-600">Cloud Costs</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Qocent FinOps helps you monitor, analyze, and optimize your
                cloud spending across services and regions — all in one place.
                Make data-driven decisions and reduce waste effortlessly.
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-600">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  className="gap-2"
                  label="Get Started"
                  intent={"secondary"}
                  surfixIcon={<ArrowRight className="w-4 h-4" />}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="p-4">
                    <div className="space-y-1">
                      <p className="text-xs light:text-gray-600 font-medium">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold light:text-gray-900 ">
                        {metric.value}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          metric.trend === "down"
                            ? "text-green-600"
                            : metric.trend === "up"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {metric.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold light:text-gray-900">
                    Spending Trend
                  </h3>
                  <span className="text-xs text-gray-600">Last 30 days</span>
                </div>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 70, 85, 75, 90, 70, 95, 85].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t hover:from-red-600 hover:to-red-500 transition-all duration-200 cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-r from-red-400 to-red-900 border-0 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Ready to Optimize Your Cloud Costs?
              </h2>
              <p className="text-blue-100 text-lg">
                Join thousands of companies saving millions on their cloud
                infrastructure. Start your free trial today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  label="View Now"
                  onClick={() =>
                    NiceModal.show(ModalConstant.SubscriptionModal)
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

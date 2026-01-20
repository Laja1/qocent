import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared";
import { DollarSign } from "lucide-react";

const SubscriptionCards = () => {
  return (
    <div className="flex flex-col h-full ">
      <Header
        title="Subscription Packages"
        description="Track, analyze, and manage your infrastructure in real time"
      />
      <div className="flex *:rounded-none p-10 *:shadow-none max-xl:flex-col max-xl:*:not-last:border-b-0 max-xl:*:first:rounded-t-xl max-xl:*:last:rounded-b-xl xl:*:not-last:border-r-0 xl:*:first:rounded-l-xl xl:*:last:rounded-r-xl">
        <Card className="overflow-hidden pt-0">
          <CardContent className="px-0">
            <img
              src="https://images.unsplash.com/photo-1764598218868-a2a64655aec1?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner"
              className="aspect-video w-92 object-cover"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Professional Services</CardTitle>
            <CardDescription>
              Expert guidance to help you plan, deploy, and manage your cloud
              environment with confidence. We ensure your systems are designed
              for scalability, compliance, and real business impact.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch">
            <Button>Free Subscription</Button>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden pt-0">
          <CardContent className="px-0">
            <img
              src="https://images.unsplash.com/photo-1702541660859-ed9f8c632462?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner"
              className="aspect-video w-92 object-cover"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Qocent Finops </CardTitle>
            <CardDescription>
              Qocent FinOps helps you monitor, analyze, and optimize your cloud
              spending across services and regions — all in one place. Make
              data-driven decisions and reduce waste effortlessly.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch">
            <Button>
              Subscribe Now 500
              <DollarSign />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionCards;

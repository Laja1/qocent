import { imgLinks } from "@/assets/assetLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import CustomSection from "../components/custom-section";


export const Faq = () => {
  return (
    <CustomSection
      className="w-full mt-12 relative px- md:px-20 max-w-7xl mx-auto mb-8"
    >
      <img src={imgLinks.successStories} className="absolute -z-20 top-0 left-0 w-full h-full object-cover" />
      <div className="absolute -z-10 top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />

      <div className="flex flex-col items-center text-center w-full gap-4">
        <h3 className="font-bold text-4xl">Questions Answered</h3>
        <p className="max-w-md text-center">We're here to help you and solve objections. Find answers to the most common questions below.</p>
        <Button className="bg-black text-white">Contact Sales Now</Button>
      </div>

      <div className="w-full container grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-4 pt-12">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              question: "How does Qocent pricing work?",

              answer:
                `(Once the pricing model has been decided upon, we’ll add that.)`,
            },
            {
              question: "Do I need to migrate my existing infrastructure to use Qocent?",
              answer:
                `No migration needed! Qocent is not a cloud provider—it's a management
platform. Your infrastructure stays on AWS, Azure, GCP, or Huawei exactly
where it is. You simply link your accounts to Qocent and start managing them
through our unified console. There's no downtime, no data transfer, and no
changes to your existing setup.`,
            },
            {
              question: "What cloud providers does Qocent support?",
              answer:
                `Qocent currently supports AWS, Microsoft Azure, Google Cloud Platform
(GCP), and Huawei Cloud. We're continuously adding support for additional
providers. If you need support for a specific cloud provider, please contact us.`,
            },
            {
              question: "What support options are available?",
              answer:
                `To get additional support from Qocent’s team of skilled engineers, you can
simply signup for professional services which would provide you access to a
suite of cloud consultation benefits including a guaranteed response time,
and a dedicated customer success manager. We also provide extensive
documentation, video tutorials, and community forums.`,
            },
            {
              question: "Can I try Qocent before purchasing?",
              answer:
                `Yes! We offer a [30-day] free trial with full access to all features. No credit
card required to start your trial. Experience the power of unified multi-cloud
management risk-free.`,
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="border border-red-400 px-6 rounded-md last:border-b"
              >
                <AccordionTrigger className="text-left font-bold lg:text-md text-sm hover:no-underline border-b border-red-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-left lg:text-md text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              question:
                "What is Qocent?",
              answer: `Qocent is a unified multi-cloud management platform that allows you to
deploy, monitor, optimize, and secure infrastructure across AWS, Azure, GCP,
and Huawei from a single console. We're not a cloud provider—we're a
management layer that sits on top of your existing cloud accounts, making it
easier to work with multiple clouds without switching between different
dashboards.`,
            },
            {
              question: "Can I link my existing cloud accounts?",
              answer:
                "Yes! Qocent is designed to work with your existing cloud infrastructure. You can securely link your AWS, Azure, GCP, and Huawei accounts to Qocent in minutes using OAuth or IAM roles. There's no migration required—your resources stay exactly where they are, and you simply manage them through Qocent's unified interface.",
            },
            {
              question:
                "Can I migrate existing applications onto Qocent?",
              answer:
                "The number of users depends on your plan. The Starter plan allows up to 5 team members, the Professional plan allows up to 20, and the Enterprise plan has no limit on team members.",
            },
            {
              question: "How does Qocent work?",
              answer:
                `Qocent connects to your cloud accounts using secure API integrations. Once
connected, you can view and manage all your cloud resources from Qocent's
dashboard. You can deploy new infrastructure, monitor existing resources,
analyze costs, optimize spending, and ensure security compliance—all
without leaving the Qocent console. Any actions you take in Qocent are
executed directly on your cloud provider's infrastructure.`,
            },
            {
              question: "What is FinOps and how does Qocent help?",
              answer:
                `FinOps (Financial Operations) is the practice of bringing financial accountability to cloud spending.
Qocent's FinOps tools help you understand where your cloud budget is going
by analyzing costs across all providers, identifying wasted resources (like idle
instances or unattached storage), and providing recommendations to
optimize spending. Most customers reduce their cloud costs by 30-40%
within the first 90 days using Qocent's FinOps insights.`,
            },

          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="border border-red-400 px-6 rounded-md last:border-b"
              >
                <AccordionTrigger className="text-left font-bold lg:text-md text-sm hover:no-underline border-b border-red-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-left lg:text-md text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>

      <div className="rounded-md flex mt-6 flex-col md:flex-row w-fit mx-auto space-x-4 justify-center items-center bg-white-100 shadow-md p-2 px-4 pt-8">
        <Mail size={16} className="hidden md:block" />
        <span>Feel free to mail us for any enquiries:</span>
        <div className="flex justify-center items-center gap-4 mt-2 md:mt-0">
          <Mail size={16} className="md:hidden flex gap-4 justify-center items-center" />
          <span className="hover:underline">info@qocent.com</span>
        </div>
      </div>
    </CustomSection>
  );
};

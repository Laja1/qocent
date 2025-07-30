import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
export const Faq = () => {
  return (
    <div>
      <section
        id="faq"
        className="w-full  py-10 md:py-10 bg-muted/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
        <Badge
          className="rounded-full px-4 py-1.5 text-sm font-medium text-red-500"
          variant="secondary"
        >
          FAQ
        </Badge>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 pt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <h2 className="text-xl lg:text-3xl md:text-xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[800px] text-muted-foreground text-xs lg:text-lg md:text-lg">
              Find answers to common questions about our platform.
            </p>
          </motion.div>
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question:
                      "What makes Qocent different from other cloud providers?",
                    answer: `Qocent is "one window to every cloud" Our multi-cloud platform integrates AWS, Azure, GCP, Huawei, and more into a single intuitive console, so you can deploy, manage, and scale across clouds without switching dashboards or facing vendor lock‑in.`,
                  },
                  {
                    question: "How does Qocent pricing work?",
                    answer:
                      "We offer transparent, pay-as-you-go pricing with no hidden fees. You only pay for what you actually use across any cloud you deploy to. Qocent also offers reserved pricing discounts to help reduce long-term spend.",
                  },
                  {
                    question:
                      "Can I migrate existing applications onto Qocent?",
                    answer:
                      "The number of users depends on your plan. The Starter plan allows up to 5 team members, the Professional plan allows up to 20, and the Enterprise plan has no limit on team members.",
                  },
                  {
                    question: "How do you support multi-cloud deployment?",
                    answer:
                      "Qocent supports workloads across multiple providers; including AWS, Huawei, Azure, and GCP. You choose where to deploy, and we handle orchestration, networking, and unified billing through a single interface.",
                  },
                  {
                    question: "What are your optimization services?",
                    answer:
                      "With Qocent, you get ongoing Cost Optimization and Modernization support. We analyze usage, size resources efficiently, recommend reserved plans, and help modernize legacy systems using containers, CI/CD, and DevOps practices.",
                  },
                  {
                    question: "What support options are available?",
                    answer:
                      "Our global team offers 24/7 support via email or phone. We also provide dedicated cloud specialists for Migration, Modernization, Optimization, and Enterprise onboarding.",
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
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left lg:text-sm text-xs font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-left lg:text-sm text-[10px]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

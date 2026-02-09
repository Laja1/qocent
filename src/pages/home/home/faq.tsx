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
        className="w-full  justify-center flex items-center flex-col py-10 md:py-10 bg-muted/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
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
                  {
                    question: "Is Qocent secure? How do you handle my cloud credentials?",
                    answer:
                      `Security is our top priority. Qocent uses industry-standard OAuth 2.0 and IAM
role-based authentication to connect to your cloud accounts—we never store
your cloud provider passwords. All API communications are encrypted, and
you can set permission levels (read-only or full management) based on your
security requirements. Qocent is [SOC 2 compliant / add relevant
certifications] and follows best practices for data protection.`,
                  },
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

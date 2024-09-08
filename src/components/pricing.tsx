"use client";

import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";

const plans = [
  {
    name: "Starter",
    price: "$999",
    description: "Perfect for small businesses and startups.",
    features: [
      "1 High-Converting Landing Page",
      "Data-Driven Optimization",
      "Psychology-Driven Design",
      "Conversion-Focused Copy",
      "30-Day Support",
      "1 Round of Revisions",
    ],
    calLink: "your-cal-link/starter-consultation",
  },
  {
    name: "Growth",
    price: "$2,499",
    description: "Ideal for growing businesses and e-commerce brands.",
    features: [
      "3 High-Converting Landing Pages",
      "Advanced Analytics Integration",
      "A/B Testing Setup",
      "Email Marketing Integration",
      "60-Day Support",
      "3 Rounds of Revisions",
      "Priority Support",
    ],
    isBestValue: true,
    calLink: "your-cal-link/growth-consultation",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale operations.",
    features: [
      "Unlimited Landing Pages",
      "Full Funnel Optimization",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Ongoing Support",
      "Unlimited Revisions",
      "24/7 Priority Support",
    ],
    calLink: "your-cal-link/enterprise-consultation",
  },
];

export function Pricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const openCalModal = (calLink: string) => {
    (async function () {
      const cal = await getCalApi();
      cal("modal", { calLink });
    })();
  };

  return (
    <section
      ref={sectionRef}
      className="container flex flex-col items-center gap-12 py-24 sm:gap-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Invest in Your Success
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your business needs and start boosting your conversions today.
        </p>
      </motion.div>
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2 max-w-6xl">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="relative h-full shadow-lg bg-gradient-to-br from-background/80 to-background hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
              {plan.isBestValue && (
                <span className="absolute inset-x-0 -top-5 mx-auto w-36 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-background shadow-md">
                  Most Popular
                </span>
              )}
              <CardContent className="flex flex-col h-full p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-semibold mb-2 text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="font-heading text-4xl font-semibold text-foreground">
                    {plan.price}
                  </span>
                  {plan.name !== "Enterprise" && (
                    <span className="text-muted-foreground">/project</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={20} className="text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton
                  href="#"
                  className={`w-full justify-center ${
                    plan.isBestValue ? "bg-primary text-background hover:bg-primary/90" : ""
                  }`}
                  onClick={() => openCalModal(plan.calLink)}
                >
                  {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                </CTAButton>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-lg text-muted-foreground mb-4">
          Not sure which plan is right for you? Let's discuss your needs.
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => openCalModal("your-cal-link/general-consultation")}
          className="font-semibold"
        >
          Schedule a Free Consultation
        </Button>
      </motion.div>
      <Cal calLink="your-cal-link" style={{ width: "100%", height: "100%", overflow: "scroll" }} />
    </section>
  );
}

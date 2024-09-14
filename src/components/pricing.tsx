"use client";

import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

const plans = [
  {
    name: "Starter",
    price: "$999",
    description: {
      desktop: "Perfect for small businesses and startups.",
      mobile: "For small businesses & startups.",
    },
    features: [
      "1 High-Converting Landing Page",
      "Performance Analysis",
      "User-Focused Design",
      "Persuasive Content Writing",
      "30-Day Support",
      "1 Round of Revisions",
    ],
    calLink: "ali-codes-daubbp/starter",
  },
  {
    name: "Growth",
    price: "$2,499",
    description: {
      desktop: "Ideal for growing businesses seeking expansion.",
      mobile: "For growing businesses.",
    },
    features: [
      "3 High-Converting Landing Pages",
      "Advanced Performance Tracking",
      "Conversion Rate Optimization",
      "Marketing Tool Integration",
      "90-Day Support",
      "3 Rounds of Revisions",
      "Priority Support",
    ],
    isBestValue: true,
    calLink: "your-cal-link/growth-consultation",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: {
      desktop: "Tailored solutions for large-scale operations.",
      mobile: "For large-scale operations.",
    },
    features: [
      "Unlimited Landing Pages",
      "Complete Sales Process Optimization",
      "Tailored System Integrations",
      "Personal Account Manager",
      "Ongoing Support",
      "Unlimited Revisions",
      "24/7 Priority Support",
    ],
    calLink: "ali-codes-daubbp/enterprise",
  },
];

export function Pricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");

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
      id="pricing"
      ref={sectionRef}
      className="container flex flex-col items-center gap-12 py-24 sm:gap-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center"
      >
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary">
          {isMobile ? "Pricing Plans" : "Invest in Your Success"}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          {isMobile
            ? "Choose your plan and boost conversions."
            : "Choose the plan that fits your business needs and start boosting your conversions today."}
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
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-2 text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {isMobile ? plan.description.mobile : plan.description.desktop}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">
                    {plan.price}
                  </span>
                  {plan.name !== "Enterprise" && (
                    <span className="text-sm sm:text-base text-muted-foreground">/project</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={isMobile ? 16 : 20} className="text-primary" />
                      <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
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
        <p className="text-base sm:text-lg text-muted-foreground mb-4">
          {isMobile
            ? "Not sure? Let's talk."
            : "Not sure which plan is right for you? Let's discuss your needs."}
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => openCalModal("ali-codes-daubbp/free-discovery-call")}
          className="font-semibold"
        >
          {isMobile ? "Free Discovery Call" : "Schedule a Free Discovery Call"}
        </Button>
      </motion.div>
    </section>
  );
}

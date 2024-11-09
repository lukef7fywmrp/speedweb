"use client";

import { getCalApi } from "@calcom/embed-react";
import { motion, useInView } from "framer-motion";
import { Bitcoin, Building2, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const plans = [
  {
    name: "Starter",
    price: {
      crypto: {
        original: "1,499 USDT",
        discounted: "999 USDT",
      },
      wire: {
        original: "$1,499",
        discounted: "$999",
      },
    },
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
    calLink: "speedweb/15min",
  },
  {
    name: "Growth",
    price: {
      crypto: {
        original: "3,499 USDT",
        discounted: "2,499 USDT",
      },
      wire: {
        original: "$3,499",
        discounted: "$2,499",
      },
    },
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
    calLink: "speedweb/30min",
  },
  {
    name: "Enterprise",
    price: {
      crypto: {
        original: "Custom",
        discounted: "Custom",
      },
      wire: {
        original: "Custom",
        discounted: "Custom",
      },
    },
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
    calLink: "speedweb/30min",
  },
];

interface PaymentMethod {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    icon: <Bitcoin className="w-6 h-6" />,
    name: "Cryptocurrency",
    description: "Pay with BTC, ETH, or USDT",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    name: "Wire Transfer",
    description: "Traditional bank transfer",
  },
];

export function Pricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);
  const { openCalModal } = useCalendly();

  const handlePlanSelect = (plan: (typeof plans)[0]) => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };

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

  function calculateDiscount(original: string, discounted: string): string {
    if (original === "Custom" || discounted === "Custom") return "";

    const originalPrice = parseInt(original.replace(/[^0-9]/g, ""));
    const discountedPrice = parseInt(discounted.replace(/[^0-9]/g, ""));
    const savings = originalPrice - discountedPrice;
    const percentage = Math.round((savings / originalPrice) * 100);

    return `${percentage}%`;
  }

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
                  {plan.name !== "Enterprise" && (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground line-through">
                        {plan.price.wire.original}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">
                          {plan.price.wire.discounted}
                        </span>
                        <span className="text-sm sm:text-base text-muted-foreground">/project</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        or <span className="line-through">{plan.price.crypto.original}</span>
                        <span className="text-primary font-semibold ml-1">
                          {plan.price.crypto.discounted}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block bg-primary/10 text-primary text-sm px-2 py-1 rounded">
                          Save{" "}
                          {calculateDiscount(plan.price.wire.original, plan.price.wire.discounted)}
                        </span>
                      </div>
                    </div>
                  )}
                  {plan.name === "Enterprise" && (
                    <span className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">
                      Custom
                    </span>
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
                  onClick={() => handlePlanSelect(plan)}
                >
                  View Payment Options
                </CTAButton>

                <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Choose Payment Method</DialogTitle>
                      <DialogDescription>
                        Select your preferred payment method. We&apos;ll schedule a call to provide
                        payment details.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => (
                        <Button
                          key={method.name}
                          variant="outline"
                          className="flex items-center justify-start gap-4 p-4 h-auto"
                          onClick={() => {
                            setShowPaymentDialog(false);
                            openCalModal(selectedPlan?.calLink || "");
                          }}
                        >
                          {method.icon}
                          <div className="text-left">
                            <div className="font-semibold">{method.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {method.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
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
          onClick={() => openCalModal("speedweb/15min")}
          className="font-semibold"
        >
          {isMobile ? "Free Discovery Call" : "Schedule a Free Discovery Call"}
        </Button>
      </motion.div>
    </section>
  );
}

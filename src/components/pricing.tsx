"use client";

import { getCalApi } from "@calcom/embed-react";
import { motion, useInView } from "framer-motion";
import { Bitcoin, Building2, Check, Copy, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCalendly } from "@/lib/hooks/useCalendly";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const pricingPlans = [
  {
    name: "Starter",
    originalPrice: "$1,000",
    price: "$759",
    description: "Perfect for small businesses looking to boost their online presence.",
    features: [
      "1 High-Converting Landing Page",
      "Performance Analysis",
      "User-Focused Design",
      "Persuasive Content Writing",
      "30-Day Support",
      "1 Round of Revisions",
    ],
    discount: "Save 25%",
    href: "#",
  },
  {
    name: "Growth",
    originalPrice: "$1,500",
    price: "$969",
    description: "Ideal for growing businesses ready to scale their online impact.",
    features: [
      "3 High-Converting Landing Pages",
      "Advanced Performance Tracking",
      "Conversion Rate Optimization",
      "Marketing Tool Integration",
      "90-Day Support",
      "3 Rounds of Revisions",
      "Priority Support",
    ],
    discount: "Save 30%",
    href: "#",
    popular: true,
  },
  {
    name: "Enterprise",
    originalPrice: "$3,990",
    price: "$2,990",
    description: "For enterprises needing a comprehensive conversion solution.",
    features: [
      "Unlimited Landing Pages",
      "Complete Sales Process Optimization",
      "Tailored System Integrations",
      "Personal Account Manager",
      "Ongoing Support",
      "Unlimited Revisions",
      "24/7 Priority Support",
    ],
    discount: "Save 25%",
    href: "#",
  },
];

interface PaymentMethod {
  icon: React.ReactNode;
  name: string;
  description: string;
  type: "call" | "crypto" | "wire";
}

interface CryptoOption {
  name: string;
  symbol: string;
  address: string;
  qrCode: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "bc1qllzn5n953dvq6ffqgncw5j2mt6vju5m9j8uges",
    qrCode: "/images/btc.jpg",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x0D8dd0e7D7987F39e780f501F6cda59fA4D45eDB",
    qrCode: "/images/eth.jpg",
  },
  {
    name: "USDT",
    symbol: "USDT",
    address: "TNoKSB8GcAwuo3i4SuzBsVo8VDnFqrxHAm",
    qrCode: "/images/usdt.jpg",
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    icon: <Phone className="w-6 h-6" />,
    name: "Book a Call",
    description: "Discuss with an expert and pay during the call",
    type: "call",
  },
  {
    icon: <Bitcoin className="w-6 h-6" />,
    name: "Cryptocurrency",
    description: "Pay with BTC, ETH, or USDT",
    type: "crypto",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    name: "Wire Transfer",
    description: "Traditional bank transfer",
    type: "wire",
  },
];

export function Pricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof pricingPlans)[0] | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPaymentDrawer, setOpenPaymentDrawer] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const { openCalModal } = useCalendly();

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handlePaymentMethodSelect = (methodType: string) => {
    setSelectedMethod(methodType);

    if (methodType === "call") {
      setOpenDrawer(false);
      openCalModal((selectedPlan?.href || "speedweb/30min") as string);
    } else {
      if (isMobile) {
        setOpenDrawer(false);
        setOpenPaymentDrawer(true);
      } else {
        setShowPaymentDetails(true);
      }
    }
  };

  const handlePlanSelect = (plan: (typeof pricingPlans)[0]) => {
    setSelectedPlan(plan);
    if (isMobile) {
      setOpenDrawer(true);
    } else {
      setShowPaymentDialog(true);
    }
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
    if (original === "Custom") return "";

    const originalPrice = parseInt(original.replace(/[^0-9]/g, ""));
    const discountedPrice = parseInt(discounted.replace(/[^0-9]/g, ""));
    const savings = originalPrice - discountedPrice;
    const percentage = Math.round((savings / originalPrice) * 100);

    if (discountedPrice === 1499) return "25%";
    if (discountedPrice === 3149) return "30%";

    return `${percentage}%`;
  }

  const CryptoPaymentContent = () => (
    <div className="space-y-4">
      {!selectedCrypto ? (
        <div className="grid gap-4">
          {cryptoOptions.map((crypto) => (
            <Button
              key={crypto.symbol}
              variant="outline"
              className="flex items-center justify-start gap-4 p-4 h-auto transition-all duration-200 hover:bg-primary/5 hover:scale-[1.02] hover:border-primary/20 hover:text-foreground [&>*]:hover:text-foreground"
              onClick={() => setSelectedCrypto(crypto)}
            >
              <div className="text-left">
                <div className="font-semibold">Pay with {crypto.name}</div>
                <div className="text-sm text-muted-foreground">
                  Send {crypto.symbol} to our wallet
                </div>
              </div>
            </Button>
          ))}
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Pay with {selectedCrypto.name}</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedCrypto(null)}>
              Back
            </Button>
          </div>
          <Image
            src={selectedCrypto.qrCode}
            alt={`${selectedCrypto.name} payment QR code`}
            width={192}
            height={192}
            className="mx-auto rounded-lg"
          />
          <div className="text-sm text-muted-foreground space-y-2 mb-4">
            <p className="mb-2">Wallet Address:</p>
            <div className="relative flex items-center">
              <code className="flex-1 p-2 pr-10 bg-muted rounded select-all font-mono text-xs">
                {selectedCrypto.address}
              </code>
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 h-7 w-7 p-0"
                onClick={() => handleCopy(selectedCrypto.address)}
              >
                {hasCopied ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span className="sr-only">Copy wallet address</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="relative h-full shadow-lg bg-gradient-to-br from-background/80 to-background hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
              {plan.popular && (
                <span className="absolute inset-x-0 -top-5 mx-auto w-36 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-background shadow-md">
                  Most Popular
                </span>
              )}
              <CardContent className="flex flex-col h-full p-6 sm:p-8">
                <div className="mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm sm:text-base text-muted-foreground">/project</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block bg-primary/10 text-primary text-sm px-2 py-1 rounded">
                        {plan.discount}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        size={isMobile ? 16 : 20}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span className="text-sm sm:text-base text-muted-foreground leading-normal">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <CTAButton
                  href={plan.href}
                  className={`w-full justify-center ${
                    plan.popular ? "bg-primary text-background hover:bg-primary/90" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  View Payment Options
                </CTAButton>

                {!isMobile ? (
                  <>
                    <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Choose Payment Method</DialogTitle>
                          <DialogDescription>
                            Select your preferred payment method below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          {paymentMethods.map((method) => (
                            <Button
                              key={method.name}
                              variant="outline"
                              className="flex items-center justify-start gap-4 p-4 h-auto transition-all duration-200 hover:bg-primary/5 hover:scale-[1.02] hover:border-primary/20 hover:text-foreground [&>*]:hover:text-foreground"
                              onClick={() => handlePaymentMethodSelect(method.type)}
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

                    <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Payment Details</DialogTitle>
                          <DialogDescription>
                            {selectedMethod === "crypto"
                              ? !selectedCrypto
                                ? "Select your preferred cryptocurrency"
                                : "Scan the QR code or copy the wallet address below to make your payment."
                              : "Use the bank details below to make your wire transfer."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {selectedMethod === "crypto" ? (
                            <CryptoPaymentContent />
                          ) : (
                            <div className="space-y-2">
                              <p>
                                <strong>Bank Name:</strong> Your Bank
                              </p>
                              <p>
                                <strong>Account Number:</strong> XXXX-XXXX-XXXX
                              </p>
                              <p>
                                <strong>SWIFT/BIC:</strong> XXXXXXXX
                              </p>
                              <p>
                                <strong>Account Name:</strong> Your Company Name
                              </p>
                            </div>
                          )}
                          <div className="border-t pt-4">
                            <p className="text-sm text-muted-foreground">
                              After completing your payment, please contact us with your payment
                              receipt at{" "}
                              <a href="mailto:Speedweborg@gmail.com" className="text-primary">
                                Speedweborg@gmail.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <>
                    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Choose Payment Method</DrawerTitle>
                          <DrawerDescription>
                            Select your preferred payment method below.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="grid gap-4 p-4">
                          {paymentMethods.map((method) => (
                            <Button
                              key={method.name}
                              variant="outline"
                              className="flex items-center justify-start gap-4 p-4 h-auto transition-all duration-200 hover:bg-primary/5 hover:scale-[1.02] hover:border-primary/20 hover:text-foreground [&>*]:hover:text-foreground"
                              onClick={() => handlePaymentMethodSelect(method.type)}
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
                      </DrawerContent>
                    </Drawer>

                    <Drawer open={openPaymentDrawer} onOpenChange={setOpenPaymentDrawer}>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Payment Details</DrawerTitle>
                          <DrawerDescription>
                            {selectedMethod === "crypto"
                              ? !selectedCrypto
                                ? "Select your preferred cryptocurrency"
                                : "Scan the QR code or copy the wallet address below to make your payment."
                              : "Use the bank details below to make your wire transfer."}
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="space-y-4 p-4">
                          {selectedMethod === "crypto" ? (
                            <CryptoPaymentContent />
                          ) : (
                            <div className="space-y-2">
                              <p>
                                <strong>Bank Name:</strong> Your Bank
                              </p>
                              <p>
                                <strong>Account Number:</strong> XXXX-XXXX-XXXX
                              </p>
                              <p>
                                <strong>SWIFT/BIC:</strong> XXXXXXXX
                              </p>
                              <p>
                                <strong>Account Name:</strong> Your Company Name
                              </p>
                            </div>
                          )}
                          <div className="border-t pt-4">
                            <p className="text-sm text-muted-foreground">
                              After completing your payment, please contact us with your payment
                              receipt at{" "}
                              <a href="mailto:Speedweborg@gmail.com" className="text-primary">
                                Speedweborg@gmail.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">
          Not sure which plan is right for you? Let&apos;s discuss your needs.
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => openCalModal("speedweb/30min")}
          className="h-14 px-8 text-xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
        >
          Schedule a Free Discovery Call
        </Button>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Ready to boost your conversions?
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-lg text-center" />
      <div className="mt-7 grid w-full grid-cols-1 gap-7 lg:grid-cols-2 md:grid-cols-2">
        <Card className="relative shadow-lg bg-white/5 hover:bg-white/10">
          <CardContent className="divide-y p-0">
            <div className="flex flex-col px-7 py-10">
              <h4 className="font-heading text-2xl font-semibold text-foreground">One-Off</h4>
              <p className="mt-2 text-muted-foreground">For side project.</p>
              <div className="mt-5 flex flex-col space-y-2">
                <span className="font-heading text-5xl font-semibold text-white">$2199</span>
                <span className="text-sm" />
              </div>
              <p className="max-w-xs text-white">
                Perfect for single, high-impact, conversion-focused landing page.
              </p>
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <Button size="lg" asChild className="mt-10 w-full text-black bg-white">
                <a href="#">Get started</a>
              </Button>
            </div>
            <ul className="space-y-2 px-7 py-10">
              <p className="max-w-xs text-white">Services:</p>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited projects</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited storage</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited storage</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">24/7 support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">API access</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom branding</span>
              </li>
              <p className="max-w-xs text-white">Features:</p>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom branding</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom branding</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom branding</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom branding</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="relative shadow-lg bg-white/5 hover:bg-white/10">
          <CardContent className="divide-y p-0">
            <div className="flex flex-col px-7 py-10">
              <span className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md text-black">
                Best Value
              </span>
              <h4 className="font-heading text-2xl font-semibold text-foreground">
                Multiple Website
              </h4>
              <p className="mt-2 text-muted-foreground">For startups and teams.</p>
              <div className="mt-5 flex flex-col space-y-2">
                <span className="font-heading text-5xl font-semibold text-white">$4199</span>
                <span className="text-sm" />
              </div>
              <p className="max-w-xs text-white">
                Ideal for those who need an ongoing design support.
              </p>
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <p className="max-w-xs text-white" />
              <Button size="lg" asChild className="mt-10 w-full text-black bg-white">
                <a href="#">Get started</a>
              </Button>
            </div>
            <ul className="space-y-2 px-7 py-10">
              <p className="max-w-xs text-white">Services:</p>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Everything in Basic</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited users</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom domain</span>
              </li>
              <p className="max-w-xs text-white">Features:&nbsp;</p>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom domain</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom domain</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom domain</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom domain</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

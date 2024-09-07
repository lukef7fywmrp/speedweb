import { Star, Trophy, DollarSign } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function Features2() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          The solution: Conversion-focused creativity
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-center max-w-2xl">
        Designs that captivate, copy that resonates, and development that converts. Moving beyond
        surface metrics to emotional impact that turns browsers into buyers.
      </p>
      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 lg:grid-cols-3">
        <Card className="shadow-lg border-0">
          <CardContent className="flex flex-col gap-5 p-7 text-center items-center h-full">
            <div className="inline-flex items-center justify-center rounded-md p-2">
              <Star size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-foreground">Compelling Copy</h4>
              <p className="text-white/40 max-w-md">
                Crafting words that engage, resonate, and ultimately convince your audience to take
                action.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0">
          <CardContent className="flex flex-col gap-5 p-7 text-center items-center h-full">
            <div className="inline-flex items-center justify-center rounded-md p-2">
              <Trophy size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-foreground">Top-Tier Branding</h4>
              <p className="text-white/40 max-w-md">
                Design a brand identity to standout in a crowded marketplace.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0">
          <CardContent className="flex flex-col gap-5 p-7 text-center items-center h-full">
            <div className="inline-flex items-center justify-center rounded-md p-2">
              <DollarSign size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-foreground">
                Conversion-Focused Design
              </h4>
              <p className="text-white/40 max-w-md">
                Creating visually appealing designs that are optimized for maximum conversion rates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

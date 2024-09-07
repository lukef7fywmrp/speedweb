import { Rocket, NotepadText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function Features3() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Who do we work with?
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        Well, we&apos;re not perfect for everyone. Here&apos;s who we work with best:
      </p>
      <div className="mt-6 grid gap-7 md:flex">
        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-start gap-5 p-7 h-50vh bg-white/5 hover:bg-white/10 transition duration-300">
            <div className="p-2">
              <Rocket size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-7">SaaS and Tech brands</h4>
              <p className="text-muted-foreground">
                Whether you&apos;re launching a new product, redesigning a website, or need full
                rebranding, we&apos;re here to help. Our designs not only break records but also
                receive exceptional user feedback. With us, you&apos;re in expert hands.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-start gap-5 p-7 h-50vh bg-white/5 hover:bg-white/10 transition duration-300">
            <div className="p-2">
              <NotepadText size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-7">
                Startups &amp; Agencies
              </h4>
              <p className="text-muted-foreground">
                We mix well with startups and design agencies. You don&apos;t need to hire a
                full-time employee and keep him busy; outsource your work to our team and we’ll most
                likely exceed your expectations. We&apos;re an extension of your design department.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

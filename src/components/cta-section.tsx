import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container flex flex-col items-center gap-6 sm:gap-10 relative py-20">
      <h2 className="font-heading text-3xl font-semibold sm:text-4xl max-w-xl sm:leading-tight text-center">
        Your search ends here…
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-xl">
        Tired of waiting, poor quality, and bad communication?&nbsp;
      </p>
      <p className="text-lg text-muted-foreground text-center max-w-xl">
        Speedweb delivers where others fail. Our designers handle no more than two projects at a
        time, providing enough time and focused attention to deliver top-quality design solutions
        that drive business success.
      </p>
      <Button
        size="lg"
        asChild
        variant="default"
        className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10 text-black"
      >
        <Link href="#">Book a Call</Link>
      </Button>
    </section>
  );
}

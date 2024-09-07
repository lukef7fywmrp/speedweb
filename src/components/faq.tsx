import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Questions? Read the FAQs
        </h2>
      </div>
      <p className="max-w-lg text-lg text-muted-foreground text-center">
        For any other questions, please feel free to contact us.
      </p>
      <Accordion type="single" collapsible className="mt-6 w-full divide-y max-w-3xl">
        <AccordionItem value="item-0" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Who&apos;s behind Supafast
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Surprising fact: Supafast started as a one-person agency and has grown into a remote,
            global team. Collaborate directly with Namya, the founder and design engineer, and our
            talented professionals worldwide. We&apos;ve worked with clients from 15+ countries,
            including Y Combinator startups, early-stage ventures, angel investors, and creators.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Why not hire a full-time designer and developer
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Hiring full-time professionals can be a headache. It&apos;s costlier and more
            challenging to manage. A senior designer might set you back $100k+, while a developer
            could easily exceed $300k. That&apos;s a total of $500k+ when you factor in benefits,
            vacation days, and more.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            What if I&apos;m not happy with the results?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            This doesn&apos;t happen very often, if you&apos;re not happy, we offer unlimited
            revisions. We&apos;ll continue refining the project until you&apos;re 100% content.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            How quickly will I receive my project?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            True to our name, we&apos;re Supafast! Typically, most requests are fulfilled in just 48
            hours or less. However, for more complex requests, the turnaround time may be a bit
            longer. Rest assured, we&apos;ll keep you informed every step of the way.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Can I get a refund?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Although we are unable to provide refunds as we allocate dedicated time and resources to
            each client, we value flexibility. You have the option to pause your service at any time
            and resume it later, ensuring that you can fully benefit from our collaboration.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

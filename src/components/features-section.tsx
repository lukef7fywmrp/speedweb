import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface WorkItem {
  title: string;
  description: string;
  imageUrl: string;
}

const recentWork: WorkItem[] = [
  {
    title: "Project 1",
    description: "Brief description of Project 1",
    imageUrl: "/path/to/image1.jpg",
  },
  {
    title: "Project 2",
    description: "Brief description of Project 2",
    imageUrl: "/path/to/image2.jpg",
  },
];

export function Features() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Our recent work&nbsp;
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center" />
      <Carousel opts={{ loop: true, align: "start" }} className="mt-6 w-full px-4 xl:px-0">
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7 transition duration-300 rounded-md h-50vh bg-white/5 hover:scale-110">
                  <div className="transition duration-300">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">*Images*</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7 transition duration-300 rounded-md h-50vh bg-white/5 hover:scale-110">
                  <div className="transition duration-300">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">*Images*</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7 transition duration-300 rounded-md h-50vh bg-white/5 hover:scale-110">
                  <div className="transition duration-300">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">*Images*</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7 transition duration-300 rounded-md h-50vh bg-white/5 hover:scale-110">
                  <div className="transition duration-300">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">*Images*</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7 transition duration-300 rounded-md h-50vh bg-white/5 hover:scale-110">
                  <div className="transition duration-300">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">*Images*</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7 transition duration-300 rounded-md h-50vh bg-white/5 hover:scale-110">
                  <div className="transition duration-300">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">*Images*</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext variant="outline" className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { X } from "lucide-react";

// Add a custom color to match your brand
const brandColor = "#FE8A0A";

export function ComparisonGrid() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
      mirror: true,
    });

    // Add custom animation
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
        [data-aos="width"] {
          width: 0;
          transition-property: width;
        }
        [data-aos="width"].aos-animate {
          width: 100px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section className="container py-20">
      <div className="mb-12">
        <div className="flex flex-col gap-2">
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white/90 font-heading leading-tight"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-offset="200"
          >
            A Smarter Choice
          </h2>
          <div
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#FE8A0A] font-heading leading-tight relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            data-aos-offset="200"
          >
            For Your Business
            <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-[#FE8A0A] to-transparent"></div>
          </div>
          <p
            className="text-lg md:text-xl text-zinc-400 mt-4 max-w-2xl"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            Compare our offerings and see why businesses choose Speedweb for their growth
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        {/* Speedweb Column */}
        <div
          className="md:col-span-4 bg-zinc-900/80 px-8 py-10 rounded-3xl border-2 border-[#FE8A0A]/25 shadow-xl transition-all duration-500 hover:bg-gradient-to-br hover:from-zinc-900/90 hover:via-zinc-800/90 hover:to-zinc-900/90 hover:scale-[1.02]"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="200"
        >
          <h3 className="text-4xl font-bold mb-12 text-[#FE8A0A] min-h-[40px] text-center relative pb-6">
            Speedweb
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#FE8A0A]/30 to-transparent" />
          </h3>
          <ul className="space-y-[2.5rem] mb-4">
            {[
              "Lightning-fast Next.js development with instant deployments",
              "Flexible payment options tailored to your business needs",
              "Full-stack expertise in one dedicated team for your project",
              "Streamlined workflow process with automated optimization",
              "Real-time collaboration & updates throughout development",
              "Scalable solutions on demand for continuous business growth",
            ].map((feature, index) => (
              <li
                key={index}
                className="flex gap-2 items-start h-12 hover:translate-x-2 transition-transform duration-300"
              >
                <Image
                  src="/images/rocketicon.png"
                  alt="Speedweb feature"
                  width={32}
                  height={32}
                  className="text-[#FE8A0A] flex-shrink-0 mt-1 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="text-lg font-medium text-zinc-100 hover:text-[#FE8A0A] transition-colors duration-300 leading-6">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Other columns */}
        {[
          {
            title: "Agencies",
            items: [
              "(Monthly retainers)",
              "(Complex pricing)",
              "(Fragmented teams)",
              "(Lengthy timelines)",
              "(Communication gaps)",
              "(Inflexible contracts)",
            ],
          },
          {
            title: "WordPress",
            items: [
              "(Limited features)",
              "(Hidden costs)",
              "(Plugin dependency)",
              "(Security risks)",
              "(Slow performance)",
              "(No customization)",
            ],
          },
          {
            title: "DIY",
            items: [
              "(Amateur results)",
              "(Time-consuming)",
              "(No support)",
              "(Basic features)",
              "(Poor optimization)",
              "(Limited growth)",
            ],
          },
        ].map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="md:col-span-2 bg-zinc-900/80 px-4 py-10 rounded-3xl border border-white/15 backdrop-blur-sm"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={columnIndex * 150}
            data-aos-offset="200"
          >
            <h3 className="text-2xl font-bold mb-12 text-white/90 min-h-[40px] text-center relative pb-6">
              {column.title}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </h3>
            <ul className="space-y-[2.5rem] mb-4">
              {column.items.map((item, index) => (
                <li key={index} className="flex gap-2 items-start h-12">
                  <X className="h-6 w-6 text-[#FE8A0A] flex-shrink-0 mt-1 stroke-[2.5]" />
                  <span className="text-lg font-medium text-zinc-200 leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

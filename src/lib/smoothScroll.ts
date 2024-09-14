import { MouseEvent } from "react";

export const smoothScroll = (targetId: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const elem = document.getElementById(targetId);
  elem?.scrollIntoView({
    behavior: "smooth",
  });
};

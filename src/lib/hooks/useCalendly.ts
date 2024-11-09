import { getCalApi } from "@calcom/embed-react";

export function useCalendly() {
  const openCalModal = async (calLink: string) => {
    const cal = await getCalApi();
    cal("modal", { calLink });
  };

  return { openCalModal };
}

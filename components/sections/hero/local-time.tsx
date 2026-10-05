"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Omar's local time in Dhaka, ticking each minute. Renders nothing until mounted (no mismatch). */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(formatter.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) return null;
  return (
    <>
      <span aria-hidden> — </span>
      <time className="tabular-nums">{now}</time> GMT+6
    </>
  );
}

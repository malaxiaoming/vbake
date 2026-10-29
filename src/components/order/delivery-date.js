"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { promotions } from "@/data/promotions";
import { formatDate } from "@/lib/order";

export default function DeliveryDate({ value, onChange }) {
  // The calendar depends on today's date, which differs between the server (UTC) and the
  // customer's browser, so only render it in the browser
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    // Same height as the calendar (always six weeks) so the page doesn't jump when it appears
    return <div className="h-[434px]" aria-hidden="true" />;
  }

  const promotion = promotions[formatDate(value)];

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDate={new Date()}
        showFixedNumberOfWeeks
        className="custom-calendar"
        tileContent={({ date }) =>
          promotions[formatDate(date)] ? (
            <p className="text-[9px] font-semibold leading-tight text-rose sm:text-xs">{promotions[formatDate(date)]}</p>
          ) : null
        }
      />
      {promotion && <p className="mt-2 text-sm font-semibold text-rose sm:text-lg">{promotion}</p>}
    </div>
  );
}

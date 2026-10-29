"use client";

import { useSyncExternalStore } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { promotions } from "@/data/promotions";
import { formatDate } from "@/lib/order";
import { contactInfo } from "@/data/contact";

export default function DeliveryDate({ value, onChange, blockedDates = {} }) {
  // The calendar depends on today's date, which differs between the server (UTC) and the
  // customer's browser, so only render it in the browser
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true, // in the browser
    () => false // on the server
  );

  if (!isMounted) {
    // Same height as the calendar (always six weeks) so the page doesn't jump when it appears
    return <div className="h-[434px]" aria-hidden="true" />;
  }

  const promotion = promotions[formatDate(value)];
  const today = formatDate(new Date());
  const hasUpcomingBlockedDates = Object.keys(blockedDates).some((date) => date >= today);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDate={new Date()}
        showFixedNumberOfWeeks
        className="custom-calendar"
        tileDisabled={({ date, view }) => view === "month" && !!blockedDates[formatDate(date)]}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;
          const blocked = blockedDates[formatDate(date)];
          if (blocked) return <p className="text-[9px] font-semibold leading-tight text-cocoa-soft sm:text-xs">{blocked}</p>;
          return promotions[formatDate(date)] ? (
            <p className="text-[9px] font-semibold leading-tight text-rose sm:text-xs">{promotions[formatDate(date)]}</p>
          ) : null;
        }}
      />
      {hasUpcomingBlockedDates && (
        <p className="mt-3 text-sm text-cocoa-soft">
          Dates marked Full or Closed can&apos;t be booked online. Need one of them?{" "}
          <a
            href={contactInfo.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-rose hover:underline"
          >
            WhatsApp us
          </a>{" "}
          and we&apos;ll check.
        </p>
      )}
      {promotion && <p className="mt-2 text-sm font-semibold text-rose sm:text-lg">{promotion}</p>}
    </div>
  );
}

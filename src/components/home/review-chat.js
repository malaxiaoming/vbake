"use client";

import { useRef } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";

// "View chat" button that opens the original WhatsApp screenshot for a review
export default function ReviewChat({ screenshot, cake }) {
  const dialogRef = useRef(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose hover:underline"
      >
        <MessageCircle size={16} /> View chat
      </button>
      <dialog
        ref={dialogRef}
        aria-label={`WhatsApp chat about the ${cake}`}
        // Close when clicking the dark backdrop around the screenshot
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto max-h-[90vh] w-[min(92vw,420px)] overflow-hidden rounded-3xl bg-white p-0 shadow-xl backdrop:bg-cocoa/60"
      >
        <div className="flex items-center justify-between border-b border-cocoa/10 px-4 py-3">
          <p className="text-sm font-semibold">{cake}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="rounded-full p-1 text-cocoa-soft hover:bg-blush hover:text-cocoa"
          >
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[calc(90vh-3.5rem)] overflow-y-auto">
          <Image
            src={screenshot}
            alt={`Customer's WhatsApp message about the ${cake}, names hidden`}
            width={700}
            height={1300}
            sizes="420px"
            className="h-auto w-full"
          />
        </div>
      </dialog>
    </>
  );
}

"use client";

import { useState } from "react";
import AIChatButton from "./AIChatButton";
import AIChatPanel from "./AIChatPanel";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-20 right-4 z-[200] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">{open && <AIChatPanel onClose={() => setOpen(false)} />}<AIChatButton open={open} onClick={() => setOpen((value) => !value)} /></div>;
}

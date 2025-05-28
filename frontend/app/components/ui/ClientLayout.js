"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const shouldHideUI = ["/login", "/register"].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideUI && <Navbar />}
      {!shouldHideUI && <ChatBox />}
      <main className="flex-1">{children}</main>
      {!shouldHideUI && <Footer className="fixed bottom-0 w-full" />}
    </div>
  );
}

'use client';

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const shouldHideUI = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!shouldHideUI && <Navbar />}
      {!shouldHideUI && <ChatBox />}
      {children} {/* plus de <main> ici */}
      {!shouldHideUI && <Footer />}
    </>
  );
}
import { useState, useEffect, useCallback } from "react";
import { NAV_ITEMS } from "./HeaderNavItemsData.js";

export { NAV_ITEMS };

export function useHeaderState() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("HOME");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);

      if (currentScrollY < 120) {
        setActiveItem("HOME");
        return;
      }

      const sections = NAV_ITEMS.filter((item) => !item.isRoute && item.href !== "#top").map((item) => item.href.substring(1));
      let matched = false;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            const matchedItem = NAV_ITEMS.find((i) => i.href === `#${sectionId}`);
            if (matchedItem) {
              setActiveItem(matchedItem.label);
              matched = true;
              break;
            }
          }
        }
      }
      if (!matched && currentScrollY < 300) {
        setActiveItem("HOME");
      }
    };

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleNavClick = useCallback((e, item) => {
    setActiveItem(item.label);
    setMobileMenuOpen(false);

    if (!item.isRoute && item.href.startsWith("#")) {
      e.preventDefault();
      if (item.href === "#top" || item.label === "HOME") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const targetId = item.href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
      }
    }
  }, []);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveItem("HOME");
  }, []);

  return {
    mobileMenuOpen, setMobileMenuOpen, toggleMobileMenu, closeMobileMenu,
    scrolled, activeItem, scrollProgress, isOnline, handleNavClick, scrollToTop,
  };
}

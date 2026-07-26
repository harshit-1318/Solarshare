import { useState, useEffect } from "react";

export const SECTIONS = [
  { id: "top", label: "Home", href: "#top" },
  { id: "features", label: "Features", href: "#features" },
  { id: "how-it-works", label: "How It Works", href: "#how-it-works" },
  { id: "grid-flow", label: "Live Grid", href: "#grid-flow" },
  { id: "calculator", label: "Calculator", href: "#calculator" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export function useSideSectionNav() {
  const [activeSectionId, setActiveSectionId] = useState("top");
  const [hideInFooter, setHideInFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Auto-hide when user scrolls down to the Footer
      if (scrollY + windowHeight >= docHeight - 380) {
        setHideInFooter(true);
      } else {
        setHideInFooter(false);
      }

      if (scrollY < 120) {
        setActiveSectionId("top");
        return;
      }

      const checkPoint = scrollY + 250;
      let matchedId = "top";

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        if (sec.id === "top") continue;
        const el = document.getElementById(sec.id);
        if (el) {
          const offsetTop = el.offsetTop;
          if (offsetTop <= checkPoint) {
            matchedId = sec.id;
            break;
          }
        }
      }

      setActiveSectionId(matchedId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    if (e) e.preventDefault();
    setActiveSectionId(id);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
    }
  };

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSectionId);
  const prevSection = SECTIONS[Math.max(0, currentIndex - 1)];
  const nextSection = SECTIONS[Math.min(SECTIONS.length - 1, currentIndex + 1)];

  return {
    SECTIONS,
    activeSectionId,
    hideInFooter,
    handleNavClick,
    currentIndex,
    prevSection,
    nextSection,
  };
}

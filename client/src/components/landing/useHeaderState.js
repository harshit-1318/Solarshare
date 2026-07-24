import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NAV_ITEMS = [
  { label: "HOME", href: "#top" },
  { label: "FEATURES", href: "#features" },
  { label: "LIVE GRID", href: "#grid-flow" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "IMPACT", href: "#impact" },
  { label: "MARKETPLACE", to: "/marketplace", isRoute: true },
  { label: "FAQ", href: "#faq" },
];

export function useHeaderState() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("HOME");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = NAV_ITEMS.filter((item) => !item.isRoute && item.href !== "#top");
        for (const item of sections) {
          const el = document.querySelector(item.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250 && rect.bottom >= 150) {
              setActiveItem(item.label);
              break;
            }
          }
        }
        if (window.scrollY < 150) setActiveItem("HOME");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/marketplace") {
      setActiveItem("MARKETPLACE");
    } else if (location.pathname === "/") {
      if (location.hash) {
        const targetLabel = NAV_ITEMS.find((i) => i.href === location.hash)?.label;
        if (targetLabel) setActiveItem(targetLabel);
      }
    }
  }, [location]);

  const handleNavClick = (e, item) => {
    if (item.isRoute) {
      setActiveItem(item.label);
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    setActiveItem(item.label);
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/${item.href}`);
      return;
    }

    if (item.href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return { mobileMenuOpen, setMobileMenuOpen, scrolled, activeItem, handleNavClick };
}

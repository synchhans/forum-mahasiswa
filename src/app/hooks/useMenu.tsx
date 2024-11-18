import { useState, useRef } from "react";

const useMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("forum");

  const forumRef = useRef<HTMLDivElement>(null);
  const tentangRef = useRef<HTMLDivElement>(null);
  const kontakRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const changeSection = (section: string) => {
    setActiveSection(section);
  };

  const scrollToSection = (section: string) => {
    let targetElement: HTMLElement | null = null;

    if (section === "forum") {
      targetElement = forumRef.current;
    } else if (section === "tentang") {
      targetElement = tentangRef.current;
    } else if (section === "kontak") {
      targetElement = kontakRef.current;
    }

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return {
    isMobileMenuOpen,
    activeSection,
    forumRef,
    tentangRef,
    kontakRef,
    toggleMenu,
    changeSection,
    scrollToSection,
  };
};

export default useMenu;

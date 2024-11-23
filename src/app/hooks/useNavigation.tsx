import { useState } from "react";

const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const changeSection = (section: string) => {
    setActiveSection(section);
  };

  const scrollToSection = (id: string) => {
    const targetElement = document.getElementById(id);
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
    toggleMenu,
    changeSection,
    scrollToSection,
  };
};

export default useNavigation;

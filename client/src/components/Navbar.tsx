import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Wrench, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.about"), to: "about" },
    { name: t("nav.services"), to: "services" },
    { name: t("nav.gallery"), to: "gallery" },
    { name: t("nav.contact"), to: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <ScrollLink to="hero" smooth={true} duration={500} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary skew-x-[-12deg] flex items-center justify-center">
                <Wrench className="text-white w-6 h-6 skew-x-[12deg]" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter uppercase text-white">
                GTR <span className="text-primary">Auto</span>
              </span>
            </ScrollLink>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest text-muted-foreground hover:text-glow"
                >
                  {link.name}
                </ScrollLink>
              ))}
              
              <div className="flex items-center gap-2 border-l border-border pl-8">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 h-8 ${language === "sr" ? "text-primary font-bold" : "text-muted-foreground"}`}
                  onClick={() => setLanguage("sr")}
                >
                  SR
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 h-8 ${language === "en" ? "text-primary font-bold" : "text-muted-foreground"}`}
                  onClick={() => setLanguage("en")}
                >
                  EN
                </Button>
              </div>

              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="cursor-pointer bg-primary hover:bg-primary/90 text-white px-6 py-2 skew-x-[-12deg] inline-block transition-transform hover:-translate-y-1"
              >
                <span className="skew-x-[12deg] inline-block font-bold uppercase text-sm">{t("nav.book")}</span>
              </ScrollLink>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center md:hidden gap-4">
            <div className="flex items-center gap-1 bg-secondary/30 rounded-md p-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 h-7 text-xs ${language === "sr" ? "bg-primary text-white" : "text-muted-foreground"}`}
                onClick={() => setLanguage("sr")}
              >
                SR
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 h-7 text-xs ${language === "en" ? "bg-primary text-white" : "text-muted-foreground"}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </Button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 uppercase"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer block px-3 py-4 text-center bg-primary text-white font-bold uppercase"
              >
                {t("nav.book")}
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

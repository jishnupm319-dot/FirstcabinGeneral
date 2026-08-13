import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import logoImg from "@/assets/logo.png";

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Products", id: "products" },
  { label: "Industries", id: "industries" },
  { label: "Projects", id: "projects" },
  { label: "Gallery", id: "gallery" },
  { label: "Our Customers", id: "customers" },
  { label: "FAQs", id: "faqs" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const elem = document.getElementById(targetId);
          if (elem) elem.scrollIntoView({ behavior: "smooth" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    } else {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden md:block bg-secondary text-secondary-foreground text-xs">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <span className="opacity-80">Dubai, UAE · ⭐ 4.7/5 (33+ reviews)</span>
          <div className="flex gap-6 opacity-90">
            <a href="tel:+971551000148" className="hover:text-accent transition-smooth">+971 55 100 0148</a>
            <a href="mailto:jishnumanoj4567@gmail.com" className="hover:text-accent transition-smooth">jishnumanoj4567@gmail.com</a>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-smooth ${
          scrolled ? "glass shadow-card" : "bg-background/80 backdrop-blur"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white p-1.5 shadow-glow group-hover:scale-105 transition-smooth flex items-center justify-center border border-border/60 shrink-0">
              <img src={logoImg} alt="FIRST CABIN GENERAL TRADING LLC Logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-none">
              <div className="font-display font-black text-xl md:text-2xl text-foreground tracking-wide uppercase group-hover:text-primary transition-smooth">FIRST CABIN</div>
              <div className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em] text-primary mt-1">GENERAL TRADING LLC</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNavClick(e, n.id)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth relative group cursor-pointer"
              >
                {n.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </a>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground font-semibold text-xs shadow-sm hover:shadow-glow transition-smooth"
            >
              Get Quote
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="tel:+971551000148"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:shadow-glow transition-smooth"
            >
              <Phone className="w-4 h-4" /> Call
            </a>
            <a
              href="https://wa.me/971551000148"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:shadow-glow transition-smooth"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={(e) => handleNavClick(e, n.id)}
                    className="py-3 px-2 text-foreground hover:text-primary border-b border-border/50 cursor-pointer"
                  >
                    {n.label}
                  </a>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="py-3 px-2 text-primary font-bold text-center border-b border-border/50 block"
                >
                  Get Quote
                </Link>
                <div className="flex gap-2 pt-4">
                  <a href="tel:+971551000148" className="flex-1 text-center py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium">Call</a>
                  <a href="https://wa.me/971551000148" className="flex-1 text-center py-3 rounded-full bg-accent text-accent-foreground text-sm font-medium">WhatsApp</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const FloatingCTA = () => (
  <motion.a
    href="https://wa.me/971551000148"
    target="_blank"
    rel="noopener"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring" }}
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-glow hover:scale-110 transition-smooth"
    aria-label="WhatsApp"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
    <MessageCircle className="w-6 h-6 relative" />
  </motion.a>
);

export const ScrollProgress = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 gradient-accent z-[60] origin-left"
      style={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
    />
  );
};

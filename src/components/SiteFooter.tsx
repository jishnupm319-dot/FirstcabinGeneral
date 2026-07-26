import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";
import logoImg from "@/assets/logo.png";

export const SiteFooter = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-8 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-primary -top-32 -left-32" />
      <div className="blob w-96 h-96 bg-accent bottom-0 right-0 opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center border border-white/20">
                <img src={logoImg} alt="First Cabin Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-bold">First Cabin</div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">General Trading LLC</div>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-5">
              A leading portable building manufacturer in Sharjah, delivering premium prefab cabins, modular buildings and custom solutions across the UAE.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-smooth">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-5 text-accent">Products</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {["Security Cabins", "Portable Offices", "Labour Accommodation", "Modular Buildings", "Prefab Villas", "Storage Containers"].map(x => (
                <li key={x}><a href="#products" className="hover:text-accent transition-smooth">{x}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-5 text-accent">Services</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {["Manufacturing", "Customization", "Transportation", "Installation", "Maintenance", "Interior Fit-Out"].map(x => (
                <li key={x}><a href="#" className="hover:text-accent transition-smooth">{x}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-5 text-accent">Get in Touch</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" /><span>Wadi Al Halo, Industrial Area 17, Sharjah, UAE</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 shrink-0 mt-0.5 text-accent" /><a href="tel:+971551000148">+971 55 100 0148</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 shrink-0 mt-0.5 text-accent" /><a href="mailto:jishnumanoj4567@gmail.com">jishnumanoj4567@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
          <p>© {new Date().getFullYear()} First Cabin General Trading LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-smooth z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

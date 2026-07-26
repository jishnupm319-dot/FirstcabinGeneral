import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(1500),
});

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<{ name: string; phone: string; email: string; projectType: string; message: string; mailtoUrl: string; waUrl: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      company: fd.get("company") ?? "",
      phone: fd.get("phone"),
      email: fd.get("email"),
      projectType: fd.get("projectType") ?? "",
      message: fd.get("message"),
    });

    if (!parsed.success) {
      toast.error("Please check your inputs and try again.");
      return;
    }

    const { name, company, phone, email, projectType, message } = parsed.data;

    const formattedMessage =
      `Hello First Cabin,\n\nI would like to request a quote:\n` +
      `• Name: ${name}\n` +
      `• Company: ${company || "N/A"}\n` +
      `• Phone: ${phone}\n` +
      `• Email: ${email}\n` +
      `• Project Type: ${projectType || "General Enquiry"}\n\n` +
      `• Details: ${message}`;

    const subject = encodeURIComponent(`New Quote Request - ${name}`);
    const mailtoUrl = `mailto:jishnumanoj4567@gmail.com?subject=${subject}&body=${encodeURIComponent(formattedMessage)}`;
    const waUrl = `https://wa.me/971551000148?text=${encodeURIComponent(formattedMessage)}`;

    setQuoteData({ name, phone, email, projectType: projectType || "", message, mailtoUrl, waUrl });
    setLoading(true);

    // Send via EmailJS API directly to jishnumanoj4567@gmail.com
    const EMAILJS_SERVICE_ID = "service_ixle0hv";
    const EMAILJS_TEMPLATE_ID = "template_gdpmz1s";
    const EMAILJS_PUBLIC_KEY = "HGjLQzBmXRvt6OzWU";

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            phone: phone,
            company: company || "N/A",
            project_type: projectType || "General",
            message: message,
          },
        }),
      });

      if (response.ok) {
        toast.success("Quote sent directly to jishnumanoj4567@gmail.com!");
      }
    } catch (err) {
      console.error("EmailJS send failed", err);
    }

    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <FloatingCTA />

      <section className="relative pt-20 pb-16 gradient-primary text-primary-foreground overflow-hidden">
        <div className="blob w-96 h-96 bg-accent top-10 right-10 opacity-30" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-widest mb-4">Get in touch</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4">Let's build something together</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">Send us a brief. We'll respond with pricing and lead times within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-3xl bg-card shadow-card border border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-3"><MapPin className="w-5 h-5 text-primary-foreground" /></div>
              <div className="font-display font-bold mb-1">Head Office</div>
              <p className="text-sm text-muted-foreground">Wadi Al Halo, Industrial Area 17, Sharjah, UAE</p>
            </div>
            <div className="p-6 rounded-3xl bg-card shadow-card border border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-3"><Phone className="w-5 h-5 text-primary-foreground" /></div>
              <div className="font-display font-bold mb-1">Call Us</div>
              <a href="tel:+971551000148" className="text-sm text-primary hover:underline">+971 55 100 0148</a>
            </div>
            <div className="p-6 rounded-3xl bg-card shadow-card border border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-3"><Mail className="w-5 h-5 text-primary-foreground" /></div>
              <div className="font-display font-bold mb-1">Email</div>
              <a href="mailto:jishnumanoj4567@gmail.com" className="text-sm text-primary hover:underline">jishnumanoj4567@gmail.com</a>
            </div>
            <div className="p-6 rounded-3xl gradient-accent shadow-card">
              <div className="flex items-center gap-3 mb-2"><CheckCircle2 className="w-5 h-5 text-accent-foreground" /><span className="font-display font-bold text-accent-foreground">Fast Response</span></div>
              <p className="text-sm text-accent-foreground/80">Talk to our expert sales team for custom cabin quotes.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-card shadow-elegant border border-border/50">
            {sent ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground">Quote sent successfully</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Thank you! Our sales team will review your requirements and reach out to you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-smooth"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <h2 className="font-display font-bold text-2xl mb-6">Request a Quote</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Full Name *" name="name" placeholder="John Doe" required />
                  <Field label="Company" name="company" placeholder="Your company" />
                  <Field label="Phone *" name="phone" type="tel" placeholder="+971 …" required />
                  <Field label="Email *" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <select name="projectType" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth">
                    <option value="">Select…</option>
                    {["Security Cabin", "Office Construction", "Labour Accommodation", "Modular Building", "Prefab Villa", "Custom Project"].map(x => <option key={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea name="message" required rows={5} maxLength={1500} placeholder="Tell us about your project…" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none" />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-smooth">
                    <Send className="w-4 h-4" /> Request Quote
                  </button>
                  <a href="tel:+971551000148" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-smooth">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href="https://wa.me/971551000148" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:shadow-glow transition-smooth">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
      />
    </div>
  );
}

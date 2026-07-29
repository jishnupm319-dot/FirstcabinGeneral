import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Mail, Send, CheckCircle2, Shield, Maximize2, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { toast } from "sonner";
import { z } from "zod";

import secRefTrailer from "@/assets/security-ref-trailer.jpg";
import secRefNightDark from "@/assets/security-ref-night-dark.jpg";
import secRefSilverCurved from "@/assets/security-ref-silver-curved.jpg";
import secRefDwtcIbis from "@/assets/security-ref-dwtc-ibis.jpg";
import secRefBeigeOval from "@/assets/security-ref-beige-oval.jpg";
import secRefGoldCurved from "@/assets/security-ref-gold-curved.jpg";
import secRefBeigeRoadside from "@/assets/security-ref-beige-roadside.jpg";
import secRefDarkwoodSheraton from "@/assets/security-ref-darkwood-sheraton.jpg";

const securityCabinReferences = [
  { id: "trailer", title: "Mobile Trailer Security Booth", desc: "Towable cabin with integrated generator platform & safety rail", img: secRefTrailer },
  { id: "night-dark", title: "Executive Curved Night Gatehouse", desc: "Rounded metallic finish with 360° panoramic dark glazing & ambient light", img: secRefNightDark },
  { id: "silver-curved", title: "Silver Chrome Louvered Guard Cabin", desc: "Polished stainless steel banding with horizontal architectural louvers", img: secRefSilverCurved },
  { id: "dwtc-ibis", title: "DWTC Luxury Entrance Gatehouse", desc: "High-security corporate checkpoint booth with illuminated government crest", img: secRefDwtcIbis },
  { id: "beige-oval", title: "Beige Oval Architectural Guard Booth", desc: "Smooth curved cream finish with polished stainless louvers", img: secRefBeigeOval },
  { id: "gold-curved", title: "Gold Metallic Rounded Gatehouse", desc: "Luxurious gold anodized panels with curved glass bay", img: secRefGoldCurved },
  { id: "beige-roadside", title: "Beige Curved Oval Gate Cabin", desc: "Sleek oval roadside security unit with multi-band chrome", img: secRefBeigeRoadside },
  { id: "darkwood-sheraton", title: "Dark Wood Luxury Executive Booth", desc: "Rich timber-grain exterior with chrome accents & tinted panoramic glass", img: secRefDarkwoodSheraton },
];

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
  const [projectTypeState, setProjectTypeState] = useState<string>("Security Cabins");
  const [selectedRefModel, setSelectedRefModel] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    let rawMsg = (fd.get("message") as string) || "";
    if (projectTypeState === "Security Cabins" && selectedRefModel) {
      rawMsg = `[Reference Model: ${selectedRefModel}]\n` + rawMsg;
    }

    const parsed = schema.safeParse({
      name: fd.get("name"),
      company: fd.get("company") ?? "",
      phone: fd.get("phone"),
      email: fd.get("email"),
      projectType: projectTypeState,
      message: rawMsg,
    });

    if (!parsed.success) {
      toast.error("Please check your inputs and try again.");
      return;
    }

    setLoading(true);

    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_ixle0hv",
          template_id: "template_gdpmz1s",
          user_id: "HGjLQzBmXRvt6OzWU",
          template_params: {
            from_name: parsed.data.name,
            from_email: parsed.data.email,
            phone: parsed.data.phone,
            company: parsed.data.company || "N/A",
            project_type: parsed.data.projectType || "Security Cabins",
            message: parsed.data.message,
          },
        }),
      });

      setSent(true);
      toast.success("Quote sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
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
              <p className="text-sm text-muted-foreground">Industrial Area, Dubai, United Arab Emirates</p>
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
                  <select
                    name="projectType"
                    value={projectTypeState}
                    onChange={(e) => setProjectTypeState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth font-medium"
                  >
                    {["Security Cabins", "Customized Cabins", "Bus Stations", "Container Office", "Toll Gates", "Fabricated Buildings", "Labour Accommodation"].map(x => <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>

                {/* SECURITY CABIN CUSTOMER REFERENCE IMAGES PANEL */}
                {projectTypeState === "Security Cabins" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 rounded-2xl bg-muted/50 border border-primary/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-display font-bold text-sm text-foreground">Security Cabin Reference Models (Customer Reference Only)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click any model image to attach it to your quote request:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {securityCabinReferences.map((ref) => (
                        <div
                          key={ref.id}
                          onClick={() => {
                            setSelectedRefModel(ref.title);
                            toast.info(`Selected "${ref.title}" as your reference.`);
                          }}
                          className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-smooth bg-card shadow-sm ${
                            selectedRefModel === ref.title ? "border-primary ring-2 ring-primary/20" : "border-border/60 hover:border-primary/50"
                          }`}
                        >
                          <div className="h-28 relative overflow-hidden">
                            <img src={ref.img} alt={ref.title} className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxImg({ src: ref.img, title: ref.title });
                              }}
                              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-primary transition-smooth"
                              title="Full Screen Preview"
                            >
                              <Maximize2 className="w-3 h-3" />
                            </button>
                            {selectedRefModel === ref.title && (
                              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-primary text-[9px] text-primary-foreground font-bold">
                                Selected
                              </span>
                            )}
                          </div>
                          <div className="p-2">
                            <div className="font-display font-semibold text-[11px] text-foreground leading-tight line-clamp-1">{ref.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Project Requirements *</label>
                  <textarea name="message" required rows={4} maxLength={1500} placeholder="e.g., Colour: White/Silver, Length: 6m, Width: 3m, AC & custom specs..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none" />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={loading} className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-smooth disabled:opacity-50">
                    <Send className="w-4 h-4" /> {loading ? "Sending…" : "Request Quote"}
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

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-4xl w-full bg-card rounded-3xl p-4 overflow-hidden border border-border/50" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 px-2">
              <h3 className="font-display font-bold text-lg text-foreground">{lightboxImg.title}</h3>
              <button onClick={() => setLightboxImg(null)} className="p-2 rounded-full hover:bg-muted transition-smooth"><X className="w-5 h-5" /></button>
            </div>
            <img src={lightboxImg.src} alt={lightboxImg.title} className="w-full max-h-[75vh] object-contain rounded-2xl" />
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
      />
    </div>
  );
}

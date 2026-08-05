import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Home as HomeIcon, Briefcase, Users, Building2, Warehouse, Box, GraduationCap,
  Stethoscope, Wrench, Truck, Hammer, Settings, Zap, Wind, Star, CheckCircle2, MapPin,
  ArrowRight, Download, Phone, Play, Award, Clock, Factory, HardHat, Snowflake, DollarSign,
  ChevronDown, Quote, Maximize2, X, Bus, Ticket, Send,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImg from "@/assets/hero-cabin.jpg";
import interiorImg from "@/assets/cabin-interior.jpg";
import securityImg from "@/assets/security-cabin.jpg";
import accommodationImg from "@/assets/accommodation.jpg";
import projectDubaiFisherman from "@/assets/project-dubai-fisherman-accommodation.jpg";
import factoryImg from "@/assets/factory.jpg";
import villaImg from "@/assets/villa.jpg";
import rtaDayImg from "@/assets/sharjah-rta-cabin-day.jpg";
import rtaNightImg from "@/assets/sharjah-rta-cabin-night.jpg";
import rtaSideImg from "@/assets/sharjah-rta-cabin-side.jpg";
import aboutGoldCabinImg from "@/assets/about-gold-cabin.jpg";

import featuredSecurityDwtc from "@/assets/featured-security-dwtc.jpg";
import featuredSecurityGold from "@/assets/featured-security-gold.jpg";
import featuredSecurityWhite from "@/assets/featured-security-white.jpg";

import galleryAirport from "@/assets/gallery-airport-cabin.jpg";
import galleryBusShelter from "@/assets/gallery-bus-shelter.jpg";
import galleryTollGate from "@/assets/gallery-toll-gate.jpg";
import gallerySecurityGold from "@/assets/gallery-security-gold.jpg";
import gallerySecurityWhite from "@/assets/gallery-security-white.jpg";
import galleryDubaiPoliceFront from "@/assets/gallery-dubai-police-front.jpg";
import galleryModularBuildingWhite from "@/assets/gallery-modular-building-white.jpg";
import galleryMountainTollGate from "@/assets/gallery-mountain-toll-gate.jpg";
import galleryGoldCabinsTrio from "@/assets/gallery-gold-cabins-trio.jpg";
import galleryContainerOffice2Story from "@/assets/gallery-container-office-2story.jpg";
import galleryModularSiteConstruction from "@/assets/gallery-modular-site-construction.jpg";
import galleryDpworldBlueBooths from "@/assets/gallery-dpworld-blue-booth.jpg";
import galleryFgbBankCabin from "@/assets/gallery-fgb-bank-cabin.jpg";
import galleryBeigeOvalCabin from "@/assets/gallery-beige-oval-cabin.jpg";
import galleryGreenVipBooth from "@/assets/gallery-green-vip-booth.jpg";
import galleryDarkwoodCabin from "@/assets/gallery-darkwood-cabin.jpg";

import secRefTrailer from "@/assets/security-ref-trailer.jpg";
import secRefNightDark from "@/assets/security-ref-night-dark.jpg";
import secRefSilverCurved from "@/assets/security-ref-silver-curved.jpg";
import secRefDwtcIbis from "@/assets/security-ref-dwtc-ibis.jpg";
import secRefBeigeOval from "@/assets/security-ref-beige-oval.jpg";
import secRefGoldCurved from "@/assets/security-ref-gold-curved.jpg";
import secRefBeigeRoadside from "@/assets/security-ref-beige-roadside.jpg";
import secRefDarkwoodSheraton from "@/assets/security-ref-darkwood-sheraton.jpg";

const securityCabinReferences = [
  { id: "trailer", title: "Mobile Trailer Security Booth", desc: "Towable cabin with integrated generator platform & safety rail", img: secRefTrailer, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-trailer.jpg" },
  { id: "night-dark", title: "Executive Curved Night Gatehouse", desc: "Rounded metallic finish with 360° panoramic dark glazing", img: secRefNightDark, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-night-dark.jpg" },
  { id: "silver-curved", title: "Silver Chrome Louvered Guard Cabin", desc: "Polished stainless steel banding with horizontal architectural louvers", img: secRefSilverCurved, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-silver-curved.jpg" },
  { id: "dwtc-ibis", title: "DWTC Luxury Entrance Gatehouse", desc: "High-security corporate checkpoint booth with government crest", img: secRefDwtcIbis, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-dwtc-ibis.jpg" },
  { id: "beige-oval", title: "Beige Oval Architectural Guard Booth", desc: "Smooth curved cream finish with polished stainless louvers", img: secRefBeigeOval, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-beige-oval.jpg" },
  { id: "gold-curved", title: "Gold Metallic Rounded Gatehouse", desc: "Luxurious gold anodized panels with curved glass bay", img: secRefGoldCurved, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-gold-curved.jpg" },
  { id: "beige-roadside", title: "Beige Curved Oval Gate Cabin", desc: "Sleek oval roadside security unit with multi-band chrome", img: secRefBeigeRoadside, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-beige-roadside.jpg" },
  { id: "darkwood-sheraton", title: "Dark Wood Luxury Executive Booth", desc: "Rich timber-grain exterior with chrome accents & tinted panoramic glass", img: secRefDarkwoodSheraton, rawUrl: "https://raw.githubusercontent.com/jishnupm319-dot/FirstcabinGeneral/main/src/assets/security-ref-darkwood-sheraton.jpg" },
];

import clientKuwaitGovt from "@/assets/client-kuwait-govt.jpg";
import clientDubaiCustoms from "@/assets/client-dubai-customs.jpg";
import clientQatarMunicipality from "@/assets/client-qatar-municipality.jpg";
import clientMuscatMunicipality from "@/assets/client-muscat-municipality.jpg";
import clientEtihadRail from "@/assets/client-etihad-rail.jpg";
import clientAjmanFreeZone from "@/assets/client-ajman-free-zone.jpg";
import clientDubaiAmbulance from "@/assets/client-dubai-ambulance.jpg";
import clientEmiratesAirlines from "@/assets/client-emirates-airlines.jpg";
import clientUniversitySharjah from "@/assets/client-university-sharjah.jpg";
import clientAdPortsGroup from "@/assets/client-ad-ports-group.jpg";
import clientDubaiPolice from "@/assets/client-dubai-police.jpg";
import clientAbuDhabiPolice from "@/assets/client-abu-dhabi-police.jpg";
import clientDpWorld from "@/assets/client-dp-world.jpg";
import clientSharjahMunicipality from "@/assets/client-sharjah-municipality.jpg";
import clientDubaiMunicipality from "@/assets/client-dubai-municipality.jpg";

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: any = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Section = ({ id, children, className = "" }: any) => (
  <section id={id} className={`py-24 md:py-32 relative ${className}`}>{children}</section>
);

const SectionLabel = ({ children }: any) => (
  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
    {children}
  </span>
);

const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1800;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.floor(start + (end - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const products = [
  { icon: Shield, name: "Security Cabins", desc: "Compact guard booths built for heavy-duty security in extreme UAE climates.", img: featuredSecurityDwtc },
  { icon: Settings, name: "Customized Cabins", desc: "Any size, layout or finish — custom engineered around your exact project specifications.", img: rtaSideImg },
  { icon: Bus, name: "Bus Stations", desc: "Modern smart bus shelters and passenger transit stations with climate control.", img: galleryBusShelter },
  { icon: Warehouse, name: "Container Office", desc: "20ft & 40ft converted container offices with premium insulated interiors.", img: galleryContainerOffice2Story },
  { icon: Ticket, name: "Toll Gates", desc: "Custom entry toll gates and highway checkpoint canopy structures.", img: galleryMountainTollGate },
  { icon: Building2, name: "Fabricated Buildings", desc: "Multi-story prefabricated complexes engineered to exact floor plans.", img: galleryModularBuildingWhite },
  { icon: Users, name: "Labour Accommodation", desc: "Fully compliant workforce housing with bunks, dining halls, kitchens and washrooms.", img: accommodationImg },
];

const features = [
  { icon: Award, title: "Premium Materials", desc: "High-grade steel frames, insulated sandwich panels, corrosion-resistant coatings." },
  { icon: Wind, title: "Weather Resistant", desc: "Engineered for UAE heat, dust storms and coastal humidity." },
  { icon: Snowflake, title: "Heat Insulated", desc: "50–75mm PU / rockwool panels keeping interiors 15°C cooler." },
  { icon: Zap, title: "Fast Manufacturing", desc: "Standard units delivered in 7–14 days, ready to install." },
  { icon: Settings, title: "Custom Sizes", desc: "Any dimension, layout, colour and interior specification." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Factory-direct pricing with transparent, itemised quotes." },
  { icon: HardHat, title: "Professional Team", desc: "Experienced engineers, welders, electricians and installers." },
  { icon: Clock, title: "Dedicated Support", desc: "Expert guidance for orders, service and custom requests." },
];

const services = [
  { icon: Factory, title: "Manufacturing" },
  { icon: Settings, title: "Customization" },
  { icon: Truck, title: "Transportation" },
  { icon: Wrench, title: "Installation" },
  { icon: Hammer, title: "Maintenance" },
  { icon: Wrench, title: "Repair Services" },
  { icon: HomeIcon, title: "Interior Fit-Out" },
  { icon: Factory, title: "Steel Fabrication" },
  { icon: Zap, title: "Electrical Installation" },
  { icon: Wind, title: "HVAC Installation" },
];

const industries = [
  "Construction", "Oil & Gas", "Government", "Education",
  "Healthcare", "Commercial", "Military", "Residential",
];

const projects = [
  { title: "Sharjah RTA Smart Modular Station", loc: "Sharjah", time: "25 days", img: rtaNightImg },
  { title: "Sharjah University Modular Buildings", loc: "Sharjah", time: "30 days", img: galleryModularBuildingWhite },
  { title: "Dubai Custom Fisherman Accommodation", loc: "Dubai", time: "40 days", img: projectDubaiFisherman },
  { title: "Toll Gate at Sharjah", loc: "Sharjah", time: "18 days", img: galleryMountainTollGate },
  { title: "Dubai Authority Customized Cabins", loc: "Dubai", time: "20 days", img: featuredSecurityDwtc },
];


const processSteps = [
  { n: "01", title: "Requirement Analysis", desc: "We map your site, workflow and compliance needs." },
  { n: "02", title: "Design", desc: "CAD drawings, 3D renders and material selection." },
  { n: "03", title: "Manufacturing", desc: "Precision steel fabrication in our Dubai facility." },
  { n: "04", title: "Quality Inspection", desc: "Multi-point QC across structure, finish and systems." },
  { n: "05", title: "Delivery", desc: "Coordinated logistics across every emirate." },
  { n: "06", title: "Installation", desc: "On-site crane placement, hookup and handover." },
];

const faqs = [
  { q: "What types of cabins do you manufacture?", a: "We build the full range: security cabins, portable offices, site offices, labour accommodation, guard rooms, portable classrooms, clinics, storage containers, prefab villas and fully custom modular buildings." },
  { q: "Can cabins be customized?", a: "Yes. Every unit can be tailored — dimensions, layout, insulation, glazing, exterior colour, electrical load, HVAC, plumbing and interior finishes." },
  { q: "How long does manufacturing take?", a: "Standard units ship in 7–14 days. Complex custom projects and multi-unit orders typically take 3–8 weeks." },
  { q: "Do you provide installation?", a: "Yes. Our in-house crew handles crane offloading, levelling, MEP hookup and full handover anywhere in the UAE." },
  { q: "Are cabins heat insulated?", a: "All units use 50–75mm PU or rockwool sandwich panels, keeping interiors 15°C cooler than ambient temperature." },
  { q: "Do you deliver across UAE?", a: "Yes — Sharjah, Dubai, Abu Dhabi, Ajman, Fujairah, Ras Al Khaimah and Umm Al Quwain, plus GCC on request." },
  { q: "Do you provide warranty?", a: "Yes. Standard 12-month structural and system warranty, extendable up to 3 years on selected products." },
  { q: "Can I request custom dimensions?", a: "Absolutely. Send us drawings or a brief — we'll engineer any size that meets road transport limits." },
];

export default function Home() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; label: string; category: string } | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [selectedRefModel, setSelectedRefModel] = useState<string | null>(null);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [refLightboxImg, setRefLightboxImg] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setQuoteProduct(null);
        setRefLightboxImg(null);
      }
    };
    if (lightbox || quoteProduct || refLightboxImg) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, quoteProduct, refLightboxImg]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <FloatingCTA />

      {/* HERO */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern portable cabin at UAE industrial site" className="w-full h-full object-cover" width={1600} height={900} />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="blob w-96 h-96 bg-accent top-20 right-10" />
        <div className="blob w-96 h-96 bg-primary-glow bottom-20 left-10" />

        <div className="container mx-auto px-6 relative z-10 py-24">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-white uppercase tracking-widest font-medium">Dubai, UAE</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
              Premium Portable Cabins <span className="text-accent">Built for Every Business</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              Manufacturing high-quality portable cabins, modular buildings, security cabins, site offices, accommodation units and customized prefab solutions across the UAE.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-accent text-accent-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
                Get Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-foreground font-semibold hover:bg-white transition-smooth cursor-pointer"
              >
                Explore Products
              </button>
              <a href="tel:+971551000148" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-smooth">
                <Phone className="w-4 h-4" /> Call Direct
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              {[
                { n: 9000, s: "+", l: "Completed Projects" },
                { n: 8000, s: "+", l: "Happy Clients" },
                { n: 15, s: "+", l: "Product Categories" },
                { n: 100, s: "%", l: "UAE Quality" },
              ].map((s, i) => (
                <div key={i} className="glass-dark rounded-2xl p-5">
                  <div className="text-4xl font-display font-bold text-accent"><Counter end={s.n} suffix={s.s} /></div>
                  <div className="text-xs text-white/80 uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>About Us</SectionLabel>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
                A trusted portable building manufacturer <span className="text-gradient">serving the UAE.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                First Cabin General Trading LLC is a Dubai-based manufacturer engineering premium prefab cabins, modular buildings and custom portable solutions for industrial, commercial and residential clients across the Emirates.
              </p>
              <ul className="space-y-3 mb-8">
                {["High Quality Materials", "Customized Solutions", "Fast Delivery", "Professional Installation"].map(x => (
                  <li key={x} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{x}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-smooth">
                Talk to Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-elegant">
                <img src={aboutGoldCabinImg} alt="Luxury Gold Security Cabin — constructed by First Cabin General Trading LLC" className="w-full h-[500px] object-cover" loading="lazy" width={1200} height={800} />
              </div>
              <div className="absolute -bottom-8 -left-8 glass rounded-2xl p-6 shadow-elegant max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="font-bold">4.7/5</span>
                </div>
                <p className="text-sm text-muted-foreground">Rated by 33+ verified clients across the UAE.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section id="products" className="bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Our Products</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">Engineered for every application</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Twelve core product lines, endlessly customisable to your project brief.</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <motion.div key={p.name} variants={fadeUp} whileHover={{ y: -8 }} className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth">
                <div className="relative h-56 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setQuoteProduct(p.name); setSelectedRefModel(null); setQuoteSent(false); }} className="flex-1 text-center py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-glow transition-smooth">Get Quote</button>
                    <button className="px-4 py-2.5 rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition-smooth inline-flex items-center gap-1">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <Section id="why">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">Built on quality. Delivered with speed.</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="group p-8 rounded-3xl bg-card shadow-card hover:shadow-elegant hover:-translate-y-2 transition-smooth border border-border/50">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth shadow-glow">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="blob w-96 h-96 bg-primary top-10 left-10" />
        <div className="blob w-96 h-96 bg-accent bottom-10 right-10 opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">Our Services</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl">End-to-end capability, one partner</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((s) => (
              <motion.div key={s.title} variants={fadeUp} className="p-6 rounded-2xl glass-dark text-center hover:bg-primary/20 hover:border-accent transition-smooth cursor-pointer">
                <s.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="font-medium text-sm">{s.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section id="industries">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Industries We Serve</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl">From construction to healthcare</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {industries.map((i, idx) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-3xl gradient-primary text-primary-foreground flex flex-col items-center justify-center text-center p-4 shadow-card hover:shadow-glow transition-smooth"
              >
                <Building2 className="w-8 h-8 mb-2 opacity-80" />
                <span className="font-display font-bold text-lg">{i}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" className="bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Project Showcase</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">Delivered across the Emirates</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => (
              <motion.div key={p.title} variants={fadeUp} whileHover={{ y: -6 }} className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth h-80">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs opacity-90">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.loc}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* FEATURED SECURITY CABINS PROJECT SHOWCASE */}
      <Section id="featured-security" className="bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="blob w-96 h-96 bg-primary top-10 left-10" />
        <div className="blob w-96 h-96 bg-accent bottom-10 right-10 opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              Featured Security Cabins Showcase
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              High-Security & Luxury Checkpoint Cabins
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
              Engineered for Dubai World Trade Centre, corporate headquarters, and high-security access gates — featuring curved panoramic dark glazing, polished stainless steel banding, and warm ambient LED lighting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-accent transition-smooth"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={featuredSecurityDwtc} alt="Dubai World Trade Centre Security Booth" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                <span className="absolute bottom-3 left-3 bg-secondary/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent">DWTC Checkpoint</span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2">Dubai World Trade Centre Booth</h3>
                <p className="text-xs text-white/70 leading-relaxed">Metallic curved paneling with integrated DWTC illuminated crest, dark panoramic tint, and warm perimeter LED lighting.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-accent transition-smooth"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={featuredSecurityGold} alt="VIP Gold Security Guard Cabin" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                <span className="absolute bottom-3 left-3 bg-secondary/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent">VIP Checkpoint</span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2">Brushed Gold VIP Guard Booth</h3>
                <p className="text-xs text-white/70 leading-relaxed">Luxury gold architectural cladding, polished chrome accent rings, 360° curved glazing, and security gate integration.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-accent transition-smooth"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={featuredSecurityWhite} alt="First Cabins Corporate Access Booth" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                <span className="absolute bottom-3 left-3 bg-secondary/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent">Corporate Entrance</span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2">Corporate Headquarters Checkpoint</h3>
                <p className="text-xs text-white/70 leading-relaxed">Sleek white cladding with horizontal LED accent grooves, sliding visitor pass window, and automatic barrier control hookups.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* FEATURED RTA CONSTRUCTED PROJECT */}
      <Section id="featured-showcase" className="bg-background relative overflow-hidden border-y border-border/50">
        <div className="blob w-96 h-96 bg-primary/10 top-10 right-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <SectionLabel>Featured Construction Project</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Government of Sharjah RTA Modular Station
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Engineered and delivered for the Government of Sharjah Roads & Transport Authority — custom smart modular station featuring CNC laser-cut mashrabiya lattice screens, climate-controlled glazing, and warm LED perimeter lighting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group rounded-3xl overflow-hidden bg-card shadow-card border border-border/50 hover:border-primary transition-smooth">
              <div className="h-64 overflow-hidden relative">
                <img src={rtaNightImg} alt="Sharjah RTA Cabin Night Illumination" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                <span className="absolute bottom-3 left-3 bg-secondary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent">Night Illumination</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">Ambient Architectural Lighting</h3>
                <p className="text-xs text-muted-foreground">Perimeter LED canopy glow with integrated government branding.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group rounded-3xl overflow-hidden bg-card shadow-card border border-border/50 hover:border-primary transition-smooth">
              <div className="h-64 overflow-hidden relative">
                <img src={rtaDayImg} alt="Sharjah RTA Cabin Day View" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                <span className="absolute bottom-3 left-3 bg-secondary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent">Daylight View</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">Floor-to-Ceiling Glazing</h3>
                <p className="text-xs text-muted-foreground">High-efficiency double-glazed glass with solar heat reduction coating.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group rounded-3xl overflow-hidden bg-card shadow-card border border-border/50 hover:border-primary transition-smooth">
              <div className="h-64 overflow-hidden relative">
                <img src={rtaSideImg} alt="Sharjah RTA Cabin Side Elevation" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                <span className="absolute bottom-3 left-3 bg-secondary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-accent">Exterior Finishes</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">Mashrabiya Steel Screen</h3>
                <p className="text-xs text-muted-foreground">Precision CNC laser-cut aluminum lattice panels and concealed MEP housing.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Image Gallery</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Our constructed projects</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">A showcase of our premium modular cabins, shelters and gate structures delivered across the UAE and region.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* 1 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryAirport, alt: "Airport Passenger Waiting Cabin", label: "Passenger Waiting Cabin", category: "Airport Terminal" })}
            >
              <img src={galleryAirport} alt="Airport Passenger Waiting Cabin" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Airport Terminal</span>
                <p className="text-white font-display font-bold text-base">Passenger Waiting Cabin</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 2 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryGoldCabinsTrio, alt: "Triple Gold Checkpoint Cabins", label: "Gold Checkpoint Cabins Trio", category: "Security Checkpoint" })}
            >
              <img src={galleryGoldCabinsTrio} alt="Triple Gold Checkpoint Cabins" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Security Checkpoint</span>
                <p className="text-white font-display font-bold text-base">Gold Checkpoint Cabins</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>



            {/* 7 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryBusShelter, alt: "Smart Bus Shelter", label: "Smart Bus Shelter", category: "Transit" })}
            >
              <img src={galleryBusShelter} alt="Smart Bus Shelter" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Transit</span>
                <p className="text-white font-display font-bold text-base">Smart Bus Shelter</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 8 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryTollGate, alt: "Toll Gate & Entry Structure", label: "Toll Gate Entry Structure", category: "Infrastructure" })}
            >
              <img src={galleryTollGate} alt="Toll Gate & Entry Structure" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Infrastructure</span>
                <p className="text-white font-display font-bold text-base">Toll Gate Entry Structure</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 9 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: gallerySecurityGold, alt: "Premium Gold Security Cabin", label: "Premium Gold Security Cabin", category: "Security" })}
            >
              <img src={gallerySecurityGold} alt="Premium Gold Security Cabin" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Security</span>
                <p className="text-white font-display font-bold text-base">Premium Gold Security Cabin</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 10 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: gallerySecurityWhite, alt: "First Cabins Guard Booth", label: "First Cabins Guard Booth", category: "Guard Room" })}
            >
              <img src={gallerySecurityWhite} alt="First Cabins Guard Booth" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Guard Room</span>
                <p className="text-white font-display font-bold text-base">First Cabins Guard Booth</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 11 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryContainerOffice2Story, alt: "2-Story Container Office Complex", label: "2-Story Container Office", category: "Container Office" })}
            >
              <img src={galleryContainerOffice2Story} alt="2-Story Container Office Complex" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Container Office</span>
                <p className="text-white font-display font-bold text-base">2-Story Container Office</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 12 */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryModularSiteConstruction, alt: "Modular Complex Site Installation", label: "Modular Site Installation", category: "Modular Building" })}
            >
              <img src={galleryModularSiteConstruction} alt="Modular Complex Site Installation" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Modular Building</span>
                <p className="text-white font-display font-bold text-base">Modular Site Installation</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 13 - DP World */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryDpworldBlueBooths, alt: "DP World Blue Security Booth", label: "DP World Security Booth", category: "DP World Checkpoint" })}
            >
              <img src={galleryDpworldBlueBooths} alt="DP World Blue Security Booth" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">DP World Checkpoint</span>
                <p className="text-white font-display font-bold text-base">DP World Security Booth</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 14 - FGB Bank */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryFgbBankCabin, alt: "FGB Bank Curved Guard Booth", label: "FGB Bank Guard Booth", category: "Banking Checkpoint" })}
            >
              <img src={galleryFgbBankCabin} alt="FGB Bank Curved Guard Booth" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Banking Checkpoint</span>
                <p className="text-white font-display font-bold text-base">FGB Bank Guard Booth</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 15 - Beige Oval Cabin */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryBeigeOvalCabin, alt: "Beige Oval Executive Cabin", label: "Beige Oval Executive Cabin", category: "Executive Booth" })}
            >
              <img src={galleryBeigeOvalCabin} alt="Beige Oval Executive Cabin" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Executive Booth</span>
                <p className="text-white font-display font-bold text-base">Beige Oval Executive Cabin</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 16 - Green VIP Gatehouse */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryGreenVipBooth, alt: "Green Metallic VIP Gatehouse", label: "Green Metallic VIP Gatehouse", category: "VIP Access Gate" })}
            >
              <img src={galleryGreenVipBooth} alt="Green Metallic VIP Gatehouse" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">VIP Access Gate</span>
                <p className="text-white font-display font-bold text-base">Green Metallic VIP Gatehouse</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 17 - Dark Wood Luxury Cabin */}
            <div
              className="group relative overflow-hidden rounded-3xl shadow-elegant cursor-pointer h-72"
              onClick={() => setLightbox({ src: galleryDarkwoodCabin, alt: "Dark Wood & Chrome Luxury Cabin", label: "Dark Wood & Chrome Luxury Cabin", category: "Luxury Fit-Out" })}
            >
              <img src={galleryDarkwoodCabin} alt="Dark Wood & Chrome Luxury Cabin" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Luxury Fit-Out</span>
                <p className="text-white font-display font-bold text-base">Dark Wood Luxury Cabin</p>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* OUR CUSTOMERS */}
      <Section id="customers" className="bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Our Customers</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Trusted by leading organizations</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">We proudly serve government, municipal, aviation, and infrastructure leaders across the GCC.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
            {[
              { img: clientKuwaitGovt, name: "Kuwait Government" },
              { img: clientDubaiCustoms, name: "Dubai Customs" },
              { img: clientQatarMunicipality, name: "Qatar Municipality" },
              { img: clientMuscatMunicipality, name: "Muscat Municipality" },
              { img: clientEtihadRail, name: "Etihad Rail" },
              { img: clientAjmanFreeZone, name: "Ajman Free Zone" },
              { img: clientDubaiAmbulance, name: "Dubai Ambulance Services" },
              { img: clientEmiratesAirlines, name: "Emirates Airlines" },
              { img: clientUniversitySharjah, name: "University of Sharjah" },
              { img: clientAdPortsGroup, name: "AD Ports Group" },
              { img: clientDubaiPolice, name: "Dubai Police" },
              { img: clientAbuDhabiPolice, name: "Abu Dhabi Police" },
              { img: clientDpWorld, name: "DP World" },
              { img: clientSharjahMunicipality, name: "Sharjah Municipality" },
              { img: clientDubaiMunicipality, name: "Dubai Municipality" },
            ].map((c, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl shadow-card border border-border/40 w-full h-28 flex items-center justify-center hover:scale-105 transition-smooth">
                <img src={c.img} alt={c.name} className="max-h-20 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* QUALITY PROCESS */}
      <Section id="process" className="bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Quality Process</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Six steps to handover</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-3xl bg-card shadow-card border border-border/50 hover:border-primary transition-smooth"
              >
                <div className="text-6xl font-display font-bold text-primary/10 absolute top-4 right-6">{s.n}</div>
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 shadow-glow">
                  <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>


      {/* CERTIFICATIONS */}
      <Section id="certifications" className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">Certifications</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Certified. Compliant. Trusted.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["ISO 9001", "Quality Certified", "Safety Standards", "UAE Regulations", "Industry Compliance"].map((c) => (
              <div key={c} className="glass-dark p-8 rounded-2xl text-center hover:border-accent transition-smooth">
                <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                <div className="font-display font-semibold text-sm">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faqs">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Questions? We've got answers.</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none bg-card rounded-2xl px-6 shadow-card">
                <AccordionTrigger className="text-left font-display font-semibold text-lg hover:no-underline hover:text-primary py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA STRIP */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="blob w-96 h-96 bg-accent top-0 right-0 opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-3">Ready to start your project?</h2>
              <p className="text-primary-foreground/80">Get a free, no-obligation quote within 24 hours.</p>
            </div>
            <div className="flex gap-3">
              <a href="tel:+971551000148" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-foreground font-semibold hover:bg-white transition-smooth">
                Request Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAP + CONTACT */}
      <Section id="contact-map" className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="rounded-3xl overflow-hidden shadow-elegant h-[500px]">
              <iframe
                title="First Cabin location"
                src="https://maps.google.com/maps?q=Industrial+Area+Dubai+United+Arab+Emirates&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="p-10 rounded-3xl gradient-primary text-primary-foreground shadow-elegant flex flex-col justify-center">
              <SectionLabel>Visit Us</SectionLabel>
              <h3 className="font-display font-bold text-3xl mb-6">First Cabin<br />General Trading LLC</h3>
              <div className="space-y-4 text-primary-foreground/90">
                <div className="flex gap-3"><MapPin className="w-5 h-5 shrink-0 mt-1 text-accent" /><div>Industrial Area<br />Dubai, United Arab Emirates</div></div>
                <div className="flex gap-3"><Phone className="w-5 h-5 shrink-0 mt-1 text-accent" /><a href="tel:+971551000148" className="hover:text-accent">+971 55 100 0148</a></div>
                <div className="flex gap-3"><Star className="w-5 h-5 shrink-0 mt-1 text-accent fill-accent" /><span>4.7 / 5 · 33+ Google reviews</span></div>
              </div>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold w-fit shadow-glow hover:scale-105 transition-smooth">
                Send Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* LIGHTBOX MODAL */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-smooth"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest mb-1">
                {lightbox.category}
              </span>
              <p className="text-white font-display font-bold text-xl">{lightbox.label}</p>
            </div>
          </div>
        </div>
      )}

      {/* QUOTE REQUEST MODAL WITH SECURITY CABIN REFERENCE GALLERY */}
      {quoteProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" onClick={() => setQuoteProduct(null)}>
          <div
            className={`relative bg-card rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50 w-full max-h-[90vh] overflow-y-auto animate-scaleUp ${
              quoteProduct === "Security Cabins" ? "max-w-5xl" : "max-w-xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuoteProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground">Quote sent successfully</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Thank you! Our engineering team will review your requirements for {quoteProduct} and reach out within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setQuoteProduct(null)}
                    className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-smooth"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-2">Quote Request</span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">Request Quote for {quoteProduct}</h2>
                </div>

                <div className={quoteProduct === "Security Cabins" ? "grid lg:grid-cols-2 gap-8 items-start" : "block"}>
                  {/* FORM */}
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setQuoteLoading(true);
                      const fd = new FormData(e.currentTarget);
                      let msg = (fd.get("message") as string) || "";
                      if (quoteProduct === "Security Cabins" && selectedRefModel) {
                        msg = `[Reference Model: ${selectedRefModel}]\n` + msg;
                      }

                      const refObj = securityCabinReferences.find(r => r.title === selectedRefModel);
                      const refImageUrl = (quoteProduct === "Security Cabins" && refObj) ? refObj.rawUrl : "";

                      try {
                        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            service_id: "service_ixle0hv",
                            template_id: "template_gdpmz1s",
                            user_id: "HGjLQzBmXRvt6OzWU",
                            template_params: {
                              from_name: fd.get("name"),
                              from_email: fd.get("email"),
                              phone: fd.get("phone"),
                              company: fd.get("company") || "N/A",
                              project_type: quoteProduct,
                              message: msg,
                              selected_model: selectedRefModel || "N/A",
                              reference_image_url: refImageUrl,
                            },
                          }),
                        });
                        setQuoteSent(true);
                      } catch (err) {
                        console.error(err);
                        setQuoteSent(true);
                      } finally {
                        setQuoteLoading(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Full Name *</label>
                      <input type="text" name="name" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Phone *</label>
                        <input type="tel" name="phone" required placeholder="+971 …" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Email *</label>
                        <input type="email" name="email" required placeholder="you@company.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Company Name</label>
                      <input type="text" name="company" placeholder="Your company" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Project Requirements *</label>
                      <textarea name="message" required rows={3} placeholder="Colour, Length, Width..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" />
                    </div>
                    <button type="submit" disabled={quoteLoading} className="w-full py-4 rounded-full gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-smooth disabled:opacity-50 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> {quoteLoading ? "Sending…" : "Submit Quote Request"}
                    </button>
                  </form>

                  {/* SECURITY CABIN CUSTOMER REFERENCE IMAGES PANEL (ONLY FOR SECURITY CABINS) */}
                  {quoteProduct === "Security Cabins" && (
                    <div className="p-5 rounded-2xl bg-muted/40 border border-primary/20 space-y-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary shrink-0" />
                        <h3 className="font-display font-bold text-base text-foreground">Reference Models (Customer Reference Only)</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Below are reference designs for Security Cabins. Click any model image to attach it to your quote request:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {securityCabinReferences.map((ref) => (
                          <div
                            key={ref.id}
                            onClick={() => {
                              setSelectedRefModel(ref.title);
                            }}
                            className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-smooth bg-card shadow-sm ${
                              selectedRefModel === ref.title ? "border-primary ring-2 ring-primary/20" : "border-border/60 hover:border-primary/50"
                            }`}
                          >
                            <div className="h-32 relative overflow-hidden">
                              <img src={ref.img} alt={ref.title} className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRefLightboxImg({ src: ref.img, title: ref.title });
                                }}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-primary transition-smooth"
                                title="Full Screen Preview"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                              {selectedRefModel === ref.title && (
                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary text-[10px] text-primary-foreground font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Selected
                                </span>
                              )}
                            </div>
                            <div className="p-2.5">
                              <div className="font-display font-semibold text-xs text-foreground line-clamp-1">{ref.title}</div>
                              <div className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{ref.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REFERENCE LIGHTBOX */}
      {refLightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4" onClick={() => setRefLightboxImg(null)}>
          <div className="relative max-w-4xl w-full bg-card rounded-3xl p-4 overflow-hidden border border-border/50" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 px-2">
              <h3 className="font-display font-bold text-lg text-foreground">{refLightboxImg.title}</h3>
              <button onClick={() => setRefLightboxImg(null)} className="p-2 rounded-full hover:bg-muted transition-smooth"><X className="w-5 h-5" /></button>
            </div>
            <img src={refLightboxImg.src} alt={refLightboxImg.title} className="w-full max-h-[75vh] object-contain rounded-2xl" />
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

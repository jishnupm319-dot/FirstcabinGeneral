import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SiteHeader />
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-8xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

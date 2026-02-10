import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl gradient-primary mb-8 shadow-2xl shadow-primary/30">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-7xl font-bold font-heading gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This page doesn't exist</p>
        <Button asChild className="rounded-xl gradient-primary text-white shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
          <a href="/">Return to Home</a>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-primary font-bold uppercase tracking-[0.2em] text-sm block mb-2"
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold uppercase tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`h-1 w-24 bg-primary mt-4 ${centered ? "mx-auto" : ""}`} 
      />
    </div>
  );
}

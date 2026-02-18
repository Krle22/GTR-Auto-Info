import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-secondary/30 border-secondary hover:border-primary/50 transition-colors duration-300 group overflow-hidden relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="p-8 relative z-10 flex flex-col items-start gap-4">
          <div className="w-14 h-14 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );
}

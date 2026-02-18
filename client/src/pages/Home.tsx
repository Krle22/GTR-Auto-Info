import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { 
  Wrench, 
  Gauge, 
  Car, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const mutation = useCreateInquiry();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop",
      alt: "Supercar in workshop",
      caption: "Precision Tuning"
    },
    {
      url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop",
      alt: "Mechanic working on engine",
      caption: "Expert Mechanics"
    },
    {
      url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&h=800&fit=crop",
      alt: "Car detailing",
      caption: "Premium Detailing"
    },
    {
      url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=800&fit=crop",
      alt: "Vintage car restoration",
      caption: "Restoration Projects"
    },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* Hero background image - sports car */}
          <img 
            src="https://images.unsplash.com/photo-1503376763036-066120622c74?w=1920&h=1080&fit=crop" 
            alt="Hero Car" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-primary/50 bg-primary/10 text-primary uppercase tracking-widest text-sm font-bold mb-6 backdrop-blur-sm rounded-sm">
              Premium Auto Workshop
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter mb-6">
              Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Redefined</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 font-light leading-relaxed">
              Specialized care for high-performance vehicles. From precision tuning to comprehensive diagnostics, we elevate your driving experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollLink to="contact" smooth={true} duration={500}>
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-none skew-x-[-12deg] group">
                  <span className="skew-x-[12deg] flex items-center gap-2">
                    Schedule Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </ScrollLink>
              <ScrollLink to="services" smooth={true} duration={500}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 border-white/20 hover:bg-white/10 text-white rounded-none skew-x-[-12deg]">
                  <span className="skew-x-[12deg]">Our Services</span>
                </Button>
              </ScrollLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="Built for Speed" subtitle="Who We Are" />
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                At GTR Auto, we understand that your vehicle is more than just a machine—it's an extension of your personality and passion. Our state-of-the-art facility is equipped with the latest diagnostic technology and staffed by certified master technicians.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Founded by racing enthusiasts, we bring track-level precision to street maintenance. Whether it's a routine oil change for your daily driver or a complete engine rebuild for your project car, we treat every vehicle with the respect it deserves.
              </p>
              
              <ul className="space-y-4">
                {[
                  "ASE Certified Master Technicians",
                  "Advanced Computer Diagnostics",
                  "Performance Tuning & Upgrades",
                  "24/12 Month Warranty on Parts & Labor"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="uppercase tracking-wide font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 z-0" />
              {/* Workshop interior image */}
              <img 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=1000&fit=crop" 
                alt="Workshop Interior" 
                className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 md:py-32 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Expertise" subtitle="What We Do" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              index={0}
              icon={Wrench}
              title="Maintenance"
              description="Comprehensive routine care including oil changes, fluid flushes, and filter replacements to keep your engine running smoothly."
            />
            <ServiceCard 
              index={1}
              icon={Gauge}
              title="Performance Tuning"
              description="ECU remapping, dyno tuning, and performance upgrades to unlock the full potential of your vehicle's power train."
            />
            <ServiceCard 
              index={2}
              icon={Car}
              title="Diagnostics"
              description="Advanced computer diagnostics to accurately identify and resolve check engine lights and complex electrical issues."
            />
            <ServiceCard 
              index={3}
              icon={Settings}
              title="Major Repairs"
              description="From transmission rebuilds to suspension overhauls, our master mechanics handle complex mechanical repairs with precision."
            />
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 md:py-32 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <SectionHeading title="The Showroom" subtitle="Recent Work" />
        </div>
        
        <div className="embla" ref={emblaRef}>
          <div className="flex">
            {galleryImages.map((image, index) => (
              <div className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33%] min-w-0 pl-4 relative group" key={index}>
                <div className="aspect-[16/10] overflow-hidden relative border-b-4 border-primary">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2 inline-block">Project</span>
                    <h3 className="text-2xl font-bold text-white uppercase italic">{image.caption}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get In Touch" subtitle="Book an Appointment" centered />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Contact Info & Map */}
            <div className="space-y-8">
              <Card className="bg-secondary/20 border-border p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <MapPin className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">Visit Us</h3>
                      <p className="text-gray-400">123 Speed Street<br />Automotive District, NY 10012</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Phone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">Call Us</h3>
                      <p className="text-gray-400">+1 (555) 123-4567<br />Mon-Fri, 8am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Mail className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">Email</h3>
                      <p className="text-gray-400">service@gtrauto.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Clock className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">Hours</h3>
                      <p className="text-gray-400">Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Map Placeholder */}
              <div className="w-full h-[250px] bg-secondary/30 border border-border rounded-lg flex items-center justify-center relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop" 
                  alt="Map Location" 
                  className="w-full h-full object-cover opacity-50" 
                />
                <div className="absolute bg-background/90 px-4 py-2 border border-primary text-primary font-bold uppercase tracking-wider text-sm">
                  Google Maps Placeholder
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border p-8 rounded-lg shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-10 -mt-10" />
               
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background border-input h-12 focus:border-primary transition-colors" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-background border-input h-12 focus:border-primary transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} className="bg-background border-input h-12 focus:border-primary transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your vehicle and what service you need..." 
                            className="resize-none bg-background border-input min-h-[120px] focus:border-primary transition-colors" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest h-14 text-lg skew-x-[-12deg] mt-4"
                  >
                    <span className="skew-x-[12deg]">
                      {mutation.isPending ? "Sending..." : "Submit Inquiry"}
                    </span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary skew-x-[-12deg] flex items-center justify-center">
              <Wrench className="text-white w-4 h-4 skew-x-[12deg]" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase text-white">
              GTR <span className="text-primary">Auto</span>
            </span>
          </div>
          
          <p className="text-gray-500 text-sm uppercase tracking-wide text-center md:text-right">
            © {new Date().getFullYear()} GTR Auto Workshop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

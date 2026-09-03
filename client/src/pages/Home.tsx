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
import { useLanguage } from "@/lib/LanguageContext";
import headerImage from "@assets/DSC_0155.JPG";
import liftsImage from "@assets/Dvostubne dizalice slika 1.jpeg";
import img5779 from "@assets/IMG_5779_1783440568480.jpeg";
import img5787 from "@assets/IMG_5787_1783440568505.jpeg";
import imgOffice from "@assets/ChatGPT_Image_Jul_7,_2026,_06_07_08_PM_1783440568505.png";
import { 
  Wrench, 
  Car, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck
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
  const { t } = useLanguage();

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
      url: headerImage,
      alt: "GTR Auto",
      caption: "GTR Auto"
    },
    {
      url: liftsImage,
      alt: "Dvostubne dizalice",
      caption: "Radionica"
    },
    {
      url: img5779,
      alt: "GTR Auto exterior",
      caption: "GTR Auto"
    },
    {
      url: img5787,
      alt: "GTR Auto aerial view",
      caption: "Naša lokacija"
    },
    {
      url: imgOffice,
      alt: "GTR Auto office",
      caption: "Recepcija"
    },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={headerImage}
            alt="GTR Auto Workshop" 
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-primary/50 bg-primary/10 text-primary uppercase tracking-widest text-sm font-bold mb-6 backdrop-blur-sm rounded-sm">
              {t("hero.badge")}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter mb-6 text-white">
              {t("hero.title")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t("hero.title2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 font-light leading-relaxed">
              {t("hero.desc")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollLink to="contact" smooth={true} duration={500}>
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-none skew-x-[-12deg] group">
                  <span className="skew-x-[12deg] flex items-center gap-2">
                    {t("hero.button.schedule")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </ScrollLink>
              <ScrollLink to="services" smooth={true} duration={500}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 border-white/20 hover:bg-white/10 text-white rounded-none skew-x-[-12deg]">
                  <span className="skew-x-[12deg]">{t("hero.button.services")}</span>
                </Button>
              </ScrollLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title={t("about.title")} subtitle={t("about.subtitle")} />
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                {t("about.desc1")}
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {t("about.desc2")}
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  t("about.check1"),
                  t("about.check2"),
                  t("about.check3"),
                  t("about.check4")
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="uppercase tracking-wide font-medium text-sm">{item}</span>
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
              <img 
                src={liftsImage}
                alt="GTR Auto Workshop Interior" 
                className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 md:py-32 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("services.title")} subtitle={t("services.subtitle")} centered />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              index={0}
              icon={Wrench}
              title={t("services.maint.title")}
              description={t("services.maint.desc")}
            />
            <ServiceCard 
              index={1}
              icon={ShieldCheck}
              title={t("services.brakes.title")}
              description={t("services.brakes.desc")}
            />
            <ServiceCard 
              index={2}
              icon={Car}
              title={t("services.diag.title")}
              description={t("services.diag.desc")}
            />
            <ServiceCard 
              index={3}
              icon={Settings}
              title={t("services.repair.title")}
              description={t("services.repair.desc")}
            />
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 md:py-32 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <SectionHeading title={t("gallery.title")} subtitle={t("gallery.subtitle")} />
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
          <SectionHeading title={t("contact.title")} subtitle={t("contact.subtitle")} centered />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="space-y-8">
              <Card className="bg-secondary/20 border-border p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <MapPin className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">{t("contact.visit")}</h3>
                      <a href="https://www.google.com/maps/place/GTR+Auto/@44.7454368,20.4252399,724m/data=!3m2!1e3!4b1!4m6!3m5!1s0x475a71007bf0d46b:0xc2e000274350b56f!8m2!3d44.7454368!4d20.4278148!16s%2Fg%2F11y69hwc91?entry=ttu&g_ep=EgoyMDI2MDkwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">GTR Auto, Beograd</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Phone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">{t("contact.call")}</h3>
                      <a href="tel:+381641105034" className="text-gray-400 hover:text-primary transition-colors">+381 64 1105034</a>
                      <p className="text-gray-500 text-sm">{t("contact.hours.phone")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Mail className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">{t("contact.email")}</h3>
                      <a href="mailto:sasa@autocentargtr.com" className="text-gray-400 hover:text-primary transition-colors">sasa@autocentargtr.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Clock className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-1">{t("contact.hours")}</h3>
                      <p className="text-gray-400">{t("contact.hours.weekdays")}<br />{t("contact.hours.sunday")}</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="w-full h-[300px] border border-border rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1605!2d20.4252399!3d44.7454368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a71007bf0d46b%3A0xc2e000274350b56f!2sGTR%20Auto!5e0!3m2!1sen!2srs!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GTR Auto Location"
                />
              </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-lg shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-10 -mt-10" />
               
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">{t("contact.form.name")}</FormLabel>
                        <FormControl>
                          <Input placeholder="Marko Marković" {...field} className="bg-background border-input h-12 focus:border-primary transition-colors" />
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
                          <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">{t("contact.form.email")}</FormLabel>
                          <FormControl>
                            <Input placeholder="marko@email.com" {...field} className="bg-background border-input h-12 focus:border-primary transition-colors" />
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
                          <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">{t("contact.form.phone")}</FormLabel>
                          <FormControl>
                            <Input placeholder="+381 60 123 4567" {...field} className="bg-background border-input h-12 focus:border-primary transition-colors" />
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
                        <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-400">{t("contact.form.message")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="..." 
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
                      {mutation.isPending ? t("contact.form.sending") : t("contact.form.submit")}
                    </span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

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
            © {new Date().getFullYear()} GTR Auto. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}

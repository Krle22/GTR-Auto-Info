import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "sr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.book": "Book Now",
    "hero.badge": "Professional Auto Workshop",
    "hero.title": "Service",
    "hero.title2": "You Can Trust",
    "hero.desc": "Expert maintenance and repairs for all vehicle makes and models. We keep you moving safely on the road.",
    "hero.button.schedule": "Schedule Service",
    "hero.button.services": "Our Services",
    "about.subtitle": "Who We Are",
    "about.title": "Reliable Car Care",
    "about.desc1": "At GTR Auto, we provide honest and professional automotive services. Our workshop is equipped to handle everything from routine maintenance to complex mechanical repairs.",
    "about.desc2": "With years of experience, our team of skilled mechanics ensures your vehicle receives the best possible care using quality parts and modern diagnostic tools.",
    "about.check1": "Experienced Mechanics",
    "about.check2": "Modern Diagnostics",
    "about.check3": "Quality Spare Parts",
    "about.check4": "Service Warranty",
    "services.subtitle": "What We Do",
    "services.title": "Our Services",
    "services.maint.title": "Maintenance",
    "services.maint.desc": "Regular oil changes, filters, and fluid checks to extend your vehicle's life.",
    "services.brakes.title": "Brakes & Suspension",
    "services.brakes.desc": "Complete safety checks and repairs for your braking system and suspension.",
    "services.diag.title": "Diagnostics",
    "services.diag.desc": "Precise error detection using the latest computer diagnostic equipment.",
    "services.repair.title": "Mechanical Repairs",
    "services.repair.desc": "Expert engine, transmission, and drivetrain repairs for all car brands.",
    "gallery.subtitle": "Our Work",
    "gallery.title": "Workshop Gallery",
    "contact.subtitle": "Book an Appointment",
    "contact.title": "Get In Touch",
    "contact.visit": "Visit Us",
    "contact.call": "Call Us",
    "contact.email": "Email",
    "contact.hours": "Hours",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone (Optional)",
    "contact.form.message": "Message",
    "contact.form.submit": "Submit Inquiry",
    "contact.form.sending": "Sending...",
    "footer.rights": "All rights reserved.",
    "toast.success.title": "Inquiry Sent",
    "toast.success.desc": "We'll get back to you shortly.",
  },
  sr: {
    "nav.about": "O nama",
    "nav.services": "Usluge",
    "nav.gallery": "Galerija",
    "nav.contact": "Kontakt",
    "nav.book": "Zakažite",
    "hero.badge": "Profesionalni auto servis",
    "hero.title": "Servis",
    "hero.title2": "Kome verujete",
    "hero.desc": "Stručno održavanje i popravke za sve marke i modele vozila. Čuvamo vašu bezbednost na putu.",
    "hero.button.schedule": "Zakažite termin",
    "hero.button.services": "Naše usluge",
    "about.subtitle": "Ko smo mi",
    "about.title": "Pouzdano održavanje",
    "about.desc1": "U GTR Auto pružamo poštenu i profesionalnu uslugu. Naša radionica je opremljena za sve, od rutinskog održavanja do složenih mehaničkih popravki.",
    "about.desc2": "Sa dugogodišnjim iskustvom, naš tim stručnih mehaničara osigurava da vaše vozilo dobije najbolju moguću negu uz korišćenje kvalitetnih delova.",
    "about.check1": "Iskusni mehaničari",
    "about.check2": "Moderna dijagnostika",
    "about.check3": "Kvalitetni rezervni delovi",
    "about.check4": "Garancija na rad",
    "services.subtitle": "Šta radimo",
    "services.title": "Naše usluge",
    "services.maint.title": "Održavanje",
    "services.maint.desc": "Redovna zamena ulja, filtera i provera tečnosti za duži vek vašeg vozila.",
    "services.brakes.title": "Kočnice i oslanjanje",
    "services.brakes.desc": "Kompletna provera bezbednosti i popravka kočionog sistema i trapa.",
    "services.diag.title": "Dijagnostika",
    "services.diag.desc": "Precizno otkrivanje kvarova pomoću najnovije kompjuterske dijagnostike.",
    "services.repair.title": "Mehaničke popravke",
    "services.repair.desc": "Stručne popravke motora, menjača i prenošenja snage za sve brendove.",
    "gallery.subtitle": "Naš rad",
    "gallery.title": "Galerija radionice",
    "contact.subtitle": "Zakažite termin",
    "contact.title": "Kontaktirajte nas",
    "contact.visit": "Posetite nas",
    "contact.call": "Pozovite nas",
    "contact.email": "Email",
    "contact.hours": "Radno vreme",
    "contact.form.name": "Ime i prezime",
    "contact.form.email": "Email adresa",
    "contact.form.phone": "Telefon (opciono)",
    "contact.form.message": "Poruka",
    "contact.form.submit": "Pošalji upit",
    "contact.form.sending": "Slanje...",
    "footer.rights": "Sva prava zadržana.",
    "toast.success.title": "Upit poslat",
    "toast.success.desc": "Javićemo vam se ubrzo.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("sr");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

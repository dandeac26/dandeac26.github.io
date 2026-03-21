import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "dandeac26@gmail.com",
    href: "mailto:dandeac26@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "dan-cristian-deac",
    href: "https://www.linkedin.com/in/dan-cristian-deac",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "dandeac26",
    href: "https://github.com/dandeac26",
  },
];

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-surface-dim transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-heading mb-10"
        >
          Contact
        </motion.h2>

        <div className="max-w-md mx-auto space-y-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="text-sm font-medium text-heading">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;

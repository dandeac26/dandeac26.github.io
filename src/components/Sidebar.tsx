import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
  FolderOpen,
  Heart,
  User,
  BookOpen,
  Send,
  Palette,
  ChevronDown,
  CodeXml,
} from "lucide-react";

// Set to true to show the accent color picker (developer mode only)
const SHOW_PROFILE_PICKER = false;
import { useTheme } from "../context/ThemeContext";
import { profiles } from "../data/profiles";

const navItems = [
  { id: "portfolio", label: "Portfolio", icon: FolderOpen },
  { id: "volunteering", label: "Volunteering", icon: Heart },
  { id: "about", label: "About Me", icon: User },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Send },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/dan-cristian-deac",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://github.com/dandeac26", icon: Github, label: "GitHub" },
  { href: "mailto:dandeac26@gmail.com", icon: Mail, label: "Email" },
];

const Sidebar: React.FC = () => {
  const { isDark, toggleTheme, profileId, setProfileId } = useTheme();
  const [activeSection, setActiveSection] = useState("portfolio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentProfile =
    profiles.find((p) => p.id === profileId) ?? profiles[0];

  const sidebarContent = (
    <>
      {/* Logo / Avatar */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center mb-3">
          <CodeXml size={28} className="text-accent" />
        </div>
        <h1 className="text-sidebar-text text-lg font-semibold">
          Dan Cristian Deac
        </h1>
        <p className="text-sidebar-muted text-sm">Software Engineer</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-accent-soft text-accent font-medium"
                      : "text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Socials + Theme + Profile */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sidebar-muted hover:text-sidebar-text transition-colors"
                aria-label={link.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover transition-all text-sm cursor-pointer mb-2"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Profile Selector — hidden by default, enable via SHOW_PROFILE_PICKER */}
        {SHOW_PROFILE_PICKER && (
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover transition-all text-sm cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Palette size={16} />
                <span>{currentProfile.name}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: currentProfile.swatch }}
                />
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 right-0 mb-1 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-10"
                >
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setProfileId(p.id);
                        setProfileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        p.id === profileId
                          ? "text-accent font-medium bg-accent-soft"
                          : "text-body hover:bg-hover"
                      }`}
                    >
                      <span>{p.name}</span>
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: p.swatch }}
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-sidebar border-r border-border flex-col z-50 transition-colors">
        {sidebarContent}
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-sidebar border-b border-border flex items-center justify-between px-4 z-50 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
            <CodeXml size={16} className="text-accent" />
          </div>
          <span className="text-sidebar-text font-semibold text-sm">
            Dan Cristian Deac
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-sidebar-text p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-sidebar border-r border-border flex flex-col z-50 transition-colors"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

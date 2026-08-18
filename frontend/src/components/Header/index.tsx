import { Landmark, Menu, X, Languages } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      setIsMobilePortrait(isMobile && isPortrait);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('orientationchange', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
    };
  }, []);

  const navLinkClass = ({ isActive, hovered }: { isActive: boolean; hovered: boolean }) =>
  ({
    color: hovered ? 'hsl(var(--primary))' : (isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'),
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    position: 'relative' as const,
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  });

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  ({
    display: 'block',
    padding: '16px 24px',
    fontSize: 16,
    fontWeight: 500,
    color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
    textDecoration: 'none',
    borderBottom: '1px solid hsl(var(--border) / 0.5)'
  });

  const navItems = [
    { to: "/about", labelKey: "nav.about" },
    { to: "/builds", labelKey: "nav.builds" },
    { to: "/guides", labelKey: "nav.guides" },
    { to: "/recruitment", labelKey: "nav.recruitment" },
    { to: "/calendar", labelKey: "nav.calendar" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brandLink}>
          <div className={styles.brandIconWrap}>
            <Landmark style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
            <div className={styles.brandIconGlow} />
          </div>
          <span className={styles.brandText}>
            L'Église d'Astralis
          </span>
        </NavLink>

        <nav className={styles.nav}>
          {!isMobilePortrait && navItems.map((item) => {
            const isHovered = hoveredNav === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => navLinkClass({ isActive, hovered: isHovered })}
                onMouseEnter={() => setHoveredNav(item.to)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {t(item.labelKey)}
                <span className={styles.underline} style={{ transform: isHovered ? 'scaleX(1)' : 'scaleX(0)' }} />
              </NavLink>
            );
          })}
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className={styles.languageButton}
            title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <Languages style={{ width: 20, height: 20 }} />
            <span className={styles.languageCode}>{language.toUpperCase()}</span>
          </Button>
          {isMobilePortrait && (
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X style={{ width: 24, height: 24 }} />
              ) : (
                <Menu style={{ width: 24, height: 24 }} />
              )}
            </Button>
          )}
        </nav>
      </div>

      {isMobilePortrait && (
        <div className={styles.mobilePanel} style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}>
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} style={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                {t(item.labelKey)}
              </NavLink>
            ))}
            <div className={styles.mobileLanguageButton}>
              <Button
                variant="ghost"
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className={styles.languageButton}
              >
                <Languages style={{ width: 20, height: 20 }} />
                <span>{language === 'fr' ? 'English' : 'Français'}</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

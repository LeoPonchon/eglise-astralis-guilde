import { Landmark, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.brandTitle}>
              <Landmark style={{ width: 24, height: 24, color: 'hsl(var(--primary))' }} />
              <span className={styles.brandName}>L'Église d'Astralis</span>
            </div>
            <p className={styles.brandDescription}>
              {t('footer.description')}
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.sectionTitle}>{t('footer.navigation')}</h4>
            <ul className={styles.links}>
              <li><a href="/about" className={styles.link}>{t('nav.about')}</a></li>
              <li><a href="/builds" className={styles.link}>{t('nav.builds')}</a></li>
              <li><a href="/guides" className={styles.link}>{t('nav.guides')}</a></li>
              <li><a href="/recruitment" className={styles.link}>{t('nav.recruitment')}</a></li>
              <li><a href="/calendar" className={styles.link}>{t('nav.calendar')}</a></li>
              <li><a href="/admin/login" className={styles.link} style={{ opacity: 0.5 }}>Admin</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.sectionTitle}>{t('footer.community')}</h4>
            <p className={styles.communityDesc}>
              {t('footer.community.desc')}
            </p>
            <Button
              variant="default"
              onClick={() => window.open('https://discord.gg/9k9JfWhhnq', '_blank')}
            >
              <Users style={{ width: 16, height: 16 }} />
              Discord
            </Button>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

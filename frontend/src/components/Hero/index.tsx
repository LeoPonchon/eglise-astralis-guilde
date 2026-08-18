import { Button } from "@/components/ui/Button";
import StarField from "@/components/StarField";
import { Landmark, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Hero.module.css";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <StarField variant="hero" />
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrap}>
            <Landmark style={{ width: 96, height: 96, color: 'hsl(var(--primary))', filter: 'drop-shadow(var(--glow-primary))' }} />
            <div className={styles.iconGlow} />
          </div>
        </div>
        <h1 className={styles.title}>
          {t('hero.title')}
        </h1>
        <p className={styles.subtitle}>
          {t('hero.subtitle')}
        </p>
        <p className={styles.description}>
          {t('hero.description')}
        </p>
        <div className={styles.buttons}>
          <Button
            variant="hero"
            size="lg"
            onClick={() => window.open('https://discord.gg/9k9JfWhhnq', '_blank')}
          >
            <Users style={{ width: 20, height: 20 }} />
            {t('hero.joinDiscord')}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => window.location.href = '/about'}>
            {t('hero.learnMore')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

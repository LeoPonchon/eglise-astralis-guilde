import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Shield, Trophy, Users, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./About.module.css";

const About = () => {
  const { t, language } = useLanguage();
  const DISCORD_TOTAL_MEMBERS = "8";
  const RAIDS_COMPLETED = "0";
  const SERVER_RANK = t('common.unknown');
  const GUILD_YEAR = "2025";

  const stats = [
    { icon: Users, label: t('about.stats.members'), value: DISCORD_TOTAL_MEMBERS },
    { icon: Trophy, label: t('about.stats.raids'), value: RAIDS_COMPLETED },
    { icon: Shield, label: t('about.stats.rank'), value: SERVER_RANK },
    { icon: Zap, label: t('about.stats.year'), value: GUILD_YEAR },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {t('about.title')}
          </h2>
          <div className={styles.introText}>
            <p className={styles.introTextPrimary}>
              <span className={styles.primaryAccent}>L'Église d'Astralis</span> {t('about.intro.primary')}
            </p>
            <p className={styles.introTextSecondary}>
              {t('about.intro.secondary')}
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center"
              style={{ padding: 24 }}
            >
              <div className={styles.statIconWrap}>
                <stat.icon style={{ width: 48, height: 48, margin: '0 auto', marginBottom: 12, color: 'hsl(var(--primary))', filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))' }} />
                <div className={styles.statIconGlow} />
              </div>
              <div className={styles.statValue}>
                {stat.value}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className={styles.cards}>
          <Card variant="primary" style={{ padding: 32 }}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBoxPrimary}>
                <Shield style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
              </div>
              <h3 className={styles.cardTitle}>{t('about.mission.title')}</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardTextPrimary}>
                {language === 'fr' ? (
                  <>Créer un groupe où chaque membre, qu'il soit <span className={styles.primaryAccent}>novice ou vétéran</span>, trouve sa place. On se concentre sur l'efficacité collective et la progression de la guilde.</>
                ) : (
                  <>Create a group where every member, whether <span className={styles.primaryAccent}>novice or veteran</span>, finds their place. We focus on collective efficiency and guild progression.</>
                )}
              </p>
              <p className={styles.cardTextSecondary}>
                {t('about.mission.secondary')}
              </p>
            </div>
          </Card>

          <Card variant="accent" style={{ padding: 32 }}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBoxAccent}>
                <Users style={{ width: 32, height: 32, color: 'hsl(var(--accent))' }} />
              </div>
              <h3 className={styles.cardTitle}>{t('about.values.title')}</h3>
            </div>
            <ul className={styles.valuesList}>
              {[
                { title: t('about.values.help'), desc: t('about.values.help.desc') },
                { title: t('about.values.passion'), desc: t('about.values.passion.desc') },
                { title: t('about.values.evolution'), desc: t('about.values.evolution.desc') },
                { title: t('about.values.respect'), desc: t('about.values.respect.desc') },
              ].map((value, i) => (
                <li key={i} className={styles.valueItem}>
                  <div className={styles.valueDot} />
                  <div>
                    <span className={styles.valueTitle}>{value.title}</span>
                    <p className={styles.valueDesc}>{value.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card variant="gradient" style={{ padding: 40, textAlign: 'center' }}>
          <h3 className={styles.ctaTitle}>
            {t('about.cta.title')}
          </h3>
          <p className={styles.ctaPrimaryText}>
            {t('about.cta.primary')}
          </p>
          <p className={styles.ctaSecondaryText}>
            {language === 'fr' ? (
              <>Que tu sois un vétéran ou que tu découvres le jeu, l'Église d'Astralis t'accueille. <span className={styles.primaryAccent}>Chacun apporte quelque chose</span>, et ensemble, on progresse plus vite.</>
            ) : (
              <>Whether you are a veteran or discovering the game, the Church of Astralis welcomes you. <span className={styles.primaryAccent}>Everyone brings something</span>, and together, we progress faster.</>
            )}
          </p>
        </Card>
      </div>
    </section>
  );
};

export default About;

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, CheckCircle2, Landmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Recruitment.module.css";

const Recruitment = () => {
  const { t } = useLanguage();

  const requirements = [
    t('recruitment.requirements.text'),
  ];

  const benefits = [
    t('recruitment.benefits.shop'),
    t('recruitment.benefits.fountain'),
    t('recruitment.benefits.training'),
    t('recruitment.benefits.quests'),
    t('recruitment.benefits.events'),
    t('recruitment.benefits.id'),
    t('recruitment.benefits.upgrade'),
    t('recruitment.benefits.daily'),
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {t('recruitment.title')}
          </h2>
          <p className={styles.description}>
            {t('recruitment.description')}
          </p>
        </div>

        <div className={styles.grid}>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Landmark style={{ width: 24, height: 24, color: 'hsl(var(--primary))' }} />
              <h3 className={styles.cardTitle}>{t('recruitment.requirements.title')}</h3>
            </div>
            <ul className={styles.requirements}>
              {requirements.map((req, index) => (
                <li key={index} className={styles.requirement}>
                  <CheckCircle2 style={{ width: 20, height: 20, color: 'hsl(var(--primary))', marginTop: 2, flexShrink: 0 }} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Users style={{ width: 24, height: 24, color: 'hsl(var(--accent))' }} />
              <h3 className={styles.cardTitle}>{t('recruitment.benefits.title')}</h3>
            </div>
            <ul className={styles.benefits}>
              {benefits.map((benefit, index) => (
                <li key={index} className={styles.benefit}>
                  <CheckCircle2 style={{ width: 20, height: 20, color: 'hsl(var(--accent))', marginTop: 2, flexShrink: 0 }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card variant="muted" className={styles.cta}>
          <h3 className={styles.ctaTitle}>{t('recruitment.cta.title')}</h3>
          <p className={styles.ctaDescription}>
            {t('recruitment.cta.description')}
          </p>
          <div className={styles.ctaButtons}>
            <Button
              variant="hero"
              size="lg"
              onClick={() => window.open('https://discord.gg/9k9JfWhhnq', '_blank')}
            >
              <Users style={{ width: 20, height: 20 }} />
              {t('recruitment.cta.join')}
            </Button>
          </div>
          <div className={styles.ctaBadges}>
            <Badge variant="outline">{t('recruitment.badge.open')}</Badge>
            <Badge variant="secondary">{t('recruitment.badge.allClasses')}</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Recruitment;

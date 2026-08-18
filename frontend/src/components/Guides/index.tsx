import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Star, Lock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Guides.module.css";

const Guides = () => {
  const { t } = useLanguage();
  const secretQuests = [
    {
      nameKey: "guides.secrets.quest1.name",
      locationKey: "guides.secrets.quest1.location",
      npc: "Amos",
      objectiveKey: "guides.secrets.quest1.objective",
      methodKey: "guides.secrets.quest1.method",
      rewardKey: "guides.secrets.quest1.reward",
      difficulty: t('guides.progression.level60.difficulty'),
      notesKey: "guides.secrets.quest1.notes"
    },
    {
      nameKey: "guides.secrets.quest2.name",
      locationKey: "guides.secrets.quest2.location",
      npc: "Kiki",
      objectiveKey: "guides.secrets.quest2.objective",
      methodKey: "guides.secrets.quest2.method",
      rewardKey: "guides.secrets.quest2.reward",
      difficulty: t('guides.progression.level60.difficulty'),
      notesKey: "guides.secrets.quest2.notes"
    },
  ];

  const guides = [
    {
      icon: TrendingUp,
      title: t('guides.progression.level60.title'),
      category: t('guides.progression.level60.category'),
      difficulty: t('guides.progression.level60.difficulty'),
      description: t('guides.progression.level60.description'),
      tips: [
        t('guides.progression.level60.tip1'),
        t('guides.progression.level60.tip2'),
        t('guides.progression.level60.tip3'),
        t('guides.progression.level60.tip4'),
      ]
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {t('guides.title')}
        </h2>
        <p className={styles.description}>
          {t('guides.description')}
        </p>

        <div className={styles.sectionDivider}>
          <div className={styles.sectionHeader}>
            <TrendingUp style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
            <h3 className={styles.sectionTitle}>{t('guides.progression.title')}</h3>
          </div>

          <div className={styles.guideGrid}>
            {guides.map((guide, index) => (
              <Card key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <guide.icon style={{ width: 32, height: 32, color: 'hsl(var(--accent))' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h3 className={styles.cardTitle}>{guide.title}</h3>
                      <Badge variant="secondary">{guide.difficulty}</Badge>
                    </div>
                    <p className={styles.cardDescription}>
                      {guide.description}
                    </p>
                  </div>
                </div>

                <div className={styles.tipsBox}>
                  <h4 className={styles.tipsTitle}>{t('guides.progression.level60.how')}</h4>
                  <ul className={styles.tipsList}>
                    {guide.tips.map((tip, i) => (
                      <li key={i} className={styles.tipItem}>
                        <span className={styles.tipCheck}>✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.sectionDivider}>
          <div className={styles.sectionHeader}>
            <MapPin style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
            <h3 className={styles.sectionTitle}>{t('guides.secrets.title')}</h3>
          </div>
          <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: 24 }}>
            {t('guides.secrets.description')}
          </p>

          <div className={styles.questGrid}>
            {secretQuests.map((quest, index) => (
              <Card key={index} className={styles.card}>
                <div className={styles.questCardHeader}>
                  <div className={styles.questIconBox}>
                    <MapPin style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h3 className={styles.cardTitle}>{t(quest.nameKey)}</h3>
                      <div className={styles.questBadges}>
                        {quest.difficulty && <Badge variant="secondary">{quest.difficulty}</Badge>}
                        <Badge variant="outline">{t('guides.secrets.badge')}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.infoBox}>
                  <div className={styles.infoGrid}>
                    <div>
                      <span className={styles.infoLabel}>📍 {t('guides.secrets.label.location')} : </span>
                      <span className={styles.infoText}>{t(quest.locationKey)}</span>
                    </div>
                    <div>
                      <span className={styles.infoLabel}>👤 {t('guides.secrets.label.npc')} : </span>
                      <span className={styles.infoText}>{quest.npc}</span>
                    </div>
                    <div>
                      <span className={styles.infoLabel}>🎯 {t('guides.secrets.label.objective')} : </span>
                      <span className={styles.infoText}>{t(quest.objectiveKey)}</span>
                    </div>
                    <div>
                      <span className={styles.infoLabel}>💡 {t('guides.secrets.label.method')} : </span>
                      <span className={styles.infoText}>{t(quest.methodKey)}</span>
                    </div>
                    <div>
                      <span className={styles.infoLabel}>⭐ {t('guides.secrets.label.reward')} : </span>
                      <span className={styles.reward}>{t(quest.rewardKey)}</span>
                    </div>
                  </div>
                </div>

                {quest.notesKey && (
                  <div className={styles.notesBox}>
                    <p className={styles.notesText}>
                      {t(quest.notesKey)}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guides;

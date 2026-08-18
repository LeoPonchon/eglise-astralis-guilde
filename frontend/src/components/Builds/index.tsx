import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sword, Shield, Wind, Target, Snowflake, Heart, Music } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Builds.module.css";

const Builds = () => {
  const { t } = useLanguage();
  const classes = [
    {
      icon: Shield,
      name: "Heavy Guardian",
      roleKey: "builds.roles.tank",
      descriptionKey: "builds.classes.heavyGuardian.description",
      specs: ["Earthfort", "Block"],
      tags: [
        { key: "builds.roles.tank" },
        { key: "builds.tags.defense" }
      ],
      link: "/builds/heavy-guardian"
    },
    {
      icon: Sword,
      name: "Stormblade",
      roleKey: "builds.roles.dps",
      descriptionKey: "builds.classes.stormblade.description",
      specs: ["Iaido Slash", "Moonstrike"],
      tags: [
        { key: "builds.roles.dps" },
        { key: "builds.tags.melee" }
      ],
      link: "/builds/stormblade"
    },
    {
      icon: Wind,
      name: "Wind Knight",
      roleKey: "builds.roles.dps",
      descriptionKey: "builds.classes.windKnight.description",
      specs: ["Vanguard", "Skyward"],
      tags: [
        { key: "builds.roles.dps" },
        { key: "builds.tags.mobile" }
      ],
      link: "/builds/wind-knight"
    },
    {
      icon: Target,
      name: "Marksman",
      roleKey: "builds.roles.dps",
      descriptionKey: "builds.classes.marksman.description",
      specs: ["Wildpack", "Falconry"],
      tags: [
        { key: "builds.roles.dps" },
        { key: "builds.tags.range" }
      ],
      link: "/builds/marksman"
    },
    {
      icon: Snowflake,
      name: "Frost Mage",
      roleKey: "builds.roles.dps",
      descriptionKey: "builds.classes.frostMage.description",
      specs: ["Icicle", "Frostbeam"],
      tags: [
        { key: "builds.roles.dps" },
        { key: "builds.tags.magic" }
      ],
      link: "/builds/frost-mage"
    },
    {
      icon: Heart,
      name: "Verdant Oracle",
      roleKey: "builds.roles.support",
      descriptionKey: "builds.classes.verdantOracle.description",
      specs: ["Smite", "Lifebind"],
      tags: [
        { key: "builds.roles.support" },
        { key: "builds.tags.healing" }
      ],
      link: "/builds/verdant-oracle"
    },
    {
      icon: Shield,
      name: "Shield Knight",
      roleKey: "builds.roles.tank",
      descriptionKey: "builds.classes.shieldKnight.description",
      specs: ["Recovery", "Shield"],
      tags: [
        { key: "builds.roles.tank" },
        { key: "builds.tags.survival" }
      ],
      link: "/builds/shield-knight"
    },
    {
      icon: Music,
      name: "Beat Performer",
      roleKey: "builds.roles.support",
      descriptionKey: "builds.classes.beatPerformer.description",
      specs: ["Dissonance", "Concerto"],
      tags: [
        { key: "builds.roles.support" },
        { key: "builds.tags.buff" }
      ],
      link: "/builds/beat-performer"
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {t('builds.title')}
        </h2>
        <p className={styles.description}>
          {t('builds.description')}
        </p>

        <div className={styles.grid}>
          {classes.map((cls, index) => (
            <NavLink key={index} to={cls.link} className={styles.cardLink}>
              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <cls.icon style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>
                      {cls.name}
                    </h3>
                    <p className={styles.cardRole}>{t(cls.roleKey)}</p>
                  </div>
                </div>

                <p className={styles.cardDescription}>{t(cls.descriptionKey)}</p>

                <div className={styles.tags}>
                  {cls.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{t(tag.key)}</Badge>
                  ))}
                </div>

                <div className={styles.specs}>
                  <h4 className={styles.specsTitle}>{t('builds.specs.title')}</h4>
                  <div className={styles.specsList}>
                    {cls.specs.map((spec, i) => (
                      <Badge key={i} variant="outline" style={{ fontSize: 12 }}>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Builds;

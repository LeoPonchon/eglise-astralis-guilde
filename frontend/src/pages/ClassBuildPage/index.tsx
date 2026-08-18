import { NavLink } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./ClassBuildPage.module.css";

interface Skill {
    name: string;
    category: string;
    description: string;
    usage: string;
    enhancement?: string;
}

interface Specialization {
    name: string;
    description?: string;
    playstyle?: string;
    stats?: any;
    equipment?: string[];
    skills?: string[] | Skill[];
    rotations?: string[];
    tips?: string[];
    bestSkills?: any;
    resources?: any;
    talentPriority?: string;
    gear?: any;
    modules?: string[];
    imagines?: any;
    consumables?: any;
    gems?: string;
    rotation?: string[];
    talents?: string[];
}

interface ClassData {
    name: string;
    role: string;
    description: string;
    icon: LucideIcon;
    specializations: Specialization[];
}

const ClassBuildPage = ({ classData }: { classData: ClassData }) => {
    const { t, language } = useLanguage();

    // Helper function to get translated content for spec data
    const getTranslatedContent = (classSlug: string, specName: string, field: string, value: string): string => {
        const translationKey = `builds.classes.${classSlug}.specs.${specName.toLowerCase().replace(/ /g, '')}.${field}`;
        const translated = t(translationKey);
        return translated !== translationKey ? translated : value;
    };

    // Get class slug from name
    const classSlug = classData.name.toLowerCase().replace(/ /g, '');

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.contentWrapper}>
                <div className={styles.container}>
                    <NavLink to="/builds">
                        <Button variant="ghost" className={styles.backButton}>
                            <ArrowLeft style={{ width: 16, height: 16, marginRight: 8 }} />
                            {t('builds.page.back')}
                        </Button>
                    </NavLink>

                    <div className={styles.header}>
                        <div className={styles.iconWrapper}>
                            <classData.icon style={{ width: 48, height: 48, color: 'hsl(var(--primary))' }} />
                        </div>
                        <div>
                            <h1 className={styles.title}>{classData.name}</h1>
                            <p className={styles.role}>
                                {classData.role.split(' ').map(word => {
                                    const roleKey = `builds.roles.${word.toLowerCase()}`;
                                    const translated = t(roleKey);
                                    return translated !== roleKey ? translated : word;
                                }).join(' ')}
                            </p>
                        </div>
                    </div>

                    <p className={styles.description}>
                        {t(`builds.classes.${classSlug}.description`) !== `builds.classes.${classSlug}.description`
                            ? t(`builds.classes.${classSlug}.description`)
                            : classData.description}
                    </p>

                    {classData.specializations && classData.specializations.length > 0 ? (
                        <Tabs defaultValue={classData.specializations[0].name}>
                            <TabsList className={styles.tabsList}>
                                {classData.specializations.map((spec) => (
                                    <TabsTrigger key={spec.name} value={spec.name}>
                                        {spec.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {classData.specializations.map((spec) => (
                                <TabsContent key={spec.name} value={spec.name}>
                                    {spec.description || spec.playstyle ? (
                                        <div className={styles.contentGrid}>
                                            {spec.description && (
                                                <Card className={styles.card}>
                                                    <h3 className={styles.cardTitle}>{spec.name}</h3>
                                                    <p className={styles.cardText}>
                                                        {getTranslatedContent(classSlug, spec.name, 'description', spec.description)}
                                                    </p>
                                                    {spec.playstyle && (
                                                        <div>
                                                            <h4 className={styles.sectionTitle}>{t('builds.page.playstyle')}:</h4>
                                                            <p className={styles.cardTextSmall}>
                                                                {getTranslatedContent(classSlug, spec.name, 'playstyle', spec.playstyle)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </Card>
                                            )}

                                            {/* Best Skills Loadout */}
                                            {spec.bestSkills && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.bestLoadout')}</h4>
                                                    <div className={styles.gridList}>
                                                        <div><strong>{t('builds.page.basicAtk')} :</strong> {spec.bestSkills.basic}</div>
                                                        <div><strong>{t('builds.page.skill')} :</strong> {spec.bestSkills.skill}</div>
                                                        <div><strong>{t('builds.page.ultimate')} :</strong> {spec.bestSkills.ultimate}</div>
                                                        {spec.bestSkills.mandatory && (
                                                            <div className={styles.mandatorySkills}>
                                                                <strong className={styles.mandatoryTitle}>{t('builds.page.mandatorySkills')} :</strong>
                                                                {spec.bestSkills.mandatory.map((skill: any, i: number) => {
                                                                    const skillDescKey = `builds.classes.${classSlug}.specs.${spec.name.toLowerCase().replace(/ /g, '')}.skills.mandatory.${i}.description`;
                                                                    return (
                                                                        <div key={i} className={styles.skillItem}>
                                                                            <strong>{t('builds.page.slot')} {skill.slot} - {skill.name} :</strong> {t(skillDescKey) !== skillDescKey ? t(skillDescKey) : skill.description}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                        {spec.bestSkills.flex && (
                                                            <div className={styles.mandatorySkills}>
                                                                <strong className={styles.mandatoryTitle}>{t('builds.page.flexSkills')} :</strong>
                                                                {spec.bestSkills.flex.map((skill: any, i: number) => {
                                                                    const skillDescKey = `builds.classes.${classSlug}.specs.${spec.name.toLowerCase().replace(/ /g, '')}.skills.flex.${i}.description`;
                                                                    return (
                                                                        <div key={i} className={styles.skillItem}>
                                                                            <strong>{t('builds.page.slot')} {skill.slot} - {skill.name} :</strong> {t(skillDescKey) !== skillDescKey ? t(skillDescKey) : skill.description}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Card>
                                            )}

                                            {/* Resources */}
                                            {spec.resources && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.resources')}</h4>
                                                    <div className={styles.sectionDetails}>
                                                        {Object.entries(spec.resources).map(([key, value]) => {
                                                            // Use translation for known resource names, fallback to formatted key
                                                            const resourceKey = `builds.page.resource.${key}`;
                                                            const displayName = t(resourceKey) !== resourceKey ? t(resourceKey) : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                                            const resourceDescKey = `builds.classes.${classSlug}.specs.${spec.name.toLowerCase().replace(/ /g, '')}.resources.${key}`;
                                                            const translatedDesc = t(resourceDescKey) !== resourceDescKey ? t(resourceDescKey) : value;
                                                            return (
                                                                <div key={key}><strong>{displayName} :</strong> {translatedDesc}</div>
                                                            );
                                                        })}
                                                    </div>
                                                </Card>
                                            )}

                                            {/* Skills Explained */}
                                            {spec.skills && spec.skills.length > 0 && Array.isArray(spec.skills) && typeof spec.skills[0] === 'object' && 'name' in spec.skills[0] && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.skillsExplained')}</h4>
                                                    <div className={styles.skillsList}>
                                                        {(spec.skills as Skill[]).map((skill, i) => (
                                                            <div key={i} className={styles.divider}>
                                                                <h5 style={{ fontWeight: 600 }}>{skill.name} <span style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>({skill.category})</span></h5>
                                                                <p style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', marginTop: 4 }}>{skill.description}</p>
                                                                <p style={{ fontSize: 14, marginTop: 4 }}><strong>{t('builds.page.usage')} :</strong> {skill.usage}</p>
                                                                {skill.enhancement && (
                                                                    <p style={{ fontSize: 14, marginTop: 4 }}><strong>{t('builds.page.enhancement')} :</strong> {skill.enhancement}</p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Card>
                                            )}

                                            {spec.skills && spec.skills.length > 0 && Array.isArray(spec.skills) && typeof spec.skills[0] === 'string' && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.mainSkills')}</h4>
                                                    <div className={styles.badgeContainer}>
                                                        {spec.skills.map((skill, i) => (
                                                            <Badge key={i} variant="outline" className={styles.badgeText}>
                                                                {skill as string}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </Card>
                                            )}

                                            {/* Talent Priority */}
                                            {spec.talentPriority && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.skillPriority')}</h4>
                                                    <p className={styles.cardTextSmall}>
                                                        {getTranslatedContent(classSlug, spec.name, 'talentPriority', spec.talentPriority)}
                                                    </p>
                                                </Card>
                                            )}

                                            {/* Talents */}
                                            {spec.talents && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.recommendedTalents')}</h4>
                                                    <div className={styles.badgeContainer}>
                                                        {spec.talents.map((talent, i) => (
                                                            <Badge key={i} variant="outline" className={styles.badgeText}>
                                                                {talent}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </Card>
                                            )}

                                            {/* Stats Priority */}
                                            {spec.stats && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.statsPriority')}</h4>
                                                    {spec.stats.priority && (
                                                        <p style={{ fontSize: 14, marginBottom: 12 }}><strong>{t('builds.page.order')} :</strong> {spec.stats.priority}</p>
                                                    )}
                                                    {spec.stats.details && (
                                                        <div className={styles.sectionDetails}>
                                                            {Object.entries(spec.stats.details).map(([stat, value]) => (
                                                                <div key={stat} style={{ fontSize: 14 }}>
                                                                    <strong>{stat} :</strong> {value as string}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </Card>
                                            )}

                                            {/* Equipment */}
                                            {spec.gear && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.equipment')}</h4>
                                                    {spec.gear.purpleStats && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.purpleStats')}</h5>
                                                            <div style={{ fontSize: 14, display: 'grid', gap: 4 }}>
                                                                <div><strong>{t('builds.page.armorSlots')} :</strong> {spec.gear.purpleStats.helmet}</div>
                                                                <div><strong>{t('builds.page.weaponsAccessories')} :</strong> {spec.gear.purpleStats.weapons}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {spec.gear.setGear && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.setGear')}</h5>
                                                            <div style={{ fontSize: 14, display: 'grid', gap: 4 }}>
                                                                <div><strong>{t('builds.page.twoPiece')} :</strong> {spec.gear.setGear['2-piece']}</div>
                                                                <div><strong>{t('builds.page.fourPiece')} :</strong> {spec.gear.setGear['4-piece']}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {spec.gear.classWeapon && (
                                                        <div style={{ fontSize: 14 }}>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.classWeapon')}</h5>
                                                            <div>{spec.gear.classWeapon}</div>
                                                        </div>
                                                    )}
                                                </Card>
                                            )}

                                            {/* Modules */}
                                            {spec.modules && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.bestModules')}</h4>
                                                    <ol className={styles.gridList}>
                                                        {spec.modules.map((module, i) => (
                                                            <li key={i} className={styles.listItem}>
                                                                <span className={styles.listNumber}>{i + 1}.</span>
                                                                <span>{module}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </Card>
                                            )}

                                            {/* Battle Imagines */}
                                            {spec.imagines && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.bestBattleImagines')}</h4>
                                                    {spec.imagines.topGold && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.topGoldImagines')}</h5>
                                                            {spec.imagines.topGold.map((imagine: any, i: number) => (
                                                                <div key={i} style={{ fontSize: 14, marginBottom: 8 }}>
                                                                    <strong>{imagine.name} :</strong> {imagine.description}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {spec.imagines.topPurple && (
                                                        <div>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.topPurpleImagines')}</h5>
                                                            {spec.imagines.topPurple.map((imagine: any, i: number) => (
                                                                <div key={i} style={{ fontSize: 14, marginBottom: 8 }}>
                                                                    <strong>{imagine.name} :</strong> {imagine.description}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </Card>
                                            )}

                                            {/* Consumables */}
                                            {spec.consumables && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.bestConsumables')}</h4>
                                                    {spec.consumables.culinary && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.culinary')}</h5>
                                                            <ul className={styles.tipsList}>
                                                                {spec.consumables.culinary.map((item: string, i: number) => (
                                                                    <li key={i} style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', display: 'flex', alignItems: 'flex-start' }}>
                                                                        <span style={{ marginRight: 8 }}>•</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {spec.consumables.alchemy && (
                                                        <div>
                                                            <h5 style={{ fontWeight: 600, marginBottom: 8 }}>{t('builds.page.alchemy')}</h5>
                                                            <ul className={styles.tipsList}>
                                                                {spec.consumables.alchemy.map((item: string, i: number) => (
                                                                    <li key={i} style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', display: 'flex', alignItems: 'flex-start' }}>
                                                                        <span style={{ marginRight: 8 }}>•</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </Card>
                                            )}

                                            {/* Gems */}
                                            {spec.gems && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.bestGems')}</h4>
                                                    <p className={styles.cardTextSmall}>{spec.gems}</p>
                                                </Card>
                                            )}

                                            {/* Rotation */}
                                            {spec.rotation && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.howToPlayRotation')}</h4>
                                                    <ol className={styles.gridList}>
                                                        {spec.rotation.map((rotation, i) => {
                                                            const rotationKey = `builds.classes.${classSlug}.specs.${spec.name.toLowerCase().replace(/ /g, '')}.rotation.${i}`;
                                                            return (
                                                                <li key={i} className={styles.listItem}>
                                                                    <span className={styles.listNumber}>{i + 1}.</span>
                                                                    <span>{t(rotationKey) !== rotationKey ? t(rotationKey) : rotation}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ol>
                                                </Card>
                                            )}

                                            {spec.rotations && spec.rotations.length > 0 && (
                                                <Card className={styles.card}>
                                                    <h4 className={styles.cardSubtitle}>{t('builds.page.rotation')}</h4>
                                                    <ol className={styles.gridList}>
                                                        {spec.rotations.map((rotation, i) => {
                                                            const rotationKey = `builds.classes.${classSlug}.specs.${spec.name.toLowerCase().replace(/ /g, '')}.rotations.${i}`;
                                                            return (
                                                                <li key={i} className={styles.listItem}>
                                                                    <span className={styles.listNumber}>{i + 1}.</span>
                                                                    <span>{t(rotationKey) !== rotationKey ? t(rotationKey) : rotation}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ol>
                                                </Card>
                                            )}

                                            {spec.tips && spec.tips.length > 0 && (
                                                <Card className={styles.tipsCard}>
                                                    <h4 className={styles.tipsTitle}>{t('builds.page.gameplayTips')}</h4>
                                                    <ul className={styles.tipsList}>
                                                        {spec.tips.map((tip, i) => (
                                                            <li key={i} className={styles.tipsItem}>
                                                                <span className={styles.tipsIcon}>💡</span>
                                                                <span>{tip}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Card>
                                            )}
                                        </div>
                                    ) : (
                                        <Card className={styles.emptyCard}>
                                            <p className={styles.emptyText}>
                                                {t('builds.page.noBuildInfo')}
                                            </p>
                                        </Card>
                                    )}
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <Card style={{ padding: 48, textAlign: 'center' }}>
                            <p style={{ fontSize: 18, color: 'hsl(var(--muted-foreground))' }}>
                                {t('builds.page.noBuildInfo')}
                            </p>
                        </Card>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClassBuildPage;


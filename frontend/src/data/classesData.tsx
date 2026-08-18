import { Shield, Sword, Wind, Target, Snowflake, Heart, Music } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ClassData {
    name: string;
    role: string;
    description: string;
    icon: LucideIcon;
    path: string;
    specializations: any[];
}

export const classesData: Record<string, ClassData> = {
    "heavy-guardian": {
        name: "Heavy Guardian",
        role: "Tank",
        description: "Manie une Guardblade, excellent au combat rapproché. Canalise le pouvoir de la pierre pour former une carapace protectrice, offrant une défense et un contrôle exceptionnels.",
        icon: Shield,
        path: "/builds/heavy-guardian",
        specializations: [
            {
                name: "Earthfort",
                description: "Le Heavy Guardian Earthfort se concentre sur la génération de ressources et une utilité défensive massive. Son gameplay tourne autour de la construction et de la dépense de ses ressources principales de Sand Crystals et de Rage pour survivre et contrôler le champ de bataille.",
                playstyle: "Sa boucle de gameplay principale repose sur l'utilisation de compétences comme Sandshroud et Star Shatter pour générer rapidement des Sand Crystals et de la Rage. Ces ressources sont ensuite dépensées sur des capacités comme Rage Burst et Shield Bash pour appliquer de puissants boucliers empilables.",
                bestSkills: {
                    basic: "Halberd's Edge",
                    skill: "Shield Bash",
                    ultimate: "Cracking Echo",
                    mandatory: [
                        { slot: 1, name: "Star Shatter", description: "Permet d'entrer dans l'état enragé et de générer des ressources" },
                        { slot: 2, name: "Rage Burst", description: "Génère un grand bouclier et peut empiler davantage sous l'effet Enraged" },
                        { slot: 3, name: "Sandshroud", description: "Génère des Sand Crystals et de la Rage" }
                    ],
                    flex: [
                        { slot: 4, name: "Stoneform", description: "Attire tous les ennemis proches, confère une réduction de dégâts et déclenche vos capacités améliorées" },
                        { slot: 4, name: "Sandward", description: "Alternative défensive" }
                    ]
                },
                resources: {
                    rage: "Notre ressource principale utilisée pour alimenter Shield Bash, notre attaque spéciale, et certaines de nos compétences Expertise. Nous générons la rage en subissant des dégâts, en attaquant de base, et en utilisant Star Shatter et/ou Sandshroud.",
                    sandCrystal: "Les Sand Crystals sont notre ressource secondaire nécessaire pour lancer certaines de nos compétences Expertise. Nous les générons principalement via Star Shatter et/ou Sandshroud."
                },
                talentPriority: "Assurez-vous que toutes les capacités que vous utilisez sont montées au niveau 30 - seule l'avancement nécessite une réflexion. Priorité des compétences : Rage Burst = Shield Bash > Stoneform > Star Shatter = Halberd's Edge = Cracking Echo > Sandshroud = Sandward = Sandgrip",
                rotation: [
                    "Utilisez Sandshroud pour commencer à générer des Sand Crystals et de la Rage",
                    "Lancez Star Shatter pour entrer dans l'état enragé",
                    "Activez Stoneform pour attirer tous les ennemis, obtenir une réduction de dégâts et déclencher vos capacités améliorées",
                    "Utilisez Enhanced Rage Burst pour générer un grand bouclier",
                    "Attaquez de base améliorée pour gagner des Sand Crystals",
                    "Utilisez Rage Burst pour empiler davantage votre bouclier tant que vous êtes sous l'effet Enraged",
                    "Lancez votre ultime Cracking Echo pour gagner 5 Sand Crystals",
                    "Réappliquez l'état Enraged via Starfall ou Star Shatter",
                    "Utilisez Rage Burst à nouveau avec le bonus de HP de l'ultime",
                    "Utilisez Shield Bash pour dépenser des Sand Crystals et gagner des boucliers lorsque Rage Burst est en temps de recharge"
                ],
                talents: [
                    "Starfall",
                    "Star Fury",
                    "Lord of the Great Rock",
                    "Lord of Rocks",
                    "Shield Echo",
                    "Shield Combo",
                    "Stone Domain",
                    "Rage Burst Improvement",
                    "Group Suppress",
                    "Bravery in Battle",
                    "Resolute Breath"
                ]
            },
            {
                name: "Block",
                description: "Si vous cherchez à être le bouclier ultime de l'équipe, le Heavy Guardian - Block Spec est votre choix ! C'est une forteresse absolue, incroyablement tanky et axée sur l'absorption massive de dégâts plutôt que d'en infliger. Cette approche de survie signifie que vous ne serez pas facilement renversé et pouvez garder la pression loin de vos coéquipiers. C'est le tank avec la mitigation de dégâts la plus élevée du jeu, commençant avec une réduction de dégâts de base de 30% du mécanisme de Block seul, que vous pouvez booster encore plus avec votre arbre de talents et vos stats de Maîtrise.",
                playstyle: "Block est incroyablement simple à jouer. Notre objectif est de maintenir notre buff de blocage à 100% en utilisant Countercrush et le buff de réduction de dégâts en utilisant Granite Fury. Le reste de nos actions seront consacrées à construire des ressources et à déclencher et maintenir autant de buffs basés sur les talents que possible. C'est facile à jouer ; vous pouvez facilement rassembler des groupes de monstres avec Sandgrip et devenir un mur de pierre sous les effets de Countercrush et Brave Bastion.",
                bestSkills: {
                    basic: "Halberd's Edge",
                    skill: "Countercrush",
                    ultimate: "Cracking Echo",
                    mandatory: [
                        { slot: 1, name: "Granite Fury", description: "Dépense des Sand Crystals et augmente votre réduction de dégâts" },
                        { slot: 2, name: "Brave Bastion", description: "Provoke les ennemis proches et augmente votre réduction de dégâts" }
                    ],
                    flex: [
                        { slot: 3, name: "Sandshroud", description: "Génère des Sand Crystals et de la Rage" },
                        { slot: 3, name: "Sandgrip", description: "Attire les ennemis proches et les groupe pour votre équipe" },
                        { slot: 3, name: "Star Shatter", description: "Génère des ressources et permet d'entrer dans l'état enragé" },
                        { slot: 3, name: "Sandward", description: "Alternative défensive" },
                        { slot: 4, name: "Sandshroud", description: "Génère des Sand Crystals et de la Rage" },
                        { slot: 4, name: "Sandgrip", description: "Attire les ennemis proches et les groupe pour votre équipe" },
                        { slot: 4, name: "Star Shatter", description: "Génère des ressources et permet d'entrer dans l'état enragé" },
                        { slot: 4, name: "Sandward", description: "Alternative défensive" }
                    ]
                },
                resources: {
                    rage: "Notre ressource principale qui est consommée lors de l'utilisation de notre compétence spéciale et de certaines de nos compétences Expertise. Nous générons la rage en subissant des dégâts, en attaquant de base, et en utilisant Star Shatter ou Sandshroud. Les talents endgame peuvent fournir 2 Rage du blocage d'attaques ennemies ou 4 Rage d'un Lucky Block.",
                    sandCrystal: "Les Sand Crystals sont notre ressource secondaire nécessaire pour lancer certaines de nos compétences Expertise. Les cristaux peuvent être obtenus via Star Shatter ou Sandshroud. Les talents endgame peuvent fournir 1 Sand Crystal du blocage d'attaques ennemies ou 2 d'un Lucky Block."
                },
                talentPriority: "Priorité des compétences : Countercrush pour activer et maintenir les blocs garantis > Star Shatter / Sandshroud pour commencer à gagner des Sand Crystals (si utilisés) > Utiliser Sandgrip pour attirer les ennemis proches et les regrouper (si utilisé) > Brave Bastion pour provoquer les ennemis et augmenter votre réduction de dégâts > Granite Fury pour dépenser des Sand Crystals et augmenter davantage votre réduction de dégâts > Utiliser l'attaque de base améliorée si elle proc et les attaques de base standard pour remplir les temps d'arrêt. Granite Fury peut être amélioré en Stone Fist, qui est une capacité de critique garanti à dégâts élevés que nous obtenons après avoir utilisé Granite Fury 10 fois, ou après que 20 Rock Projectiles aient été tirés.",
                rotation: [
                    "Utilisez Countercrush pour activer et maintenir les blocs garantis",
                    "Utilisez Star Shatter / Sandshroud pour commencer à gagner des Sand Crystals (si utilisé)",
                    "Utilisez Sandgrip pour attirer les ennemis proches et les regrouper (si utilisé)",
                    "Utilisez Brave Bastion pour provoquer les ennemis proches et augmenter votre réduction de dégâts",
                    "Utilisez Granite Fury pour dépenser des Sand Crystals et augmenter davantage votre réduction de dégâts",
                    "Utilisez l'attaque de base améliorée si elle proc et les attaques de base standard pour remplir les temps d'arrêt",
                    "Utilisez Stone Fist (version améliorée de Granite Fury) tactiquement avant qu'elle n'expire pour éviter le gaspillage"
                ],
                talents: [
                    "Rage Enhancement",
                    "Heart of Rock",
                    "Sand Block",
                    "Block Recovery",
                    "Earth Shard",
                    "Granite Combo",
                    "Granite Fury I",
                    "Granite Fury II",
                    "Enraged Rock Heart",
                    "Sandstone Rewind",
                    "Shattering Rageblow",
                    "Intimidation"
                ]
            }
        ]
    },
    "stormblade": {
        name: "Stormblade",
        role: "DPS Mêlée",
        description: "Manie une Faux de Faucheur, excellent au combat rapproché. Alterne fluidement entre les formes de faux et de longue épée, délivrant des frappes de zone précises.",
        icon: Sword,
        path: "/builds/stormblade",
        specializations: [
            {
                name: "Iaido Slash",
                description: "Le Iaido Slash Spec (ou Iaido pour faire court) met l'accent sur l'utilisation de Thunder Sigil et a un fort focus sur les dégâts en rafale. Son arbre de talents offre des avantages comme un compte de Sigil maximum augmenté et des reset de cooldown complets. Spécialiser dans Iaido Slash fournit des avantages passifs tels que des augmentations de dégâts en pourcentage et une immunité au CC.",
                playstyle: "Le Iaido Slash se concentre fortement sur le skill Volt Surge, qui change fondamentalement la façon dont Stormblade est joué et établit son identité en tant que DPS en rafale. L'objectif est d'exécuter autant de finisseurs à 6 Sigils que possible, fréquemment tout au long du combat. Il faut maintenir un combo alterné entre Iaido Slash et Flash Strike pendant la burst rotation, en veillant à ne pas manquer un CRIT qui briserait la chaîne.",
                bestSkills: {
                    basic: "Judgment Cut",
                    skill: "Iaido Slash",
                    ultimate: "Oblivion Combo",
                    mandatory: [
                        { slot: 1, name: "Overdrive", description: "Récupère des Thunder Sigils rapidement" },
                        { slot: 2, name: "Volt Surge", description: "Skill pivot qui établit les Sigils et démarre le combo" },
                        { slot: 3, name: "Flash Strike", description: "Composant clé de la rotation burst" }
                    ],
                    flex: [
                        { slot: 4, name: "Raijin Dash", description: "Mobilité et utilité" },
                        { slot: 4, name: "True Sight", description: "Alternative utilitaire" }
                    ]
                },
                resources: {
                    thunderSigil: "Thunder Sigil est la ressource principale pour les 'Spenders', qui gagnent un multiplicateur scaler de 25% ATK par Sigil consommé, rendant les capacités les plus puissantes au maximum de Sigils. Formule : 150% x (1 + (25% x Sigils dépensés)). Les Sigils ne multiplient pas les dégâts plats.",
                    bladeIntent: "Blade Intent est la barre d'énergie de Stormblade, augmentant principalement la vitesse d'attaque des spenders via les capacités inhérentes et les talents. Il est généré librement et peut généralement être ignoré dans la rotation."
                },
                talentPriority: "Priorité de la Burst Rotation : Utiliser tous les Imagines disponibles > Activer Volt Surge > Si pas au maximum de Sigils, utiliser Overdrive > Combo alterné Iaido Slash / Flash Strike. Priorité pendant le combo : Overdrive si pas au maximum de Sigils > Utiliser Iaido Slash > Utiliser Flash Strike quand Iaido Slash est en cooldown > Attendre le cooldown de Iaido Slash si manque un CRIT. ATTENTION : Manquer un CRIT sur l'un des deux hits d'Iaido Slash pendant l'alternance Flash Strike / Iaido Slash brisera la chaîne et forcera un cooldown sur Iaido Slash, résultant en une perte de dégâts.",
                rotation: [
                    "Utiliser tous les Imagines disponibles",
                    "Activer Volt Surge pour établir les Sigils",
                    "Si pas au maximum de Sigils, utiliser Overdrive pour les récupérer",
                    "Alterner entre Iaido Slash et Flash Strike",
                    "Priorité du combo : Overdrive si pas max Sigils > Iaido Slash > Flash Strike quand Iaido Slash en CD > Attendre cooldown si manque CRIT",
                    "Pendant le downtime (attente de Volt Surge) : Utiliser Judgment Cut jusqu'à activation de Piercing Slash > Overdrive pour consommer le buff Piercing Slash > Dépenser les Sigils sur Iaido Slash",
                    "Continuer cette priorité jusqu'à ce que Volt Surge soit disponible"
                ],
                talents: [
                    "Flash Frenzy Blade",
                    "Zen Moment",
                    "Thunder Sigil Rewind",
                    "Flash Sharp Strike",
                    "Dual Blade Intent",
                    "Duel Awareness",
                    "Vacuum Slash",
                    "Thundrage",
                    "Thunder Might",
                    "Wind Assault II"
                ]
            },
            {
                name: "Moonstrike",
                description: "Malgré son nom Moonstrike, cette spé se concentre en fait sur Thundercut et Scythe Wheel pour infliger la majorité de ses dégâts et déclencher ses effets basés sur les talents. Moonstrike est une spé gourmande en stats qui repose sur des niveaux élevés de Haste et Luck pour atteindre son plein potentiel.",
                playstyle: "Le gameplay tourne autour de l'utilisation de la ressource Blade Intent sur la compétence principale Thundercut, tout en maintenant Scythe Wheel, une lame tournoyante géante qui suit les ennemis. La principale caractéristique de Moonstrike est ses seuils de stats - à certains seuils de Haste, les hits de Thundercut peuvent être multipliés jusqu'à 4 fois ! Quand joué et équipé correctement, Moonstrike est compétitif dans le contenu haut niveau et finit avec des ressources abondantes pour spammer les capacités libéralement.",
                bestSkills: {
                    basic: "Judgment Cut",
                    skill: "Moonstrike",
                    ultimate: "Oblivion Combo",
                    mandatory: [
                        { slot: 1, name: "Thundercut", description: "Compétence principale qui consomme Blade Intent et peut multiplier ses hits jusqu'à 4 fois à certains seuils de Haste" },
                        { slot: 2, name: "Scythe Wheel", description: "Lame tournoyante géante qui suit les ennemis, à maintenir actif" },
                        { slot: 3, name: "Overdrive", description: "Récupère des Thunder Sigils" },
                        { slot: 4, name: "Stormflash", description: "Buff de dégâts crucial pour la fenêtre de burst" }
                    ],
                    flex: []
                },
                resources: {
                    bladeIntent: "Blade Intent est notre ressource principale, qui s'accumule à raison de 2 par seconde en base et est utilisée exclusivement pour notre compétence principale - Thundercut. Nous pouvons stocker 100 Blade Intent en base, mais bien plus avec les talents. Gérer le Blade Intent est l'épine dorsale du Moonstrike Spec.",
                    thunderSigil: "Les Thunder Sigils sont notre ressource secondaire, générée principalement via les talents. Les Sigils sont utilisés exclusivement pour activer notre compétence Spéciale, Moonstrike, pour récupérer du Blade Intent et déclencher les talents."
                },
                talentPriority: "Assurez-vous que toutes les capacités que vous utilisez sont montées au niveau 30 - seule l'avancement nécessite une réflexion. Pour la rotation burst : Utiliser Scythe Wheel avant de commencer > Utiliser les Imagines si disponibles > Activer Stormflash > Spammer Thundercut jusqu'à ce que Divine Sickle soit disponible > Utiliser Chaos Breaker quand moins de 50 Blade Intent > Continuer jusqu'à manquer de Blade Intent ou que la durée des Imagines se termine.",
                rotation: [
                    "Assurez-vous d'avoir utilisé Scythe Wheel récemment pour qu'il ne time out pas pendant Stormflash",
                    "Utiliser vos Imagines, puis activer Stormflash",
                    "Spammer Thundercut jusqu'à ce que Divine Sickle soit disponible ou que vous manquiez de Blade Intent",
                    "Utiliser Divine Sickle dès qu'il est disponible",
                    "Lorsque vous atteignez zéro Blade Intent, utiliser Chaos Breaker",
                    "Continuer le même rotation (Thundercut -> Divine Sickle) jusqu'à ce que Stormflash et les cooldowns des Imagines soient terminés",
                    "Pendant le downtime : Moonstrike x2 > Oblivion Combo (si disponible) > Moonstrike x2 > Judgment Cut jusqu'à Sharp Strike > Overdrive > Moonstrike > Répéter jusqu'à ce que Stormflash soit disponible"
                ],
                talents: [
                    "Thunder Seed",
                    "Moonstrike Delay",
                    "Chaos Breaker",
                    "Moonstrike Sharp Strike",
                    "Divine Sickle",
                    "Lightning Flash",
                    "Phantom Scythe Realm II"
                ]
            }
        ]
    },
    "wind-knight": {
        name: "Wind Knight",
        role: "DPS",
        description: "Excelle au combat rapproché, utilisant une Lance comme arme. Agile et rapide, il possède d'excellentes capacités d'attaque de petite zone.",
        icon: Wind,
        path: "/builds/wind-knight",
        specializations: [
            {
                name: "Vanguard",
                description: "Le Vanguard Spec se concentre sur le déclenchement de capacités basées sur la chance aléatoire et les utiliser aussi rapidement que possible pour maximiser les dégâts. Sa compétence signature est Valor Cyclone, une aura de lance pulsante toggleable qui consomme constamment la ressource énergique du Wind Knight - le Courage.",
                playstyle: "Le gameplay est simple : préparez-vous à enfoncer des boutons qui clignotent plus vite qu'un opérateur de panneau de contrôle tout en alimentant Valor Cyclone avec du Courage pour qu'il ne s'épuise jamais. Vanguard est considéré difficile à jouer car réagir à toutes vos capacités basées sur le hasard rapidement est essentiel pour les dégâts max ; être lent entravra grandement les performances.",
                bestSkills: {
                    basic: "Windborne Grace",
                    skill: "Gale Thrust",
                    ultimate: "Typhoon Cleave",
                    mandatory: [
                        { slot: 1, name: "Galeform", description: "À garder en cooldown constant, sauvegarder une charge pour quand Courage est bas" },
                        { slot: 2, name: "Spiral Thrust", description: "Composant clé de la rotation" },
                        { slot: 3, name: "Breach Pursuit", description: "Capacité importante" },
                        { slot: 4, name: "Valor Cyclone", description: "Aura pulsante signature qui consomme du Courage en permanence" }
                    ],
                    flex: []
                },
                resources: {
                    courage: "Notre ressource principale, qui alimente toutes nos compétences - la plus importante étant Valor Cyclone qui la draine en permanence. L'objectif est de s'assurer que notre Courage ne tombe jamais à zéro.",
                    sharpStacks: "Au lieu d'être une ressource à dépenser dans le spec Vanguard, les Sharp Stacks sont un buff à maintenir. Construire puis maintenir 4 stacks en permanence."
                },
                talentPriority: "Contrairement aux autres spécs, Vanguard n'a pas de rotation fixe du tout à cause de son kit très RNG. Nous exécutons les capacités selon le système de priorité suivant : Valor Cyclone (Première utilisation, ne pas recaster) > Vortex Strike (Spiral Thrust amélioré) > Drake Cannon (2ème forme d'attaque de base améliorée) > Swift Blade (1ère forme d'attaque de base améliorée) > Gale Thrust (Uniquement sans coût Courage) > Spiral Thrust > Breach Pursuit > Attaques de base. CONSEIL : Soyez prudent de ne pas brûler tout votre Courage en utilisant des Gale Thrusts non-gratuits ; il est généralement plus sûr de les éviter complètement sauf si le Courage déborde.",
                rotation: [
                    "Utiliser Valor Cyclone en première (ne pas le recaster)",
                    "Utiliser Vortex Strike (Spiral Thrust amélioré) quand disponible",
                    "Utiliser Drake Cannon (2ème forme d'attaque de base améliorée) quand disponible",
                    "Utiliser Swift Blade (1ère forme d'attaque de base améliorée) quand disponible",
                    "Utiliser Gale Thrust uniquement s'il est gratuit (sans coût Courage)",
                    "Utiliser Spiral Thrust régulièrement",
                    "Utiliser Breach Pursuit",
                    "Utiliser les attaques de base en temps d'arrêt",
                    "Garde une charge de Galeform en cooldown constant, sauvegarder la deuxième si le Courage est bas",
                    "Utiliser la première charge de Typhoon Cleave dès qu'elle est disponible, utiliser la deuxième charge quand vous êtes bas en Courage ou avant qu'elle ne expire"
                ],
                talents: [
                    "Vanguard Spec",
                    "Swift Blade",
                    "Break Pursuit Advancement",
                    "Swift Breeze",
                    "Wind Tear",
                    "Spiral Tear",
                    "Wind Rift Diffusion",
                    "Battle Cry",
                    "Fearless Gale",
                    "Rapid Drake Cannon",
                    "Wind Gate Drake Cannon",
                    "Vortex Strike",
                    "Wind Rise",
                    "Dragon's Fury Flame"
                ]
            },
            {
                name: "Skyward",
                description: "Skyward peut voler avec plusieurs de ses capacités, se lançant dans les airs et d'autres les faisant s'écraser au sol. Skyward est la spéc la plus technique du jeu, devant gérer trois ressources, de multiples cooldowns et les complexités du combat aérien et terrestre simultanément. Le gameplay se résume à construire et dépenser les ressources Chasing Step et Sharp Stack sur son finisher (Instant Edge) sans manquer de Courage.",
                playstyle: "Skyward nécessite aussi un taux de critique substantiel et la plupart de ses talents endgame pour fonctionner, mais une fois lancé et bien joué, c'est incroyablement fort et satisfaisant à jouer. Le jeu consiste à exécuter autant d'Instant Edge que possible tout en maintenant un maximum de 3 tornades pour la plus longue durée. Attention : Cette rotation n'est possible qu'en utilisant l'arbre de talents recommandé et ne fonctionnera pas avant (niveau max uniquement).",
                bestSkills: {
                    basic: "Windborne Grace",
                    skill: "Skyfall",
                    ultimate: "Typhoon Cleave",
                    mandatory: [
                        { slot: 1, name: "Galeform", description: "Capacité importante pour le cooldown" },
                        { slot: 2, name: "Falcon Toss", description: "Capacité clé, peut être améliorée en Azure Sever" },
                        { slot: 3, name: "Instant Edge", description: "Finisher principal, peut être utilisé au sol ou dans les airs" },
                        { slot: 4, name: "Sharp Impact", description: "Composant essentiel de la rotation" }
                    ],
                    flex: []
                },
                resources: {
                    sharpStacks: "Notre ressource principale requise pour utiliser notre capacité la plus puissante, Instant Edge. Construire et dépenser les Sharp Stacks est la majorité de notre rotation. Accorde également un énorme ATK% tant que vous avez au moins 1 Sharp Stack.",
                    courage: "Notre autre ressource principale qui est nécessaire pour activer Skyfall afin de générer des Sharp stacks. Se rétablit à un taux de 3 par seconde en base mais peut être significativement amélioré via les cooldowns et les talents.",
                    chasingStep: "Une ressource basée sur les talents générée en critiquant avec Skyfall. Elle peut s'empiler jusqu'à 2 fois et peut être consommée par Instant Edge pour buff ses dégâts. Consommer les stacks aide aussi significativement notre rotation avec les nœuds de talents endgame."
                },
                talentPriority: "Skyward n'a pas de rotation fixe à cause de divers facteurs comme le RNG de crit influençant les Chasing Steps, le gear affectant les cooldowns des compétences, et la génération de Courage dépendant des cooldowns et de l'état de combat. Comprendre la spé en adaptant une rotation fixe est plus pratique que de mémoriser chaque astuce possible.",
                rotation: [
                    "Utiliser les Imagines disponibles",
                    "Galeform",
                    "Sharp Impact",
                    "Instant Edge (au sol)",
                    "Skyfall x3",
                    "Instant Edge x2 (1 Aérien, 1 au sol)",
                    "Azure Sever (Falcon Toss amélioré)",
                    "Skyfall (jusqu'à 6 Sharp)",
                    "Instant Edge x2 (1 Aérien, 1 au sol)"
                ],
                talents: [
                    "Skyward Spec",
                    "Wind Fury",
                    "Sharp Long Breath",
                    "Tornado Dance",
                    "Chasing Step",
                    "Sharp Advancement",
                    "Sharp Pursuit",
                    "Pursuit Power",
                    "Instantaneous Crit",
                    "Air Dance Strike",
                    "Typhoon: Sharp Impact",
                    "Momentum Surge"
                ]
            }
        ]
    },
    "marksman": {
        name: "Marksman",
        role: "DPS Distance",
        description: "Manie un arc, excellent au combat à longue portée. S'associe avec des familiers animaux pour lancer des attaques de zone étendue.",
        icon: Target,
        path: "/builds/marksman",
        specializations: [
            {
                name: "Wildpack",
                description: "Wildpack se spécialise dans le contrôle et l'inflation de dégâts principalement via les Loups Sauvages. Vous ne ferez pas beaucoup de dégâts vous-même, mais vos meilleures attaques feront que vos familiers effectueront de puissantes attaques spéciales qui ont du punch. Le spec conserve et renforce le fonctionnement du Photon Reforge dans la classe de base, avec de nombreux talents améliorant à la fois les dégâts du joueur et ceux des familiers pendant que l'état Photon Reforge est actif.",
                playstyle: "Le gameplay est simple : accumuler 120 Photon Energy, utiliser les cooldowns, et spam autant de Special Attacks que possible tout en tissant tactiquement des capacités à haute valeur. Pendant ce temps, nos familiers deviendront fous. Wildpack est connue comme 'Auto Class' car elle peut être jouée efficacement en semi et même full auto, et est souvent préférée dans ce mode. Le cœur de la classe est de spam autant de Special Attacks que possible pendant Photon Reforge, ce qui, avec un haut pourcentage de vitesse d'attaque quand c'est fait manuellement et avec ping, peut sous-performer comparé à l'IA.",
                bestSkills: {
                    basic: "Bullseye",
                    skill: "Storm Arrows",
                    ultimate: "Torrent Volley",
                    mandatory: [
                        { slot: 1, name: "Wildcall", description: "Invoque des loups sauvages" },
                        { slot: 2, name: "Stomp", description: "Capacité de burst puissante" },
                        { slot: 3, name: "Luminary Bolt", description: "Compétence clé de rotation" },
                        { slot: 4, name: "Focus", description: "Buff important pour le gameplay" }
                    ],
                    flex: []
                },
                resources: {
                    photonEnergy: "Ressource principale utilisée pour activer Photon Reforge. Accumuler 120 Photon Energy pour activer l'état et spam les Special Attacks pendant la durée.",
                    photonReforge: "État amélioré qui augmente significativement les dégâts du joueur et des familiers. L'objectif est de maintenir cet état le plus longtemps possible."
                },
                talentPriority: "Priorité de rotation : Utiliser Luminary Bolt si disponible > Utiliser tous les Imagines disponibles > Utiliser Wildcall + Stomp si disponible > Utiliser Focus si disponible > Spammer Storm Arrows continuellement jusqu'à ~76 Energy puis utiliser Arrow Rain (si Focus actif) > Cont inner Storm Arrows jusqu'à ~78 Energy puis utiliser Torrent Volley > Storm Arrows jusqu'à ~40-50 Energy puis utiliser Arrow Rain si disponible > Storm Arrows jusqu'à 0 Energy puis utiliser Lumi Torrent si disponible > Storm Arrows.",
                rotation: [
                    "Utiliser Luminary Bolt si disponible",
                    "Utiliser tous les Imagines disponibles",
                    "Utiliser Wildcall + Stomp si disponible",
                    "Utiliser Focus si disponible",
                    "Spammer Storm Arrows continuellement",
                    "Si Focus est actif : à ~76 Energy, utiliser Arrow Rain",
                    "À ~78 Energy, utiliser Torrent Volley",
                    "À ~40-50 Energy, utiliser Arrow Rain si disponible",
                    "À 0 Energy, utiliser Lumi Torrent si disponible"
                ],
                talents: [
                    "Wildpack",
                    "Light Chasing Sharp",
                    "Stomp",
                    "Legendary Beast",
                    "Wolf Fang Pact",
                    "Battle Howl",
                    "Demon Wolf Twin",
                    "Lumi Torrent",
                    "Wolf Dancer",
                    "Critical Tip"
                ]
            },
            {
                name: "Falconry",
                description: "Falconry remplace le familier loup par un oiseau qui n'attaque que sur des crits, soulignant l'importance des compétences à haut taux de touche (comme Radiance Barrage et Arrow Rain) et la maximisation du taux de crit. Falconry échange l'état Photon Reforge traditionnel contre Quadraflare, qui s'active à l'énergie Photon max et inflige des hits élevés et des dégâts.",
                playstyle: "Le gameplay consiste à utiliser les capacités dès qu'elles deviennent disponibles et à spammer les attaques de base pendant les temps d'arrêt. Une part significative des dégâts est liée aux familiers, ce qui rend les bonus de familiers très bénéfiques. Falconry est caractérisée comme une spé facile à jouer, favorable à l'auto, avec une excellente flexibilité des compétences, permettant des changements de capacités orientés utilité avec un coût minimal.",
                bestSkills: {
                    basic: "Bullseye",
                    skill: "Double Arrow",
                    ultimate: "Luminary Bolt",
                    mandatory: [
                        { slot: 1, name: "Arrow Rain", description: "Compétence à haut taux de touche cruciale" },
                        { slot: 2, name: "Focus", description: "Buff important qui donne du Haste" },
                        { slot: 3, name: "Radiance Barrage", description: "Capacité à haut taux de touche, utiliser à 60 Energy pendant Focus si possible" }
                    ],
                    flex: [
                        { slot: 4, name: "Blast Shot", description: "Option offensive" },
                        { slot: 4, name: "Deter Shot", description: "Option utilitaire" }
                    ]
                },
                resources: {
                    photonEnergy: "Notre ressource principale, qui se régénère à un taux de 3 par seconde naturellement, mais peut aussi être gagnée via plusieurs de nos différentes attaques. Contrairement au Marksman de base, quand l'énergie Photon atteint son maximum, notre attaque Spéciale, Double Arrow, évolue temporairement en Quadraflare, et l'utiliser consomme toute l'énergie Photon. À cause de cela, plus notre cap d'énergie Photon est bas, le mieux c'est. Notre objectif est d'utiliser autant de Quadraflares que possible. NOTE : Certaines capacités gagnent aussi des bonus quand à l'énergie Photon maximum, comme Powerdraw. Si vous les utilisez, lancez-les avant de consommer l'énergie avec Quadraflare."
                },
                talentPriority: "Falconry n'a pas de rotation de burst traditionnelle en dehors d'aligner les Imagines et le bonus Haste gagné de Focus ensemble pour maximiser les bénéfices quand c'est possible. Le gameplay du spec suit un ordre de priorité simple.",
                rotation: [
                    "Luminary Bolt si disponible",
                    "Imagines si disponibles",
                    "Focus si disponible",
                    "Radiance Barrage si disponible et à 60 Energy (viser à utiliser pendant Focus pour invoquer Celestial Eagle si possible)",
                    "Quadraflare à 60 Energy",
                    "Utiliser Double Arrow si pas en cooldown",
                    "Arrow Rain si disponible",
                    "Blast Shot si disponible (seulement si vous l'utilisez)",
                    "Utiliser les charges restantes de Double Arrow",
                    "Attaques de base en attendant les cooldowns"
                ],
                talents: [
                    "Falconry Spec",
                    "Falcon",
                    "Piercing Shot",
                    "Falcon Raid",
                    "Steel Beak",
                    "Meteor",
                    "Eagle Eye",
                    "Swift",
                    "Radiant Sharpshooter",
                    "Lightfall"
                ]
            }
        ]
    },
    "frost-mage": {
        name: "Frost Mage",
        role: "DPS Magie",
        description: "Manie un Bâton de Glace, excellent au combat à longue portée. Commande le pouvoir de la glace pour infliger des dégâts de zone étendue et un contrôle formidable.",
        icon: Snowflake,
        path: "/builds/frost-mage",
        specializations: [
            {
                name: "Icicle",
                description: "Le Icicle Spec est entièrement axé sur l'alignement et l'obtention de 20 stacks de sa ressource signature, Endless Cold. Ces stacks sont utilisés avec ses puissants cooldowns pour délivrer une rotation de burst dévastatrice en deux phases.",
                playstyle: "La rotation démarre avec une rafale de Frost Lances, suivie d'un spam incessant de Meteor Storm. Bien joué, cela offre un style de jeu incroyablement satisfaisant. Mais en cas d'erreurs, attendez-vous à perdre une grande quantité de dégâts. En raison de sa nature spammy pendant sa fenêtre de burst, Icicle nécessite une bonne vitesse d'entrée pour bien performer. Une particularité d'Icicle est qu'il a besoin de tous ses emplacements de compétences pour infliger un maximum de dégâts, ne laissant aucune place pour Maelstrom sans un échange de compétences. Pour contourner cela, il alterne entre son setup DPS optimal contre les boss et la réduction des dégâts pour utiliser Maelstrom contre les groupes d'ennemis.",
                bestSkills: {
                    basic: "Frost Lance",
                    skill: "Meteor Storm",
                    ultimate: "Permafrost",
                    mandatory: [
                        { slot: 1, name: "Glacier Hymn", description: "Créer un domaine qui génère des Ice Cores" },
                        { slot: 2, name: "Crystal Veil", description: "Génère Frost Crystals et réduit les cooldowns" },
                        { slot: 3, name: "Enhanced Blizzard", description: "Capacité de domaine améliorée" },
                        { slot: 4, name: "Permafrost", description: "Absorbe les Ice Cores pour surstacker Endless Cold" }
                    ],
                    flex: []
                },
                resources: {
                    iceCores: "En jouant, vous remarquerez deux Ice Cores flottant à côté de vous. Ces derniers interagissent avec nos capacités pour tirer des Ice Arrows et peuvent fournir des Frost Crystals lors d'actions. Débloqué après le premier talent dans l'arbre de base.",
                    iceEnergy: "Cette énergie est requise pour lancer et renforcer nos capacités les plus fortes. Se régénère à un taux de 2 par seconde en base, avec une régénération supplémentaire venant du champ créé par notre ultime, notre cooldown Permafrost, et les talents. Principalement utilisé pour réduire les cooldowns pour Meteor Storm et Crystal Veil.",
                    frostCrystal: "Une ressource qui peut être gagnée en lançant Meteor Storm et Crystal Veil et est dépensée pour éliminer le temps de cast et augmenter les dégâts de Frost Lance.",
                    endlessCold: "Endless Cold est une ressource exclusive à Icicle débloquée via un talent, qui est au cœur de notre gameplay. Après avoir débloqué le talent, chaque Frost Crystal que nous consommons ajoute un au compteur Endless Cold. À 20 stacks, tout l'Endless Cold est consommé, nous accordant un buff durant 10 secondes qui cause Meteor Storm à infliger 150% de dégâts en plus, avoir aucun cooldown, et coûter aucune Ice Energy."
                },
                talentPriority: "Opener : Meteor Storm x2 > Utiliser Imagines si disponibles > Glacier Hymn (Rester dans votre domaine) > Crystal Veil > Enhanced Blizzard (si disponible) > Permafrost. Après l'opener, suivez cet ordre : Utiliser Frost Lance pendant que vous avez >1 Ice Crystal > Crystal Veil > Meteor Storm (viser à garder au moins 1 charge en cooldown) > Enhanced Blizzard (si disponible) > Frost Lance > Attaque de base (si pas de cooldowns et 0 Ice Crystals). Après Permafrost et le buff Endless Cold, spammer Meteor Storm uniquement.",
                rotation: [
                    "Meteor Storm x2",
                    "Utiliser les Imagines si disponibles",
                    "Glacier Hymn (Rester dans votre domaine)",
                    "Crystal Veil",
                    "Enhanced Blizzard si disponible",
                    "Permafrost",
                    "Utiliser Frost Lance pendant >1 Ice Crystal",
                    "Crystal Veil",
                    "Meteor Storm (maintenir au moins 1 charge en cooldown)",
                    "Enhanced Blizzard si disponible",
                    "Frost Lance",
                    "Attaque de base si rien n'est disponible",
                    "Après Permafrost, spam Meteor Storm uniquement pendant le buff Endless Cold",
                    "Pendant le downtime : Meteor Storm si Frost Crystals ≤3, Crystal Veil si ≤2, Frost Lance quand disponible, Attaque de base"
                ],
                talents: [
                    "Energy Saving",
                    "Deep Cold Magic Spear",
                    "Frozen Stars",
                    "Glacier Fury",
                    "Freezing Meteor Storm",
                    "Frost Domain",
                    "Frost Assault",
                    "Critical Cold",
                    "Frost Lance Barrage",
                    "Infusion Sublimation",
                    "Meteor Storm Expansion"
                ]
            },
            {
                name: "Frostbeam",
                description: "Le Frostbeam Spec se concentre entièrement sur l'exécution de longs channels de son homonyme (Frostbeam) pour profiter de sa capacité à infliger des dégâts toujours croissants plus longtemps vous le castez. En chanelant, vous multi-castez aussi la capacité channel Tidepool de Frost Mage simultanément pour d'énormes dégâts AoE.",
                playstyle: "Frostbeam est la classe avec le plus bas nombre d'actions du jeu, ce qui la rend facile à jouer et idéale pour ceux sans temps de réaction rapides, mais ce n'est pas très bon en autoplay. Le spec a quelques particularités : alors que les cooldowns sont indisponibles et les ressources limitées, vous devrez démarrer et arrêter vos casts de Frostbeam pour conserver l'énergie, et en utilisant Frostbeam, votre mouvement est fortement ralenti.",
                bestSkills: {
                    basic: "Raincall Surge",
                    skill: "Frostbeam",
                    ultimate: "Glacier Hymn",
                    mandatory: [
                        { slot: 1, name: "Tidepool", description: "Multi-cast pendant Frostbeam pour d'énormes dégâts AoE" },
                        { slot: 2, name: "Maelstrom", description: "Utilisé pendant le downtime pour générer de l'Ice Energy" },
                        { slot: 3, name: "Permafrost", description: "Cooldown puissant pour la burst rotation" }
                    ],
                    flex: [
                        { slot: 4, name: "Crystal Veil", description: "Option défensive" },
                        { slot: 4, name: "Frost Shelter", description: "Alternative défensive" }
                    ]
                },
                resources: {
                    iceCores: "Les deux orbes flottants qui sont avec nous depuis le début nous permettent de tirer des Ice Arrows quand nous utilisons certaines de nos compétences. Une des ressources principales utilisée pour alimenter les capacités clés telles que Frozen Gale, Maelstrom, et Frostbeam.",
                    iceEnergy: "Notre talent tree améliore significativement la génération d'Ice Energy et réduit les coûts des capacités clés, comme Frostbeam qui sont tous clés pour maximiser nos dégâts.",
                    frostCrystal: "Dans Frostbeam, les Frost Crystals fonctionnent plus comme un buff qu'une ressource. Chaque Frost Crystal que nous possédons augmente les dégâts de Frostbeam de 15% (20% avec talents) pour un total de 45% (60%), au prix d'augmenter sa consommation d'Ice Energy de 30% pour un total de 90%. Accorde 5% Ice DMG au maximum de crystals avec le talent Frost Tide alloué."
                },
                talentPriority: "Pour la burst rotation : empiler autant de cooldowns et de multiplicateurs de dégâts que possible, puis caster Frostbeam et Tidepool ensemble jusqu'à leur expiration. Opener : Permafrost > Canaliser Frostbeam > Caster Tidepool dès que Frostbeam commence > Continuer à canaliser jusqu'à épuisement complet de l'énergie. NOTE : Glacier Hymn peut ne pas toujours être disponible. Ne pas gaspiller Permafrost et le cooldown de Tidepool en attendant Glacier Hymn.",
                rotation: [
                    "Utiliser les Imagines si disponibles",
                    "Utiliser Glacier Hymn si disponible",
                    "Utiliser Permafrost",
                    "Canaliser Frostbeam",
                    "Caster Tidepool dès que Frostbeam commence",
                    "Continuer à canaliser jusqu'à épuisement complet de l'énergie",
                    "Pendant le downtime : Utiliser Maelstrom quand disponible, canaliser Frostbeam jusqu'à ce que 2 séries d'Ice Arrows soient tirées puis annuler et répéter"
                ],
                talents: [
                    "Tide Mastery",
                    "Crystal Resonance",
                    "Frost Tide",
                    "Rapid Ice Arrow",
                    "Endless Tide",
                    "Frost Domain",
                    "Quick Chant",
                    "Icy Calm"
                ]
            }
        ]
    },
    "verdant-oracle": {
        name: "Verdant Oracle",
        role: "Support",
        description: "Manie un Anneau de Nature, excellent dans les soins à longue portée. Canalise l'essence verdoyante de la forêt pour délivrer des soins et des buffs exceptionnels.",
        icon: Heart,
        path: "/builds/verdant-oracle",
        specializations: [
            {
                name: "Smite",
                description: "La force de Smite est la capacité à infliger des dégâts, soigner et protéger en même temps, grâce à une portion de tous les dégâts qu'il inflige étant convertie en soins. Avec cela dit, les soins de Smite ne sont pas à un niveau où il peut confortablement servir de seul healer du groupe dans du contenu endgame difficile comparé aux trois autres specs de sustain.",
                playstyle: "Alors que la sortie de soins est plus basse, Smite est le sustain avec les capacités de shielding d'équipe les plus fortes et les capacités de cleansing - quelque chose d'incroyablement valable quand d'autres healers sont là pour compenser votre sortie plus basse. Le gameplay de Smite tourne autour de maximiser les dégâts en générant et dépensant sa ressource unique seed sur sa capacité principale, Infusion - une mitraillette de seeds channelée. Smite est difficile à jouer dans les petits groupes mais a une position forte dans les plus grands.",
                bestSkills: {
                    basic: "Vines' Embrace",
                    skill: "Wild Bloom",
                    ultimate: "Divine Circle Bloom",
                    mandatory: [
                        { slot: 1, name: "Feral Seed", description: "Génère des Regen Buds et inflige des dégâts" },
                        { slot: 2, name: "Infusion", description: "Mitraillette de seeds channelée, capacités principale" },
                        { slot: 3, name: "Regen Pulse", description: "Soigne et applique Symbiotic Mark" },
                        { slot: 4, name: "Nature Ward", description: "Shield et réduction de dégâts" }
                    ],
                    flex: []
                },
                resources: {
                    energy: "Cette ressource est consommée pour caster Wild Bloom et certaines de nos compétences Expertise. Elle se régénère à un taux de 4 points par seconde, et grâce à un talent dans l'arbre de base, la récupération scale avec la haste.",
                    regenBud: "Les Regen Buds sont notre autre ressource, qui peuvent être consommés par notre Ultimate et nos compétences Expertise pour créer des Seeds qui libèrent soit un soin fort soit des dégâts AoE, dépendant de la capacité utilisée. 8 buds peuvent être stockés avec nos talents baseline. Les buds sont générés via des capacités grâce à nos talents.",
                    symbioticMark: "Bien que ce ne soit pas techniquement une ressource, c'est le mécanisme principal de notre spé. Après avoir activé Smite Spec, Wild Bloom, Regen Pulse, et Nature Ward appliquent tous Symbiotic Mark aux alliés proches à l'utilisation. Symbiotic Mark dure 10s et cause le porteur d'être soigné pour 45% des DMG infligés.",
                    seedTriggerCounter: "Tracks combien de Seeds nous avons utilisées depuis les Regen Buds. À 10 points, les stacks sont retirés, et une version améliorée de Wild Bloom (Stag Charge) peut être déchaînée. Stag Charge soigne les alliés et inflige des dégâts aux ennemis sur son chemin tout en générant 3 Regen Buds."
                },
                talentPriority: "Cet ordre de compétences maximise les dégâts et les soins, tout en gardant Nature Ward et notre ultimate en réserve pour fournir des shields et réduction de dégâts selon le besoin. Interactions de cooldown : Wild Bloom lucky strike réduit le CD d'Infusion de 3s, Infusion/Feral Seed/Wild Bloom ont 30% de chance de réduire le CD de notre ultimate, Regen Pulse réduit le CD de Nature Ward de 2s, Gagner des Regen Buds réduit le CD de Feral Seed.",
                rotation: [
                    "Nature Ward pour commencer avec un shield",
                    "Wild Bloom pour proc Symbiotic mark",
                    "Infusion pour un gros heal de burst",
                    "Regen Pulse parce qu'il est amélioré après Infusion",
                    "Feral Seed si l'énergie est inférieure à 50",
                    "Wild Bloom jusqu'au Stag Proc puis utiliser Stag",
                    "Enhanced Infusion",
                    "Regen Pulse parce qu'il est amélioré encore",
                    "Cette boucle recommence quand Nature Ward est hors cooldown"
                ],
                talents: [
                    "Smite Spec",
                    "Luck Damage",
                    "Thorns and Wide Area Thorns",
                    "Shelter",
                    "Final Bloomwheel",
                    "Stag Charge",
                    "Double Infusion",
                    "Pulse Duality",
                    "Pulse Retrospect",
                    "Pulse Breath"
                ]
            },
            {
                name: "Lifebind",
                description: "Lifebind Spec est un choix de tête pour les joueurs cherchant une sortie de soins maximum, des cooldowns défensifs d'équipe incroyables et un gameplay facile. Le spec améliore le buff de stats d'Oracle de 50 à 200 et applique une réduction de dégâts élémentaires quasi-permanente pour l'équipe.",
                playstyle: "Le gameplay est incroyablement simple et tourne entièrement autour de l'abilité Nourish. Nourish applique un Heal over Time à jusqu'à 10 alliés proches, empilable jusqu'à 5 fois. L'objectif est de construire jusqu'à et maintenir 5 Nourish sur tous les alliés tout en utilisant tactiquement d'autres capacités selon le besoin. Cette mécanique simple permet à Lifebind de décoller au sommet de la sortie de soins totale tout en étant aussi l'un des sustains les plus faciles à jouer.",
                bestSkills: {
                    basic: "Vines' Embrace",
                    skill: "Life Bloom",
                    ultimate: "Divine Circle Bloom",
                    mandatory: [
                        { slot: 1, name: "Feral Seed", description: "Régénère l'énergie et recharge la barre de ressources" },
                        { slot: 2, name: "Nourish", description: "Applique un Heal over Time empilable jusqu'à 5 fois, focalisé sur le maintien de 5 stacks" },
                        { slot: 3, name: "Blossom Charge", description: "Améliore Life Bloom pour un autocast instantané" }
                    ],
                    flex: [
                        { slot: 4, name: "Grove Wish", description: "Utilisé proactivement pour réduction de dégâts ou réactivement pour burst heal" },
                        { slot: 4, name: "Nature Ward", description: "Alternative défensive" }
                    ]
                },
                resources: {
                    energy: "Cette ressource est consommée pour caster Life Bloom et certaines de nos compétences Expertise. Elle se régénère à un taux de 4 points par seconde, et grâce à un talent dans l'arbre de base, la récupération scale avec la Haste.",
                    regenBud: "Les Regen Buds sont notre autre ressource, qui peuvent être consommés par notre Ultimate et nos compétences Expertise pour créer des Seeds qui libèrent soit un soin fort soit des dégâts AoE. Huit buds peuvent être stockés avec nos talents baseline débloqués. Les buds sont générés via des capacités grâce à nos talents.",
                    flowerTimeDance: "Débloqué après avoir alloué 'Flower Time Dance' et ajoute un tracker de pétales de fleur. Flower Time Dance nous accorde un buff/bonus cyclique sous la forme de 3 variétés de fleurs qui apparaissent toutes les 45s (22s avec talents) : Crimson Insight (Rouge) réduit le CD de la prochaine expertise de 50%, Golden Devotion (Jaune) augmente notre healing bonus de 20% pour 10s après usage d'une expertise, Moonlight Solace (Bleu) améliore le prochain Life Bloom pour fournir un shield égal à 200% de notre MATK avec 10% de réduction de dégâts."
                },
                talentPriority: "Focus principal : Maintenir Nourish à 5 stacks. Buts de soutien : Gestion de l'énergie - Maintenir l'énergie haute et utiliser des capacités filler. Healing/Mitigation - Utiliser les capacités consommant de l'énergie pour soigner ou la mitigation de dégâts.",
                rotation: [
                    "Maintenir Nourish à 5 stacks sur tous les alliés",
                    "Utiliser Feral Seed pour régénérer l'énergie",
                    "Utiliser Grove Wish proactivement pour réduction de dégâts ou réactivement pour burst heal",
                    "Utiliser Blossom Charge & Life Bloom - Blossom Charge améliore Life Bloom pour un autocast instantané et une interruption ennemie",
                    "Coordonner l'utilisation des Imagines avec le DPS (Tina pour réduire CD, Brigand Leader pour buff ATK%)",
                    "Suivre les Flower Stalks pour tracker les 3 capacités",
                    "Utiliser Divine Circle Bloom réactivement pour heals d'urgence ou réduction de dégâts",
                    "Rester dans Grass Domain pour un buff Haste de 10%"
                ],
                talents: [
                    "Inspiration",
                    "Defensive Blessing",
                    "Inspire and Strengthen",
                    "Ultimate Inspiration",
                    "Healing Breath",
                    "Lifeforce Extension",
                    "Tricolor Revelation",
                    "Flourishing Flower",
                    "Healing Infusion",
                    "Instant Bloom",
                    "Life Bloom",
                    "Full Bloom",
                    "Vitality & Nourish Essence",
                    "Endless Blossom",
                    "Verdant Root",
                    "Flourishing Flower"
                ]
            }
        ]
    },
    "shield-knight": {
        name: "Shield Knight",
        role: "Tank",
        description: "Manie une Épée et un Bouclier, excellent au combat rapproché. Porte une armure lumineuse forgée, arborant une défense et un auto-soin exceptionnels.",
        icon: Shield,
        path: "/builds/shield-knight",
        specializations: [
            {
                name: "Recovery",
                description: "Le Recovery Shield Knight est dédié à l'auto-soin tout en ayant certaines des meilleures générations de shields de tous les tanks (mais potentiel max plus bas que le 'shield' Spec). Recovery conserve et améliore le spécial standard du Shield Knight, Valor Bash, et son buff, qu'il vise à maintenir toujours durant le combat.",
                playstyle: "En dehors de cela, le Spec utilise une myriade de capacités, comme Shield Toss, Reckoning, et sa version améliorée, Inferno Reckoning, pour accumuler des ressources qui peuvent être canalisées dans Judgment pour soigner et donner des shields constamment. Recovery a accès à une mitigation respectable, mais elle est fortement liée au maintien des stacks Valor Bash et au maintien de son cooldown défensif (Aegis Ward) actif. Sans cela, il manque le pool de HP total absurde inconditionnel du Shield Spec et la défense plus cohérente et supérieure du Heavy Guardian, le rendant sujet à des chances plus élevées d'être one-shot quand les buffs sont down. Le trade-off pour cette vulnérabilité accrue est des soins et une génération de shields si forts qu'ils peuvent se self-sustainer à travers de nombreuses rencontres PVE.",
                bestSkills: {
                    basic: "Blade of Justice",
                    skill: "Valor Bash",
                    ultimate: "Radiant Infusion",
                    mandatory: [
                        { slot: 1, name: "Judgment", description: "Capacité de healing et shielding la plus puissante, consomme Photon Energy" },
                        { slot: 2, name: "Reckoning", description: "Coûte 1 Holy Sigil, version améliorée : Inferno Reckoning" },
                        { slot: 3, name: "Shield Toss", description: "Génère un énorme shield, applique 10% réduction de dégâts et 15% Block" },
                        { slot: 4, name: "Aegis Ward", description: "Cooldown défensif essentiel pour la survie" }
                    ],
                    flex: []
                },
                resources: {
                    holySigil: "Notre ressource principale, avec 5 disponibles. Utilisé pour caster des capacités clés comme Valor Bash (nécessite 3 Holy Sigils) et Reckoning (nécessite 1 Holy Sigil). Chaque Sigil a son propre cooldown de 10 secondes après utilisation. Les talents et stats peuvent réduire les cooldowns des Sigils et les redonner gratuitement.",
                    photonEnergy: "Utilisé uniquement pour la capacité de self-healing la plus puissante, Judgment. Peut contenir jusqu'à 100 Photon energy. Principalement gagné via les dépenseurs de Holy Sigil : chaque 1 Holy Sigil qu'une capacité coûte accorde 10 Photon energy (ex: une capacité coûtant 3 Sigils accorde 30 Photon energy).",
                    radiantShield: "Bien que ce ne soit pas techniquement une ressource, c'est notre mécanisme principal. Accorde un shield basé sur l'ATK du personnage, qui bloque 50% des dégâts entrants, avec les 50% restants frappant les HP. Peut accumuler un shield égal aux HP maximum (ex: 200,000 HP = 200,000 potentiel de shield max). NOTE : Ne scale PAS avec '%increase shield stat' mais scale avec 'shielding improvement from Versatility'."
                },
                talentPriority: "Le gameplay du Recovery Shield Knight se résume à établir nos buffs de survie clés aussi rapidement que possible, puis les maintenir aussi longtemps que possible. Nous devons faire cela tout en gardant les Sigils en cooldown en tout temps et en s'assurant que l'énergie Photon ne cap jamais. Jouer facilement : toujours alterner entre Valor Bash et Reckoning, et ne s'arrêter que pour garder au moins une charge de Shield Toss en cooldown, utiliser Extra Inferno Reckoning Triggers, Judgment quand l'énergie Photon est haute, ou utiliser Condemn quand disponible.",
                rotation: [
                    "Avant le combat : Valor Bash pour établir trois stacks de buff",
                    "Shield Toss pour gagner l'attention des ennemis, générer un énorme shield, appliquer 10% de réduction de dégâts et gagner 15% de Block",
                    "Optionnellement utiliser Aegis Ward si disponible (peut être sauvegardé comme cooldown de survie)",
                    "Optionnellement utiliser Radiant Infusion si disponible (peut être sauvegardé comme cooldown de survie)",
                    "Alterner entre utiliser Reckoning/Inferno Reckoning et Valor Bash pour établir le buff Reckon Shield (25% Block) et maintenir les buffs des deux compétences",
                    "Continuer à maintenir les buffs de Reckoning, Valor Bash, et Shield Toss tout en s'assurant de ne pas overcap l'énergie Photon en la vidant avec Judgment",
                    "Attaquer de base quand évoluée en Condemn pour récupérer des Sigils"
                ],
                talents: [
                    "Holy Light Time Limit",
                    "Holy Barrier",
                    "Reckon Blaze",
                    "Reckon Shield",
                    "Halo",
                    "Holy Summon",
                    "Ultimate Guard",
                    "Radiant Guard",
                    "Fearless Shield",
                    "Light's Crit",
                    "Aegis Ward Anthem",
                    "Aegis Ward's Retribution",
                    "Light Chain",
                    "Lightforged Greatsword"
                ]
            },
            {
                name: "Shield",
                description: "Le Shield Shield Knight se concentre entièrement sur le passif Lightforged Barrier et les capacités qui génèrent et consomment ce dernier. Il peut s'empiler de nombreuses fois, augmentant les PV max avec chaque stack. Il alimente aussi Zeal Crusade, une aura qui inflige des dégâts et soigne. Le shielding scale avec les PV max - avec Lightforged Barrier actif, ce spec atteint les plus gros boucliers que le jeu a à offrir, et Mastery boost encore le buff. Le Shield Shield Knight a de bons heals et peut survivre à de gros coups à cause de sa vie max élevée et de sa taille de shield. Malgré avoir un plafond de shield plus haut, sa génération de shield est ironiquement plus faible que le 'recovery spec'.",
                playstyle: "Le gameplay du Shield Shield Knight se concentre sur le maintien de Zeal Crusade et du buff Indomitable Courage, garder les Sigils en cooldown, et empêcher l'énergie Photon de cap pour atteindre le maximum de stacks Lightforged. Le but est de maintenir Zeal Crusade actif aussi longtemps que possible et rester dans le Divine Circle pour les heals gratuits et la réduction de dégâts.",
                bestSkills: {
                    basic: "Blade of Justice",
                    skill: "Vanguard Strike",
                    ultimate: "Radiant Infusion",
                    mandatory: [
                        { slot: 1, name: "Judgment", description: "Capacité de healing et shielding la plus puissante, consomme Photon Energy" },
                        { slot: 2, name: "Sacred Blade", description: "Génère des stacks Lightforged Barrier" },
                        { slot: 3, name: "Zeal Crusade", description: "Aura qui inflige des dégâts et soigne, à maintenir actif" },
                        { slot: 4, name: "Radiance", description: "Cooldown défensif à utiliser ou sauvegarder" }
                    ],
                    flex: []
                },
                resources: {
                    holySigil: "Notre ressource principale, avec 5 disponibles. Utilisé pour caster des capacités clés comme Vanguard Strike (nécessite 3 Holy Sigils) et Sacred Blade (nécessite 1 Holy Sigil). Chaque Sigil a son propre cooldown de 10 secondes après utilisation. Les talents et stats peuvent réduire les cooldowns des Sigils et les redonner gratuitement.",
                    photonEnergy: "Une ressource d'énergie bar utilisée pour la capacité de self-healing la plus puissante, Judgment. Peut contenir jusqu'à 100 (120 avec talents) Photon energy. Principalement gagné via les dépenseurs de Holy Sigil : chaque 1 Holy Sigil qu'une capacité coûte accorde 10 Photon energy (ex: une capacité coûtant 3 Sigils accorde 30 Photon energy).",
                    lightforgedBarrier: "Un buff stackable jusqu'à 10 fois baseline, dure 25 secondes et accorde 2% d'augmentation de PV max par stack. Être frappé réduit les stacks de 1, mais gagner n'importe quel montant de stacks rafraîchit sa durée. L'augmentation de HP est un vrai multiplicateur final, affectant d'autres HP% increase et HP plats sources. Peut être massivement amélioré par Mastery et est crucial pour de nombreuses capacités.",
                    radiantShield: "Bien que ce ne soit pas techniquement une ressource, c'est notre mécanisme principal. Un shield basé sur l'ATK du personnage qui bloque 50% des dégâts entrants, avec les 50% restants frappant les HP. Un shield égal aux PV maximum peut être accumulé (200,000 HP = 200,000 potentiel de shield max). Note : Dans la note extrême synergie entre Lightforged Barrier et Radiant Shield, plus grand total life pool augmente le potentiel de shield maximum possible. Il ne scale PAS avec '%increase shield stat' mais scale avec 'shielding improvement from Versatility'."
                },
                talentPriority: "Le gameplay du Shield Shield Knight se concentre sur le maintien de Zeal Crusade et du buff Indomitable Courage, garder les Sigils en cooldown, et empêcher l'énergie Photon de cap pour atteindre le maximum de stacks Lightforged.",
                rotation: [
                    "Optionnellement utiliser Radiance si disponible (peut être sauvegardé comme cooldown de survie)",
                    "Optionnellement utiliser Radiant Infusion si disponible (peut être sauvegardé comme cooldown de survie)",
                    "Utiliser Sacred Blade et Vanguard Strike pour établir 9 Lightforged Barrier",
                    "Utiliser Zeal Crusade",
                    "S'assurer que Photon Energy ne cap jamais en vidant avec Judgment",
                    "Spam Vanguard Hunt jusqu'à 10 stacks d'Indomitable Courage",
                    "Continuer à utiliser Sacred Blade quand possible, sinon utiliser les sigils sur Vanguard Hunt/Strike, vider toute Photon Energy dans Judgment",
                    "Utiliser Zeal Crusade quand disponible, objectif de le garder actif le plus longtemps possible",
                    "Continuer en tentant de rester debout dans le Divine Circle que vos Judgments invoquent pour des heals gratuits et de la réduction de dégâts"
                ],
                talents: [
                    "Resolved to Return",
                    "Bold Fearless",
                    "Conquest Pursuit",
                    "Divine Circle Chant",
                    "Zeal Haste",
                    "Wide Raid",
                    "Ruthless Rewind",
                    "Ultimate Conquest"
                ]
            }
        ]
    },
    "beat-performer": {
        name: "Beat Performer",
        role: "Support",
        description: "Excelle au combat à longue portée, utilisant une Guitare comme arme. Soigne tout en attaquant, excelle à accorder des buffs aux alliés, et possède d'excellentes capacités de support.",
        icon: Music,
        path: "/builds/beat-performer",
        specializations: [
            {
                name: "Dissonance",
                description: "Dissonance est la spé hybride du Beat Performer mélangeant le gameplay à distance et mêlée tout en combinant les soins et les dégâts en un seul package. La façon dont elle y parvient est grâce à sa capacité à soigner un pourcentage de tous les dégâts infligés. Grâce à cela, elle peut jouer de manière similaire à un DPS classique, se concentrant sur infliger autant de dégâts que possible tout en soutenant le groupe.",
                playstyle: "En échange de cela, Dissonance renonce à beaucoup de son potentiel de healing direct et s'appuie principalement sur l'attaque des ennemis, rendant les moments où ce n'est pas possible un peu étranges. Fidèle à l'identité du Beat Performer en tant que vraie classe de support du jeu, Dissonance a un buff puissant qui augmente l'efficacité de rupture de Résilience, aux côtés d'un multiplicateur de 15% de Dégâts Finaux quand les ennemis sont brisés, qui se multiplie en plus de toutes les autres sources de boost de dégâts.",
                bestSkills: {
                    basic: "String Strike",
                    skill: "Amplified Beat",
                    ultimate: "Infinite Rhapsody",
                    mandatory: [
                        { slot: 1, name: "Harmonic Anthem", description: "Maintenir avec au moins un Amplified Beat cast avant" },
                        { slot: 2, name: "Rhapsody of Flame", description: "Maintenir le graffiti up en tout temps" },
                        { slot: 3, name: "Heroic Melody", description: "Capacité de soins majeure, à maintenir en permanence" }
                    ],
                    flex: [
                        { slot: 4, name: "Encore", description: "Commencer toujours la rotation avec" },
                        { slot: 4, name: "Center Stage", description: "Alternative si utilisant ce build path" }
                    ]
                },
                resources: {
                    performanceEnergy: "Performance Energy est notre barre d'énergie, que nous consommons pour utiliser notre capacité de soins majeure, Heroic Melody. Nous avons un montant de base de 50 Énergie et un taux de régénération de 1 par seconde, mais les deux valeurs peuvent être augmentées dans notre arbre de talents.",
                    performancePassion: "Performance Passion est notre autre ressource, nécessaire pour nos capacités de dégâts les plus puissantes. En base, nous avons 5 notes et régénérons 1 toutes les 5 secondes. Nous possédons aussi un nombre de talents pour aider à récupérer cette ressource."
                },
                talentPriority: "Le Dissonance Spec n'a pas de rotation fixe car elle est largement basée sur des effets de Luck. Au lieu de cela, les capacités sont exécutées selon le système de priorité suivant : Maintenir Heroic Melody up en tout temps, rafraîchir toutes les 10 secondes > S'assurer que le graffiti de Rhapsody of Flames est up en tout temps et caster off cooldown > Infinite Rhapsody devrait être cast off cooldown mais peut être sauvegardée pour les urgences > Fierce Strike (String Strike amélioré) > Amplified Beat amélioré > Harmonic Anthem avec au moins un Amplified Beat cast avant. TIP : Les effets de talents qui reset ou discountent les coûts de capacités sont montrés par un effet rouge lumineux sur l'icône de la compétence. Caster ceux-ci quand disponibles est idéal.",
                rotation: [
                    "Commencer toujours la rotation avec Encore (ou Center Stage si utilisant ce build)",
                    "Maintenir Heroic Melody en permanence, le caster immédiatement après la capacité initiale",
                    "Maintenir Rhapsody of Flames up en tout temps",
                    "Utiliser les capacités améliorées entre les rafraîchissements des capacités de base",
                    "Caster Infinite Rhapsody off cooldown (peut être sauvegardée pour les urgences)",
                    "Utiliser Fierce Strike (String Strike amélioré)",
                    "Utiliser Amplified Beat amélioré",
                    "Utiliser Harmonic Anthem avec au moins un Amplified Beat cast avant"
                ],
                talents: [
                    "Dissonance Spec",
                    "Severed Chapter",
                    "Trio Rhapsody",
                    "Luck Multiplier",
                    "Swing Reflux",
                    "Restart",
                    "Indomitable Chord",
                    "Infinite Rhapsody",
                    "Flame Note",
                    "Encore Sharp Strike",
                    "Encore Chain",
                    "Concerto: Amplified Beat",
                    "Encore Luck Boost"
                ]
            },
            {
                name: "Concerto",
                description: "Le Concerto Spec vise à embrasser pleinement l'aspect supportif de la classe Beat Performer, avec de gros effets de burst healing fréquents. Il s'appuie sur les Critical Heals, qui à leur tour remboursent de gros cooldowns pour une uptime de soins continue.",
                playstyle: "Le buff de base de Concerto est fourni par Healing Melody. Cette capacité améliore les stats principales des alliés basées sur un pourcentage de notre propre stat Intellect. Les membres de notre équipe peuvent avoir leur stat d'échelle principal augmenté de 8%, 16% ou même un gros 32% selon la condition remplie. Le gameplay consiste à maintenir constamment Healing Melody et les bonus Passion Burst durant tout le combat, et activer Encore pendant les fenêtres de burst des alliés pour fournir un plus gros buff d'équipe (32% de l'Intellect du personnage).",
                bestSkills: {
                    basic: "String Strike",
                    skill: "Healing Beat",
                    ultimate: "Concert Circuit",
                    mandatory: [
                        { slot: 1, name: "Fivefold Crescendo", description: "Utiliser off cooldown pour refaire le plein de Performance Energy" },
                        { slot: 2, name: "Passion Burst", description: "Utiliser toutes les 10 secondes, toujours utiliser le Tier 1 pour un cast plus rapide" },
                        { slot: 3, name: "Healing Melody", description: "Maintenir actif en permanence pour le buff de stats" },
                        { slot: 4, name: "Encore", description: "Activer pendant les fenêtres de burst des alliés pour un effet de buff d'équipe plus large" }
                    ],
                    flex: []
                },
                resources: {
                    performanceEnergy: "Performance Energy est notre barre d'énergie, que nous consommerons pour utiliser notre capacité de healing majeure, Heroic Melody. Nous avons un montant de base de 50 Énergie et un taux de régénération de 1 par seconde, mais les deux valeurs peuvent être augmentées dans notre arbre de talents. L'énergie est très importante pour ce Spec car notre objectif est de maintenir Healing Melody.",
                    performancePassion: "Performance Passion est notre autre ressource, cette fois requise pour utiliser certaines capacités de cette classe, à la fois orientées dégâts et healing. En base, nous avons 5 notes et régénérons 1 toutes les 5 secondes."
                },
                talentPriority: "Maintenir constamment Healing Melody et les bonus Passion Burst durant tout le combat. Activer Encore pendant les fenêtres de burst des alliés pour fournir un plus gros buff d'équipe (32% de l'Intellect), visant approximativement 50% uptime de ce buff. Note : Les Imagines orientées buff comme Inferno Goblin Mage [A5] devraient être sauvegardées spécifiquement pour les fenêtres de burst DPS, pas utilisées on cooldown. Les Imagines orientées survie devraient être utilisées uniquement défensivement.",
                rotation: [
                    "Utiliser les Imagines disponibles si disponibles",
                    "Activer Healing Melody si pas déjà actif",
                    "Utiliser Encore",
                    "Utiliser Passion Burst",
                    "Positionner le Speaker (de Healing Melody) près du boss ou des alliés, désactiver dans les situations où les dégâts ou healing ne sont pas possibles",
                    "Prioriser Encore en coordination avec les fenêtres de burst DPS",
                    "Utiliser Passion Burst toutes les 10 secondes",
                    "Utiliser Fivefold Crescendo off cooldown pour refaire le plein de Performance Energy",
                    "Utiliser Healing Beat entre les autres capacités pour healing",
                    "Utiliser Rock the Stage (improved as Concert Circuit) pour burst healing en situations critiques",
                    "Utiliser String Strikes si aucune autre action à effectuer"
                ],
                talents: [
                    "Concerto Spec",
                    "Stat Resonance",
                    "Stat Resonance Crit",
                    "Stat Resonance Overload",
                    "Brilliant Charge",
                    "Passion Burst: Fervor",
                    "Crit Charge Rhythm",
                    "Sonic Verdict",
                    "Concert Circuit",
                    "Tower Resonance",
                    "Crit Healing",
                    "Encore Chain",
                    "Critical Encore"
                ]
            }
        ]
    }
};


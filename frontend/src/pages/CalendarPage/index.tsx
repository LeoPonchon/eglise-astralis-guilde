import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./CalendarPage.module.css";
import { cn } from "@/lib/utils";

const CalendarPage = () => {
    const { events, loading } = useEvents();
    const { t, getLocale } = useLanguage();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [hidePastEvents, setHidePastEvents] = useState(false);

    type EventType = "raid" | "world_boss" | "event" | "recurring";
    const getTypeColor = (type: EventType) => {
        const colors: Record<string, string> = {
            raid: "rgb(168, 85, 247)",
            world_boss: "rgb(234, 179, 8)",
            event: "rgb(59, 130, 246)",
            recurring: "rgb(34, 197, 94)",
        };
        return colors[type] || "rgb(59, 130, 246)";
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { firstDay, lastDay, daysInMonth, startingDayOfWeek };
    };

    const isEventPast = (event: typeof events[0]): boolean => {
        const eventDateTime = new Date(event.date + "T" + event.time);
        const now = new Date();
        return eventDateTime < now;
    };

    const getEventsForDate = (date: Date) => {
        // Utiliser les méthodes locales pour éviter les problèmes de fuseau horaire
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        let dayEvents = events.filter(event => event.date === dateStr);
        // Filtrer les événements passés si hidePastEvents est activé
        if (hidePastEvents) {
            dayEvents = dayEvents.filter(event => !isEventPast(event));
        }
        // Trier les événements par heure (du plus tôt au plus tard)
        return dayEvents.sort((a, b) => a.time.localeCompare(b.time));
    };

    const getEventsForSelectedDate = () => {
        if (!selectedDate) return [];
        return getEventsForDate(selectedDate);
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' });
    const weekDays = getLocale() === 'fr-FR' ? ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Générer les jours du mois avec les jours précédents/suivants pour compléter
    const days: (Date | null)[] = [];

    // Ajouter les jours vides du début
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }

    // Ajouter les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    // Ajouter les jours vides de la fin pour compléter la grille
    const remainingDays = 42 - days.length; // 6 semaines × 7 jours
    for (let i = 1; i <= remainingDays; i++) {
        days.push(null);
    }

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.contentWrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.headerTop}>
                            <CalendarIcon style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
                            <h1 className={styles.title}>{t('calendar.title')}</h1>
                        </div>
                        <p className={styles.subtitle}>
                            {t('calendar.subtitle')}
                        </p>
                    </div>

                    {loading && (
                        <div className={styles.loading}>
                            <p className={styles.loadingText}>{t('calendar.loading')}</p>
                        </div>
                    )}

                    <Card className={styles.calendarCard}>
                        <div className={styles.calendarHeader}>
                            <button
                                onClick={() => navigateMonth('prev')}
                                className={styles.navButton}
                            >
                                <ChevronLeft style={{ width: 24, height: 24 }} />
                            </button>
                            <h2 className={styles.calendarTitle}>{monthName}</h2>
                            <button
                                onClick={() => navigateMonth('next')}
                                className={styles.navButton}
                            >
                                <ChevronRight style={{ width: 24, height: 24 }} />
                            </button>
                        </div>
                        <div className={styles.calendarControls}>
                            <label className={styles.toggleLabel}>
                                <input
                                    type="checkbox"
                                    checked={hidePastEvents}
                                    onChange={(e) => setHidePastEvents(e.target.checked)}
                                    className={styles.toggleInput}
                                />
                                <span>{t('calendar.hidePast')}</span>
                            </label>
                        </div>

                        <div className={styles.calendarGrid}>
                            {weekDays.map((day, index) => (
                                <div key={index} className={styles.weekDay}>
                                    {day}
                                </div>
                            ))}

                            {/* Jours du mois */}
                            {days.map((day, index) => {
                                if (!day) {
                                    return <div key={index} className={styles.emptyDay} />;
                                }

                                const dayEvents = getEventsForDate(day);
                                const isToday = day.toDateString() === new Date().toDateString();
                                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

                                return (
                                    <Card
                                        key={index}
                                        onClick={() => dayEvents.length > 0 && setSelectedDate(day)}
                                        className={cn(
                                            styles.dayCard,
                                            dayEvents.length > 0 && styles.clickable,
                                            isToday && styles.today,
                                            !isCurrentMonth && styles.notCurrentMonth
                                        )}
                                    >
                                        <div className={cn(styles.dayNumber, isToday && styles.today)}>
                                            {day.getDate()}
                                        </div>
                                        <div className={styles.eventsContainer}>
                                            {dayEvents.slice(0, 3).map(event => (
                                                <div
                                                    key={event.id}
                                                    className={styles.eventBadge}
                                                    style={{ backgroundColor: getTypeColor(event.type) }}
                                                    title={event.title}
                                                >
                                                    {event.title}
                                                </div>
                                            ))}
                                            {dayEvents.length > 3 && (
                                                <div className={styles.moreEvents}>
                                                    +{dayEvents.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Liste des événements du mois */}
                    <div className={styles.eventsList}>
                        <h3 className={styles.eventsListTitle}>{t('calendar.events.month')} {monthName}</h3>
                        {events
                            .filter(event => {
                                const eventDate = new Date(event.date);
                                const isInCurrentMonth = eventDate.getMonth() === currentMonth.getMonth() &&
                                    eventDate.getFullYear() === currentMonth.getFullYear();
                                if (!isInCurrentMonth) return false;
                                if (hidePastEvents && isEventPast(event)) return false;
                                return true;
                            })
                            .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
                            .map(event => (
                                <Card key={event.id} className={styles.eventCard}>
                                    <div className={styles.eventContent}>
                                        <div className={styles.eventIndicator} style={{ backgroundColor: getTypeColor(event.type) }} />
                                        <div className={styles.eventDetails}>
                                            <div className={styles.eventHeader}>
                                                <h4 className={styles.eventTitle}>{event.title}</h4>
                                                <Badge style={{ backgroundColor: getTypeColor(event.type) }}>{event.type}</Badge>
                                            </div>
                                            {event.description && (
                                                <p className={styles.eventDescription}>{event.description}</p>
                                            )}
                                            <div className={styles.eventMeta}>
                                                <div className={styles.eventMetaItem}>
                                                    <CalendarIcon style={{ width: 16, height: 16 }} />
                                                    {new Date(event.date).toLocaleDateString(getLocale(), {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long'
                                                    })}
                                                </div>
                                                <div className={styles.eventMetaItem}>
                                                    <Clock style={{ width: 16, height: 16 }} />
                                                    <span>{t('calendar.event.start')} {event.time}</span>
                                                    <span className={styles.separator}>•</span>
                                                    <span>{t('calendar.event.duration')} {event.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                    </div>

                    <Card className={styles.legendCard}>
                        <h4 className={styles.legendTitle}>{t('calendar.legend.title')}</h4>
                        <div className={styles.legendItems}>
                            <div className={styles.legendItem}>
                                <div className={styles.legendColor} style={{ backgroundColor: 'rgb(168, 85, 247)' }}></div>
                                <span className={styles.legendLabel}>{t('calendar.legend.raid')}</span>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={styles.legendColor} style={{ backgroundColor: 'rgb(234, 179, 8)' }}></div>
                                <span className={styles.legendLabel}>{t('calendar.legend.worldBoss')}</span>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={styles.legendColor} style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
                                <span className={styles.legendLabel}>{t('calendar.legend.event')}</span>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={styles.legendColor} style={{ backgroundColor: 'rgb(34, 197, 94)' }}></div>
                                <span className={styles.legendLabel}>{t('calendar.legend.recurring')}</span>
                            </div>
                        </div>
                    </Card>

                    <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
                        <DialogContent style={{ maxWidth: 640 }}>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedDate && selectedDate.toLocaleDateString(getLocale(), {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </DialogTitle>
                            </DialogHeader>
                            <div className={styles.dialogEventsList}>
                                {getEventsForSelectedDate().length === 0 ? (
                                    <p className={styles.noEvents}>
                                        {t('calendar.dialog.noEvents')}
                                    </p>
                                ) : (
                                    getEventsForSelectedDate().map(event => (
                                        <Card key={event.id} style={{ padding: 16 }}>
                                            <div className={styles.eventContent}>
                                                <div className={styles.eventIndicator} style={{ backgroundColor: getTypeColor(event.type) }} />
                                                <div className={styles.eventDetails}>
                                                    <div className={styles.eventHeader}>
                                                        <h4 style={{ fontSize: 18, fontWeight: 700, color: 'hsl(var(--foreground))' }}>{event.title}</h4>
                                                        <Badge style={{ backgroundColor: getTypeColor(event.type) }}>{event.type}</Badge>
                                                    </div>
                                                    {event.description && (
                                                        <p className={styles.eventDescription}>{event.description}</p>
                                                    )}
                                                    <div className={styles.eventMeta}>
                                                        <div className={styles.eventMetaItem}>
                                                            <Clock style={{ width: 16, height: 16 }} />
                                                            <span>{t('calendar.event.start')} {event.time}</span>
                                                            <span className={styles.separator}>•</span>
                                                            <span>{t('calendar.event.duration')} {event.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CalendarPage;


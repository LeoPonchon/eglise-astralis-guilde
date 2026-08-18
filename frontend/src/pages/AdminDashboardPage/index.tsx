import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { apiCreateEvent, apiDeleteEvent, apiUpdateEvent } from "@/lib/api";
import { useEvents, type Event } from "@/hooks/useEvents";
import styles from "./AdminDashboardPage.module.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/Dialog";
import {
    Calendar as CalendarIcon,
    Clock,
    Plus,
    Trash2,
    Edit2,
    LogOut,
    Shield,
} from "lucide-react";

const AdminDashboardPage = () => {
    const { isAuthenticated, logout } = useAuth();
    const { t, getLocale } = useLanguage();
    const navigate = useNavigate();
    const { events, loading, error, fetchEvents } = useEvents();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [hidePastEvents, setHidePastEvents] = useState(false);
    const [formData, setFormData] = useState<Partial<Event>>({
        title: "",
        date: "",
        time: "",
        duration: "00:30",
        type: "raid",
        description: "",
    });

    // Rediriger si non authentifié
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/admin/login");
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const handleAddEvent = () => {
        setEditingEvent(null);
        setFormData({
            title: "",
            date: "",
            time: "",
            duration: "",
            type: "raid",
            description: "",
        });
        setIsDialogOpen(true);
    };

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setFormData(event);
        setIsDialogOpen(true);
    };

    const handleDeleteEvent = async (id: string) => {
        if (!window.confirm(t('admin.dashboard.delete.confirm'))) return;
        try {
            await apiDeleteEvent(id);
            fetchEvents();
        } catch (error: any) {
            console.error('Erreur lors de la suppression:', error);
            alert(error?.message || 'Une erreur est survenue');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                title: formData.title!,
                date: formData.date!,
                time: formData.time!,
                duration: formData.duration!,
                type: formData.type!,
                description: formData.description ?? null,
            };

            if (editingEvent) {
                await apiUpdateEvent(editingEvent.id, payload);
            } else {
                await apiCreateEvent(payload as any);
            }

            setIsDialogOpen(false);
            setFormData({
                title: "",
                date: "",
                time: "",
                duration: "",
                type: "raid",
                description: "",
            });
            fetchEvents();
        } catch (error: any) {
            console.error('Erreur lors de l\'enregistrement:', error);
            alert(error?.message || 'Une erreur est survenue');
        }
    };

    const getTypeColor = (type: Event["type"]) => {
        const colors: Record<Event["type"], string> = {
            raid: "rgb(168, 85, 247)",
            world_boss: "rgb(234, 179, 8)",
            event: "rgb(59, 130, 246)",
            recurring: "rgb(34, 197, 94)",
        } as const;
        return colors[type] || "rgb(59, 130, 246)";
    };

    const isEventPast = (event: Event): boolean => {
        const eventDateTime = new Date(event.date + "T" + event.time);
        const now = new Date();
        return eventDateTime < now;
    };

    const filteredEvents = hidePastEvents
        ? events.filter((event) => !isEventPast(event))
        : events;

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const dateA = new Date(a.date + "T" + a.time);
        const dateB = new Date(b.date + "T" + b.time);
        return dateA.getTime() - dateB.getTime();
    });

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerLeft}>
                        <Shield style={{ width: 32, height: 32, color: 'hsl(var(--primary))' }} />
                        <div>
                            <h1 className={styles.headerText}>
                                {t('admin.dashboard.title')}
                            </h1>
                            <p className={styles.headerSubtext}>
                                {t('admin.dashboard.subtitle')}
                            </p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <Button variant="outline" onClick={() => navigate("/calendar")}>
                            {t('admin.dashboard.viewCalendar')}
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut style={{ width: 16, height: 16, marginRight: 8 }} />
                            {t('admin.dashboard.logout')}
                        </Button>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.topSection}>
                    <div>
                        <h2 className={styles.title}>
                            {t('admin.dashboard.events.title')}
                        </h2>
                        <p className={styles.subtitle}>
                            {loading ? t('admin.dashboard.events.loading') : `${sortedEvents.length} ${sortedEvents.length > 1 ? t('admin.dashboard.events.countPlural') : t('admin.dashboard.events.count')} ${t('admin.dashboard.events.total')}`}
                            {error && <span className={styles.error}>{error}</span>}
                        </p>
                    </div>
                    <div className={styles.topSectionActions}>
                        <label className={styles.toggleLabel}>
                            <input
                                type="checkbox"
                                checked={hidePastEvents}
                                onChange={(e) => setHidePastEvents(e.target.checked)}
                                className={styles.toggleInput}
                            />
                            <span>{t('admin.dashboard.events.hidePast')}</span>
                        </label>
                        <Button onClick={handleAddEvent} size="lg">
                            <Plus style={{ width: 20, height: 20, marginRight: 8 }} />
                            {t('admin.dashboard.events.add')}
                        </Button>
                    </div>
                </div>

                <div className={styles.eventsGrid}>
                    {sortedEvents.length === 0 ? (
                        <Card className={styles.emptyCard}>
                            <p className={styles.emptyText}>
                                {t('admin.dashboard.events.empty')}
                            </p>
                        </Card>
                    ) : (
                        sortedEvents.map((event) => (
                            <Card key={event.id} className={styles.eventCard}>
                                <div className={styles.eventContent}>
                                    <div className={styles.eventIndicator} style={{ backgroundColor: getTypeColor(event.type) }} />
                                    <div className={styles.eventDetails}>
                                        <div className={styles.eventHeader}>
                                            <div>
                                                <h3 className={styles.eventTitle}>
                                                    {event.title}
                                                </h3>
                                                <Badge>{event.type}</Badge>
                                            </div>
                                            <div className={styles.eventActions}>
                                                <Button variant="outline" size="icon" onClick={() => handleEditEvent(event)}>
                                                    <Edit2 style={{ width: 16, height: 16 }} />
                                                </Button>
                                                <Button variant="outline" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                                                    <Trash2 style={{ width: 16, height: 16 }} />
                                                </Button>
                                            </div>
                                        </div>
                                        {event.description && (
                                            <p className={styles.eventDescription}>
                                                {event.description}
                                            </p>
                                        )}
                                        <div className={styles.eventMeta}>
                                            <div className={styles.eventMetaItem}>
                                                <CalendarIcon style={{ width: 16, height: 16 }} />
                                                {new Date(event.date).toLocaleDateString(getLocale(), {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </div>
                                            <div className={styles.eventMetaItem}>
                                                <Clock style={{ width: 16, height: 16 }} />
                                                {event.time} ({event.duration})
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent style={{ maxWidth: 640 }}>
                    <DialogHeader>
                        <DialogTitle>
                            {editingEvent ? t('admin.dashboard.dialog.edit') : t('admin.dashboard.dialog.add')}
                        </DialogTitle>
                        <DialogDescription>
                            {t('admin.dashboard.dialog.description')}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formSection}>
                            <Label htmlFor="title">{t('admin.dashboard.form.title')} *</Label>
                            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder={t('admin.dashboard.form.titlePlaceholder')} />
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formSection}>
                                <Label htmlFor="date">{t('admin.dashboard.form.date')} *</Label>
                                <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                            </div>
                            <div className={styles.formSection}>
                                <Label htmlFor="time">{t('admin.dashboard.form.time')} *</Label>
                                <Input id="time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formSection}>
                                <Label htmlFor="duration">{t('admin.dashboard.form.duration')} *</Label>
                                <Input id="duration" type="time" step="60" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required placeholder="00:30" />
                            </div>
                            <div className={styles.formSection}>
                                <Label htmlFor="type">{t('admin.dashboard.form.type')} *</Label>
                                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as Event["type"] })}>
                                    <SelectTrigger id="type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="raid">{t('admin.dashboard.form.type.raid')}</SelectItem>
                                        <SelectItem value="world_boss">{t('admin.dashboard.form.type.worldBoss')}</SelectItem>
                                        <SelectItem value="event">{t('admin.dashboard.form.type.event')}</SelectItem>
                                        <SelectItem value="recurring">{t('admin.dashboard.form.type.recurring')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <Label htmlFor="description">{t('admin.dashboard.form.description')}</Label>
                            <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={t('admin.dashboard.form.descriptionPlaceholder')} className={styles.textarea} />
                        </div>

                        <div className={styles.formActions}>
                            <Button type="button" variant="outline" size="lg" onClick={() => setIsDialogOpen(false)}>
                                {t('admin.dashboard.form.cancel')}
                            </Button>
                            <Button type="submit" size="lg">
                                {editingEvent ? t('admin.dashboard.form.save') : t('admin.dashboard.form.create')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminDashboardPage;


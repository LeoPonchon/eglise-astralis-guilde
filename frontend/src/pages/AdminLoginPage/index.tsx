import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Landmark, Lock, User, AlertCircle } from "lucide-react";
import styles from "./AdminLoginPage.module.css";

const AdminLoginPage = () => {
    const { t } = useLanguage();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                navigate("/admin/dashboard");
            } else {
                setError(t('admin.login.error'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.iconWrap}>
                        <Landmark style={{ width: 64, height: 64, color: 'hsl(var(--primary))' }} />
                        <div className={styles.iconGlow} />
                    </div>
                    <h1 className={styles.title}>
                        {t('admin.login.title')}
                    </h1>
                    <p className={styles.subtitle}>{t('admin.login.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <Label htmlFor="username" className={styles.label}>
                            <User style={{ width: 16, height: 16 }} />
                            {t('admin.login.username')}
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder={t('admin.login.usernamePlaceholder')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.field}>
                        <Label htmlFor="password" className={styles.label}>
                            <Lock style={{ width: 16, height: 16 }} />
                            {t('admin.login.password')}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder={t('admin.login.passwordPlaceholder')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className={styles.error}>
                            <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                            <p className={styles.errorText}>{error}</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        style={{ width: '100%' }}
                        disabled={isLoading}
                    >
                        {isLoading ? t('admin.login.loading') : t('admin.login.submit')}
                    </Button>
                </form>

                <div className={styles.backLink}>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className={styles.backButton}
                    >
                        {t('admin.login.back')}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AdminLoginPage;

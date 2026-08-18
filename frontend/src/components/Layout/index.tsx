import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;


import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import styles from "./Index.module.css";

const Index = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;

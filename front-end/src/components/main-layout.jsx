import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative py-20 mx-auto">
        {children}

        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-transparent to-transparent pointer-events-none -z-10" />
      </main>
      <Footer />
    </>
  );
}

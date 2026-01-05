import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Navbar */}
      <nav className="relative z-50">
        <NavBar />
      </nav>

      {/* Main Content */}
      <main className="grow container mx-auto pt-5 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

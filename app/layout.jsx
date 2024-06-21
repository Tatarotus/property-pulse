import "@/assets/styles/global.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find your next property",
  keywords: ["property", "pulse"],
};

function MainLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head />
        <body>
          <Navbar />
          {children}
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}

export default MainLayout;

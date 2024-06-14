import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar.jsx";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find your next property",
  keywords: ["property", "pulse"],
};

function MainLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export default MainLayout;

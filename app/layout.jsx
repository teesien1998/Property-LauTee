import "@/assets/styles/global.css";

export const metadata = {
  title: "Property LauTee",
  description: "Find The Perfect Rental Property",
  keywords: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;

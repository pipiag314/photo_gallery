import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home"); /* navigate to home page every time we hit "/" endpoint */
  }, []);

  return (
    <main>
      <header className="header">
        <Navbar />
      </header>
      <Outlet />
    </main>
  );
};
export default RootLayout;

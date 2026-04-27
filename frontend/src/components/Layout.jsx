import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import NewFooter from "./newFooter";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pt-[6.5rem] lg:pt-[7rem]">
      <Header />
      <main>
        <Outlet />
      </main>
      <NewFooter />
    </div>
  );
};

export default Layout;

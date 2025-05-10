import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";

const MainLayout = () => {
  const location = useLocation();


  
  const excludedPaths = ["/login", "/registration"];

  const isExcluded = excludedPaths.includes(location.pathname);

  return (
    <>
      {!isExcluded && <Header />}
      <Outlet />
      {!isExcluded && <Footer />}
    </>
  );
};

export default MainLayout;

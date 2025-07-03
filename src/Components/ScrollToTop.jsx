import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get current path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the pathname changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;


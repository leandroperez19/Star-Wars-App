import { useState, useEffect } from "react";

export const useScreen = (width: number) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < width);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isMobile,
  };
};
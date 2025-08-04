import { useEffect, useState } from "react";

export const useNavigatorInfo = () => {
  const [info, setInfo] = useState({
    userAgent: "",
    platform: "",
    language: "",
  });

  useEffect(() => {
    const navigatorInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };

    setInfo(navigatorInfo);
  }, []);

  return info;
};

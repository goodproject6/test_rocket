import { useEffect, useState } from "react";


const RECAPTCHA_KEY = "6LdR2yQnAAAAAP37ga9-YVVMiMehhP1ut-q1uKkX"
const showBadge = () => {
  if (!window.grecaptcha) return;
  window.grecaptcha.ready(() => {
    const badge = document.getElementsByClassName("grecaptcha-badge")[0];
    if (!badge) return;
    badge.style.display = "block";
    badge.style.zIndex = "1";
  });
};

export const hideBadge = () => {
  if (!window.grecaptcha) return;
  window.grecaptcha.ready(() => {
    const badge = document.getElementsByClassName("grecaptcha-badge")[0];
    if (!badge) return;
    badge.style.display = "none";
  });
};

const useReCaptcha = () => {
  const [reCaptchaLoaded, setReCaptchaLoaded] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || reCaptchaLoaded) return;
    if (window.grecaptcha) {
      showBadge();
      setReCaptchaLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;

    const handleScriptLoad = () => {
      setReCaptchaLoaded(true);
      showBadge();
    };
    script.addEventListener("load", handleScriptLoad);
    document.body.appendChild(script);
    return () => {
      script.removeEventListener("load", handleScriptLoad);
    };
  }, [reCaptchaLoaded]);

  useEffect(() => hideBadge, []);

  const generateReCaptchaToken = (action) => {
    return new Promise((resolve, reject) => {
      if (!reCaptchaLoaded) return reject(new Error("ReCaptcha not loaded"));
      if (typeof window === "undefined" || !window.grecaptcha) {
        setReCaptchaLoaded(false);
        return reject(new Error("ReCaptcha not loaded"));
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_KEY, { action })
          .then((token) => {
            resolve(token);
            return token;
          });
      });
    });
  };

  return { reCaptchaLoaded, generateReCaptchaToken };
};

export default useReCaptcha;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: { translation: {
    home: "Home", network: "Network", linux: "Linux", pro: "Pro / Security",
    ctf: "CTF Arena", progress: "Progress", settings: "Settings",
    theme: "Theme", chooseTheme: "Choose your theme",
    welcome: "welcome back, hacker_",
    heroTitle: "Become a pro in", heroTitleAccent: "Network & Security",
    heroSubtitle: "Interactive platform to learn network, linux and security — offline, fast, professional.",
    startNow: "Start now", lessons: "lessons",
    settingsSubtitle: "Customize your experience",
    danger: "Danger Zone", resetProgress: "Reset all progress",
    resetConfirm: "Are you sure? This will wipe all XP.",
    about: "About", version: "Version", terminal: "Linux Terminal",
  }},
};
i18n.use(initReactI18next).init({ resources, lng: "en", fallbackLng: "en", interpolation: { escapeValue: false } });
export default i18n;

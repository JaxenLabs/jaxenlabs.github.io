import type { AppInfo } from "@/content/types";
import { privacy } from "./privacy";
import { store } from "./store";

/**
 * SmartUmmah: `/smartummah/`. Features follow the app's home tiles
 * (AppStrings.kt). The app has no Terms, so neither does the site.
 */
export const smartummah: AppInfo = {
  slug: "smartummah",
  name: "SmartUmmah",
  tagline: store.shortDescription,
  description: store.intro.join(" "),
  iconSrc: "/smartummah/icon.png",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.jaxenlabs.smartummah",
  downloads: "10+",
  category: "LifestyleApplication",
  keywords: ["prayer times", "Qibla direction", "Hijri calendar", "Quran app", "dua and dhikr", "tasbeeh counter", "Bangla Islamic app"],
  features: [
    {
      title: "Accurate prayer times",
      icon: "clock",
      text: "Precise Salah timings for your location, with notification alerts and Hanafi or Shafi'i calculation.",
    },
    {
      title: "Smart Qibla finder",
      icon: "compass",
      text: "A smooth, interactive Qibla compass to find the direction of the Kaaba from anywhere.",
    },
    {
      title: "Digital Tasbeeh counter",
      icon: "counter",
      text: "Set targets of 33, 99 or 100 with preset phrases like SubhanAllah, Alhamdulillah and Allahu Akbar.",
    },
    {
      title: "Dua and Dhikr library",
      icon: "heart",
      text: "Daily supplications and morning and evening Dhikr for protection, success and peace of mind.",
    },
    {
      title: "99 Names of Allah",
      icon: "book",
      text: "Asmaul Husna in Arabic script with English and Bangla transliterations, audio and meanings.",
    },
    {
      title: "Voice search and mosque finder",
      icon: "globe",
      text: "Find Surahs, locate nearby masjids or navigate the app hands-free with voice commands.",
    },
  ],
  store,
  privacy,
};

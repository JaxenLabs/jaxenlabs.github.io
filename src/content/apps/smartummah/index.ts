import type { AppInfo } from "@/content/types";
import { privacy } from "./privacy";

/**
 * SmartUmmah: `/smartummah/`. Features follow the app's home tiles
 * (AppStrings.kt). The app has no Terms, so neither does the site.
 */
export const smartummah: AppInfo = {
  slug: "smartummah",
  name: "SmartUmmah",
  tagline: "Prayer times, Qibla, Hijri calendar and daily adhkar, all in one app.",
  description:
    "SmartUmmah brings prayer times, the Qibla direction, the Hijri calendar, the Quran and daily adhkar together in one calm app, in English and Bangla. Prayer times are calculated on your phone, with no account and no ads.",
  iconSrc: "/smartummah/icon.png",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.jaxenlabs.smartummah",
  features: [
    {
      title: "Prayer times",
      icon: "clock",
      text: "Daily salah times calculated on your device, for your calculation method, with Hanafi or Shafi'i Asr and Adhan reminders.",
    },
    {
      title: "Al-Quran",
      icon: "book",
      text: "Read and listen to the Noble Quran, all 114 Surahs.",
    },
    {
      title: "Qibla direction",
      icon: "compass",
      text: "A compass that points you to the Qibla wherever you are.",
    },
    {
      title: "Hijri calendar",
      icon: "calendar",
      text: "The Islamic calendar with events such as Ramadan, Laylat al-Qadr and the Eids.",
    },
    {
      title: "Dua and Dhikr",
      icon: "heart",
      text: "Essential supplications and Masnoon azkar for daily remembrance.",
    },
    {
      title: "Tasbeeh counter",
      icon: "counter",
      text: "A digital counter for your dhikr, always at hand.",
    },
  ],
  privacy,
};

import type { AppInfo } from "@/content/types";
import { store } from "./store";

/**
 * Baby Shop: `/babyshop/`. A client project, published on Google Play by its
 * owner, so the site has no Privacy Policy or Terms for it. Wording follows
 * its Play listing (store.ts).
 */
export const babyshop: AppInfo = {
  slug: "babyshop",
  name: "Baby Shop",
  client: "Baby Shop Limited",
  tagline: store.shortDescription,
  description: store.intro.join(" "),
  iconSrc: "/babyshop/icon.png",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.babyshopltd.app",
  downloads: "5K+",
  category: "ShoppingApplication",
  keywords: ["Baby Shop Limited", "kids fashion app", "baby clothing app", "kids clothing Bangladesh", "children fashion store"],
  features: [
    {
      title: "Kids fashion for every age",
      icon: "heart",
      text: "Newborn baby clothing, infant and toddler outfits, and boys and girls clothing up to 16 years.",
    },
    {
      title: "Easy browsing",
      icon: "layers",
      text: "A clean and simple interface to view product images, updated prices and descriptions.",
    },
    {
      title: "New arrivals and trends",
      icon: "spark",
      text: "Explore new arrivals, trending kids fashion and seasonal collections.",
    },
    {
      title: "No login required",
      icon: "lock",
      text: "Browse children clothing collections freely, with no login or registration.",
    },
    {
      title: "Order via official channels",
      icon: "globe",
      text: "Order through the official website, Facebook page, Instagram or WhatsApp.",
    },
    {
      title: "Ages 0–16",
      icon: "device",
      text: "Casual wear, party wear and coordinated sets, from newborn to teens.",
    },
  ],
  store,
};

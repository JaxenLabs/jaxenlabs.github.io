import type { AppInfo } from "@/content/types";
import { privacy } from "./privacy";
import { terms } from "./terms";

/** JaxScan: `/jaxscan/`. Wording follows the Play Store listing (playstore_description.md). */
export const jaxscan: AppInfo = {
  slug: "jaxscan",
  name: "JaxScan",
  tagline: "A private document scanner that keeps every scan on your phone.",
  description:
    "JaxScan is a private document scanner and PDF scanner app that keeps every scan on your phone. Scan documents to PDF in seconds, extract text with offline OCR, sign and edit PDFs, and scan QR codes — with no account, no sign-up, no ads and no cloud upload.",
  iconSrc: "/jaxscan/icon.png",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.jaxenlabs.scanai",
  category: "BusinessApplication",
  keywords: ["document scanner", "PDF scanner", "offline OCR", "scan to PDF", "QR code scanner", "private scanner app"],
  features: [
    {
      title: "Private and secure",
      icon: "offline",
      text: "Your documents never leave your phone. Scans, text and signatures are stored privately in the app and never uploaded.",
    },
    {
      title: "Scan to PDF",
      icon: "doc",
      text: "One camera, 6 modes: Scan, Extract Text, ID Card, Business Card, Sign and Erase Object, plus a live QR code scanner.",
    },
    {
      title: "Offline OCR",
      icon: "text",
      text: "Extract text from images on your device, in Latin-script languages, Hindi, Chinese, Japanese, Korean and more.",
    },
    {
      title: "PDF tools",
      icon: "repeat",
      text: "Convert images to PDF, Word or PowerPoint, and PDFs to images, Word, PPT or text.",
    },
    {
      title: "Sign, redact and lock",
      icon: "sign",
      text: "Draw your signature once and reuse it, redact what must stay hidden, and lock PDFs with AES-256 passwords.",
    },
    {
      title: "QR and barcodes",
      icon: "qr",
      text: "QR, Aztec, Data Matrix, PDF417, EAN, UPC and Code 128/39, live or from saved photos.",
    },
  ],
  privacy,
  terms,
};

import type { AppInfo } from "@/content/types";
import { privacy } from "./privacy";
import { terms } from "./terms";

/** JaxBudget: `/jaxbudget/`. */
export const jaxbudget: AppInfo = {
  slug: "jaxbudget",
  name: "JaxBudget",
  tagline: "Expenses, budgets and subscriptions, kept on your phone.",
  description:
    "JaxBudget is an offline-first personal finance app. Record expenses and income, set budgets, track subscriptions and get renewal reminders. No account, no ads, and your ledger never leaves your device unless you back it up yourself.",
  iconSrc: "/jaxbudget/icon.png",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.jaxenlabs.jaxbudget",
  features: [
    {
      title: "Offline first",
      text: "Everything is stored in a private database on your device. No account and no servers.",
    },
    {
      title: "Budgets and insights",
      text: "Monthly and category budgets with clear warnings before you overspend.",
    },
    {
      title: "Subscriptions",
      text: "Track renewals and get local reminders before you are charged.",
    },
    {
      title: "Camera and Voice Scan",
      text: "Read receipts on the device with ML Kit, or just say what you spent.",
    },
    {
      title: "Backup your way",
      text: "Save a backup file anywhere, or to a private folder in your own Google Drive.",
    },
    {
      title: "App lock",
      text: "Protect the app with your fingerprint, face, PIN or pattern.",
    },
  ],
  googleDataUse: {
    title: "How JaxBudget uses your Google account",
    paragraphs: [
      "JaxBudget asks you to sign in with Google only when you choose to back up to Google Drive (Settings > Backup and restore > Cloud backup). Signing in is never required to use the app.",
      'The app requests the "drive.appdata" permission, which gives it access only to a hidden folder in your Google Drive that belongs to JaxBudget. It cannot see, read or change any other file in your Drive. It also reads your basic account details so it can show which account is connected.',
      "Backups go straight from your phone to your own Drive. JaxBudget has no servers and we never receive, store or share your Google data or your backups. You can disconnect at any time, and delete the backups from Google Drive (Settings > Manage apps > JaxBudget > Delete hidden app data).",
    ],
  },
  privacy,
  terms,
};

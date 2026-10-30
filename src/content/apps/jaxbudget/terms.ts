import { site } from "@/content/site";
import { p, ul, type LegalDocument } from "@/content/types";

/**
 * JaxBudget's Terms & Conditions. Copied from the app's `LegalContent.terms`
 * (legal_content.dart); keep the two in step and update the date together.
 */
export const terms: LegalDocument = {
  title: "Terms & Conditions",
  effectiveDate: "29 October 2026",
  intro:
    'These terms are an agreement between you and the developer of JaxBudget ("we", "us") about your use of the JaxBudget mobile app (the "App"). By installing or using the App you accept them. If you do not agree, please do not use the App.',
  sections: [
    {
      heading: "1. What the App does",
      blocks: [
        p(
          "JaxBudget helps you record expenses and income, keep track of subscriptions, set budgets and scan receipts. It is a personal record-keeping tool.",
        ),
      ],
    },
    {
      heading: "2. Not financial, tax or legal advice",
      blocks: [
        p(
          "Totals, budgets, warnings and tips in the App are calculated only from what you enter. They are not financial, accounting, tax or legal advice, and we do not check them against any law or tax rule. Consult a qualified professional before relying on any figure for a tax return or a financial decision.",
        ),
      ],
    },
    {
      heading: "3. Your data and your responsibility",
      blocks: [
        p(
          "Your ledger is stored on your device, and in your own Google Drive only if you back it up there. We do not run an account system or keep a copy on our servers, so we cannot restore data that is lost. In particular:",
        ),
        ul(
          "Uninstalling the App, clearing its storage, or losing or resetting your device deletes your data permanently, unless you kept a backup.",
          "Changing your currency in Settings erases every transaction, subscription and budget, because amounts are never converted between currencies. The App asks you to confirm first.",
          '"Erase all data" in Settings cannot be undone.',
          "Settings > Backup and restore saves a copy of your data to a file you choose (free) or to your own Google Drive (part of JaxBudget Pro). Restoring from either is always free. Backups are made only when you tap a backup button; nothing is backed up automatically. Keeping a copy somewhere other than your device is up to you. Restoring a backup replaces everything in the App with the backup's contents.",
          "Google Drive keeps only your 5 most recent backups made by the App; making a new one deletes the oldest. Google Drive is a Google service: we do not control its availability, storage limits or your Google account.",
          "You are responsible for the accuracy of what you enter, including amounts read from receipts by the scanner, which you should always check before saving.",
        ),
      ],
    },
    {
      heading: "4. Receipt scanning",
      blocks: [
        p(
          "Camera Scan reads text from a photo on your device, and Voice Scan reads what you say, to suggest an amount, merchant, date and note. Text and speech recognition can be wrong. Suggestions are provided as a convenience and you must confirm them. The photo is used only on your device to read its text and is deleted right after; the App keeps no receipt images, only the details you save.",
        ),
        p(
          "Camera Scan is part of JaxBudget Pro; Voice Scan is free. Without Pro, the App asks you to unlock Pro once a photo has been read, before showing what it found. If you do not, the result is discarded and nothing is saved.",
        ),
      ],
    },
    {
      heading: "5. Renewal reminders",
      blocks: [
        p(
          "Reminders are local notifications scheduled on your device. Their delivery depends on your device settings, battery optimisation and notification permission, and may be delayed or missed. Do not rely on them as your only reminder for a payment that matters.",
        ),
        p(
          "Without JaxBudget Pro, renewal reminders are sent for your 3 oldest active subscriptions only. The App cannot see your Google Play or other store subscriptions: what it tracks, and when it reminds you, comes only from what you enter.",
        ),
      ],
    },
    {
      heading: "6. JaxBudget Pro and subscriptions",
      blocks: [
        p(
          "Some features are part of JaxBudget Pro, offered as a monthly or yearly subscription or as a one-time Lifetime purchase. Pro currently removes the free limits on tracked subscriptions and their reminders, category budgets, your own categories, Insights history and Money Coach tips, and adds Camera Scan, Google Drive backup and PDF and Excel reports. The free limits are shown in the App. Logging entries, Voice Scan, viewing and deleting your data, offline file backup, restoring any backup (including from Google Drive) and CSV export stay free.",
        ),
        ul(
          "Purchases are made through Google Play under its terms. Prices are shown in the store, in your currency, before you buy, and may differ between countries. Where the App shows a higher price struck through, it is our regular price for that plan, and the price you pay is the one Google Play shows before you confirm.",
          "Google Play takes the payment; we never see your card or payment details. RevenueCat, a service we use, confirms each purchase with Google Play; Pro unlocks only once it does. A payment that is still pending unlocks nothing until it clears.",
          "Subscriptions renew automatically at the end of each period until you cancel them in Google Play (Payments & subscriptions). Cancelling stops future renewals; Pro stays on until the end of the period you paid for. Uninstalling the App does not cancel a subscription.",
          "If a renewal payment fails, Google Play may retry it for a while. The App tells you when Google Play reports a payment problem, and Pro can end if the payment is not fixed.",
          "Google Play notifies you before any price change to your subscription, as its policies require.",
          "A free trial of a subscription, where offered (currently 7 days on Yearly), turns into a paid subscription when it ends unless you cancel before then. Google Play decides who is eligible; usually each Google account can use a trial once.",
          "Every new install also gets 14 days of Pro free, with no payment details, once per install. Three days before it ends the App sends one notification. When it ends the App goes back to the free limits; nothing you saved is deleted.",
          "Lifetime is a single payment that unlocks every Pro feature that runs on your device, including ones added later, and Google Drive backup to your own Drive. A future service that needs our own servers (for example syncing between devices) may be sold separately.",
          "If you use Pro on a device whose clock has been changed, or while offline for more than a few days after a subscription should have renewed, the App may treat Pro as off until it can check with Google Play again.",
          "When Pro ends, nothing is deleted: items over the free limits stay visible and come back in full if you subscribe again.",
          "Refunds are handled by Google Play under its refund policy and the consumer law that applies to you.",
          'Use "Restore purchases" to bring a purchase to a new device signed in to the same Google account. A purchase is linked to that Google account, not to your Google Drive backups.',
        ),
      ],
    },
    {
      heading: "7. Acceptable use",
      blocks: [
        p("You agree not to:"),
        ul(
          "use the App for any unlawful purpose;",
          "copy, modify, reverse engineer or redistribute the App except as the law allows;",
          "interfere with the App's purchase or licensing features, or use Pro features without paying for them.",
        ),
      ],
    },
    {
      heading: "8. Intellectual property",
      blocks: [
        p(
          "The App, its design and its content belong to us or our licensors. We grant you a personal, non-exclusive, non-transferable licence to use the App on devices you own or control. The data you enter remains yours.",
        ),
      ],
    },
    {
      heading: "9. Availability and changes",
      blocks: [
        p(
          "We may update, change or stop offering the App or any feature. We try to keep the App working well but do not promise that it will be uninterrupted or free of errors.",
        ),
      ],
    },
    {
      heading: "10. Disclaimer and limitation of liability",
      blocks: [
        p(
          'The App is provided "as is" and "as available". To the fullest extent the law allows, we disclaim all warranties, express or implied, including fitness for a particular purpose. We are not liable for any indirect or consequential loss, or for loss of data, profits, penalties or fees, arising from your use of the App, including missed renewals, budget overruns or tax filings. Nothing in these terms limits rights you have under consumer protection law that cannot be excluded.',
        ),
      ],
    },
    {
      heading: "11. Ending use",
      blocks: [
        p(
          "You can stop using the App at any time by uninstalling it. We may end your licence if you seriously breach these terms.",
        ),
      ],
    },
    {
      heading: "12. Changes to these terms",
      blocks: [
        p(
          "We may update these terms. The effective date at the top shows when they last changed. Continuing to use the App after a change means you accept the updated terms.",
        ),
      ],
    },
    {
      heading: "13. Contact",
      blocks: [
        p(`Questions, requests about your data and complaints can be sent to ${site.contactEmail}. We aim to reply within 30 days.`),
      ],
    },
  ],
};

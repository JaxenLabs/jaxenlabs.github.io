import { site } from "@/content/site";
import { p, ul, type LegalDocument } from "@/content/types";

/**
 * JaxBudget's Privacy Policy. Copied from the app's `LegalContent.privacy`
 * (legal_content.dart); keep the two in step and update the date together.
 * One addition on the web: the Google API "Limited Use" statement in
 * section 9, which Google's OAuth review looks for.
 */
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: "29 October 2026",
  intro:
    "JaxBudget is built to keep your finances on your phone. This policy explains what information the App handles, where it goes and the choices you have.",
  sections: [
    {
      heading: "1. Information stored on your device",
      blocks: [
        p("Everything you enter is saved in a database inside the App's private storage on your device:"),
        ul(
          "transactions: amounts, categories, merchants or payers, notes and dates;",
          "subscriptions, their renewal dates and when you last confirmed using them;",
          "budgets, your monthly budget and starting balance;",
          "your settings: currency, theme, the reasons you chose for using the App and, if you give one, your name.",
        ),
        p("We do not have an account system and this information is not sent to us. We cannot see, sell or share it."),
      ],
    },
    {
      heading: "2. Camera, photos and voice",
      blocks: [
        p(
          "The camera is used only while the receipt scanner is open, and only to take the photo you capture. If you import from your gallery or files, the App reads only the image or file you pick. Text is read from the image on your device using Google ML Kit on-device text recognition; the image itself is not uploaded. A receipt photo, whether taken with the camera or picked from your gallery or files, is used only to read its text and is deleted from the App right after. The App keeps no receipt images: only the amount, merchant, date and note you confirm are saved.",
        ),
        p(
          "Google states that ML Kit may contact Google servers to receive model updates and fixes, and sends anonymous metrics about the performance and use of its APIs. These do not include your images or the text read from them.",
        ),
        p(
          "Voice Scan uses the microphone only while its sheet is listening, after you allow microphone access. Your speech is turned into text by your device's own speech recognition service (Google's on Android, Apple's on iOS). On Android the App asks for recognition on the device; where the device cannot do that, and on iOS, the service may send the audio to Google or Apple to be recognised under their privacy policies. The App receives only the recognised text. It does not record or keep audio, and the text is used only to fill in the expense form for you to check; only what you then save is kept.",
        ),
        p(
          "Where that service is missing or does not work (common on phones sold without Google services), Voice Scan can open your phone's own voice input window instead. That window belongs to another app, usually from Google or your phone maker, which does the listening under its own privacy policy and hands the App only the recognised text. You can also type, or use the microphone on your keyboard, in which case your keyboard app does the listening under its own policy. In every case the App receives only text.",
        ),
      ],
    },
    {
      heading: "3. Notifications",
      blocks: [
        p(
          "Bill reminders are scheduled locally on your device and contain the bill's name and amount. The daily reminder, the goal reminders (a weekly or monthly nudge for each goal you pick) are also scheduled locally and contain only general tips, no amounts or names. Your goals are stored only on your device. You can turn the daily and goal reminders off in Settings, or turn any of these off in your device settings, at any time.",
        ),
        p(
          'Three days before your free 14-day Pro trial ends, the App schedules one local notification saying so. For a subscription you mark as paid through Google Play, its reminder can offer "Manage in Google Play", which opens Google Play\'s own subscriptions page; the App learns nothing from Google Play about what you do there.',
        ),
      ],
    },
    {
      heading: "4. Crash reports, performance and usage data",
      blocks: [
        p(
          "If enabled in the build you installed, the App uses Google Firebase Crashlytics and Performance Monitoring to find and fix problems. When the App crashes or reports an error, it may send technical information such as the device model, operating system version, app version, the error and its stack trace, timing of app operations, and a random installation identifier. It does not send your transactions, subscriptions, amounts, names or receipt images.",
        ),
        p("Firebase Cloud Messaging may be used to deliver service messages. It uses a device token generated by Google for that purpose."),
        p(
          'Google Analytics for Firebase records anonymous usage: which screens of the App are opened, when the App is first opened and when a session starts, the steps of an app update (offered, accepted, dismissed, downloaded, installed or failed), and a few JaxBudget Pro steps (when the free trial starts, when the Pro screen opens and which feature opened it, and which plan was chosen and whether a purchase or "Restore purchases" succeeded, was cancelled, is pending or failed), together with the device model, operating system version, app version, country and a random installation identifier. It does not record what you type, your amounts, names or receipts, and the App turns off the advertising ID and ad personalisation for it.',
        ),
        p(
          'To offer updates, the App asks the app store whether a newer version exists when it opens and from time to time while in use. On Android this goes through Google Play on your device. On iOS the App asks Apple\'s public App Store lookup service, sending only the App\'s identifier and your device\'s country. On your device the App keeps when you last chose "Later", so it does not ask again for a day. No ledger data is sent.',
        ),
      ],
    },
    {
      heading: "5. Purchases (JaxBudget Pro)",
      blocks: [
        p(
          "If you buy JaxBudget Pro, Google Play takes the payment and RevenueCat, a service that checks purchases for us, confirms it with Google Play. RevenueCat receives the purchase details (product, price, currency, purchase and renewal dates and the Google Play purchase token), a random app user identifier created on your device, the App version, and your device type, operating system version and country. It does not receive your name, email or ledger, and we never receive your card or payment details.",
        ),
        p(
          "Whether Pro is on, when your free trial started, and the last confirmed purchase are kept in encrypted storage on your device so Pro works offline. They are not part of your backups. While the App is open it asks RevenueCat whether this install has Pro and, on the Pro screen, which plans are on sale; if you never buy, those requests carry only the random identifier and the device details above.",
        ),
        p(
          'Settings > JaxBudget Pro shows that random identifier as "User ID", so you can quote it to us if a purchase does not appear. It is not linked to your name or email unless you send it to us yourself. "Manage in Google Play" opens Google Play, where you cancel or change a plan; Google Play then tells RevenueCat, and the App learns the result from RevenueCat.',
        ),
      ],
    },
    {
      heading: "6. Third-party policies",
      blocks: [
        p(
          "The services above process data under their own privacy policies: Google (Firebase, ML Kit, speech recognition, Google Play, Google sign-in and Google Drive), RevenueCat (purchases) and Apple (speech recognition and the App Store on iOS).",
        ),
        ul(
          "Google: https://policies.google.com/privacy",
          "RevenueCat: https://www.revenuecat.com/privacy",
          "Apple: https://www.apple.com/legal/privacy/",
        ),
      ],
    },
    {
      heading: "7. Advertising and selling data",
      blocks: [
        p("The App shows no ads, does not track you across other apps or websites, and does not sell or rent personal information."),
      ],
    },
    {
      heading: "8. Keeping and deleting your data",
      blocks: [
        ul(
          "Your ledger stays on your device until you delete it.",
          "Settings > Erase all data removes all transactions, subscriptions and budgets. Your settings stay.",
          "Changing currency also erases the ledger.",
          "Just before a restore, Erase all data or a currency change, the App keeps one automatic safety copy of your data in its private storage on your device, so you can put it back if that was a mistake. It is deleted after 24 hours, or once put back.",
          "A backup you save with Settings > Backup and restore is yours: it stays wherever you put it until you delete it, and the App does not track or remove it. The one exception: in Google Drive the App keeps your last 5 backups and deletes older ones, as described in section 9.",
          "Uninstalling the App deletes everything it stored on the device.",
        ),
        p(
          "Crash, performance and usage data held by Firebase is kept for the periods Google sets for those services. Purchase records held by RevenueCat and Google Play are kept as they need for billing, refunds and the law; to ask for the RevenueCat record linked to your User ID to be deleted, contact us with that ID.",
        ),
      ],
    },
    {
      heading: "9. Security",
      blocks: [
        p(
          "Your data is protected by your device's own security, such as its screen lock and storage encryption. Anyone who can unlock your device can open the App, so keep your device secured.",
        ),
        p(
          "If you turn on App lock in Settings, the App asks your device to confirm it is you with its fingerprint, face, PIN, pattern or password. Your device checks this itself; the App never receives or stores your fingerprint, face data or PIN. It only stores whether App lock is on.",
        ),
        p(
          "A backup file (Settings > Backup and restore) is a plain, unencrypted zip file holding your whole ledger and your settings. It is written only where you choose. Anyone who gets the file can read it, so store it somewhere private. If you save it to a cloud app, that service's own policy applies to it.",
        ),
        p(
          'If you tap "Back up to Drive" (Settings > Backup and restore > Cloud backup; part of JaxBudget Pro), the App signs you in with Google and uploads the same backup file to a private app folder in your own Google Drive. The App asks Google only for access to that hidden app folder (the "drive.appdata" permission) and your basic account details: only this App can read that folder, and the App can see no other file in your Drive. We receive nothing: the file goes from your device to your Drive. The App keeps your last 5 Drive backups and deletes older ones, and labels each with how many entries it holds. "Restore" (free) lists them so you can choose which one to download. Backups are made only when you tap the button; there is no automatic upload.',
        ),
        p(
          'To show "connected as", the App keeps the email address of the Google account you connected in encrypted storage on your device. It is not part of your backups and is not sent to us. "Disconnect" signs out on this device and removes that email; copies already in Drive stay until you delete them (in Google Drive on the web: Settings > Manage apps > JaxBudget > Delete hidden app data). Ending Pro does not delete them either, and you can still restore them. Google\'s own privacy policy applies to Google sign-in and to files stored in Drive. Nothing is sent unless you tap these buttons.',
        ),
        p(
          "JaxBudget's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements. Google user data is used only to back up and restore your own ledger, is never transferred to us or to anyone else, and is never used for advertising.",
        ),
        p(
          "Export data (on the Activity tab and in Settings) makes a PDF, Excel or CSV file of the entries you choose: dates, amounts, categories, payees and notes. The file goes only to the app or folder you pick in the share sheet or save dialog; from then on that app's policy applies. Like a backup, it is not encrypted.",
        ),
      ],
    },
    {
      heading: "10. Children",
      blocks: [p("The App is not directed at children under 13 and we do not knowingly collect information from them.")],
    },
    {
      heading: "11. Your rights",
      blocks: [
        p(
          "Because your ledger is kept on your device (and, if you choose, in your own Google Drive), you can view, correct and delete it yourself in the App. Depending on where you live, you may have rights over data held by the services in sections 4, 5 and 6; contact us and we will help you use them.",
        ),
      ],
    },
    {
      heading: "12. Changes to this policy",
      blocks: [
        p(
          "If we change how the App handles information, we will update this policy and its effective date, and explain significant changes in the App or its store listing.",
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

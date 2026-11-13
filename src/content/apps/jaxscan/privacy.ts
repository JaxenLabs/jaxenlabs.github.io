import { p, type LegalDocument } from "@/content/types";

/**
 * JaxScan's Privacy Policy, copied word for word from the app's
 * `PrivacySections` (presentation/screen/legal/LegalScreen.kt). The app
 * writes it as headed paragraphs with no bullet lists; keep the two in step
 * and update the date together.
 */
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  dateLabel: "Last updated",
  effectiveDate: "11 September 2026",
  sections: [
    {
      heading: "In short",
      blocks: [
        p("Your documents never leave your device. JaxScan has no accounts and no servers of its own — nothing you scan is uploaded anywhere."),
        p("The app does send anonymous crash and usage diagnostics, which is described below."),
      ],
    },
    {
      heading: "What stays on your device",
      blocks: [
        p("Scans and page images, recognised text, signatures you draw, QR scan history, folders, exported files and your settings are stored in JaxScan's private storage on the device and are not readable by other apps. We have no way to see, copy or recover any of it."),
        p("Files leave the app only when you send them: when you share an export, save it to your phone, or write a backup with Settings → Back up now to a location you choose. Android's own device backup may copy your app settings to your Google account, but your documents, pages and exports are excluded from it."),
      ],
    },
    {
      heading: "What we do collect",
      blocks: [
        p("JaxScan uses Google Firebase for diagnostics:"),
        p("Analytics — events such as which screens are opened, which tools are run, and whether a purchase, plan change or app update happened, together with standard device information such as model, Android version, language and approximate region. It never includes the contents or names of your documents."),
        p("Crashlytics — crash reports, including the device model, Android version, where in the code the crash happened, and technical labels such as the tool or export format in use at the time."),
        p("Performance — how long operations take, so slow paths can be found."),
        p("Cloud Messaging — so we can send occasional notifications about the app."),
        p("This is tied to identifiers Firebase generates for your installation, not to your name, email or account. JaxScan does not use your device's advertising ID. There is currently no in-app switch to turn this off; if you would rather not send it, uninstalling the app stops it."),
      ],
    },
    {
      heading: "Purchases",
      blocks: [
        p("JaxScan uses RevenueCat to load subscription prices and check whether you have Pro. This happens when the app starts, whether or not you subscribe, and uses an anonymous identifier RevenueCat generates for your installation, plus basic app and device information such as app version and country."),
        p("If you subscribe, the purchase is handled by Google Play, and RevenueCat also receives your Play purchase receipt so it can confirm the subscription. We never receive or store your payment details."),
        p("You can see this identifier in Settings as your User ID. It is not linked to your name or email unless you choose to send it to us when asking for support."),
      ],
    },
    {
      heading: "Permissions and why",
      blocks: [
        p("Camera — to scan documents and read QR codes. Frames are processed on the device."),
        p("Photos and files — only the files you pick, or share to JaxScan from another app, and only when you do."),
        p("Notifications — to show app notifications, if you allow them."),
        p("Network access — for diagnostics, subscription checks and app updates. It is never used to send your documents."),
        p("Screen lock — if you turn on App lock, Android asks for your fingerprint, face or PIN. JaxScan only learns whether it succeeded."),
        p("JaxScan does not ask for access to your contacts. Saving a business card opens your Contacts app with the details filled in, and you decide whether to save them."),
      ],
    },
    {
      heading: "What we never do",
      blocks: [
        p("We do not upload, read or store your documents."),
        p("We do not sell or share personal data with advertisers."),
        p("There are no ads in JaxScan."),
        p("There are no accounts, so there is no profile to build."),
      ],
    },
    {
      heading: "Who processes this data",
      blocks: [
        p("Diagnostics are processed by Google (Firebase), and subscription checks by Google Play and RevenueCat, on their own servers, which may be outside your country. Each handles the data under its own privacy terms. None of them receives your documents."),
      ],
    },
    {
      heading: "Keeping and deleting data",
      blocks: [
        p("Because your documents are only on your device, you delete them by deleting them in the app, by clearing the app's data in Android settings, or by uninstalling JaxScan."),
        p("Diagnostics and subscription records already sent are retained by Google and RevenueCat under their own retention periods. To ask about data linked to your installation, or to request its deletion, write to jaxenlabs.dev@gmail.com and include the User ID shown in Settings."),
      ],
    },
    {
      heading: "Children",
      blocks: [
        p("JaxScan is not directed at children under 13 and we do not knowingly collect data from them."),
      ],
    },
    {
      heading: "Changes",
      blocks: [
        p("If this policy changes, the date at the top of this page changes with it."),
      ],
    },
    {
      heading: "Contact",
      blocks: [
        p("Questions about privacy: jaxenlabs.dev@gmail.com"),
      ],
    },
  ],
};

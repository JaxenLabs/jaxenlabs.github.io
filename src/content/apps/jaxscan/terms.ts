import { p, type LegalDocument } from "@/content/types";

/**
 * JaxScan's Terms & Conditions, copied word for word from the app's
 * `TermsSections` (presentation/screen/legal/LegalScreen.kt). Keep the two
 * in step and update the date together.
 */
export const terms: LegalDocument = {
  title: "Terms & Conditions",
  dateLabel: "Last updated",
  effectiveDate: "11 September 2026",
  sections: [
    {
      heading: "1. Agreement",
      blocks: [
        p("These terms apply when you use JaxScan. By installing or using the app you accept them. If you do not, please uninstall the app."),
        p("JaxScan is published by JaxenLabs. You can reach us at jaxenlabs.dev@gmail.com."),
      ],
    },
    {
      heading: "2. What JaxScan is",
      blocks: [
        p("JaxScan is an offline document scanner. It captures, enhances, organises, converts and exports documents on your device. It does not require an account, and it does not upload the documents you scan."),
      ],
    },
    {
      heading: "3. Your documents are yours",
      blocks: [
        p("Everything you scan, import, sign or export stays yours. We claim no rights over it and we cannot see it — it is stored in the app's private storage on your device."),
        p("You are responsible for what you scan and for having the right to scan it. Do not use JaxScan to copy documents you are not permitted to copy, or to forge, alter or misrepresent any document."),
      ],
    },
    {
      heading: "4. Free features and limits",
      blocks: [
        p("Many features are free and unlimited. Some are offered a fixed number of free runs, and some require JaxScan Pro. The counts are shown in the app before you use a run."),
        p("We may change what is free for new installations. Free runs already granted to your installation are not taken away by an update."),
        p("PDFs exported without JaxScan Pro carry a small JaxScan logo and name on each page. With Pro you can turn it off in Settings."),
      ],
    },
    {
      heading: "5. JaxScan Pro subscriptions",
      blocks: [
        p("JaxScan Pro is an auto-renewing subscription sold through Google Play. It unlocks the Pro features listed on the purchase screen, all of which run on your device. The price, the billing period, any introductory price and any free trial are shown on the purchase screen before you buy, and Google Play shows them again before charging you."),
        p("An introductory price or free trial applies for the stated number of periods only. After it ends, the subscription renews at the standard price for your region until you cancel. Introductory offers are limited to one per account."),
        p("Payment is taken by Google Play, not by us. We never see or store your card details."),
      ],
    },
    {
      heading: "6. Changing plans",
      blocks: [
        p("You can switch between the Weekly, Monthly and Yearly plans at any time from Settings → JaxScan Pro → Change plan. The switch takes effect immediately, and Google Play charges the full price of the new plan on the day you switch."),
        p("Any unused part of your current plan is not lost. Google Play works out the value of the time you have left, based on what you actually paid, and adds it to your new plan as extra time, which moves your next charge date later. It is not refunded as money or taken off the price of the new plan."),
        p("For example, if you switch from Monthly to Yearly with 20 days of your month left, you are charged the full yearly price that day, and about 36 extra days are added before your first yearly renewal. If you switch from Yearly to Monthly with 11 months left, you are charged one month that day, and the rest of your yearly value covers roughly the next six months."),
        p("The exact amount of extra time is calculated by Google Play, and your new renewal date is shown in the Google Play Store under Payments & subscriptions."),
      ],
    },
    {
      heading: "7. Cancelling and refunds",
      blocks: [
        p("You can cancel at any time from Settings → JaxScan Pro → Cancel subscription, which opens the Google Play Store, or directly in the Play Store under Payments & subscriptions. Cancelling stops the next renewal; your Pro features continue until the end of the period you have already paid for. We cannot cancel a subscription for you — only the store can."),
        p("Refunds are handled by Google Play under its own policy. If you believe something has gone wrong, write to us at jaxenlabs.dev@gmail.com and we will help where we can."),
      ],
    },
    {
      heading: "8. What the app does not promise",
      blocks: [
        p("JaxScan is provided as it is. Some limits are worth stating plainly:"),
        p("Please take a moment to review recognised text before you rely on it, especially names, numbers and dates."),
        p("Redaction permanently covers the areas you mark. Before sharing a redacted file, please open it and make sure everything you meant to hide is fully covered."),
        p("Converted files (Word, PowerPoint, text) carry the content and order of your pages, not the original layout, fonts or tables."),
        p("Word and PowerPoint files you import are brought in as their text laid out on new pages, not as a copy of the original document."),
        p("Keep your own backups of anything important. Uninstalling the app, clearing its data or losing the device removes your documents permanently."),
      ],
    },
    {
      heading: "9. Liability",
      blocks: [
        p("To the extent the law allows, JaxenLabs is not liable for lost documents, lost data, lost profits, or any indirect or consequential loss arising from your use of JaxScan. Nothing here limits any liability that cannot be limited by law, and nothing here affects your statutory rights as a consumer."),
      ],
    },
    {
      heading: "10. Changes",
      blocks: [
        p("We may update these terms as the app changes. The date at the top of this page shows when this version was published. Continuing to use JaxScan after an update means you accept the updated terms."),
      ],
    },
    {
      heading: "11. Contact",
      blocks: [
        p("Questions about these terms: jaxenlabs.dev@gmail.com"),
      ],
    },
  ],
};

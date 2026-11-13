import { p, ul, type LegalDocument } from "@/content/types";

/**
 * SmartUmmah's Privacy Policy, copied word for word from the app's English
 * `PrivacyPolicyStrings` (ui/localization/PrivacyPolicyStrings.kt). The
 * app's bold bullet labels are written as `**Label:**`. Section 7 is the
 * app's closing contact card. Keep the two in step and update the date
 * together.
 */
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  dateLabel: "Last Updated",
  effectiveDate: "May 2024",
  intro:
    'SmartUmmah ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use our mobile application.',
  sections: [
    {
      heading: "1. Information We Collect",
      blocks: [
        ul(
          "**Location Information:** We request access to your device's location (Fine and Coarse) to calculate accurate prayer times, Qibla direction, and local masjid information.",
          '**Audio Data:** We request access to your microphone (RECORD_AUDIO) solely for the "Voice Search" or "Voice Commands" features. Audio is processed for speech-to-text conversion and is not stored on our servers.',
          "**Usage Data:** We use Google Firebase (Analytics, Crashlytics, and Cloud Messaging) to collect anonymous information about app performance, crashes, and how users interact with the app, and to deliver push notifications for reminders.",
        ),
      ],
    },
    {
      heading: "2. How We Use Your Information",
      blocks: [
        ul(
          "To provide localized Islamic services (Prayer Times, Qibla).",
          "To facilitate voice-based navigation and search.",
          "To monitor app stability and fix technical bugs.",
        ),
      ],
    },
    {
      heading: "3. Data Sharing",
      blocks: [
        p(
          "We do not sell your personal data. We only share information with third-party service providers (like Google Firebase) to the extent necessary to provide app functionality and performance monitoring.",
        ),
      ],
    },
    {
      heading: "4. Permissions",
      blocks: [
        p("You can grant or revoke the following permissions at any time via your device settings:"),
        ul(
          "**Location:** Required for prayer times.",
          "**Microphone:** Required for voice features.",
          "**Notifications:** Used for prayer (Adhan) reminders.",
        ),
      ],
    },
    {
      heading: "5. Data Retention",
      blocks: [
        p(
          "User-specific settings (like Madhab or Language) are stored locally on your device. Analytics data is retained by Google Firebase according to their standard retention policies.",
        ),
      ],
    },
    {
      heading: "6. Children's Privacy",
      blocks: [p("Our app does not knowingly collect personal information from children under 13.")],
    },
    {
      heading: "7. Contact Us",
      blocks: [
        p("If you have any questions about this Privacy Policy, please contact us at:"),
        p("jaxenlabs.dev@gmail.com"),
      ],
    },
  ],
};

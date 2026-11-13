import { p, ul, type StoreListing } from "@/content/types";

/**
 * The Google Play listing, word for word (title, short description and full
 * description), fetched from the live store page. Update it when the
 * listing changes.
 */
export const store: StoreListing = {
  title: "Baby Shop",
  shortDescription: "Kids Fashion & Baby Clothing App | 0–16 Years Collection",
  developer: "MD. NAZMUL HOQUE",
  intro: [
    "Baby Shop Limited is a complete kids fashion and baby clothing app offering stylish and affordable clothing for newborns, toddlers, kids, and teens up to 16 years. If you are searching for a kids clothing app in Bangladesh, baby dress collection, boys fashion, girls fashion, or children clothing online, this app brings everything together in one simple platform. Browse a wide collection of baby clothing, kids wear, boys dress, girls dress, coordinated sets, casual wear, and seasonal collections. Baby Shop Limited provides quality children clothing designed for comfort, style, and everyday use.",
  ],
  sections: [
    {
      heading: "KIDS FASHION FOR EVERY AGE",
      blocks: [
        ul(
          "Newborn baby clothing",
          "Infant and toddler outfits",
          "Boys clothing 2–16 years",
          "Girls clothing 2–16 years",
          "Casual wear and party wear",
          "Trendy and seasonal collections",
        ),
        p("Whether you need baby essentials, everyday kids wear, or special outfits, this kids fashion app makes browsing easy and convenient."),
      ],
    },
    {
      heading: "EASY BROWSING EXPERIENCE",
      blocks: [
        p("The Baby Shop Limited app is designed with a clean and simple interface. You can:"),
        ul(
          "View product images",
          "Check updated prices",
          "Read product descriptions",
          "Explore new arrivals",
          "Discover trending kids fashion",
        ),
        p("No login or registration is required. Users can freely browse children clothing collections and choose how to place their order."),
      ],
    },
    {
      heading: "ORDER VIA OFFICIAL CHANNELS",
      blocks: [
        p("You can order through:"),
        ul(
          "Official website",
          "Facebook page",
          "Instagram",
          "WhatsApp",
        ),
        p("This ensures a secure and trusted shopping experience through Baby Shop Limited’s official platforms."),
      ],
    },
    {
      heading: "WHY CHOOSE BABY SHOP LIMITED?",
      blocks: [
        ul(
          "Trusted kids fashion brand",
          "Wide range of baby and children clothing",
          "Affordable pricing",
          "Stylish designs for boys and girls",
          "Clothing for ages 0–16 years",
        ),
        p("If you are looking for a baby shop app, kids clothing Bangladesh, children fashion store, or baby dress collection online, Baby Shop Limited is your complete solution. Download the Baby Shop Limited app today and explore complete kids fashion from newborn to teens."),
      ],
    },
  ],
};

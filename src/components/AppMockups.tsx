type MockupKind = "home" | "meals" | "scan" | "journey";

const featureCopy: Record<
  MockupKind,
  {
    label: string;
    title: string;
    subtitle: string;
    accent: string;
  }
> = {
  home: {
    label: "Home",
    title: "Track the day in a few taps.",
    subtitle:
      "Skin, routines, sleep, food, products, body areas, weather, history, and trigger insights live together.",
    accent: "#8FAEA3",
  },
  meals: {
    label: "Meals",
    title: "Make food decisions less stressful.",
    subtitle:
      "Save avoidances, get meal ideas that fit, capture food photos, and keep a simple food history.",
    accent: "#D4A574",
  },
  scan: {
    label: "Scan",
    title: "Check products before you use them.",
    subtitle:
      "Scan products and foods, flag ingredients that matter to you, and compare labels side by side.",
    accent: "#9B8AC4",
  },
  journey: {
    label: "Journey",
    title: "Bring better context to care.",
    subtitle:
      "Investigate home triggers, save notes, learn what to ask, and prep for doctor visits.",
    accent: "#6B9AC4",
  },
};

export const TAB_MOCKUPS = featureCopy;

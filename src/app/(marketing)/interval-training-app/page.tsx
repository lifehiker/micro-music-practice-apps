import { LandingPage } from "@/components/marketing/landing-page";

export const metadata = {
  title: "Interval Training App",
  description:
    "A mobile-first interval recognition app for musicians who want a short daily ear training routine.",
};

export default function IntervalTrainingAppPage() {
  return (
    <LandingPage
      eyebrow="Interval training app musicians"
      title="A clean interval trainer for musicians who prefer repetition over lectures."
      description="Train seconds, thirds, fourths, fifths, and sixths with immediate feedback and answer buttons made for fast tap decisions."
      bullets={[
        "Free users get one daily interval drill with 7-day history.",
        "Large answer buttons reduce friction on phone screens.",
        "Weak-spot tracking turns missed intervals into tomorrow’s practice.",
      ]}
    />
  );
}

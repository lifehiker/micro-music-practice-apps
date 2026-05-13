export const blogPosts = [
  {
    slug: "why-ear-training-apps-feel-like-homework",
    title: "Why Most Ear Training Apps Feel Like Homework",
    description:
      "A practical look at why theory-heavy drill apps break habit loops for self-taught musicians.",
    content: [
      "Most musicians do not quit because they dislike improvement. They quit because the session design feels like school. When every drill opens with dense labels, long lesson trees, and progress charts that feel punitive, practice stops feeling musical.",
      "Short habit loops work better. A 60-second win, immediate feedback, and one clear next action are usually enough to keep a streak alive. That matters more than curriculum breadth in an MVP.",
      "EarKit is built around one daily drill, visible weak spots, and replayable audio. The product goal is repetition without friction, not theory theater.",
    ],
  },
  {
    slug: "5-minute-daily-ear-training-routine-for-guitarists",
    title: "5-Minute Daily Ear Training Routine for Guitarists",
    description:
      "A lightweight drill stack for guitarists who want stronger interval and progression recognition without a full course.",
    content: [
      "Start with a single interval set. Train seconds and thirds until the sound becomes predictable rather than academic.",
      "Move to major versus minor chord color. Guitarists improve fastest when they connect fretboard shapes to ear color, not just note names.",
      "Finish with one progression guess. Pop progressions repeat constantly, so learning to hear movement is higher leverage than memorizing more isolated facts.",
    ],
  },
  {
    slug: "how-to-hear-common-pop-chord-progressions",
    title: "How to Hear Common Pop Chord Progressions by Ear",
    description:
      "A focused primer on the six progression families most hobbyist musicians should recognize first.",
    content: [
      "Start with I–V–vi–IV and I–vi–IV–V. These shapes train your ear to hear lift, release, and return.",
      "Then isolate ii–V–I and I–IV–V. These patterns show up across jazz, gospel, and rock contexts in simplified forms.",
      "You do not need a giant progression library early. You need repeated exposure to a small curated set with immediate answer feedback.",
    ],
  },
  {
    slug: "interval-training-for-singers-a-practical-routine",
    title: "Interval Training for Singers: A Practical Routine",
    description:
      "A short ear-first routine for singers who want pitch confidence without long classroom-style exercises.",
    content: [
      "Singers benefit from hearing and naming interval color before attempting textbook dictation. The first job is confidence, not complexity.",
      "Practice with piano tone, replay the cue, guess quickly, then sing the answer back. That sequence connects ear, voice, and label in one loop.",
      "Consistency matters more than session length. Two focused minutes daily will outperform occasional 30-minute theory sessions for most hobbyists.",
    ],
  },
  {
    slug: "best-ear-training-apps-for-self-taught-musicians",
    title: "Best Ear Training Apps for Self-Taught Musicians",
    description:
      "What to look for in an ear training app if you care about daily consistency, not conservatory-style lessons.",
    content: [
      "The best app for self-taught musicians is rarely the broadest. It is the one you will actually open tomorrow.",
      "Look for short sessions, replayable audio, mobile-first controls, and a small number of high-value drill types.",
      "If an app makes you manage a curriculum before you can hear one interval, it is solving the wrong problem for a casual musician.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

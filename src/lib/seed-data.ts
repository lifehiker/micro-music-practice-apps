import { DrillType } from "@prisma/client";

type SeedItem = {
  type: DrillType;
  promptAudioUrl: string;
  correctAnswer: string;
  answerOptions: string[];
  difficulty: number;
  tags: string[];
};

const intervalFamilies = [
  { answer: "Minor 2nd", tag: "minor-second", difficulty: 1 },
  { answer: "Major 2nd", tag: "major-second", difficulty: 1 },
  { answer: "Minor 3rd", tag: "minor-third", difficulty: 2 },
  { answer: "Major 3rd", tag: "major-third", difficulty: 2 },
  { answer: "Perfect 4th", tag: "perfect-fourth", difficulty: 3 },
  { answer: "Perfect 5th", tag: "perfect-fifth", difficulty: 3 },
  { answer: "Minor 6th", tag: "minor-sixth", difficulty: 4 },
  { answer: "Major 6th", tag: "major-sixth", difficulty: 4 },
];

const chordFamilies = [
  { answer: "Major", tag: "major", difficulty: 1 },
  { answer: "Minor", tag: "minor", difficulty: 1 },
  { answer: "Sus2", tag: "sus2", difficulty: 2 },
  { answer: "Sus4", tag: "sus4", difficulty: 2 },
  { answer: "Dominant 7", tag: "dominant7", difficulty: 3 },
  { answer: "Major 7", tag: "major7", difficulty: 3 },
  { answer: "Minor 7", tag: "minor7", difficulty: 4 },
  { answer: "Diminished", tag: "diminished", difficulty: 4 },
];

const progressions = [
  { answer: "I–V–vi–IV", tag: "1564", difficulty: 2 },
  { answer: "ii–V–I", tag: "251", difficulty: 2 },
  { answer: "I–vi–IV–V", tag: "1645", difficulty: 2 },
  { answer: "vi–IV–I–V", tag: "6415", difficulty: 3 },
  { answer: "I–IV–V", tag: "145", difficulty: 1 },
  { answer: "i–VI–III–VII", tag: "iVIIIIvii", difficulty: 4 },
];

function rotateOptions(answer: string, pool: string[], count: number) {
  const filtered = pool.filter((option) => option !== answer);
  return [answer, ...filtered.slice(0, count - 1)];
}

export function buildSeedItems(): SeedItem[] {
  const intervalPool = intervalFamilies.map((item) => item.answer);
  const chordPool = chordFamilies.map((item) => item.answer);
  const progressionPool = progressions.map((item) => item.answer);

  const intervalItems = intervalFamilies.flatMap((family, index) =>
    Array.from({ length: 5 }, (_, variant) => ({
      type: DrillType.INTERVAL,
      promptAudioUrl: "/audio/intervals/interval-demo.wav",
      correctAnswer: family.answer,
      answerOptions: rotateOptions(
        family.answer,
        [...intervalPool.slice(index), ...intervalPool.slice(0, index)],
        6,
      ),
      difficulty: family.difficulty,
      tags: [family.tag, `set-${variant + 1}`],
    })),
  );

  const chordItems = chordFamilies.flatMap((family, index) =>
    Array.from({ length: 5 }, (_, variant) => ({
      type: DrillType.CHORD_QUALITY,
      promptAudioUrl: "/audio/chords/chord-demo.wav",
      correctAnswer: family.answer,
      answerOptions: rotateOptions(
        family.answer,
        [...chordPool.slice(index), ...chordPool.slice(0, index)],
        6,
      ),
      difficulty: family.difficulty,
      tags: [family.tag, `voicing-${variant + 1}`],
    })),
  );

  const progressionItems = progressions.flatMap((family, index) =>
    Array.from({ length: 4 }, (_, variant) => ({
      type: DrillType.PROGRESSION,
      promptAudioUrl: "/audio/progressions/progression-demo.wav",
      correctAnswer: family.answer,
      answerOptions: rotateOptions(
        family.answer,
        [...progressionPool.slice(index), ...progressionPool.slice(0, index)],
        4,
      ),
      difficulty: family.difficulty,
      tags: [family.tag, `key-${variant + 1}`],
    })),
  );

  return [...intervalItems, ...chordItems, ...progressionItems];
}

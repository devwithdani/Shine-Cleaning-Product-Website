export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const revealTransition = {
  duration: 0.9,
  ease: EASE_OUT,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Hero intro timing (seconds): label -> headline -> text -> buttons -> navbar
export const INTRO = {
  eyebrow: 0.35,
  headline: 0.45,
  headlineStagger: 0.08,
  text: 0.8,
  buttons: 0.95,
  chrome: 1.1,
};

/* Matrix journey chapter 1: The Matrix (1999), "Red pill or blue". Content only (Opus pass).
   New art used here: sets "redroom" (two cracked leather armchairs, a mirror, rain on the window), "pod" (a pink-fluid pod
   in a tower of pods), "cubicle" (office cubicle, an elevator door, a plaque); cast neo: "sit", "stand", "pod";
   morpheus: "sit"; trinity: "stand"; fx "pills" (one red and one blue pill in open palms), "mirror" (a liquid silver
   mirror), "cat" (a black cat, drawn twice for deja vu), "alarm" (a flashing red light). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 1, canon: "a", id: "pills", code: "M1", episode: "The Matrix", title: "Red pill or blue",
  setup: {
    kicker: "A dark room, a thunderstorm.",
    text: "By day Thomas Anderson writes software for a respectable company. By night he is a hacker called Neo, and he has spent years looking for something he can't name. Tonight a man called Morpheus sits across from him with a pill in each hand. Blue, and Neo wakes up in bed remembering nothing. Red, and he finds out what the Matrix is.",
    caption: "Two pills, one armchair, no refunds.",
    scene: {set: "redroom", cast: {neo: "sit", morpheus: "sit"}, fx: ["pills"]}
  },
  question: "Which pill does Neo take?",
  choices: [
    {id: "a", label: "The red pill", tag: "What the film did.",
     effects: {belief: 10, agents: 10}, beats: [
      {scene: {set: "redroom", cast: {neo: "stand", trinity: "stand"}, fx: ["mirror"]}, caption: "The mirror was not supposed to do that.",
       text: "Neo swallows the red pill. A cracked mirror heals itself, turns to liquid, and climbs up his arm. It is cold, and it keeps going."},
      {scene: {set: "pod", cast: {neo: "pod"}}, caption: "Welcome to the real world, roughly.",
       text: "He wakes up bald and naked in a pod of pink goo, one of millions in a tower of millions. A machine notices, unplugs him, and flushes him out like a clogged pipe. Morpheus's crew fishes him out of the sewer."}
    ]},
    {id: "b", label: "The blue pill", tag: "Sleep in.",
     exit: "employeeOfMonth", beats: [
      {scene: {set: "cubicle", cast: {neo: "stand"}}, caption: "Punctual, finally.",
       text: "Neo takes the blue pill and wakes up in his own bed. He decides it was a dream, a very specific one, and gets to work on time for the first time in his career."},
      {scene: {set: "cubicle", cast: {neo: "stand"}, fx: ["cat"]}, caption: "A black cat walks by. Then again.",
       text: "His boss stops lecturing him about his attitude. A plaque goes up by the elevator. A black cat walks past it twice in a row, and Thomas Anderson doesn't look up."}
    ]},
    {id: "c", label: "Swallow both", tag: "Why choose?",
     effects: {belief: 5, agents: 20}, flags: ["bothPills"], beats: [
      {scene: {set: "redroom", cast: {neo: "sit", morpheus: "sit"}, fx: ["pills"], say: {who: "morpheus", text: "Nobody has ever..."}}, caption: "Not in the brochure.",
       text: "Neo takes both pills and swallows them together. Morpheus, who has done this many times, has never seen it done. Trinity studies the ceiling."},
      {scene: {set: "pod", cast: {neo: "pod"}, fx: ["alarm"]}, caption: "Every alarm, everywhere.",
       text: "The trace program can't decide where Neo is, so it reports him everywhere at once and wakes up every Agent in the city. He comes out of the pod anyway, with a faint urge to file a report on time."}
    ]}
  ]
});

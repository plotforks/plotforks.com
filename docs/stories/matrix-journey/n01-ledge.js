/* Matrix journey chapter 1 (new 2026-09-20): The Matrix (1999), the scaffolding at Metacortex.
   Chronologically the first choice in the trilogy, before the pills (now n:3).
   No new art required: set "cubicle", cast neo "stand" / "sit", fx "phone" and "rain" all exist.
   A dedicated set "ledge" (a wet window ledge, scaffolding, the city a long way down) would be better if it is cheap. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 1, canon: "b", id: "ledge", code: "M1", episode: "The Matrix", title: "The window and the phone",
  setup: {
    kicker: "Metacortex, floor forty-something, Monday morning.",
    text: "Thomas Anderson has been at his desk for nine minutes when a courier delivers a telephone that immediately rings. The voice on it says his name, says that men are coming for him, and talks him towards a window while the men in question walk past the cubicles behind him, asking politely for directions to his desk.",
    caption: "A stranger, a window, and a great deal of rain.",
    scene: {set: "cubicle", cast: {neo: "stand"}, fx: ["phone"]}
  },
  question: "There is a window, a scaffold, and a voice saying go. What does Neo do?",
  choices: [
    {id: "a", label: "Go out the window", tag: "Six floors, in the rain.",
     effects: {belief: 10, agents: 5}, flags: ["ledgeJump"], beats: [
      {scene: {set: "cubicle", cast: {neo: "stand"}, fx: ["rain"]}, caption: "Wet, terrified, and moving.",
       text: "Neo gets the window open and edges along a scaffold in the rain, six floors up, following instructions from a man he has never met. Forty colleagues watch him through the glass and nobody calls the police, which says something about the office."},
      {scene: {set: "street", cast: {neo: "stand", trinity: "stand"}, fx: ["rain"]}, caption: "He was not supposed to manage that.",
       text: "He gets to the fire escape. Morpheus says nothing for a moment, then tells Trinity that this one did not freeze, which is not how this call usually goes. Neo is soaked, late for work and, technically, free."}
    ]},
    {id: "b", label: "Give up and go back in", tag: "What the film did.",
     effects: {agents: 10}, beats: [
      {scene: {set: "cubicle", cast: {neo: "stand"}, fx: ["rain"]}, caption: "Everybody falls the first time. This is the other version.",
       text: "Neo looks down once, decides he is not a man who climbs out of windows, and says so into the phone. The voice says it is all right, and sounds like it means it."},
      {scene: {set: "cubicle", cast: {neo: "sit"}}, caption: "Politely, into a car.",
       text: "He walks back to his desk, and the men who have been asking for directions arrive and ask him to come with them. They are very polite about it, and one of them never blinks."}
    ]},
    {id: "c", label: "Hide in the cubicles", tag: "Statistically, a good plan.",
     effects: {belief: -5, agents: 5}, flags: ["hidAtWork"], beats: [
      {scene: {set: "cubicle", cast: {neo: "sit"}}, caption: "Four hundred identical desks.",
       text: "Neo hangs up, crawls under a neighbouring desk and waits, on the reasonable theory that one cubicle looks exactly like another. It is the most ordinary decision anyone in this story ever makes."},
      {scene: {set: "cubicle", cast: {neo: "sit", smith: "stand"}, say: {who: "smith", text: "Mister Anderson."}}, caption: "They did not need to look.",
       text: "They walk directly to the correct desk, because they are not looking for a man, they are looking at a signal. Neo comes out from under it with his tie over his shoulder and his dignity somewhere near the lifts."}
    ]}
  ]
});

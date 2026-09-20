/* Matrix journey chapter 2 (new 2026-09-20): The Matrix (1999), the room with Agent Smith and the file.
   Sits between the ledge (n:1) and the pills (n:3). The bug and the sealed mouth are in every branch,
   because the pills chapter needs Neo released and rattled.
   New art used here: fx "bug" (a small chrome insect, curled, about the size of a thumb).
   Sets redroom and cubicle and cast smith "stand", neo "sit" already exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 2, canon: "a", id: "interrogation", code: "M1", episode: "The Matrix", title: "The room with no handle",
  setup: {
    kicker: "A room with a table, two files and no door handle.",
    text: "Agent Smith has two lives on the desk in front of him. One of them pays taxes and has a social security number. The other one writes software nobody asked for and sells it to people with no names. Smith would like to close one file and open the other, and he has an offer.",
    caption: "One of these lives has a future.",
    scene: {set: "redroom", cast: {smith: "stand", neo: "sit"}},
    variants: [
      {when: "ledgeJump", text: "Agent Smith has two lives on the desk in front of him, and a report about a man who climbed out of a sixth-floor window in the rain rather than speak to three men in suits. That report is now the most interesting document in the building. Smith would like to close one file and open the other, and he has an offer."},
      {when: "hidAtWork", text: "Agent Smith has two lives on the desk in front of him, and a photograph of a grown man under a colleague's desk with his tie over his shoulder. He has not mentioned the photograph yet. He would like to close one file and open the other, and he has an offer."}
    ]
  },
  question: "Help us find Morpheus and the record disappears. What does Neo say?",
  choices: [
    {id: "a", label: "Ask for his phone call", tag: "What the film did.",
     effects: {belief: 5, agents: 10}, beats: [
      {scene: {set: "redroom", cast: {smith: "stand", neo: "sit"}, say: {who: "neo", text: "I want my phone call."}}, caption: "You can't call anyone with no mouth.",
       text: "Neo says the one sentence everybody says in films, and Smith explains, patiently and correctly, that a phone call would be of no use to a man who cannot speak. Then Neo's mouth is gone, which is not a thing he was prepared for."},
      {scene: {set: "redroom", cast: {neo: "sit"}, fx: ["bug"]}, caption: "It goes in, and it stays in.",
       text: "They put something small and alive into him and let him go. He wakes up in his own bed convinced it was a nightmare, which is precisely what it is designed to feel like."}
    ]},
    {id: "b", label: "Take the deal", tag: "A clean record is a clean record.",
     effects: {belief: -5, agents: 20}, flags: ["informant"], beats: [
      {scene: {set: "redroom", cast: {smith: "stand", neo: "sit"}}, caption: "Signed, in a room with no handle.",
       text: "Neo agrees to help. It costs him nothing today and makes the two files into one, and Smith smiles in the way a man smiles when a spreadsheet balances."},
      {scene: {set: "cubicle", cast: {neo: "stand"}, fx: ["bug"]}, caption: "He never makes the call.",
       text: "He is released with a number he never rings, and they put the small living thing in anyway, because a deal is not the same as trust. Every Agent in the city now knows his name before he says it."}
    ]},
    {id: "c", label: "Say nothing at all", tag: "Let him fill the silence.",
     effects: {belief: 10, agents: 5}, flags: ["silentRoom"], beats: [
      {scene: {set: "redroom", cast: {smith: "stand", neo: "sit"}}, caption: "Forty minutes of nothing.",
       text: "Neo folds his arms and does not speak for forty minutes. Smith talks for all forty, about order, about purpose, about the smell of the place, and hears himself doing it, which he does not enjoy."},
      {scene: {set: "redroom", cast: {neo: "sit"}, fx: ["bug"]}, caption: "Filed under: unhelpful.",
       text: "They bug him and release him anyway. Smith writes in the file that the subject is uncooperative, which is the first time anybody has written anything true about Thomas Anderson."}
    ]}
  ]
});

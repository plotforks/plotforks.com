/* Matrix journey chapter 9 (aftertaste): the end of Revolutions, "The park at sunrise". Content only (Opus pass).
   Canon: Sati paints a sunrise for Neo; the Architect meets the Oracle in the park, confirms the peace and that those who
   want out will be freed; asked how long it will last, she says as long as it can; Sati asks if they will see Neo again
   and the Oracle suspects so. Choice b points at The Matrix Resurrections (2021): the Analyst revives Neo and Trinity,
   Thomas Anderson is a game designer whose company demands a sequel, and the cafe is called Simulatte. Paraphrased only.
   Every choice sets one of peaceHold / sequel / wakeAll.
   New art used here: set "park" (a playground and benches at sunrise, a rainbow of code in the sky); cast oracle: "sit";
   architect: "stand"; sati: "stand" (a little girl); neo: "bench" (sitting, a cloth over his eyes); analyst: "stand"
   (a smiling man in a sweater, glasses); set "cafe" (a coffee shop counter, two tables); trinity: "cafe" (older, at a
   table); fx "sunrise" (shared with Breaking Bad ch11a), "gruel" (a bowl of grey porridge), "vase" (shared with ch03). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 16, canon: "a", id: "park", code: "M3", episode: "The Matrix Revolutions", title: "The park at sunrise",
  setup: {
    kicker: "Aftertaste. A park inside the Matrix, at dawn.",
    text: "The sun is up because a little program named Sati painted the sky for Neo. The Oracle sits on a bench, wearing her newer face. The Architect arrives to confirm the peace: the machines will keep it, and anyone who wants out of the Matrix will be let out. Then he asks how long she thinks it will last.",
    caption: "A sunrise, custom made.",
    scene: {set: "park", cast: {oracle: "sit", architect: "stand", sati: "stand"}, fx: ["sunrise"]},
    variants: [
      {when: "brawl", text: "The sun is up because a little program named Sati painted the sky for Neo, who sits on the next bench: blind out there, fine in here. The Architect arrives to confirm the peace: the machines will keep it, and anyone who wants out will be let out. Then he asks the Oracle how long it will last."},
      {when: "smithTalked", text: "The sun is up because a little program named Sati painted the sky for Neo, who sits on the next bench, blind out there and fine in here. At the far end, a man in a dark suit feeds the pigeons. Probably not Smith. The Architect arrives to confirm the peace, and asks the Oracle how long it will last."},
      {when: "trinitySafe && !trinityLost", text: "The sun is up because a little program named Sati painted the sky for Neo. Out in the real world, Trinity is at Zion's dock, waiting for a body the machines have promised to send home. The Oracle sits on a bench, wearing her newer face. The Architect arrives to confirm the peace, and asks how long she thinks it will last."}
    ]
  },
  question: "How long does the peace last? You decide where the story goes.",
  choices: [
    {id: "a", label: "As long as it can", tag: "What the film did.",
     flags: ["peaceHold"], beats: [
      {scene: {set: "park", cast: {oracle: "sit", architect: "stand"}, fx: ["sunrise"]}, caption: "He wanted a number.",
       text: "The Oracle says it will last as long as it can. The Architect, who prefers numbers, leaves in a mild huff."},
      {when: "sacrifice", scene: {set: "park", cast: {oracle: "sit", sati: "stand"}, fx: ["sunrise"]}, caption: "Someday.",
       text: "Sati asks whether they will ever see Neo again. The Oracle says she suspects so. Someday."},
      {when: "!sacrifice", scene: {set: "park", cast: {oracle: "sit", sati: "stand", neo: "bench"}, fx: ["sunrise"]}, caption: "Right here.",
       text: "Sati asks whether they will ever see Neo again. Neo, on the next bench, says he is right here, and Sati laughs so hard the sunrise gets brighter."},
      {when: "vase", scene: {set: "kitchen", cast: {oracle: "cookie"}, fx: ["vase"]}, caption: "Nobody goes near it.",
       text: "Back in her kitchen, the Oracle has a new vase. She has told nobody not to worry about it."}
    ]},
    {id: "b", label: "Until the sequel", tag: "Nobody stays dead in a franchise.",
     effects: {belief: 5}, flags: ["sequel"], beats: [
      {when: "sacrifice", scene: {set: "machinecity", cast: {analyst: "stand"}}, caption: "Too valuable to waste.",
       text: "Under the Machine City, a program with a therapist's smile finds Neo's body and Trinity's, and decides they are far too valuable to waste."},
      {when: "!sacrifice", scene: {set: "machinecity", cast: {analyst: "stand"}}, caption: "Too valuable to waste.",
       text: "Neo lives out his days in Zion, blind and content. When he dies, a program with a therapist's smile collects him, and Trinity too, and decides they are far too valuable to waste."},
      {scene: {set: "cafe", cast: {neo: "stand", trinity: "cafe"}, fx: ["cat"]}, caption: "Deja vu, with oat milk.",
       text: "Sixty years later a game designer named Thomas Anderson drinks coffee at a place called Simulatte and can't shake the feeling he knows the woman at the next table. His company wants a sequel to his hit game. He would rather not."}
    ]},
    {id: "c", label: "Wake everyone up", tag: "Everybody out.",
     effects: {belief: 5, zion: -10}, flags: ["wakeAll"], beats: [
      {scene: {set: "park", cast: {oracle: "sit", architect: "stand"}}, caption: "Capacity planning.",
       text: "The Oracle asks for everyone to be freed, not only those who ask. The Architect points out that Zion has room for about a quarter of a million people, and breakfast for fewer."},
      {scene: {set: "pod", cast: {neo: "pod"}, fx: ["gruel"]}, caption: "Tastes like Tastee Wheat, allegedly.",
       text: "Billions of people wake up in pods at once and meet the real world: no sun, a great many cables, and a bowl of grey porridge each. Someone asks whether it tastes like the cereal. It does not."},
      {scene: {set: "machinecity", fx: ["sunrise"]}, caption: "The sequel writes itself.",
       text: "The machines, with nobody left to run on, start looking into solar power. It will mean fixing the sky."}
    ]}
  ]
});

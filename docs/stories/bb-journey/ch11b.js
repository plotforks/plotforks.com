/* Journey chapter 11b (aftertaste, surrender and deal runs only): sentencing day. Content only (Opus pass).
   Plays only when ch10 did not end in the shootout; ch11a covers "Felina". Every choice sets one of
   confessed / lectured / silent. Hank is alive in every run that reaches this chapter.
   canon "a" because Walt's honest answer echoes what he finally tells Skyler in "Felina" (paraphrased, not quoted).
   New art used here: set "courtroom" (bench, witness stand, a public gallery); cast judge: "sit"; skyler "sit"
   (front row); fx "blue" (a small bag of blue crystals seen on a newspaper front page, nothing more detailed). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 30, canon: "a", id: "sentencing", code: "S5E16+", episode: "After Felina", title: "Sentencing day",
  setup: {
    kicker: "Aftertaste. Federal court, Albuquerque.",
    text: "Walter White has pleaded guilty to everything he could remember and several things he could not. Hank sits two rows back with his arms folded. Before the sentence is read, the judge asks whether Walt has anything to say.",
    caption: "The last word, finally his.",
    scene: {set: "courtroom", cast: {walt: "suit", judge: "sit", hank: "suspicious"}},
    variants: [
      {when: "deal && hank>=70", text: "Hank turned the deal down and kept the forty-page confession anyway. Walter White has pleaded guilty to all of it. Hank sits two rows back with his arms folded. Before the sentence is read, the judge asks whether Walt has anything to say."},
      {when: "deal && family>=60", text: "The deal is signed and the DEA has its network. Skyler, Walt Jr. and Holly are in the front row, and Hank sits two rows back with his arms folded. Before the sentence is read, the judge asks whether Walt has anything to say."},
      {when: "deal", text: "The deal is signed and the DEA has its network. The front row is empty. Hank sits two rows back with his arms folded. Before the sentence is read, the judge asks whether Walt has anything to say."},
      {when: "family>=60", text: "Walter White has pleaded guilty to everything he could remember and several things he could not. Skyler is in the front row with the kids. Hank sits two rows back with his arms folded. Before the sentence is read, the judge asks whether Walt has anything to say."},
      {when: "family<30", text: "Walter White has pleaded guilty to everything he could remember and several things he could not. The front row is empty. Hank sits two rows back with his arms folded. Before the sentence is read, the judge asks whether Walt has anything to say."}
    ]
  },
  question: "The judge is waiting. What does Walt say?",
  choices: [
    {id: "a", label: "The truth: he did it for himself", tag: "What he told Skyler, eventually.",
     effects: {darkness: -10, family: 10}, flags: ["confessed"], beats: [
      {scene: {set: "courtroom", cast: {walt: "suit", judge: "sit"}, say: {who: "walt", text: "It was for me."}}, caption: "No speech about family this time.",
       text: "Walt says it was never really for the family. He did it because he was good at it, and because, for the first time in his life, he felt alive."},
      {when: "family>=60", scene: {set: "courtroom", cast: {walt: "suit", skyler: "sit"}}, caption: "One nod.",
       text: "In the front row, Skyler nods once. It is the first thing he has said in two years that she believes completely."},
      {when: "family<60", scene: {set: "courtroom", cast: {walt: "suit", hank: "suspicious"}}, caption: "Said to an empty row.",
       text: "The front row is empty, and he says it anyway. Two rows back, Hank unfolds his arms."},
      {when: "jesse>=70", scene: {set: "courtroom", cast: {jesse: "stand"}}, caption: "The back row.",
       text: "In the back row, Jesse, in a borrowed suit, has been waiting to be asked to speak. When his turn comes, he takes it."}
    ]},
    {id: "b", label: "A forty-minute chemistry lecture", tag: "He has the room.",
     effects: {darkness: 5}, flags: ["lectured"], beats: [
      {scene: {set: "courtroom", cast: {walt: "lecture", judge: "sit"}}, caption: "Exhibit A: the periodic table.",
       text: "Walt begins with hydrogen. The judge means to stop him and doesn't, because the court reporter has started taking notes for herself."},
      {when: "galeAlive", scene: {set: "courtroom", cast: {gale: "stand"}}, caption: "A postcard tan.",
       text: "In the gallery, a man with a Nepal tan is taking notes and nodding at all the right places. Gale is back."},
      {scene: {set: "prison", cast: {walt: "lecture"}}, caption: "Forty copies, on order.",
       text: "The sentence is long. The next week the prison library orders forty copies of an introductory chemistry textbook, and nobody asks why."}
    ]},
    {id: "c", label: "Nothing at all", tag: "Let them wonder.",
     effects: {darkness: 10, family: -10}, flags: ["silent"], beats: [
      {scene: {set: "courtroom", cast: {walt: "suit", judge: "sit"}}, caption: "Mystique, entered into the record.",
       text: "Walt stands, looks slowly around the courtroom, and sits down again without a word. The newspapers love it. Hank, who knows him, does not."},
      {when: "deal && hank<70", scene: {set: "prison", cast: {walt: "stand"}}, caption: "Nobody inside knows.",
       text: "Part of the deal is a new name. He serves his time under Skyler's maiden name, and nobody inside knows who he is. That bothers him more than the sentence."},
      {when: "deal && hank>=70", scene: {set: "courtroom", cast: {hank: "read", walt: "suit"}}, caption: "Read into the record.",
       text: "Hank reads the confession into the record himself, all forty pages, footnotes included. Walt listens without a word and corrects nothing."},
      {when: "!deal", scene: {set: "prison", cast: {walt: "stand"}, fx: ["blue"]}, caption: "Front page, Phoenix edition.",
       text: "A year later, blue product turns up in Phoenix, and nobody knows who cooked it. Walt reads about it in the prison library and says nothing, again."}
    ]}
  ]
});

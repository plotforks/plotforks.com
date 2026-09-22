/* Journey chapter 17: S5E14 "Ozymandias", the minute after the shooting. Content only (Opus pass).
   Plays only on shootout runs (chapter-level when), between To'hajiilee (n:16) and Felina (n:18a).
   Dimos's premise: Jack's crew decide not to kill Hank. In the aired episode Jack shoots him mid-sentence.
   Sets hankLives / soldJesse / hankDead. In all three branches Jack's crew take Jesse to the compound and
   leave Walt free, so the Felina chapter keeps its premise.
   Violence is stated in one plain line and never drawn. No gun is shown.
   New art used here: cast hank "cuffed" (kneeling in the dirt, hands behind his back, jacket dusty,
   no blood, no weapon in frame). Set desert and cast jack "stand", walt "kneel" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 27, canon: "c", when: "shotsFired", id: "jacksprice", code: "S5E14", episode: "Ozymandias", title: "Jack names a price",
  setup: {
    kicker: "Aftertaste of a gunfight. To'hajiilee, four minutes later.",
    text: "The desert goes quiet. Walt is on his knees in the dirt in his own handcuffs, and Hank is alive, face down, ten feet away. This is the minute the show spends about forty seconds on. Jack takes his time instead, because Jack is a businessman before he is anything else, and there are eight barrels buried within a hundred yards of this conversation.",
    caption: "Eighty million dollars, give or take a shovel.",
    scene: {set: "desert", cast: {jack: "stand", walt: "kneel", hank: "cuffed"}},
    variants: [
      {when: "jesse>=70", text: "The desert goes quiet. Walt is on his knees in the dirt in his own handcuffs, Hank is alive ten feet away, and Jesse is under a car somewhere behind them, hearing every word of what comes next. Jack takes his time, because Jack is a businessman before he is anything else, and there are eight barrels buried within a hundred yards of this conversation."},
      {when: "portfolio", text: "The desert goes quiet. Walt is on his knees in the dirt in his own handcuffs, and Hank is alive, face down, ten feet away. Jack wants the barrels. What Jack does not know is that most of the money is no longer in barrels at all, and that the rest of it is in bonds."}
    ]
  },
  question: "Jack will take a price for Hank. What does Walt pay?",
  choices: [
    {id: "a", label: "Everything, for Hank", tag: "All of it, for one man.",
     effects: {darkness: -10, family: 15, jesse: 5}, flags: ["hankLives"], beats: [
      {scene: {set: "desert", cast: {walt: "kneel", jack: "stand"}, say: {who: "walt", text: "All of it. Every barrel. Take it and go."}}, caption: "The largest sum ever paid in a desert.",
       text: "Walt gives up all eight barrels without negotiating, which is the first time in five seasons he has not negotiated. Jack is so pleased by the arithmetic that he leaves both men alive and takes the shovels as well."},
      {scene: {set: "desert", cast: {hank: "cuffed", walt: "stand"}}, caption: "No thank you is coming.",
       text: "Jack uncuffs Walt, because a partner is worth more loose than kneeling, and takes Jesse with him for the cook. Hank, still cuffed to his own car, watches Walt stand up and recites his rights to him from memory, in the dirt, with no gun and no backup."},
      {when: "family>=70", scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "Somebody telephoned Marie.",
       text: "Somebody telephones Marie from the road. It is the only phone call in this entire series that makes a family member happy, and it costs eighty million dollars."}
    ]},
    {id: "b", label: "Pay, and give him the cook", tag: "The money and the boy.",
     effects: {darkness: 15, jesse: -30, family: 5}, flags: ["hankLives", "soldJesse"], beats: [
      {scene: {set: "desert", cast: {walt: "point", jack: "stand"}, say: {who: "walt", text: "He's under the car. He cooks better than I do."}}, caption: "Two items, one price.",
       text: "Walt pays with the barrels and then, unprompted, points at the car Jesse is hiding under and sells his partner's hands as a bonus item. Hank hears the whole sentence from the dirt and never forgets a word of it."},
      {scene: {set: "desert", cast: {hank: "cuffed"}}, caption: "A man with a new reason to live.",
       text: "Hank goes home alive with a headache, a dislocated shoulder and the single best-motivated case file in the history of the Albuquerque DEA. He has heard his brother-in-law trade a kid for him."},
      {scene: {set: "compound", cast: {jesse: "chained"}}, caption: "Bought, delivered, chained.",
       text: "Jesse is taken to the compound and put to work. He spends a long time working out which part of the afternoon he is angriest about, and settles on the word bonus."}
    ]},
    {id: "c", label: "Say nothing", tag: "What the show did.",
     effects: {darkness: 20, family: -20}, flags: ["hankDead"], beats: [
      {scene: {set: "desert", cast: {walt: "kneel", jack: "stand"}, say: {who: "walt", text: "He's my brother-in-law."}}, caption: "Begging is not a price.",
       text: "Walt offers eighty million dollars and a family connection, which are not the same thing as a price, and Jack does not accept either. Hank finishes his own sentence, and Jack finishes it for him. It takes no time at all."},
      {scene: {set: "desert", cast: {walt: "stand"}}, caption: "Seven barrels lighter.",
       text: "Jack leaves Walt one barrel out of eight, takes Jesse for the cook, and drives away. Walt rolls the barrel across the desert by hand, which is the exact image the show ends its worst hour on."}
    ]}
  ]
});

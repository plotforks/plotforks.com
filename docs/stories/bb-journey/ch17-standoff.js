/* Journey chapter 17: S5E13/14, the minute between To'hajiilee and Ozymandias. Content only (Opus pass).
   Dimos's premise: Jack's crew take cover behind the cars and nobody fires at all.
   Plays only on shootout runs (chapter-level when). Decides whether a shot is ever fired:
     a -> noShots + hankLives            (Walt is arrested; the run finishes at the sentencing chapter, n:23b)
     b -> shotsFired + atLarge  (canon)  (the run continues to ch17-jack.js, n:21, then Felina, n:23a)
     c -> noShots + hankLives + hostages + atLarge  (no shot fired, but Walt stays free; finishes at Felina)
   `atLarge` is the flag the two aftertaste chapters switch on, so it must be set by every branch that leaves
   Walt free. No gun is ever drawn, described or shown.
   New art used here: fx "dust" (a dust cloud from cars that have just stopped hard). Set desert, cast jack "stand",
   walt "kneel", hank "cuffed" (added for ch17-jack.js) all exist or are already on the art list. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 22, canon: "b", when: "shootout", id: "standoff", code: "S5E13", episode: "To'hajiilee", title: "Behind the cars",
  setup: {
    kicker: "Aftertaste. To'hajiilee, ninety seconds after the cars stop.",
    text: "Jack's crew came in fast and are now behind three trucks. Hank and his partner are behind theirs, badges held up, shouting that they are federal agents. Walt is on his knees in the dirt between them in his own handcuffs, screaming at everybody to stop. In the show, this is the last ninety seconds before the worst hour of television ever made. Nobody has fired yet.",
    caption: "Two sides, six doors, no shots.",
    scene: {set: "desert", cast: {jack: "stand", walt: "kneel", hank: "cuffed"}, fx: ["dust"]},
    variants: [
      {when: "jesse>=70", text: "Jack's crew came in fast and are now behind three trucks. Hank and his partner are behind theirs, badges held up, and Jesse is flat on the ground under one of the cars, where everyone has forgotten about him. Walt is on his knees between them in his own handcuffs, screaming at everybody to stop. Nobody has fired yet."},
      {when: "carwash", text: "Jack's crew came in fast and are now behind three trucks. Hank and his partner are behind theirs, badges held up, shouting that they are federal agents and that there is a warrant, a task force and forty-one car washes behind them. Walt is on his knees in the dirt between them, screaming at everybody to stop. Nobody has fired yet."}
    ]
  },
  question: "Nobody has fired yet. What does Walt make happen in the next ninety seconds?",
  choices: [
    {id: "a", label: "Stop it before it starts", tag: "Nobody fires a single shot.",
     effects: {darkness: -15, family: 15, jesse: 10}, flags: ["noShots", "hankLives"], beats: [
      {scene: {set: "desert", cast: {walt: "stand", jack: "stand"}, say: {who: "walt", text: "He is my brother-in-law. Get back in the truck."}}, caption: "Ninety seconds of shouting, and it works.",
       text: "Walt gets to his feet with his hands still cuffed behind him, walks into the open between the two lines of cars, and keeps shouting until Jack decides that a dead federal agent is worth less than a live chemist who owes him a favor."},
      {scene: {set: "desert", cast: {jack: "stand"}, fx: ["dust"]}, caption: "A consolation prize, dug up.",
       text: "Jack is not leaving empty. His crew dig up every barrel in the dirt, put Jesse in the back of a truck for the cook, and drive off. In ninety seconds Walt lost eighty million dollars, a partner and nobody at all."},
      {scene: {set: "desert", cast: {hank: "suspicious", walt: "stand"}}, caption: "The quietest arrest in the series.",
       text: "Hank puts him in the car himself, and neither of them says anything for forty miles. In this timeline Ozymandias is a twenty-minute episode about paperwork, and everybody goes home."}
    ]},
    {id: "b", label: "Let it start", tag: "What the show did.",
     effects: {darkness: 20}, flags: ["shotsFired", "atLarge"], beats: [
      {scene: {set: "desert", cast: {jack: "stand", walt: "kneel"}, fx: ["dust"]}, caption: "Nobody hears him.",
       text: "Somebody's nerve goes first, and then the desert is loud for a long time. Walt, on his knees in handcuffs, shouts for it to stop and discovers that he is the least important man in the argument."},
      {scene: {set: "desert", cast: {walt: "kneel"}}, caption: "Then it is quiet again.",
       text: "When it stops, everything that follows is decided by other people. Walt spends the rest of his life explaining that he did not want this part, which is true, and worth nothing."}
    ]},
    {id: "c", label: "Tell Jack to take them alive", tag: "No shots, two hostages.",
     effects: {darkness: 15, family: 5}, flags: ["noShots", "hankLives", "hostages", "atLarge"], beats: [
      {scene: {set: "desert", cast: {walt: "kneel", jack: "stand"}, say: {who: "walt", text: "Dead agents bring the government. Live ones bring a negotiation."}}, caption: "An argument made in risk terms.",
       text: "Walt does not ask Jack to be merciful, because Jack is not. He explains what killing two federal agents in daylight costs a business, and what two cuffed agents in a shed is worth instead. Jack likes the second number better."},
      {scene: {set: "compound", cast: {jack: "stand", hank: "cuffed"}}, caption: "Six weeks in a shed.",
       text: "Nobody fires a shot. Hank and his partner spend six weeks in a building with no windows and are released on a roadside outside Gallup, alive, furious, and with an extremely detailed description of everyone involved."},
      {scene: {set: "desert", cast: {walt: "stand"}}, caption: "Free, and worth more dead to four people.",
       text: "Walt walks away free with a crew who now consider him a partner, a brother-in-law who will testify for the rest of his life, and Jesse in the back of a truck. He goes to New Hampshire anyway."}
    ]}
  ]
});

/* Journey chapter 5: S2E12 "Phoenix" (journey version: Jesse stays in town in every branch). Content only (Opus pass).
   Uses beat-level `when` (show only the beats whose condition holds). No new art. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 7, canon: "c", id: "phoenix", code: "S2E12", episode: "Phoenix", title: "Jane's bedside",
  setup: {
    kicker: "Jesse's apartment, 3:00 a.m.",
    text: "Walt came to talk Jesse out of leaving town with Jane and his share of the money. He finds them both passed out. He shakes Jesse, hard. Jesse doesn't wake, but Jane rolls onto her back and starts to choke.",
    caption: "The last quiet moment of Season 2.",
    scene: {set: "bedroom", cast: {jesse: "lie", jane: "back", walt: "near"}, fx: ["zz", "cough"]},
    variants: [
      {when: "jesse>=60", text: "Walt came to talk Jesse out of leaving town with Jane and his share of the money. Jesse trusts him more than anyone, which is why the door was unlocked. He finds them both passed out. He shakes Jesse, hard. Jesse doesn't wake, but Jane rolls onto her back and starts to choke."}
    ]
  },
  question: "Jane is choking. What does Walt do?",
  choices: [
    {id: "a", label: "Roll her onto her side", tag: "The decent thing.",
     effects: {darkness: -10, jesse: 5}, flags: ["janeAlive", "noCrash"], beats: [
      {scene: {set: "bedroom", cast: {jesse: "lie", jane: "side", walt: "kneel"}, fx: ["zz", "halo"]}, caption: "Walter White, briefly a good person.",
       text: "Walt kneels and turns Jane onto her side. She coughs, breathes, and keeps breathing. He is quietly annoyed at how good that felt."},
      {scene: {set: "bedroom", cast: {jesse: "sit", jane: "sit-glare", walt: "near"}}, caption: "Grateful, through her teeth.",
       text: "Jane wakes, works out what happened, and says thank you through her teeth. The next morning she takes Jesse to a meeting instead of the airport. They stay in Albuquerque and try to get clean."}
    ]},
    {id: "b", label: "Call 911", tag: "The anonymous caller.",
     effects: {darkness: -5, hank: 20, jesse: -10}, flags: ["janeAlive", "noCrash"], beats: [
      {scene: {set: "bedroom", cast: {jesse: "lie", jane: "back", walt: "phone"}, fx: ["zz", "cough"]}, caption: "A concerned citizen, allegedly.",
       text: "Walt steps into the hallway and calls 911 in a disguised voice that is somehow more suspicious than his real one. Then he leaves before anyone can ask his name."},
      {when: "saul", scene: {set: "office", cast: {saul: "pitch", jesse: "stand"}}, caption: "A reasonable fee, he says.",
       text: "Paramedics save Jane. The police find the money, and Saul makes the charges disappear for a fee he calls reasonable. Hank reads the file anyway."},
      {when: "!saul", scene: {set: "bedroom", cast: {jesse: "sit", jane: "side"}, fx: ["siren"]}, caption: "Six months, court-ordered.",
       text: "Paramedics save Jane. The police find the money, and Jesse gets a plea deal and six months of court-ordered rehab. Hank reads the file twice."}
    ]},
    {id: "c", label: "Watch", tag: "What the show did.",
     effects: {darkness: 25, family: -10}, beats: [
      {scene: {set: "bedroom", cast: {jesse: "lie", jane: "back", walt: "reach"}, fx: ["zz"]}, caption: "The moment the show turns.",
       text: "Walt reaches toward her, stops, and watches. He does nothing. Jane dies."},
      {scene: {set: "sky-canon"}, caption: "The Season 2 cold opens finally make sense.",
       text: "Her grieving father goes back to work in the control tower. Two planes collide over Albuquerque, and a pink teddy bear falls into the Whites' pool."}
    ]}
  ]
});

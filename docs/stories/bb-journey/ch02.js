/* Journey chapter 2: S1E3 "...And the Bag's in the River". Content only (Opus pass).
   New art used here: set "basement"; krazy8 "chained", "stand". */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 2, canon: "a", id: "basement", code: "S1E3", episode: "...And the Bag's in the River", title: "Krazy-8 in the basement",
  setup: {
    kicker: "Jesse's basement.",
    text: "A deal with two local dealers went wrong. One is dead. The other, Krazy-8, is chained to a pole in Jesse's basement, and Walt has spent two days writing lists of reasons to let him go. Then he notices a shard of broken plate is missing.",
    caption: "Day two of a very long list of pros and cons.",
    scene: {set: "basement", cast: {krazy8: "chained", walt: "stand"}},
    variants: [
      {when: "skylerKnows", text: "A deal with two local dealers went wrong. One is dead. The other, Krazy-8, is chained to a pole in Jesse's basement. Skyler thinks Walt is at a support group. He has spent two days writing lists of reasons to let the man go. Then he notices a shard of broken plate is missing."}
    ]
  },
  question: "Walt knows about the shard. What does he do?",
  choices: [
    {id: "a", label: "Kill him", tag: "The point of no return.",
     effects: {darkness: 20}, flags: ["firstKill"], beats: [
      {scene: {set: "basement", cast: {walt: "stand"}, fx: ["sweat"]}, caption: "The first line, crossed.",
       text: "Walt does what the show did. It is ugly and slow. Afterwards he stands in the basement for a long time without crying, and that frightens him more than the rest."},
      {scene: {set: "rv", cast: {walt: "stand", jesse: "stand"}}, caption: "Things they don't talk about.",
       text: "Jesse never asks what happened down there, and Walt never offers. They both start sleeping worse."}
    ]},
    {id: "b", label: "Let him go", tag: "Trust the pros column.",
     effects: {darkness: -5, hank: 15, jesse: -5}, flags: ["krazyAlive"], beats: [
      {scene: {set: "basement", cast: {krazy8: "stand", walt: "stand"}, say: {who: "krazy8", text: "You won't regret this."}}, caption: "Famous last words, just not his.",
       text: "Walt unlocks the chain. Krazy-8 thanks him politely, walks up the stairs, and runs."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "A description, filed.",
       text: "A week later Krazy-8 is picked up on another charge and trades a story to the DEA: a bald guy with glasses who cooks the best product in town. Hank writes it down."}
    ]},
    {id: "c", label: "Leave him tied up outside the DEA office", tag: "Special delivery.",
     effects: {darkness: 5, hank: 25}, beats: [
      {scene: {set: "house", cast: {krazy8: "chained"}, fx: ["siren"]}, caption: "Gift-wrapped, with footnotes.",
       text: "At 4 a.m. Walt and Jesse leave Krazy-8 chained to a bench outside the DEA field office, with a note listing his crimes in very neat handwriting."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "The handwriting of a teacher.",
       text: "Hank reads the note over his coffee. Whoever wrote it knows chemistry, grammar and the exact size of Krazy-8's last shipment. Hank is impressed, and curious."}
    ]}
  ]
});

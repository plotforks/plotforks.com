/* Journey chapter 8: S4E1 "Box Cutter". Content only (Opus pass). The Gus chapter.
   Plays after Gale (n:7). Gus is alive here and dies in n:10 (End Times), as before.
   Violence is never described in detail and never drawn: the room, the silence and the drain carry it.
   New art used here: cast gus with poses "stand" and "fold" (Los Pollos manager: pressed yellow shirt,
   glasses, hands folded, absolutely still). Sets superlab and restaurant already exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 11, canon: "a", id: "boxcutter", code: "S4E1", episode: "Box Cutter", title: "Gus comes downstairs",
  setup: {
    kicker: "The laundry, downstairs. The floor has a drain.",
    text: "Gus arrives at the lab in a clean shirt and says nothing for a very long time. Victor, who has been running the equipment all night, wants everyone to know he watched every step of the cook and could do it himself tomorrow. Everybody in the room understands what that sentence has just cost him, except Victor.",
    caption: "Nobody has said a word in four minutes.",
    scene: {set: "superlab", cast: {gus: "fold", walt: "stand", jesse: "stand"}},
    variants: [
      {when: "galeAlive", text: "Gale is in Nepal and his notes are not. Gus arrives at the lab in a clean shirt and says nothing for a very long time, because someone warned his replacement cook and only three people knew he had one. Victor, who has been running the equipment all night, keeps mentioning that he watched every step and could do it himself tomorrow."},
      {when: "jesse<=25", text: "Gus arrives at the lab in a clean shirt and says nothing for a very long time. Jesse has not slept and does not appear to care what happens next, which is its own kind of problem. Victor keeps mentioning that he watched every step of the cook and could do it himself tomorrow."}
    ]
  },
  question: "Gus is working out who in this room is necessary. What does Walt do?",
  choices: [
    {id: "a", label: "Say nothing", tag: "What the show did.",
     effects: {darkness: 10, jesse: -5}, beats: [
      {scene: {set: "superlab", cast: {gus: "stand", walt: "stand"}}, caption: "He changes back into the yellow shirt afterwards.",
       text: "Walt stands very still and lets Gus answer the question himself. Gus answers it in front of them, without raising his voice, and Victor does not leave the room. Then Gus washes, changes, and goes back upstairs to run a restaurant."},
      {scene: {set: "superlab", cast: {walt: "stand", jesse: "stand"}}, caption: "Two men and a mop.",
       text: "Nobody says anything on the drive home. Walt has learned the lesson Gus intended: he is a cook, cooks are equipment, and equipment is replaced when it starts talking about itself."}
    ]},
    {id: "b", label: "Speak for Victor", tag: "Talk the boss down.",
     effects: {darkness: -5, jesse: 10, hank: 5}, flags: ["victorLives"], beats: [
      {scene: {set: "superlab", cast: {walt: "point", gus: "fold"}, say: {who: "walt", text: "He is useful to you. I am not, if you do this here."}}, caption: "An argument made in inventory terms.",
       text: "Walt makes the only case Gus respects, which is an inventory case: a man who can run the equipment is worth more standing up, and a lab where that happens is a lab where nobody concentrates for a month."},
      {scene: {set: "superlab", cast: {gus: "stand"}}, caption: "Filed, not forgotten.",
       text: "Gus considers it for eleven seconds and agrees. Victor lives, learns the cook properly, and becomes exactly the replacement Walt was arguing against. Gus never mentions the evening again, which is worse."}
    ]},
    {id: "c", label: "Put it on Jesse", tag: "Somebody fired that gun.",
     effects: {darkness: 20, jesse: -30}, flags: ["blamedJesse"], beats: [
      {scene: {set: "superlab", cast: {walt: "stand", gus: "fold", jesse: "stand"}, say: {who: "walt", text: "He acted alone."}}, caption: "Said quietly, in front of him.",
       text: "Walt explains, reasonably, that the boy panicked and acted alone, and that a chemist of Walt's standing would never have ordered such a thing. Jesse hears every word and says nothing at all."},
      {scene: {set: "superlab", cast: {gus: "stand", jesse: "stand"}}, caption: "Kept, both of them.",
       text: "Gus keeps them both, because two frightened men are easier to run than one. Jesse cooks beside Walt for months afterwards and answers every question with the shortest word available."}
    ]}
  ]
});

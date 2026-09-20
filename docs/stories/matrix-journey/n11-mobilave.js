/* Matrix journey chapter 11 (new 2026-09-20): The Matrix Revolutions (2003), Mobil Ave.
   Sits between the Architect (n:10) and the Machine City decision (n:12): this is the coma, from the inside.
   Every branch ends with Neo back on the ship, so nothing downstream changes premise.
   New art used here: cast trainman "stand" (overalls, a lantern, too many keys on his belt).
   Set "subway", cast sati "stand", neo "stand" / "sit" and fx "train" already exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 11, canon: "a", id: "mobilave", code: "M3", episode: "Revolutions", title: "The station between",
  setup: {
    kicker: "A station that is neither one place nor the other.",
    text: "Neo is in a coma on a ship, and also standing on a platform in a clean empty station called Mobil Ave, which is an anagram somebody thought was funnier than it is. A family is waiting for the train with him: a father, a mother and a small girl called Sati, who are programs, and who are refugees, and who are quite obviously a family.",
    caption: "No exit, one train, one timetable.",
    scene: {set: "subway", cast: {neo: "stand", sati: "stand"}, fx: ["train"]},
    variants: [
      {when: "trinityLost", text: "Neo is in a coma on a ship, and also standing on a platform in a clean empty station that goes nowhere. He has had nothing to do for some hours except think about a door he chose and a person who is not coming back. A family is waiting for the train with him: two programs and their small daughter, Sati."}
    ]
  },
  question: "There is no way out of this station without the Trainman. How does Neo spend the wait?",
  choices: [
    {id: "a", label: "Wait, then push past him", tag: "What the film did.",
     effects: {belief: 5, agents: 5}, beats: [
      {scene: {set: "subway", cast: {neo: "stand", trainman: "stand"}}, caption: "Down here, he is the one.",
       text: "The Trainman explains, reasonably, that in this station he makes the rules and the trains, and demonstrates it by putting Neo through a pillar. Down here the most powerful man in the Matrix is a passenger without a ticket."},
      {scene: {set: "subway", cast: {neo: "sit"}, fx: ["train"]}, caption: "Somebody made a call.",
       text: "He gets out in the end because other people came looking for him, which is a lesson he keeps having to learn. He rides back into the world he is supposed to be saving and arrives late."}
    ]},
    {id: "b", label: "Ask the father about love", tag: "Programs, and what they want.",
     effects: {belief: 10, trinity: 10}, flags: ["karma"], beats: [
      {scene: {set: "subway", cast: {neo: "stand", sati: "stand"}}, caption: "A word for a connection.",
       text: "Rama Kandra says he is doing all of this for love, and then says that love is only a word, and what matters is the connection the word points at. He is talking about his daughter, and he is also, accidentally, explaining Neo's entire life to him."},
      {scene: {set: "subway", cast: {sati: "stand"}, fx: ["train"]}, caption: "She is not deleted. She is here.",
       text: "Neo promises to look for the girl on the other side, and means it. It changes nothing about the war and everything about how he behaves in the last forty minutes of it."}
    ]},
    {id: "c", label: "Fight the Trainman", tag: "He is only a program.",
     effects: {belief: -5, agents: 10}, flags: ["trainFight"], beats: [
      {scene: {set: "subway", cast: {neo: "fight", trainman: "stand"}}, caption: "Home fixture.",
       text: "Neo attacks the man who wrote the physics of the room he is standing in, which goes exactly as well as that sentence suggests. He spends a while against a wall, being lectured by a man holding a lantern."},
      {scene: {set: "subway", cast: {neo: "sit"}}, caption: "Longer, and with a limp.",
       text: "He gets out anyway, but later and in a worse state, and the Merovingian hears about the whole thing within the hour and dines out on it for a month."}
    ]}
  ]
});

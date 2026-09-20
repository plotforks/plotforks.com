/* Matrix journey chapter 5: The Matrix, "Smith in the subway". Content only (Opus pass).
   Canon: Neo turns and fights; the train hits Smith, who returns in another body; Neo then runs, is shot dead by Smith in
   room 303 of the Heart O' the City hotel, and rises after Trinity tells him what the Oracle told her. Every branch ends
   with the death and the rising, so ch06 (Neo as the One) holds.
   New art used here: sets "subway" (an empty platform, tiled walls, a payphone, a train light), "hotel" (a shabby corridor,
   a door marked 303); cast neo: "fight", "down" (lying on the floor); smith: "fight"; fx "phone" (a ringing payphone),
   "train" (headlight and motion lines), "bullets" (a row of bullets stopped in midair). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 8, canon: "a", id: "subway", code: "M1", episode: "The Matrix", title: "Smith in the subway",
  setup: {
    kicker: "An empty subway station.",
    text: "The only way out is a ringing payphone. Morpheus and Trinity are already through it. Before Neo can pick up, Agent Smith shoots the phone off the wall and steps onto the platform. Nobody who has fought an Agent has lived to talk about it. Neo could run. He could also do something much less sensible.",
    caption: "The phone was his ride.",
    scene: {set: "subway", cast: {neo: "coat", smith: "stand"}, fx: ["phone"]},
    variants: [
      {when: "morpheusDead", text: "A recruiting run has gone wrong. The only way out is a ringing payphone at an empty subway station, and Trinity is already through it. Before Neo can pick up, Agent Smith shoots the phone off the wall and steps onto the platform. Nobody who has fought an Agent has lived to talk about it. Neo could run. He could also do something much less sensible."},
      {when: "traded", text: "Morpheus and Trinity have broken Neo out, and the only way out is a ringing payphone at an empty subway station. They are already through it. Before Neo can pick up, Agent Smith shoots the phone off the wall and steps onto the platform, still annoyed about the trade. Neo could run. He could also do something much less sensible."}
    ]
  },
  question: "Agent Smith is on the platform. What does Neo do?",
  choices: [
    {id: "a", label: "Fight", tag: "What the film did.",
     effects: {belief: 25, agents: 15, trinity: 5}, beats: [
      {scene: {set: "subway", cast: {neo: "fight", smith: "fight"}, fx: ["train"], say: {who: "smith", text: "Mr. Anderson."}}, caption: "He prefers Neo.",
       text: "Neo stays. They fight the length of the platform, and it ends with Smith on the tracks in front of a train. Seconds later Smith steps out of somebody else's body, looking inconvenienced."},
      {scene: {set: "hotel", cast: {neo: "down", smith: "stand"}}, caption: "Room 303.",
       text: "Neo runs after all, with Tank on the phone giving directions. The exit is room 303 of a cheap hotel. Smith is inside, waiting. This time Neo doesn't get up."},
      {scene: {set: "ship", cast: {neo: "sit", trinity: "stand"}, fx: ["bullets"]}, caption: "He is beginning to believe.",
       text: "On the ship, Trinity tells his body what the Oracle told her: she would fall in love with the One. So he cannot be dead. He sits up, stops the bullets in the air, and sees the code. Then he dives into Smith, and Smith comes apart."}
    ]},
    {id: "b", label: "Run", tag: "Frankly, the smart play.",
     effects: {belief: 5, trinity: 15}, beats: [
      {scene: {set: "street", cast: {neo: "coat"}}, caption: "Cardio, the oldest martial art.",
       text: "Neo runs, which is what anyone sensible would do: through a market, over a roof and up a fire escape, with Tank on the phone giving directions and Trinity telling Tank to hurry."},
      {scene: {set: "hotel", cast: {neo: "down", smith: "stand"}}, caption: "Room 303.",
       text: "The exit is room 303 of a cheap hotel. Smith is inside, waiting. This time Neo doesn't get up."},
      {scene: {set: "ship", cast: {neo: "sit", trinity: "stand"}, fx: ["bullets"]}, caption: "He is beginning to believe.",
       text: "On the ship, Trinity tells his body what the Oracle told her: she would fall in love with the One. So he cannot be dead. He sits up, stops the bullets in the air, and sees the code. Then he dives into Smith, and Smith comes apart."}
    ]},
    {id: "c", label: "Ask Smith what his problem is", tag: "Therapy, on a platform.",
     effects: {belief: 10, agents: 10}, flags: ["smithTalk"], beats: [
      {scene: {set: "subway", cast: {neo: "coat", smith: "stand"}, say: {who: "neo", text: "What is your problem?"}}, caption: "Nobody ever asks.",
       text: "Neo asks, sincerely. Smith has waited years for someone to ask. Humans, he explains, are a disease, this place is a zoo, and he can no longer stand the smell."},
      {scene: {set: "hotel", cast: {neo: "down", smith: "stand"}, fx: ["train"]}, caption: "Room 303.",
       text: "The train arrives in the middle of Smith's best point, and Neo runs. The exit is room 303 of a cheap hotel. Smith is inside, still hurt about the interruption. This time Neo doesn't get up."},
      {scene: {set: "ship", cast: {neo: "sit", trinity: "stand"}, fx: ["bullets"]}, caption: "He is beginning to believe.",
       text: "On the ship, Trinity tells his body what the Oracle told her: she would fall in love with the One. So he cannot be dead. He sits up, stops the bullets in the air, and sees the code. Then he dives into Smith, and Smith comes apart."}
    ]}
  ]
});

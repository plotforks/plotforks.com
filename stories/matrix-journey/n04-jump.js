/* Matrix journey chapter 4 (new 2026-09-20): The Matrix (1999), the jump program.
   Sits between the pills (n:3) and Cypher's drink (n:5). Every branch ends with Neo back on the ship,
   so nothing downstream changes premise.
   New art used here: set "rooftops" (two flat roofs a long way apart, a white sky with no sun, water towers).
   Cast neo "stand" / "down", morpheus "stand", tank "stand" already exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 4, canon: "a", id: "jump", code: "M1", episode: "The Matrix", title: "The jump program",
  setup: {
    kicker: "A loaded program. Two rooftops, no sun.",
    text: "Morpheus has explained that the rules of this place are the same kind of rules as the ones about how fast a computer can be persuaded to run. Then he jumps across a gap no human being could jump, lands, turns around, and waits. Below, the whole crew has gathered around a monitor, and at least one of them has money on this.",
    caption: "Everybody falls the first time. Allegedly.",
    scene: {set: "rooftops", cast: {morpheus: "stand", neo: "stand"}},
    variants: [
      {when: "bothPills", text: "Morpheus has explained the rules, jumped a gap no human being could jump, and is waiting on the far roof. Neo has not felt entirely stable since he took two pills at once, and the sky here keeps flickering at the edges. Below, the crew has gathered around a monitor, and at least one of them has money on this."}
    ]
  },
  question: "Free your mind, says the man on the other roof. What does Neo do?",
  choices: [
    {id: "a", label: "Run and jump", tag: "What the film did.",
     effects: {belief: 10, trinity: 5}, beats: [
      {scene: {set: "rooftops", cast: {neo: "down"}}, caption: "Everybody falls the first time.",
       text: "Neo runs, believes it for about two thirds of the distance, and stops believing it at the worst possible moment. The ground in this place is not real, which does not make it soft."},
      {scene: {set: "ship", cast: {neo: "stand", trinity: "stand"}}, caption: "The mouth bleeds anyway.",
       text: "He wakes on the ship with blood in his mouth from an injury that never happened. The body, Morpheus says, cannot live without the mind. Trinity looks at the blood rather longer than the situation requires."}
    ]},
    {id: "b", label: "Refuse to jump", tag: "He is not a man who jumps.",
     effects: {belief: -10, trinity: 10}, flags: ["noJump"], beats: [
      {scene: {set: "rooftops", cast: {neo: "stand", morpheus: "stand"}, say: {who: "neo", text: "No. I'd like to go back now."}}, caption: "An honest answer, on a roof.",
       text: "Neo walks to the edge, looks at the gap, and says out loud that he does not believe it and is not going to pretend. Morpheus, who has heard a hundred men lie on that roof, finds this considerably more interesting."},
      {scene: {set: "ship", cast: {neo: "stand", morpheus: "stand"}}, caption: "Nobody wins the bet.",
       text: "Nothing bleeds and nobody wins the bet. Mouse is disappointed, Trinity is not, and Morpheus starts teaching him the way you teach someone who will only believe what he has checked himself."}
    ]},
    {id: "c", label: "Ask for less gravity", tag: "Edit the program, not the man.",
     effects: {belief: 5, agents: -5}, flags: ["cheatJump"], beats: [
      {scene: {set: "rooftops", cast: {neo: "stand"}}, caption: "A reasonable request, from a programmer.",
       text: "Neo points out that this is a program, that someone is running it, and that the number governing gravity is presumably sitting in a file somewhere. Tank, who has never been asked this, turns it down to about the moon."},
      {scene: {set: "ship", cast: {tank: "stand", morpheus: "stand"}}, caption: "Not the lesson, but a lesson.",
       text: "Neo clears the gap with room to spare and learns nothing at all about belief. Morpheus is furious for two days. Tank writes the whole thing down, because nobody else has ever thought to ask."}
    ]}
  ]
});

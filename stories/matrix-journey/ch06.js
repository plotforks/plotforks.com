/* Matrix journey chapter 6: The Matrix Reloaded (2003), "The Architect". Content only (Opus pass).
   Canon: Neo is told he is the sixth One and that the prophecy is a control system. The door to the right leads to the
   Source (reload the Matrix, pick 23 people to rebuild Zion); the door to the left leads back to the Matrix to save
   Trinity, who is falling with a bullet in her, at the risk of human extinction. Neo takes the left door, restarts her
   heart, then stops Sentinels in the real world and falls into a coma. Every branch ends with that coma, so ch07 holds.
   Trinity's death in choice b is handled plainly.
   New art used here: set "architect" (a white room walled with TV screens, two glowing doors); cast architect: "sit"
   (white suit, white beard, pen); neo: "fly"; trinity: "fall"; fx "screens" (many small TV screens, each showing Neo),
   "sentinels" (squid-like machines in the dark, sparks as they drop). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 6, canon: "a", id: "architect", code: "M2", episode: "The Matrix Reloaded", title: "The Architect's two doors",
  setup: {
    kicker: "The Source. A white room made of television screens.",
    text: "Neo can fly now, and Smith has come back as something worse. Behind the last door, a tidy old man in a white suit, the Architect, explains at length that Neo is the sixth One and the prophecy was a control system. The right door saves Zion, in a way. The left door leads to Trinity, falling from a building with a bullet in her.",
    caption: "Ergo, concordantly, two doors.",
    scene: {set: "architect", cast: {architect: "sit", neo: "coat"}, fx: ["screens"]},
    variants: [
      {when: "morpheusDead", text: "Neo can fly now, and Smith has come back as something worse. Niobe got him this far, because Morpheus is not here to believe for him. Behind the last door, a tidy old man in a white suit, the Architect, explains at length that Neo is the sixth One and the prophecy was a control system. The right door saves Zion, in a way. The left door leads to Trinity, falling from a building with a bullet in her."},
      {when: "trinity>=70", text: "Neo can fly now. He asked Trinity to stay out of the Matrix tonight, and she came in anyway, for him. Behind the last door, a tidy old man in a white suit, the Architect, explains at length that Neo is the sixth One and the prophecy was a control system. The right door saves Zion, in a way. The left door leads to Trinity, falling from a building with a bullet in her."}
    ]
  },
  question: "Two doors. Which one does Neo take?",
  choices: [
    {id: "a", label: "The left door: Trinity", tag: "What the film did.",
     effects: {trinity: 20, zion: -15, belief: 10}, beats: [
      {scene: {set: "architect", cast: {architect: "sit", neo: "coat"}, fx: ["screens"]}, caption: "Predictable, says the man who predicted it.",
       text: "Neo takes the left door before the Architect finishes his sentence. The Architect remarks that hope is a very human flaw, to an empty room."},
      {scene: {set: "street", cast: {neo: "fly", trinity: "fall"}}, caption: "Not in any first-aid manual.",
       text: "Neo catches Trinity in midair, reaches into her chest and restarts her heart. She wakes up and asks what took him so long."},
      {scene: {set: "ship", cast: {neo: "down"}, fx: ["sentinels"]}, caption: "Out of order.",
       text: "Back in the real world, Neo stops a swarm of Sentinels with a thought, which should be impossible out here, and falls into a coma."}
    ]},
    {id: "b", label: "The right door: Zion", tag: "The needs of the many.",
     effects: {trinity: -40, zion: 20, belief: 5}, flags: ["trinityLost"], beats: [
      {scene: {set: "architect", cast: {architect: "sit", neo: "coat"}, fx: ["screens"]}, caption: "No procedure for this.",
       text: "Neo takes the right door, then refuses to pick the twenty-three people who would rebuild Zion. The Architect has no procedure for that, so he does nothing, and the machines keep marching."},
      {scene: {set: "street", cast: {trinity: "fall"}}, caption: "Nobody catches her.",
       text: "In the Matrix, Trinity falls. Nobody catches her."},
      {scene: {set: "ship", cast: {neo: "down"}, fx: ["sentinels"]}, caption: "Out of order.",
       text: "Back in the real world, Neo stops a swarm of Sentinels with a thought, which should be impossible out here, and falls into a coma."}
    ]},
    {id: "c", label: "Ask to speak to a manager", tag: "Customer service, at the Source.",
     effects: {trinity: 10, belief: 5, agents: -10}, flags: ["manager"], beats: [
      {scene: {set: "architect", cast: {architect: "sit", neo: "coat"}, fx: ["screens"], say: {who: "neo", text: "Who's your supervisor?"}}, caption: "The org chart has one box.",
       text: "Neo asks for the Architect's manager. The Architect explains that he wrote the org chart. Neo asks who approved it. For the first time in six versions, the Architect has no answer, only several ergos."},
      {scene: {set: "street", cast: {neo: "fly", trinity: "fall"}}, caption: "Complaint filed. Trinity caught.",
       text: "While he looks it up, Neo takes the left door, catches Trinity in midair and restarts her heart. The complaint stays on file, to be read one day by something very large."},
      {scene: {set: "ship", cast: {neo: "down"}, fx: ["sentinels"]}, caption: "Out of order.",
       text: "Back in the real world, Neo stops a swarm of Sentinels with a thought, which should be impossible out here, and falls into a coma."}
    ]}
  ]
});

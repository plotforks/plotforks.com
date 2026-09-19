/* Matrix journey chapter 4: The Matrix, "The Agents have Morpheus". Content only (Opus pass).
   Canon: Cypher's betrayal kills Mouse (in the Matrix), Apoc and Switch (unplugged) and Dozer; Tank survives and kills
   Cypher. Morpheus fights Smith so the others can escape and is taken to a government building to be broken for the
   Zion mainframe codes. Tank is about to pull his plug when Neo decides to go in. Every choice here still ends with Neo
   inside the Matrix and cornered by Smith at a subway station in ch05.
   New art used here: set "lobby" (a marble government lobby with columns, a revolving door); cast morpheus: "chair"
   (strapped into a chair, wired up), "stand"; neo: "coat" (long black coat, sunglasses); trinity: "coat";
   smith: "stand"; fx "plug" (the jack cable at the back of a head, a hand on it), "shells" (spent casings on marble,
   no weapons drawn). Deaths handled plainly. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 4, canon: "a", id: "morpheus", code: "M1", episode: "The Matrix", title: "The Agents have Morpheus",
  setup: {
    kicker: "The Nebuchadnezzar, the morning after.",
    text: "Cypher sold them out. The Agents ambushed the crew on the way back from the Oracle, and Mouse, Apoc, Switch and Dozer are dead. Morpheus fought Agent Smith so the others could escape, and now he is strapped to a chair in a government building while the Agents break into his mind for the codes to Zion. Tank has his hand on Morpheus's plug.",
    caption: "Everyone looks at the plug.",
    scene: {set: "ship", cast: {tank: "stand", morpheus: "chair", neo: "stand"}, fx: ["plug"]},
    variants: [
      {when: "warned", text: "Cypher sold them out, but Trinity was watching. He shot Dozer before she stopped him, and Mouse died in the ambush. Apoc and Switch are alive and furious. Morpheus fought Agent Smith so the others could escape, and now he is strapped to a chair in a government building while the Agents break into his mind for the codes to Zion. Tank has his hand on Morpheus's plug."}
    ]
  },
  question: "The Agents have Morpheus. What does Neo do?",
  choices: [
    {id: "a", label: "Go in and get him", tag: "What the film did.",
     effects: {belief: 15, trinity: 15, agents: 15}, flags: ["rescued"], beats: [
      {scene: {set: "ship", cast: {neo: "coat", trinity: "coat"}, say: {who: "trinity", text: "I'm coming with you."}}, caption: "Not a request.",
       text: "Neo tells Tank he is going in. Trinity tells Neo she is coming, and it is not a question. Tank loads them a construct full of guns, which is a lot of guns."},
      {scene: {set: "lobby", cast: {neo: "coat", trinity: "coat"}, fx: ["shells"]}, caption: "The lobby had a bad day.",
       text: "The lobby of a government building takes the worst of it. Then a rooftop, a helicopter, and Neo leaning back farther than a spine should go while the bullets slow down."},
      {scene: {set: "lobby", cast: {morpheus: "stand", neo: "coat"}}, caption: "Out through a phone line.",
       text: "Morpheus gets out through a ringing phone, then Trinity. Neo is last, and the phone is still ringing when Smith steps onto the platform."}
    ]},
    {id: "b", label: "Let Tank pull the plug", tag: "Zion over Morpheus.",
     effects: {belief: -10, trinity: -10, zion: 15}, flags: ["morpheusDead"], beats: [
      {scene: {set: "ship", cast: {tank: "stand", morpheus: "chair"}, fx: ["plug"]}, caption: "The codes stay safe.",
       text: "Neo nods. Tank says goodbye to his captain and pulls the plug. Morpheus dies in the chair without giving the Agents a single number."},
      {scene: {set: "ship", cast: {trinity: "stand", neo: "stand"}}, caption: "What Morpheus would have done.",
       text: "Trinity doesn't speak to Neo for a week. Then Tank asks him to go back into the Matrix and free someone new, because that is what Morpheus would have done."}
    ]},
    {id: "c", label: "Trade himself for Morpheus", tag: "The One, in exchange.",
     effects: {belief: 10, agents: 25, zion: 5}, flags: ["traded"], beats: [
      {scene: {set: "lobby", cast: {neo: "coat", smith: "stand"}, say: {who: "neo", text: "Take me instead."}}, caption: "A very quick yes.",
       text: "Neo walks into the building and offers himself instead. Smith, who wants the One far more than any codes, agrees much too quickly."},
      {scene: {set: "lobby", cast: {morpheus: "stand", trinity: "coat"}, fx: ["shells"]}, caption: "Round trip.",
       text: "Morpheus walks out. Twenty minutes later he walks back in with Trinity and a great many guns to collect Neo. The lobby does not survive either visit."}
    ]}
  ]
});

/* Journey chapter 5: S2E2 "Grilled". Content only (Opus pass). The shack in the desert, with Tuco and his uncle.
   Plays after the staircase chapter (n:4) and before Saul (n:6). Every branch ends with Tuco out of the picture
   and Walt and Jesse walking away, because the rest of season two needs exactly that; what changes is how.
   Sets triedRicin / tucoPartner / hectorHelped. hectorHelped is read again by the Face Off chapter (n:14).
   No new art: cast tuco "stand" and hector "sit" were added for n:4 and n:14, and sets house and desert exist.
   Nobody is shown being hurt. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 5, canon: "a", id: "grilled", code: "S2E2", episode: "Grilled", title: "The shack and the old man",
  setup: {
    kicker: "A shack an hour and a half into the desert.",
    text: "Tuco beat one of his own men to death in front of them for saying the wrong word, decided that Walt and Jesse were witnesses, and drove them out here. There is a shack, a car, a very long view in every direction, and an old man in a wheelchair in the corner who cannot speak, cannot move and misses absolutely nothing. Tuco is making lunch and talking about Mexico.",
    caption: "Four people, and only one of them can leave.",
    scene: {set: "house", cast: {tuco: "stand", walt: "stand", hector: "sit"}},
    variants: [
      {when: "heisenbergBorn", text: "Tuco has spent two months telling people about the chemist who blew out his window, which is the only reason Walt and Jesse are alive and in this car at all. Now Tuco has killed one of his own men in front of them, decided they are witnesses, and driven them an hour and a half into the desert. There is a shack, a very long view, and an old man in a wheelchair in the corner who cannot speak, cannot move and misses absolutely nothing."},
      {when: "sentJesse", text: "Jesse has been up a staircase for this man once before, on his own, with a script in his pocket. Now Tuco has killed one of his own men in front of them both, decided they are witnesses, and driven them an hour and a half into the desert. There is a shack, a very long view, and an old man in a wheelchair in the corner who cannot speak, cannot move and misses absolutely nothing.", scene: {set: "house", cast: {tuco: "stand", jesse: "stand", hector: "sit"}}},
      {when: "krazyAlive", text: "Tuco killed one of his own men in front of them for saying the wrong word, decided they were witnesses, and drove them out here. Walt has been in a room like this before, on the other side of it, with a bicycle lock and a man who was promised he could go home. There is a shack, a very long view, and an old man in a wheelchair in the corner who misses absolutely nothing."}
    ]
  },
  question: "Lunch is cooking and the car keys are in Tuco's pocket. What does Walt do?",
  choices: [
    {id: "a", label: "Put something in the food", tag: "What the show did.",
     effects: {darkness: 20, jesse: 5}, flags: ["triedRicin"], beats: [
      {scene: {set: "house", cast: {walt: "stand", tuco: "stand"}}, caption: "Chemistry, in a paper packet.",
       text: "Walt has brought something in a paper packet that he spent two evenings making and has told nobody about, and he gets it as far as the plate. Then the old man sees him do it, and rings the bell until Tuco puts the plate in the sink."},
      {scene: {set: "desert", cast: {walt: "stand", jesse: "stand"}, fx: ["dust"]}, caption: "It ends outside, and not because of them.",
       text: "What happens in the next twenty minutes happens outside, involves a federal agent who was looking for a car and not for them, and is over before either of them has decided what to do. They walk eighteen miles in the dark and agree in the morning to never mention the packet."},
      {when: "jesse>=55", scene: {set: "rv", cast: {jesse: "sit"}}, caption: "Jesse noticed the packet.",
       text: "Jesse saw the packet, and says nothing about it for two years. He brings it up exactly once, much later, in a completely different argument, and by then he has worked out on his own what it was for."}
    ]},
    {id: "b", label: "Offer him a business in Mexico", tag: "Be worth more alive.",
     effects: {darkness: 5, hank: -10, jesse: -5, family: -5}, flags: ["tucoPartner"], beats: [
      {scene: {set: "house", cast: {walt: "lecture", tuco: "stand"}, say: {who: "walt", text: "You do not need two witnesses. You need a plant."}}, caption: "A pitch delivered to a man holding a spoon.",
       text: "Walt stops being a hostage and starts being a proposal: yield per week, cost per kilo, and what a man with a real chemist could do south of the border where nobody is counting. Tuco listens with his head on one side, which is the single most dangerous posture available to him."},
      {scene: {set: "desert", cast: {tuco: "stand", walt: "stand"}}, caption: "He likes it. That is the problem.",
       text: "It works, which means Walt spends eleven weeks being extremely valuable to a man who solves disagreements with his hands. Tuco is eventually removed from the story by people who are not Walt, in a way nobody plans and everybody expects."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "A federal file with a blank in the middle of it.",
       text: "The DEA ends up with photographs of a cartel operation and one unidentified older man in glasses standing at the edge of three of them. The file stays open for years. Hank looks at those photographs more than once without recognizing anybody."}
    ]},
    {id: "c", label: "Talk to the old man", tag: "He is the only one listening.",
     effects: {darkness: -5, hank: 15, jesse: 10}, flags: ["hectorHelped"], beats: [
      {scene: {set: "house", cast: {walt: "kneel", hector: "sit"}}, caption: "One ring for yes. It takes eleven minutes to establish that.",
       text: "Walt crouches down in front of a man everybody else in the room treats as furniture and works out, patiently, an alphabet. One ring for yes. Two for no. It takes eleven minutes, and the old man's eyes do not leave him for any of it."},
      {scene: {set: "house", cast: {hector: "sit"}}, caption: "He hates his nephew more than he hates them.",
       text: "It turns out the old man has opinions, and the strongest of them is about his nephew. When the car arrives outside he rings the bell at the wrong moment, deliberately, and that one wrong moment is the entire difference between two men walking out of the desert and not."},
      {scene: {set: "desert", cast: {walt: "stand", jesse: "stand"}}, caption: "Eighteen miles, and a debt.",
       text: "They walk eighteen miles in the dark. Walt spends most of them thinking about a man who can only say yes or no and used it, once, correctly, and he files that away somewhere he will find it again in about three years."}
    ]}
  ]
});

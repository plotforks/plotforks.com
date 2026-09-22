/* Journey chapter 6: S3E13 "Full Measure". Content only (Opus pass).
   New art used here: set "superlab"; cast mike "stand", gale "stand". */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 8, canon: "a", id: "gale", code: "S3E13", episode: "Full Measure", title: "Gale",
  setup: {
    kicker: "The desert, at night.",
    text: "Gus has a replacement ready: Gale, Walt's gentle lab assistant, who knows the method. Once Gale can cook alone, Walt and Jesse are finished. Mike has Walt in the desert, and Walt has one phone call left.",
    caption: "One phone call.",
    scene: {set: "desert", cast: {walt: "phone", mike: "stand"}},
    variants: [
      {when: "janeAlive", text: "Gus has a replacement ready: Gale, Walt's gentle lab assistant, who knows the method. Once Gale can cook alone, Walt and Jesse are finished. Mike has Walt in the desert. Walt has one phone call left, and Jesse, clean and living with Jane, answers on the first ring."},
      {when: "jesse<30", text: "Gus has a replacement ready: Gale, Walt's gentle lab assistant, who knows the method. Once Gale can cook alone, Walt and Jesse are finished. Mike has Walt in the desert. Walt has one phone call left, and Jesse hasn't spoken to him in weeks."}
    ]
  },
  question: "Gale is the replacement. What does Walt do?",
  choices: [
    {id: "a", label: "Send Jesse to kill Gale", tag: "What the show did.",
     effects: {darkness: 20, jesse: -20}, beats: [
      {scene: {set: "desert", cast: {walt: "phone", mike: "stand"}}, caption: "An address, and what it means.",
       text: "With Mike standing over him, Walt calls Jesse and gives him an address. Jesse understands what the address means."},
      {scene: {set: "house", cast: {jesse: "stand"}}, caption: "Nothing is the same after this door.",
       text: "Jesse goes. When Gale opens the door, Jesse is crying before he raises the gun. Walt survives the night. Jesse doesn't, not really."}
    ]},
    {id: "b", label: "Warn Gale and let him vanish", tag: "Nobody has to die tonight.",
     effects: {jesse: 10}, flags: ["galeAlive"], beats: [
      {scene: {set: "superlab", cast: {gale: "stand", walt: "stand"}, say: {who: "walt", text: "Leave tonight."}}, caption: "Gale takes the coffee machine.",
       text: "Walt tells Gale the truth: Gus will use him and then bury him. Gale, shaking, packs his records and his coffee machine and leaves for Nepal."},
      {scene: {set: "superlab", cast: {walt: "stand", jesse: "stand"}, fx: ["sweat"]}, caption: "Job security, of a kind.",
       text: "With no replacement, Gus has to keep Walt and Jesse alive. He is furious about it, and very polite."}
    ]},
    {id: "c", label: "Do it himself", tag: "Spare Jesse the worst of it.",
     effects: {darkness: 30, jesse: 10}, beats: [
      {scene: {set: "house", cast: {walt: "stand"}, fx: ["sweat"]}, caption: "The one errand he runs alone.",
       text: "Walt talks his way past Mike and drives to Gale's apartment himself. He never tells Jesse where he went that night."},
      {scene: {set: "superlab", cast: {walt: "stand", jesse: "stand"}}, caption: "Lighter than it should be.",
       text: "Jesse is spared the worst thing he would ever have done. Walt carries it instead, and finds it weighs less than it should."}
    ]}
  ]
});

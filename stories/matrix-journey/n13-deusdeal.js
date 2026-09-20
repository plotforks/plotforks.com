/* Matrix journey chapter 13 (new 2026-09-20): The Matrix Revolutions (2003), the terms.
   Plays only when Neo actually reaches the Machine City (chapter-level when: "machineCity"), which is
   n:12 choices a and c; the defendZion branch skips straight to the last fight (n:14).
   Every branch ends with Neo plugged in against Smith, so the last fight keeps its premise.
   No new art: set "machinecity", cast deus "face" and neo "stand" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 13, canon: "a", when: "machineCity", id: "terms", code: "M3", episode: "Revolutions", title: "The terms",
  setup: {
    kicker: "The Machine City. A face assembled out of insects.",
    text: "Neo has walked through a war to stand in front of a thing that speaks in a voice made of thousands of small machines, and it has asked the shortest question in the trilogy: what do you want. He has one offer, which is Smith, and Smith is now eating the Matrix from the inside at a rate that frightens even the machines.",
    caption: "Negotiating with a face made of insects.",
    scene: {set: "machinecity", cast: {neo: "stand", deus: "face"}},
    variants: [
      {when: "manager", text: "Neo asked to speak to a manager in a white room two films ago, and here, finally, is the manager: a face assembled out of thousands of small machines, asking the shortest question in the trilogy. He has one offer, which is Smith, and Smith is eating the Matrix from the inside faster than anything they have built to stop it."},
      {when: "trinitySafe", text: "Neo has walked through a war alone, because he made sure Trinity was not in the ship when it left, and is now standing in front of a face made of insects that has asked him what he wants. He has one offer, which is Smith, and Smith is eating the Matrix from the inside."}
    ]
  },
  question: "It asked what he wants. What does Neo ask for?",
  choices: [
    {id: "a", label: "Peace for Zion", tag: "What the film did.",
     effects: {zion: 20, belief: 5}, flags: ["peaceOnly"], beats: [
      {scene: {set: "machinecity", cast: {neo: "stand", deus: "face"}, say: {who: "neo", text: "Peace."}}, caption: "One word, six thousand machines.",
       text: "One word, and the sentinels above Zion stop mid-air and hang there like a held breath. It is the smallest thing Neo has ever asked for and the largest thing anyone in this story has ever been given."},
      {scene: {set: "machinecity", cast: {neo: "stand"}, fx: ["light"]}, caption: "Terms accepted, cables attached.",
       text: "They take the deal because it is cheaper than losing, which is the only reason machines ever do anything. Then they plug him in and let him go and fight the thing he made."}
    ]},
    {id: "b", label: "Everyone who wants out, gets out", tag: "Ask for more than peace.",
     effects: {belief: 10, zion: 10}, flags: ["freeAll"], beats: [
      {scene: {set: "machinecity", cast: {neo: "stand", deus: "face"}, say: {who: "neo", text: "Anyone who asks to leave, leaves. Every year."}}, caption: "A clause, not a ceasefire.",
       text: "Neo asks for a door instead of a truce: anybody who works out that something is wrong is allowed to walk out, permanently, and nobody comes after them. The face takes four seconds, which for it is an eternity of arithmetic."},
      {scene: {set: "machinecity", cast: {deus: "face"}, fx: ["light"]}, caption: "Acceptable losses.",
       text: "It agrees, because a slow leak of the discontented is cheaper than a war and very much cheaper than Smith. Then it plugs him in, having just signed the most important sentence of the century into a contract with a man it intends to keep."}
    ]},
    {id: "c", label: "Bring Trinity back", tag: "One more thing.",
     effects: {trinity: 20, zion: -10, belief: 5}, flags: ["askedTrinity"], beats: [
      {scene: {set: "machinecity", cast: {neo: "stand", deus: "face"}, say: {who: "neo", text: "Her. That is what I want."}}, caption: "The most human request ever filed.",
       text: "Neo asks for a person back. The face explains that a copy is trivial, a person is not, and that the difference between those two things is the only thing it has never been able to calculate. It does not say no."},
      {scene: {set: "machinecity", cast: {neo: "stand"}, fx: ["light"]}, caption: "Filed for later, which is worse.",
       text: "It says: we will see. Then it plugs him in, and somewhere in a building nobody has drawn yet, an analyst with rimless glasses opens a new project file and writes down the request word for word."}
    ]}
  ]
});

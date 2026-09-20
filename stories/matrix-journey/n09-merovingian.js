/* Matrix journey chapter 9 (new 2026-09-20): The Matrix Reloaded (2003), the restaurant.
   Sits between the subway (n:8) and the Architect (n:10). Every branch ends with the crew getting the Keymaker,
   because the Architect chapter needs him.
   Kept clean: Persephone's price is a kiss and one dry line about it, nothing more.
   New art used here: cast merovingian "stand" (dinner jacket, wine glass, a smile that is doing work) and
   persephone "stand" (white dress, entirely unimpressed). Set "restaurant" already exists. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 9, canon: "a", id: "merovingian", code: "M2", episode: "Reloaded", title: "The Frenchman's dessert",
  setup: {
    kicker: "A restaurant where everyone is beautiful and nobody is kind.",
    text: "The Keymaker is being held by a very old program who calls himself the Merovingian, owns a château, a wine list and a great many men with sunglasses, and enjoys explaining that nobody in this room has ever made a choice in their life. He orders dessert while he says it, which he considers a demonstration.",
    caption: "Causality, with a wine list.",
    scene: {set: "restaurant", cast: {merovingian: "stand", neo: "stand", persephone: "stand"}},
    variants: [
      {when: "trinity>=70", text: "The Keymaker is being held by a very old program who calls himself the Merovingian, owns a château and a great many men with sunglasses, and enjoys explaining that nobody has ever made a choice in their life. He spends most of the speech looking at Trinity, which is the only part of the evening Neo actually reacts to."},
      {when: "morpheusDead", text: "The Keymaker is being held by a very old program who calls himself the Merovingian, and the crew has arrived without the man who usually does the talking in rooms like this. The Frenchman notices the gap immediately and enjoys it, and orders dessert while explaining that nobody here has ever made a choice."}
    ]
  },
  question: "He will not hand over the Keymaker. What does Neo do about it?",
  choices: [
    {id: "a", label: "Let his wife help", tag: "What the film did.",
     effects: {zion: 10, trinity: -5}, flags: ["persephone"], beats: [
      {scene: {set: "restaurant", cast: {persephone: "stand", neo: "stand"}}, caption: "A receipt, she calls it.",
       text: "Persephone has been married to that speech for six hundred years and will hand over the Keymaker for one thing: a kiss, done properly, so she can remember what it used to feel like. Trinity's face is its own small film."},
      {scene: {set: "restaurant", cast: {merovingian: "stand"}}, caption: "Betrayed over dessert.",
       text: "She keeps her word, takes them to the Keymaker, and tells her husband exactly what she has done while he is still holding the spoon. It is the most efficient transaction in the trilogy."}
    ]},
    {id: "b", label: "Take him apart", tag: "Skip the speech.",
     effects: {belief: 10, agents: 10}, flags: ["merovFight"], beats: [
      {scene: {set: "restaurant", cast: {neo: "fight", merovingian: "stand"}}, caption: "Two ghosts, one Keymaker.",
       text: "Neo stops the entire conversation mid-sentence and goes through the sunglasses, the twins and most of the furniture. The Merovingian keeps talking the whole time, which is somehow the most frightening part."},
      {scene: {set: "street", cast: {neo: "stand"}}, caption: "A grudge that lasts a sequel.",
       text: "They leave with the Keymaker and a very old program who now has a personal grudge, an unpaid bill and a long memory. He will bring it up again in the next film, at the worst moment, in a nightclub."}
    ]},
    {id: "c", label: "Offer him a trade", tag: "Everyone has a price, even causality.",
     effects: {belief: 5, zion: 5}, flags: ["merovDeal"], beats: [
      {scene: {set: "restaurant", cast: {neo: "stand", merovingian: "stand"}, say: {who: "neo", text: "When this ends, your people get to stay."}}, caption: "The only currency he does not have.",
       text: "Neo offers the one thing an exile program cannot buy: a place in whatever comes after the war, guaranteed by the only man both sides are currently afraid of. The Frenchman stops enjoying himself and starts listening."},
      {scene: {set: "restaurant", cast: {merovingian: "stand", persephone: "stand"}}, caption: "Signed in dessert wine.",
       text: "He hands over the Keymaker within the hour and writes the terms on a napkin in a language nobody at the table reads. Persephone keeps the napkin. It will matter later, and he will pretend it does not."}
    ]}
  ]
});

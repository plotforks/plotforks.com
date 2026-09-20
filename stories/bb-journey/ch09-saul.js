/* Journey chapter 9: S4E11 "Crawl Space" era. Content only (Opus pass). The Saul chapter.
   Dimos's premise: Walt stops trusting Saul automatically, because Saul has met Gus and lawyers pick sides.
   Sets the flags used by n:10 (End Times): saulIn, noSaul, testedSaul + saulLoyal.
   No new art: set office, cast saul "pitch" / "stand", walt "stand" / "point" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 9, canon: "a", id: "trustsaul", code: "S4E11", episode: "Crawl Space", title: "How much does Saul get to know?",
  setup: {
    kicker: "A strip-mall office with inflatable columns.",
    text: "Walt has decided that Gus has to go, and every piece of a plan like that has to pass through somebody. Saul is the somebody. Saul has also sat across a desk from Gus, bills three other clients Walt has never met, and has a strong professional instinct for which side of a room is going to still be standing next month.",
    caption: "The columns are inflatable. So is the confidence.",
    scene: {set: "office", cast: {saul: "pitch", walt: "stand"}},
    variants: [
      {when: "!saul", text: "Walt has decided that Gus has to go, and every piece of a plan like that has to pass through somebody. Saul Goodman is not his lawyer, but Saul is the only man in Albuquerque who sells the things Walt now needs, and Saul has sat across a desk from Gus.", scene: {set: "office", cast: {saul: "pitch", walt: "stand"}}},
      {when: "mikeRespect", text: "Walt has decided that Gus has to go, and every piece of a plan like that has to pass through somebody. Saul is the somebody. Saul has also sat across a desk from Gus, and so, in a quieter and far more dangerous way, has Mike, who is still on the other side of this and still takes Walt's calls."}
    ]
  },
  question: "Walt needs a lawyer he can trust. He has a lawyer instead. What does he tell him?",
  choices: [
    {id: "a", label: "Tell Saul everything", tag: "What the show did.",
     effects: {darkness: 5, hank: -5}, flags: ["saulIn"], beats: [
      {scene: {set: "office", cast: {saul: "pitch", walt: "stand"}, say: {who: "saul", text: "I don't want to know. Tell me anyway."}}, caption: "Attorney-client privilege, stretched.",
       text: "Saul listens with his eyes closed, complains for ninety seconds about his life choices, and then produces a large quiet man, a disappearer's phone number and three burner phones from a drawer that has clearly done this before."},
      {scene: {set: "office", cast: {saul: "stand"}}, caption: "Useful and terrified, in that order.",
       text: "Everything is easier with Saul inside the plan, and Walt never once stops calculating what Saul would do if Gus made a better offer. Saul, to be fair, is calculating the same thing about Walt."}
    ]},
    {id: "b", label: "Cut Saul out completely", tag: "Do his own errands.",
     effects: {darkness: 10, hank: 10}, flags: ["noSaul"], beats: [
      {scene: {set: "house", cast: {walt: "stand"}}, caption: "Errands, by a man with a doctorate.",
       text: "Walt buys his own burner phones with his own face, rents his own cars, and parks them in his own name three streets from places a chemistry teacher has no business being. He is thorough. He is also, for the first time, visible."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "A receipt is a kind of confession.",
       text: "None of it fails immediately. It simply leaves a trail of receipts, and receipts outlive everybody. Hank will read them eventually, and enjoy them very much."}
    ]},
    {id: "c", label: "Feed him a false plan", tag: "Test the lawyer first.",
     effects: {darkness: 15, hank: 5}, flags: ["testedSaul", "saulLoyal"], beats: [
      {scene: {set: "office", cast: {walt: "point", saul: "stand"}, say: {who: "walt", text: "Thursday. The laundry. Nobody else."}}, caption: "The address is a lie.",
       text: "Walt gives Saul a date, a place and a plan, all of them invented, then sits in a rented car across the street on Thursday with a flask of coffee and watches the door of an empty building."},
      {scene: {set: "corner", cast: {walt: "stand"}}, caption: "Four hours. Nobody comes.",
       text: "Nobody comes. Not Gus's people, not the DEA, not one curious van. Walt drives home having learned that his lawyer is loyal, and that he is now a man who tests his friends with decoys."},
      {when: "jesse>=60", scene: {set: "office", cast: {saul: "stand", walt: "stand"}}, caption: "He knew.",
       text: "Saul knew by Tuesday. He went along with it, billed for the hours, and has never mentioned it since, which is the most lawyerly loyalty available."}
    ]}
  ]
});

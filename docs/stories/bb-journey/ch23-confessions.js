/* Journey chapter 23: S5E11 "Confessions". Content only (Opus pass). The DVD Walt records at the kitchen table.
   Plays after the garage (n:22) and before Rabid Dog (n:24). Gated on !bookMissed for the same reason the garage is:
   a Hank who never read the dedication has nothing to be neutralised about.
   Sets theDVD / realDVD / noDVD.
   No new art: sets kitchen, house, office, restaurant; cast walt "sit" does not exist, so he is drawn standing,
   and skyler "sit", hank "read"/"suspicious" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 23, canon: "a", when: "!bookMissed", id: "confessions", code: "S5E11", episode: "Confessions", title: "A camera on the kitchen table",
  setup: {
    kicker: "A kitchen table, a tripod, and a red light.",
    text: "Hank knows, and Hank cannot prove it, and the only way either of those facts changes is if somebody in this family says something out loud. So Walt sets a camera on the kitchen table, sits down in front of it in a cardigan, and begins a sentence with his own name and the date. The red light does not care what comes next.",
    caption: "He does two takes. The second one is better.",
    scene: {set: "kitchen", cast: {walt: "stand", skyler: "stand"}},
    variants: [
      {when: "cameClean", text: "Walt already told Hank everything on a garage floor, which means the camera on the kitchen table is not about proof any more. It is about what the version on the record will say, and who gets to be in it. He sits down in front of it in a cardigan and begins a sentence with his own name and the date.", scene: {set: "kitchen", cast: {walt: "stand"}}},
      {when: "blamedDead", text: "Walt has already handed Hank a version in which every fact is true and every arrangement of them is a lie, and Hank has spent two weeks finding corroboration for it and hating every piece. Now there is a camera on the kitchen table, which is how that version gets fixed in place for good. He sits down in front of it in a cardigan and begins with his own name and the date."},
      {when: "hankShot", text: "Hank knows, and Hank cannot prove it, and Hank is also a man who spent a year learning to walk again after two men in grey suits found him in a car park. There is a camera on the kitchen table, a tripod, and a red light. Walt sits down in front of it in a cardigan and begins a sentence with his own name and the date."}
    ]
  },
  question: "The recording will be watched exactly once, by people who already suspect him. What does he put on it?",
  choices: [
    {id: "a", label: "Make Hank the one who did it", tag: "What the show did.",
     effects: {darkness: 25, hank: -20, family: 10}, flags: ["theDVD"], beats: [
      {scene: {set: "kitchen", cast: {walt: "stand"}, say: {who: "walt", text: "My brother-in-law built it. I was the chemist he used."}}, caption: "Every verifiable detail true, and the wrong man in the middle.",
       text: "Walt records a confession in which every checkable fact is correct and one name has been swapped: the schedule, the lab, the gambling debts, the hospital bills that the family really did pay. He cries at one point, and the tears are real, which is the detail that makes the whole thing work."},
      {scene: {set: "restaurant", cast: {hank: "suspicious"}}, caption: "Marie watches it. That is what it is for.",
       text: "It is played once, in a restaurant, in front of the only two people whose opinion could end him. Hank knows within a minute exactly what it is. Marie does not, for a little while, and the little while is enough to take the ground out from under her husband."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "A career that now has to be spent alone.",
       text: "Hank cannot take any of it to his office without handing them the tape, and the tape ends his career whether it is true or not. Everything he does from this afternoon onwards, he does without a badge behind him, which is exactly how Walt designed it."}
    ]},
    {id: "b", label: "Record the true one and post it", tag: "Sealed, and opened when he dies.",
     effects: {darkness: -20, hank: 15, family: 15, jesse: 10}, flags: ["realDVD"], beats: [
      {scene: {set: "kitchen", cast: {walt: "stand"}}, caption: "Fifty-one minutes, no second take.",
       text: "Walt records the real one instead: fifty-one minutes, no cardigan, no crying, and a level of specificity that no prosecutor would have got out of him in a year. Then he posts it to a law firm in Santa Fe with an instruction that it is opened when he is dead or in thirty days, whichever arrives first."},
      {scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "He tells Skyler afterwards, not before.",
       text: "He tells Skyler what he has done on the same evening, which is roughly two years later than she deserved. She asks one question, about the thirty days, and he does not have an answer for it that either of them believes."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Thirty days is not very long.",
       text: "For thirty days Walt is a man with an appointment, and he is noticeably better company than he has been since the diagnosis. Hank, who knows nothing about any of this, spends the same thirty days building a case that is about to be made completely unnecessary."}
    ]},
    {id: "c", label: "Record nothing", tag: "Let him try to prove it.",
     effects: {darkness: 10, hank: 10}, flags: ["noDVD"], beats: [
      {scene: {set: "kitchen", cast: {walt: "stand"}}, caption: "He takes the camera off the tripod and puts it away.",
       text: "Walt sets the whole thing up, looks at the red light for about four minutes, and then puts the camera back in the cupboard. There is nothing on the record, which means there is also nothing anybody can turn around and use on him, including himself."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "Hank gets to keep working, which is worse.",
       text: "Without a tape to neutralize him, Hank stays a federal agent with colleagues, subpoenas and an inexhaustible supply of patience, and he starts doing the thing Walt has never successfully defended against, which is paperwork."},
      {when: "carwash", scene: {set: "carwash", cast: {hank: "read"}}, caption: "Forty-one sets of books, subpoenaed properly.",
       text: "Three weeks later a records request lands on forty-one car washes at once, signed by somebody senior, and the accountant who prepared those books is asked to come in and explain them. She is extremely good at explaining them, which is the problem."}
    ]}
  ]
});

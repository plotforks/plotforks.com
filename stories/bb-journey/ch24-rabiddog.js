/* Journey chapter 24: S5E12 "Rabid Dog". Content only (Opus pass). What Walt decides to do about Jesse.
   Plays after Confessions (n:23) and before To'hajiilee (n:25). Ungated: Jesse works this out with or without a
   book in a bathroom, so every run arrives here. Every branch still leaves Hank able to get Walt into the desert,
   which is what n:25 needs, and ch10.js already carries variants for the different ways that happens.
   Sets calledJack / plazaTruth / gaveJesse.
   No new art: sets house, park, office, corner; cast walt "phone"/"stand"/"point", jesse "stand"/"sit",
   hank "suspicious"/"read", jack "stand", todd "stand" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 24, canon: "a", id: "rabiddog", code: "S5E12", episode: "Rabid Dog", title: "The bench in the plaza",
  setup: {
    kicker: "A public square, chosen because it is public.",
    text: "Jesse has worked out about the child and the poison, has been through Walt's house with a can of petrol, and is currently sitting in a room with the one federal agent who wants Walt more than anybody alive. Walt has arranged to meet him on a bench in a busy plaza at ten in the morning, because a plaza is somewhere nothing can happen. He is also holding a phone with a number in it that he has never called.",
    caption: "Ten in the morning, and a great many witnesses.",
    scene: {set: "park", cast: {walt: "stand"}},
    variants: [
      {when: "theDVD", text: "Jesse has worked out about the child and the poison and has been through Walt's house with a can of petrol. He is now sitting in a room with a federal agent who has no badge behind him any more, because a recording made at a kitchen table took that away two weeks ago. Walt has arranged to meet Jesse on a bench in a busy plaza at ten in the morning. He is also holding a phone with a number in it that he has never called."},
      {when: "janeAlive", text: "Jesse has worked out about the child and the poison, and this time the person he goes to first is not a federal agent, it is a woman who has known for years that something in this arrangement was wrong and could never name it. By the time he gets to Hank there are two of them telling the same story. Walt has arranged a bench in a busy plaza at ten in the morning, and is holding a phone with a number in it he has never called."},
      {when: "boySafe", text: "Jesse has worked out about the child and the poison, and has spent two days going back through every other thing he was told, including a boy on a ridge who rode away. That one still checks out, and it is the only one that does. He is sitting with a federal agent now. Walt has arranged a bench in a busy plaza at ten in the morning, and is holding a phone with a number he has never called."}
    ]
  },
  question: "Jesse is the only person left who can finish him, and he is ten minutes away. What does Walt do?",
  choices: [
    {id: "a", label: "Call the number", tag: "What the show did.",
     effects: {darkness: 30, jesse: -30, hank: 5}, flags: ["calledJack"], beats: [
      {scene: {set: "park", cast: {walt: "phone"}, say: {who: "walt", text: "I have another job for your uncle."}}, caption: "He describes him as a problem, and uses that word.",
       text: "Walt stands in a plaza full of people at ten in the morning and describes Jesse Pinkman to a polite young man as a problem that needs handling. He uses that word. Then he says the other thing, the one about him not being family, and hangs up."},
      {scene: {set: "corner", cast: {todd: "stand", jack: "stand"}}, caption: "They are extremely happy to help.",
       text: "Jack's crew take the job with genuine enthusiasm and ask no questions at all, which Walt registers as professionalism. What he has actually done is introduce a group of people with no limits to the one asset he was still pretending he had."},
      {scene: {set: "office", cast: {jesse: "sit", hank: "suspicious"}}, caption: "Jesse does not sit on the bench.",
       text: "Jesse never comes to the plaza. He sees something he does not like from thirty yards away, turns round, and walks into a federal building instead, and the next thing he offers Hank is a way to get Walt into a desert."}
    ]},
    {id: "b", label: "Sit on the bench and tell him everything", tag: "Jane, Brock, all of it.",
     effects: {darkness: -30, jesse: 25, hank: 10, family: -5}, flags: ["plazaTruth"], beats: [
      {scene: {set: "park", cast: {walt: "stand", jesse: "stand"}}, caption: "Two men on a bench, and nobody shouting.",
       text: "Walt puts the phone in his pocket, sits down, and says all of it out loud in a public square: the bedroom in Phoenix, the plant in the garden, the juice box, and every occasion on which he decided something for Jesse and then let him believe he had chosen it."},
      {scene: {set: "park", cast: {jesse: "sit"}}, caption: "Jesse listens to the whole thing without moving.",
       text: "Jesse does not shout, does not swing and does not cry, which is worse than all three. He listens to eleven minutes of it, says one short sentence back, and walks off across the square without looking round, and Walt sits on that bench for another forty minutes."},
      {scene: {set: "office", cast: {jesse: "sit", hank: "read"}}, caption: "He tells Hank anyway. All of it, including the true parts.",
       text: "Jesse goes to Hank that afternoon and tells him everything, including the parts that make Jesse look worst, which is what finally makes a federal agent believe a witness he has spent two years describing as a junkie."}
    ]},
    {id: "c", label: "Let Hank have him", tag: "Stop fighting it.",
     effects: {darkness: -15, hank: 20, jesse: 10, family: -10}, flags: ["gaveJesse"], beats: [
      {scene: {set: "park", cast: {walt: "stand"}}, caption: "He does not go to the plaza at all.",
       text: "Walt cancels the bench, cancels the call, and spends the morning at home doing nothing whatsoever, which is the hardest thing he has done in five years and takes about four hours of sitting very still."},
      {scene: {set: "office", cast: {hank: "read", jesse: "sit"}}, caption: "Nine hours of interview, and a lot of it usable.",
       text: "Jesse talks to the DEA for nine hours across two days with a lawyer beside him, and about sixty percent of it is usable, which is sixty percent more than Hank has had since the beginning. None of it is in Walt's handwriting, which is the only reason any of it takes as long as it does."},
      {when: "jesse>=60", scene: {set: "office", cast: {jesse: "stand"}}, caption: "He asks about the boy on the ridge, and gets a straight answer.",
       text: "Somewhere in the ninth hour Jesse stops answering questions and asks one, about a train and a ridge and who decided what. The agent across the table tells him the truth, and Jesse asks for ten minutes and takes twenty."}
    ]}
  ]
});

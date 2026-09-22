/* Journey chapter 18: S5E9 "Blood Money". Content only (Opus pass). The confrontation after Hank has the book.
   Gated on !bookMissed, because a Hank who never read the dedication has nothing to confront Walt with;
   in that timeline the step is skipped and the story goes straight to the desert (n:19).
   Two shapes of the same scene: bookFound is the garage, bookLab is an interview room with a tape running.
   Sets treadLightly / cameClean / blamedDead, used by the endings.
   No new art: sets house, office, carwash; cast walt "stand"/"point"/"suit"/"floor", hank "suspicious"/"stand"/"read" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 22, canon: "a", when: "!bookMissed", id: "garage", code: "S5E9", episode: "Blood Money", title: "The garage door comes down",
  setup: {
    kicker: "A garage in Albuquerque, with the door coming down.",
    text: "Walt found the tracker under his car, which is how he knows, and he drove straight over instead of thinking about it, which is how Hank knows that he knows. The door comes down. Hank asks one question, does not wait for the answer, and throws a punch that has been nine months in the post. Then they are standing in a garage, both of them breathing hard, and one of them has to speak first.",
    caption: "Two men and a folding table, in the worst room in America.",
    scene: {set: "house", cast: {hank: "suspicious", walt: "stand"}},
    variants: [
      {when: "bookLab", text: "There is no garage, because Hank did it properly. There is a room with a table bolted to the floor, a handwriting report with a case number on it, and a tape recorder that has already been running for two minutes. Hank sits down across from his brother-in-law, says the date out loud for the machine, and asks him whether he would like a lawyer present. Then he waits, which he has been practising.", scene: {set: "office", cast: {hank: "stand", walt: "stand"}}},
      {when: "carwash", text: "Walt found the tracker under his car, which is how he knows, and he drove straight over instead of thinking about it, which is how Hank knows that he knows. The door comes down. There is a folding table with forty-one sets of car-wash accounts stacked on it in date order, and a punch that has been nine months in the post. Then they are standing in a garage, both of them breathing hard, and one of them has to speak first."}
    ]
  },
  question: "Hank has the book, the handwriting and the tracker. What does Walt say?",
  choices: [
    {id: "a", label: "Warn him off", tag: "What the show did.",
     effects: {darkness: 15, hank: 10, family: -5}, flags: ["treadLightly"], beats: [
      {scene: {set: "house", cast: {walt: "point", hank: "suspicious"}, say: {who: "walt", text: "I am a dying man. What exactly do you think you are threatening?"}}, caption: "He tells him about the cancer first, which is cruel and works.",
       text: "Walt explains, reasonably, that the case is unprovable, that he will very likely be dead before any of it reaches a courtroom, and that Hank should think carefully about where he is standing. It is the calmest he has been all year."},
      {scene: {set: "house", cast: {hank: "stand"}}, caption: "The door goes back up on a different family.",
       text: "Hank does not answer. He opens the garage door, watches the car leave, and then sits in his own driveway for forty minutes, because the man who just left knows his wife's name, his address and the fact that he cannot take any of this to his own office without ending his career on page one."},
      {when: "family>=70", scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "Skyler finds out by being handed a phone.",
       text: "Marie calls the house that evening, gets Skyler, and says a sentence that takes eleven seconds and removes a sister. Skyler puts the phone down and looks at her husband, and neither of them pretends there is anything left to explain."}
    ]},
    {id: "b", label: "Tell him all of it, right there", tag: "Every name, every barrel.",
     effects: {darkness: -25, hank: 20, family: 10, jesse: 5}, flags: ["cameClean"], beats: [
      {scene: {set: "house", cast: {walt: "floor", hank: "stand"}}, caption: "He sits down on the concrete and starts at the beginning.",
       text: "Walt sits down on the garage floor with his back against a shelf and talks for two hours and ten minutes: the RV, Gus, the lab, the money, the barrels, the storage unit, the names. He does not make himself the hero of any of it, which is the only part Hank was not expecting."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "The worst best day of Hank Schrader's career.",
       text: "Hank gets the biggest case in the history of the Albuquerque field office and has to hand it to somebody else within the hour, because the suspect is family and everybody in the building can read. He never gets it back and he never entirely forgives that."},
      {when: "jesse>=60", scene: {set: "office", cast: {hank: "stand", jesse: "sit"}}, caption: "Jesse hears it from a federal agent, not from Walt.",
       text: "Jesse is picked up the same week and told, by a man he has been afraid of for five years, exactly which parts were done to him deliberately. He believes about half of it, which turns out to be the correct half."}
    ]},
    {id: "c", label: "Hand him Gus and a dead man's plan", tag: "Coerced, and he can prove it.",
     effects: {darkness: 10, hank: -10, family: 5}, flags: ["blamedDead"], beats: [
      {scene: {set: "house", cast: {walt: "stand", hank: "suspicious"}, say: {who: "walt", text: "He had my address. He had Holly's."}}, caption: "Everything true, in the wrong order.",
       text: "Walt gives Hank a version in which every fact is accurate and every arrangement of them is a lie: a chemistry teacher, a diagnosis, a man called Fring who had photographs of his children, and five years of doing what he was told by people who are conveniently no longer alive to disagree."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "The problem is that most of it checks out.",
       text: "Hank goes looking for the holes and keeps finding corroboration, because most of it is true. Gus is dead, Mike is unavailable, and the only living witness who could put it back in the right order is a man who has every reason to lie in both directions."},
      {when: "victorLives", scene: {set: "superlab", cast: {gus: "fold"}}, caption: "One man who was there, and remembers it differently.",
       text: "There is one former Fring employee still breathing who was in the laundry that day, and who tells a federal agent, quite calmly, that nobody ever pointed anything at Walter White. It is written down, filed, and does not fit the story anybody wants, so it sits in a box for two years."}
    ]}
  ]
});

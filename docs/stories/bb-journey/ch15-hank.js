/* Journey chapter 15: S5E8 "Gliding Over All", the last ninety seconds. Content only (Opus pass).
   Dimos's premise: Hank decides whether to read books in the toilet. The only chapter played as Hank.
   Continuity rule: Hank still closes in on Walt in every branch, so n:19 (To'hajiilee) keeps its premise;
   only the route and the timing change. Sets bookFound / bookMissed / bookLab.
   No new art: set bathroom and cast hank "read" / "suspicious" / "laugh" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 17, canon: "a", id: "bathroom", code: "S5E8", episode: "Gliding Over All", title: "Hank's turn",
  setup: {
    kicker: "A guest bathroom, halfway through a barbecue.",
    text: "For one chapter you are not Walt. You are Hank Schrader, you have had two beers and a burger, the ballgame is on outside, and there is a stack of reading material beside the toilet because your brother-in-law is that kind of host. The book on top has a handwritten dedication inside the cover.",
    caption: "The most consequential bathroom in television.",
    scene: {set: "bathroom", cast: {hank: "suspicious"}},
    variants: [
      {when: "hank>=60", text: "For one chapter you are not Walt. You are Hank Schrader, you have spent nine months on a case that keeps almost closing, you have had two beers and a burger, and there is a stack of reading material beside your brother-in-law's toilet. The book on top has a handwritten dedication inside the cover."},
      {when: "galeAlive", text: "For one chapter you are not Walt. You are Hank Schrader, and the vanished chemist whose notebook you have read forty times sent his old lab partner a book before he left the country. That book is now beside your brother-in-law's toilet, with a handwritten dedication inside the cover."}
    ]
  },
  question: "Hank has a rule about other people's things, and he has never kept it. What does he do?",
  choices: [
    {id: "a", label: "Read the dedication", tag: "What the show did.",
     effects: {hank: 25}, flags: ["bookFound"], beats: [
      {scene: {set: "bathroom", cast: {hank: "read"}}, caption: "Eleven minutes in a guest bathroom.",
       text: "To my other favorite W.W. Hank reads it four times. Nine months of case files rearrange themselves into one shape, and the shape is standing in the garden holding a spatula and explaining marinade."},
      {scene: {set: "house", cast: {hank: "suspicious", walt: "stand"}}, caption: "The longest short drive home.",
       text: "He comes out, says something about the burgers, drives home with Marie talking beside him, and pulls over halfway there. Nothing in his life is ever quiet again, and neither is Walt's."}
    ]},
    {id: "b", label: "Leave the book alone", tag: "Wash your hands and go back out.",
     effects: {hank: 5}, flags: ["bookMissed"], beats: [
      {scene: {set: "bathroom", cast: {hank: "laugh"}}, caption: "A man with boundaries, for once.",
       text: "Hank washes his hands, notices the book, decides that reading other people's dedications at a family barbecue is a bit much even for him, and goes back out to the garden for another burger. It is the single luckiest afternoon of Walt's life."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Nine more months, the long way.",
       text: "It takes another nine months and somebody else's mistake: a bank deposit that is too round, a mouthy inmate, an invoice from a very clean car wash chain. Hank gets there anyway, without ever learning how close the bathroom was."},
      {when: "carwash", scene: {set: "carwash", cast: {hank: "suspicious"}}, caption: "Forty-one sets of books.",
       text: "In the end it is the car washes that do it. Nobody needs that many car washes, and Hank is the only man in New Mexico rude enough to say so out loud in a meeting."}
    ]},
    {id: "c", label: "Take the book to the office", tag: "Make it official.",
     effects: {hank: 20}, flags: ["bookLab"], beats: [
      {scene: {set: "bathroom", cast: {hank: "read"}}, caption: "Evidence bag, borrowed from the car.",
       text: "Hank does not read it twice and does not confront anybody. He puts the book in a bag, tells Marie he has a headache, and drives it straight to the office to be compared with the dead chemist's notebook."},
      {scene: {set: "office", cast: {hank: "stand"}}, caption: "Handwriting, matched by a professional.",
       text: "The match is confirmed by someone with a degree in it, which means it is now a file with a number, a task force and four people above Hank who want to do this properly and slowly."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "Properly, and slowly.",
       text: "Proper is stronger than personal. It is also months slower, and it gives Walt exactly the amount of warning a man like Walt needs to do something spectacular with it."}
    ]}
  ]
});

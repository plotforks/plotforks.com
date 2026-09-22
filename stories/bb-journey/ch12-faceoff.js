/* Journey chapter 12: S4E13 "Face Off". Content only (Opus pass). Hector, the bell, and how Gus goes.
   Plays after End Times (n:11) and before Dead Freight (n:13). Every branch ends with Gus out of the business,
   because Buyout (n:14) needs the territory to be free, but the three branches differ in who did it and how.
   Sets theBell / hectorTalks / ownHands. hectorTalks also sets gusArrested, the flag ch08.js and ch14-ninemen.js
   already read, so a legally removed Gus keeps working downstream.
   New art used here: set "nursinghome" and cast hector "sit" (an old man in a wheelchair with a bell on the armrest).
   The deaths are stated once and never drawn. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 14, canon: "a", id: "faceoff", code: "S4E13", episode: "Face Off", title: "The man with the bell",
  setup: {
    kicker: "A care home in Albuquerque. One room, one bell.",
    text: "Gus Fring cannot be reached at work, at home, in a car or anywhere with more than one exit, and Walt has run out of clever ideas. What is left is an old man in a wheelchair who cannot speak, who has one working finger and a bell screwed to his armrest, and who has spent four years waiting for exactly this conversation. He hates Gus more than Walt hates anybody.",
    caption: "One finger, one bell, four years of practice.",
    scene: {set: "nursinghome", cast: {hector: "sit", walt: "stand"}},
    variants: [
      {when: "gusArrested", text: "Gus is in federal custody and still runs everything through three lawyers and a chicken franchise, which is worse, not better. The one person who can put him somewhere no lawyer can follow is an old man in a wheelchair who cannot speak, who has one working finger and a bell screwed to his armrest, and who has spent four years waiting for exactly this conversation."},
      {when: "galeAlive", text: "Gus Fring cannot be reached at work, at home, in a car or anywhere with more than one exit, and he has a competent chemist who is not Walt, which means Walt's remaining value to him is a number that only goes down. What is left is an old man in a wheelchair who cannot speak, who has one working finger and a bell screwed to his armrest, and four years of practice at hating."},
      {when: "victorLives", text: "Gus Fring cannot be reached at work, at home, in a car or anywhere with more than one exit, and there is now a second man in the laundry who can run a cook without being told twice. What is left is an old man in a wheelchair who cannot speak, who has one working finger and a bell screwed to his armrest, and who has spent four years waiting for exactly this conversation."}
    ]
  },
  question: "Hector will do anything to reach Gus, and he does not care what it costs him. What does Walt do with that?",
  choices: [
    {id: "a", label: "Give Hector what he wants", tag: "What the show did.",
     effects: {darkness: 20, hank: 5, jesse: 5}, flags: ["theBell"], beats: [
      {scene: {set: "nursinghome", cast: {hector: "sit", walt: "stand"}, say: {who: "walt", text: "He will come himself. He will want to watch."}}, caption: "A deal made entirely in bell rings.",
       text: "Walt does not ask Hector to help him. He explains, correctly, that the only way to get Gus into a room is to give him a reason to gloat, and that Hector is the only person in New Mexico who can provide one. Hector rings the bell once, which means yes."},
      {scene: {set: "nursinghome", cast: {hector: "sit", gus: "fold"}}, caption: "Gus comes himself, because of course he does.",
       text: "Gus walks into that room for the same reason he does everything: to finish something personally and be seen finishing it. Whatever he says to the old man takes about ninety seconds. He does not get to the end of it."},
      {scene: {set: "superlab", cast: {walt: "stand"}}, caption: "Two men dead, and Walt was three miles away.",
       text: "By the time anyone reconstructs the afternoon there is nobody left to say whose idea it was. Walt burns the lab, goes home, and finds that being the man who arranged it feels different from being the man who did it, in a way that is not an improvement."}
    ]},
    {id: "b", label: "Take Hector to the DEA instead", tag: "Let the old man testify.",
     effects: {darkness: -5, hank: 25, family: 5}, flags: ["hectorTalks", "gusArrested"], beats: [
      {scene: {set: "office", cast: {hank: "read", hector: "sit"}}, caption: "Yes is one ring. No is two. It takes eleven hours.",
       text: "Hector agrees to talk, in the only alphabet he has, and it takes eleven hours across three days with a federal stenographer and a card of letters. He has been waiting four years, and it turns out he was waiting to be asked, not to be used."},
      {scene: {set: "office", cast: {hank: "stand"}}, caption: "Hank finally gets a warrant with a name on it.",
       text: "Gus Fring is arrested at a charity dinner, politely, by people who have read every word Hector spelled out. He posts a bond that would buy the restaurant chain twice, and his empire begins to come apart at the speed of paperwork instead of all at once."},
      {when: "hank>=60", scene: {set: "office", cast: {hank: "laugh"}}, caption: "The best week of Hank Schrader's life.",
       text: "For about a week Hank is the most quoted agent in the southwest, and he spends it being decent to everybody, which is how his colleagues know how much it meant to him. He also starts wondering, quietly, who tipped him off about the old man."}
    ]},
    {id: "c", label: "Do it himself, up close", tag: "No proxies this time.",
     effects: {darkness: 30, jesse: -5, family: -10}, flags: ["ownHands"], beats: [
      {scene: {set: "restaurant", cast: {walt: "stand", gus: "stand"}}, caption: "He walks in through the front, which nobody expects.",
       text: "Walt stops arranging and starts doing. He walks into the one place Gus feels safe, at the one hour Gus is predictable, and handles it himself, in a room with a camera in the corner and eleven people eating chicken."},
      {scene: {set: "restaurant", cast: {walt: "stand"}, fx: ["siren"]}, caption: "The clean version was the other one.",
       text: "It works. It is also witnessed, filmed and extremely stupid, and for the rest of the story there is a grainy still of a man in glasses walking out of a restaurant that every investigator in two states has seen."},
      {scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "He tells her the truth, which is new.",
       text: "He comes home and tells Skyler what he did, in one sentence, without the lecture. It is the most honest he has been with her in two years, and she goes very quiet and stays quiet for about four days."}
    ]}
  ]
});

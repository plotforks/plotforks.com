/* Journey chapter 13 (file kept as ch09.js): S5E8 "Gliding Over All". Content only (Opus pass). No new art.
   The bathroom scene moved out of here into ch15-hank.js (n:15), where Hank decides for himself;
   every branch of this chapter now simply ends with a family barbecue being arranged. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 17, canon: "b", id: "cashpile", code: "S5E8", episode: "Gliding Over All", title: "The cash pile",
  setup: {
    kicker: "A storage unit, Albuquerque.",
    text: "Skyler brings Walt to a storage unit and pulls back a tarp. Underneath is a pile of cash so big she has stopped counting it. The car wash could not launder it in a hundred years, and she wants to know how much is enough.",
    caption: "The pile is not to scale. It is bigger.",
    scene: {set: "storage", cast: {skyler: "stand", walt: "stand"}},
    variants: [
      {when: "licensed", text: "Skyler brings Walt to a storage unit and pulls back a tarp. Underneath is a pile of cash so big she has stopped counting it, and Declan's royalty payments keep arriving in shoeboxes. The car wash could not launder it in a hundred years, and she wants to know how much is enough."},
      {when: "family<55", text: "Skyler brings Walt to a storage unit and pulls back a tarp without looking at him. Underneath is a pile of cash so big she has stopped counting it. The car wash could not launder it in a hundred years, and she wants to know how much is enough."}
    ]
  },
  question: "What does Walt do with the pile?",
  choices: [
    {id: "a", label: "Open a chain of car washes", tag: "Scale the laundry.",
     effects: {darkness: 5, hank: 15, family: 10}, flags: ["carwash"], beats: [
      {scene: {set: "chainmap", fx: ["pins"]}, caption: "Forty-one locations, forty-one very clean cars.",
       text: "Walt sees a capacity problem, not a moral one. Skyler builds the spreadsheet, and within a year A1A has a car wash in every New Mexico town with a traffic light."},
      {scene: {set: "carwash", cast: {skyler: "ceo"}}, caption: "Forty-one sets of books, all beautiful.",
       text: "The chain is profitable, spotless and audited annually by a man who suspects nothing. Skyler is, technically, a regional chief executive. Hank books a family barbecue for Saturday and asks Walt to do the burgers."}
    ]},
    {id: "b", label: "Tell Skyler he's out", tag: "What the show did.",
     effects: {darkness: -5, family: 10}, beats: [
      {scene: {set: "storage", cast: {walt: "stand", skyler: "stand"}, say: {who: "walt", text: "I'm out."}}, caption: "For once, enough.",
       text: "Walt looks at the pile and, for once, agrees that it is enough. He quits."},
      {scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "Retirement, week one.",
       text: "Walt spends a week doing nothing and is unbearable by Wednesday. Skyler books a family barbecue for Saturday, mostly to get him out of the kitchen. Quitting, it will turn out, is not the same as getting away."}
    ]},
    {id: "c", label: "Keep cooking, rent a bigger unit", tag: "More is more.",
     effects: {darkness: 15, family: -20}, beats: [
      {scene: {set: "storage", cast: {walt: "point", skyler: "stand"}, say: {who: "skyler", text: "Walt. No."}}, caption: "The problem, as Walt sees it, is storage.",
       text: "Walt decides the problem is space and rents the unit next door. Then the one after that. Skyler stops speaking to him."},
      {scene: {set: "storage", cast: {walt: "point"}}, caption: "Square footage.",
       text: "By spring he is renting the whole row and explaining square footage to anyone who will stand still. Skyler organizes a family barbecue without telling him, because the alternative is another evening about square footage."}
    ]}
  ]
});

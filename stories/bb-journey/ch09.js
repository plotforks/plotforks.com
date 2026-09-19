/* Journey chapter 9: S5E8 "Gliding Over All" (journey version; Hank finds the book in every branch). Content only (Opus pass). No new art. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 9, canon: "b", id: "cashpile", code: "S5E8", episode: "Gliding Over All", title: "The cash pile",
  setup: {
    kicker: "A storage unit, Albuquerque.",
    text: "Skyler brings Walt to a storage unit and pulls back a tarp. Underneath is a pile of cash so big she has stopped counting it. The car wash could not launder it in a hundred years, and she wants to know how much is enough.",
    caption: "The pile is not to scale. It is bigger.",
    scene: {set: "storage", cast: {skyler: "stand", walt: "stand"}},
    variants: [
      {when: "licensed", text: "Skyler brings Walt to a storage unit and pulls back a tarp. Underneath is a pile of cash so big she has stopped counting it, and Declan's royalty payments keep arriving in shoeboxes. The car wash could not launder it in a hundred years, and she wants to know how much is enough."},
      {when: "family<40", text: "Skyler brings Walt to a storage unit and pulls back a tarp without looking at him. Underneath is a pile of cash so big she has stopped counting it. The car wash could not launder it in a hundred years, and she wants to know how much is enough."}
    ]
  },
  question: "What does Walt do with the pile?",
  choices: [
    {id: "a", label: "Open a chain of car washes", tag: "Scale the laundry.",
     effects: {darkness: 5, hank: 15, family: 10}, flags: ["carwash"], beats: [
      {scene: {set: "chainmap", fx: ["pins"]}, caption: "Forty-one locations, forty-one very clean cars.",
       text: "Walt sees a capacity problem, not a moral one. Skyler builds the spreadsheet, and within a year A1A has a car wash in every New Mexico town with a traffic light."},
      {scene: {set: "bathroom", cast: {hank: "read"}}, caption: "The most expensive trip to the bathroom in television.",
       text: "At a family barbecue, Hank borrows the bathroom and finds a book with a handwritten dedication to W.W. Something clicks. Then he thinks about all those car washes."}
    ]},
    {id: "b", label: "Tell Skyler he's out", tag: "What the show did.",
     effects: {darkness: -5, family: 10}, beats: [
      {scene: {set: "storage", cast: {walt: "stand", skyler: "stand"}, say: {who: "walt", text: "I'm out."}}, caption: "For once, enough.",
       text: "Walt looks at the pile and, for once, agrees that it is enough. He quits."},
      {scene: {set: "bathroom", cast: {hank: "read"}}, caption: "Quitting is not the same as getting away.",
       text: "A few weeks later, at a family barbecue, Hank borrows the bathroom and finds a book with a handwritten dedication to W.W. Quitting, it turns out, is not the same as getting away."}
    ]},
    {id: "c", label: "Keep cooking, rent a bigger unit", tag: "More is more.",
     effects: {darkness: 15, family: -20}, beats: [
      {scene: {set: "storage", cast: {walt: "point", skyler: "stand"}, say: {who: "skyler", text: "Walt. No."}}, caption: "The problem, as Walt sees it, is storage.",
       text: "Walt decides the problem is space and rents the unit next door. Then the one after that. Skyler stops speaking to him."},
      {scene: {set: "bathroom", cast: {hank: "read"}}, caption: "Square footage.",
       text: "At a family barbecue, Hank borrows the bathroom and finds a book with a handwritten dedication to W.W. Out in the garden, Walt is explaining square footage to his son."}
    ]}
  ]
});

/* Journey chapter 10: S5E13 "To'hajiilee". Content only (Opus pass). Every branch sets one of: surrendered, shootout, deal.
   New art used here: cast jack "stand". Violence handled plainly, never as a joke. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 25, canon: "b", id: "tohajiilee", code: "S5E13", episode: "To'hajiilee", title: "Cornered in the desert",
  setup: {
    kicker: "To'hajiilee, New Mexico.",
    text: "Hank has tricked Walt into the desert, and Walt is pinned behind a rock with Hank closing in. In a panic he has already called Jack's crew for help. They are on their way.",
    caption: "Everything comes down to one rock.",
    scene: {set: "desert", cast: {walt: "phone", hank: "suspicious"}},
    variants: [
      {when: "jesse>=70", text: "Hank has tricked Walt into the desert, and Walt is pinned behind a rock with Hank closing in. Jesse is not with Hank. He is on the phone, telling Walt to run. Jack's crew is already on the way."},
      {when: "bookLab", text: "The handwriting match went into a federal file, the file grew a task force, and the task force moved slowly enough for Walt to notice it coming. Hank has finally tricked him into the desert, with four colleagues listening on an open channel. Walt is pinned behind a rock, and in a panic he has already called Jack's crew for help."},
      {when: "bookMissed", text: "It took Hank another nine months and somebody else's mistake, but he got there, and he has tricked Walt into the desert. Walt is pinned behind a rock with Hank closing in, still quietly amazed at how long this took. In a panic he has already called Jack's crew for help."},
      {when: "carwash", text: "Hank has traced the car wash books back to Walt and tricked him into the desert. Walt is pinned behind a rock with Hank closing in. In a panic he has already called Jack's crew for help. They are on their way."}
    ]
  },
  question: "Jack's crew is coming. What does Walt do?",
  choices: [
    {id: "a", label: "Call Jack off and surrender", tag: "Hands up.",
     effects: {darkness: -20}, flags: ["surrendered"], beats: [
      {scene: {set: "desert", cast: {walt: "phone", hank: "suspicious"}, say: {who: "walt", text: "Stay away. I mean it."}}, caption: "One more phone call.",
       text: "Walt calls Jack and orders him to stay away. This time Jack listens. Walt walks out from behind the rock with his hands up."},
      {scene: {set: "desert", cast: {walt: "stand", hank: "suspicious"}}, caption: "The longest silence in the series.",
       text: "Hank cuffs his brother-in-law himself. Neither of them says a word for a long time."}
    ]},
    {id: "b", label: "Let Jack's crew come", tag: "What the show did.",
     effects: {darkness: 20}, flags: ["shootout"], beats: [
      {scene: {set: "desert", cast: {hank: "suspicious", walt: "stand"}}, caption: "Cuffed, four minutes too late.",
       text: "Hank cuffs him, reads him his rights and telephones Marie, and Walt lets him, because the call he made twenty minutes ago is already halfway across the desert at eighty miles an hour."},
      {scene: {set: "desert", cast: {jack: "stand", walt: "kneel"}}, caption: "Three trucks, stopping hard.",
       text: "Three trucks come over the ridge and stop hard, and men get out behind the doors. Hank puts Walt on the ground and gets behind his own car. Nobody has fired yet. Everybody is waiting for somebody."}
    ]},
    {id: "c", label: "Offer Hank a deal", tag: "Everything, for the family.",
     effects: {darkness: 10}, flags: ["deal"], beats: [
      {scene: {set: "desert", cast: {walt: "point", hank: "suspicious"}, say: {who: "walt", text: "Everything. For my family."}}, caption: "An offer from behind a rock.",
       text: "Walt calls Jack off, then offers Hank everything: the money, the network and every name he knows, in exchange for protection for his family. Hank listens, which is more than Walt expected."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Forty pages, footnoted.",
       text: "Back at the DEA office, Hank reads Walt's confession. It is forty pages long, footnoted, and grammatically perfect."}
    ]}
  ]
});

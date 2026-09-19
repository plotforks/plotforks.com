/* Journey chapter 10: S5E13 "To'hajiilee". Content only (Opus pass). Every branch sets one of: surrendered, shootout, deal.
   New art used here: cast jack "stand". Violence handled plainly, never as a joke. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 10, canon: "b", id: "tohajiilee", code: "S5E13", episode: "To'hajiilee", title: "Cornered in the desert",
  setup: {
    kicker: "To'hajiilee, New Mexico.",
    text: "Hank has tricked Walt into the desert, and Walt is pinned behind a rock with Hank closing in. In a panic he has already called Jack's crew for help. They are on their way.",
    caption: "Everything comes down to one rock.",
    scene: {set: "desert", cast: {walt: "phone", hank: "suspicious"}},
    variants: [
      {when: "jesse>=70", text: "Hank has tricked Walt into the desert, and Walt is pinned behind a rock with Hank closing in. Jesse is not with Hank. He is on the phone, telling Walt to run. Jack's crew is already on the way."},
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
      {scene: {set: "desert", cast: {jack: "stand", walt: "stand"}}, caption: "Too late to call it off.",
       text: "Jack's crew arrives and the desert goes loud. Walt, already in handcuffs, shouts for it to stop. Nobody listens to him anymore."},
      {scene: {set: "desert", cast: {walt: "stand"}}, caption: "Nothing he can offer.",
       text: "When it is quiet again, nothing Walt can offer changes what happens next."}
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

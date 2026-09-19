/* Journey chapter 4: S2E8 "Better Call Saul". Content only (Opus pass).
   New art used here: cast badger "stand". */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 4, canon: "a", id: "lawyer", code: "S2E8", episode: "Better Call Saul", title: "Badger is arrested",
  setup: {
    kicker: "A bus bench, Albuquerque.",
    text: "Jesse's friend Badger has been arrested selling to an undercover DEA agent, and the DEA wants to know who cooks the blue stuff. If Badger talks, it's over. Jesse has seen a lawyer's ads on late-night TV.",
    caption: "Somebody had better call somebody.",
    scene: {set: "house", cast: {badger: "stand"}, fx: ["siren"]},
    variants: [
      {when: "hank>=25", text: "Jesse's friend Badger has been arrested selling to an undercover DEA agent. Hank has been asking about a new cook in town for weeks, and now he has someone to ask. If Badger talks, it's over. Jesse has seen a lawyer's ads on late-night TV."}
    ]
  },
  question: "Badger could talk. Who do they call?",
  choices: [
    {id: "a", label: "Hire Saul Goodman", tag: "The lawyer from the TV ads.",
     effects: {hank: -10, darkness: 5}, flags: ["saul"], beats: [
      {scene: {set: "office", cast: {saul: "pitch", walt: "stand", jesse: "stand"}, say: {who: "saul", text: "I know a guy who knows a guy."}}, caption: "Office hours by appointment.",
       text: "Saul Goodman hears the whole story without blinking and has a plan by lunch: an inmate with a long sentence ahead of him will happily pose as the mysterious cook, for a price."},
      {scene: {set: "office", cast: {saul: "stand", walt: "stand"}}, caption: "A retainer, and then a relationship.",
       text: "It works. The DEA arrests a fake cook, Badger walks, and Saul slides a business card across the desk. Walt now has a lawyer, and the lawyer now has Walt."}
    ]},
    {id: "b", label: "Hire a real lawyer", tag: "Licensed, boring, expensive.",
     effects: {hank: 10, family: 5, darkness: -5}, beats: [
      {scene: {set: "office", cast: {walt: "stand"}, say: {who: "walt", text: "How much per hour?"}}, caption: "A lawyer with a real diploma.",
       text: "Walt pays a respectable defense attorney a respectable retainer. She gets Badger a plea deal within the law, which means Badger has to give the DEA something."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Something is enough.",
       text: "Badger gives them very little: a street name, the color of the product, and that the supplier's partner is some old guy. Hank pins all three to his board."}
    ]},
    {id: "c", label: "Handle it themselves", tag: "How hard can the legal system be?",
     effects: {darkness: 10, hank: 15, jesse: 10}, beats: [
      {scene: {set: "rv", cast: {walt: "lecture", jesse: "stand"}, say: {who: "jesse", text: "This is your plan?!"}}, caption: "A planning session, Heisenberg style.",
       text: "Walt draws the plan on a whiteboard: Jesse will pose as Badger's lawyer and visit him with advice. Jesse buys a suit that does not fit."},
      {scene: {set: "prison", cast: {jesse: "stand", badger: "stand"}}, caption: "Counsel for the defense, allegedly.",
       text: "The guards see through the suit in about four seconds. Badger stays quiet out of loyalty, Jesse gets a warning, and Hank gets a very strange report."}
    ]}
  ]
});

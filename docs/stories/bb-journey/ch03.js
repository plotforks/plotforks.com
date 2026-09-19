/* Journey chapter 3: S1E5 "Gray Matter". Content only (Opus pass). No new art. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 3, canon: "a", id: "graymatter", code: "S1E5", episode: "Gray Matter", title: "Elliott's offer",
  setup: {
    kicker: "Elliott's birthday party.",
    text: "At Elliott Schwartz's birthday party, Walt's old partner offers him a job at Gray Matter, with health insurance that would cover every cent of the treatment. Walt helped found that company. He sold his share for five thousand dollars.",
    caption: "Five thousand dollars. He still does the math.",
    scene: {set: "office", cast: {elliott: "stand", walt: "suit"}, fx: ["confetti"]},
    variants: [
      {when: "skylerKnows", text: "At Elliott Schwartz's birthday party, Walt's old partner offers him a job at Gray Matter, with health insurance that would cover every cent of the treatment. Skyler watches from across the room, willing him to say yes. Walt helped found that company. He sold his share for five thousand dollars."}
    ]
  },
  question: "His pride or his health. What does Walt do?",
  choices: [
    {id: "a", label: "Refuse", tag: "Pride, insured by nobody.",
     effects: {darkness: 10, family: -10}, beats: [
      {scene: {set: "office", cast: {walt: "stand", elliott: "shock"}, say: {who: "walt", text: "I have a job."}}, caption: "No cake for Walter.",
       text: "Walt says he already has a job, thank you, and leaves before the cake. Elliott is baffled. Skyler is worse than baffled."},
      {scene: {set: "dinner", cast: {skyler: "stand", walt: "stand"}}, caption: "She notices everything, eventually.",
       text: "Walt tells the family he will pay for the treatment himself. He doesn't say how. Skyler starts noticing things."}
    ]},
    {id: "b", label: "Take the job", tag: "Health insurance!",
     exit: "cornerOffice", beats: [
      {scene: {set: "office", cast: {walt: "suit", elliott: "stand"}, say: {who: "elliott", text: "Welcome back, Walt."}}, caption: "The RV goes to a nicer family.",
       text: "Walt swallows his pride and takes the job. Gray Matter's insurance covers the treatment, and he sells the RV to a retired couple from Tucson."},
      {scene: {set: "office", cast: {walt: "suit"}, say: {who: "walt", text: "I could have been dangerous."}}, caption: "Twenty years of very nice views.",
       text: "The cancer goes into remission. Walt spends twenty years in a corner office, perfecting coatings and telling the interns he could have been dangerous."}
    ]},
    {id: "c", label: "Take their money, keep cooking", tag: "Why not both?",
     effects: {darkness: 5, family: 5, hank: 5}, flags: ["grayMoney"], beats: [
      {scene: {set: "office", cast: {walt: "stand", elliott: "stand"}}, caption: "A gift between old friends.",
       text: "Walt turns down the job but lets Elliott and Gretchen pay for the treatment, as a gift between old friends. He keeps cooking anyway. The money was never really the point, and he is starting to know it."},
      {scene: {set: "dinner", cast: {skyler: "stand", walt: "stand"}}, caption: "Mostly honest.",
       text: "Skyler is overjoyed and the family is relieved. For once nobody is lying about where the money comes from, except Walt, about the other money."}
    ]}
  ]
});

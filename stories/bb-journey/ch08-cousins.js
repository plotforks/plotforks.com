/* Journey chapter 8: S3E7 "One Minute". Content only (Opus pass). The two men in the grey suits.
   Plays after Jane (n:7) and before Half Measures (n:9). Every branch leaves the Cousins out of the story and
   Walt alive, because season four needs both, but who paid for that differs in each one.
   Sets gusRedirect / warnedHank / soldHank, and hankShot where it applies.
   New art used here: cast cousins "stand", which draws the pair. Sets house, corner and office already exist.
   Note: the bedroom set only draws Walt, Jesse and Jane, so the Cousins are never placed there.
   No weapon is described and nothing is shown. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 8, canon: "a", id: "cousins", code: "S3E7", episode: "One Minute", title: "Two men in grey suits",
  setup: {
    kicker: "A car park, and a house with somebody already inside it.",
    text: "Two men in identical grey suits and silver boots have driven up from Mexico for Walter White, and they have been in his house since two in the afternoon, sitting perfectly still. They are Tuco's cousins. They do not speak, do not hurry and have never once been talked out of anything. The telephone in Walt's hand belongs to a man he has met twice, who has just explained that he can make this go away, and who is waiting for an answer.",
    caption: "They have been sitting there for four hours.",
    scene: {set: "corner", cast: {cousins: "stand"}},
    variants: [
      {when: "janeAlive", text: "Two men in identical grey suits and silver boots have driven up from Mexico for Walter White, and they have been in his house since two in the afternoon, sitting perfectly still. They are Tuco's cousins. Jesse is at a meeting he actually goes to now, which is the only reason he is not at that house today. The telephone in Walt's hand belongs to a man he has met twice, who has just explained that he can make this go away."},
      {when: "tucoPartner", text: "Two men in identical grey suits and silver boots have driven up from Mexico for Walter White, and they have been in his house since two in the afternoon. They are Tuco's cousins, they have spent eleven weeks watching their cousin work with a chemist, and they have reached their own conclusions about whose fault the end of him was. The telephone in Walt's hand belongs to a man who says he can make this go away."},
      {when: "hectorHelped", text: "Two men in identical grey suits and silver boots have driven up from Mexico for Walter White, and they have been in his house since two in the afternoon. Their uncle sits in a care home in Albuquerque with a bell, and their uncle knows exactly what happened in that shack, and has said nothing to them about it, which is the only reason this is a conversation and not an ending. The telephone in Walt's hand belongs to a man who says he can make this go away."}
    ]
  },
  question: "Gus Fring is on the phone and can point those two men anywhere. What does Walt say?",
  choices: [
    {id: "a", label: "Let Gus handle it", tag: "What the show did.",
     effects: {darkness: 10, hank: -15, family: 5}, flags: ["gusRedirect", "hankShot"], beats: [
      {scene: {set: "restaurant", cast: {gus: "fold"}}, caption: "He does not ask what handling it means.",
       text: "Walt says yes to a man who has offered to solve a problem, and carefully does not ask how. This is the first time he does that. It is not the last, and after this one it stops feeling like a question at all."},
      {scene: {set: "corner", cast: {cousins: "stand"}}, caption: "They are given a different name.",
       text: "Somebody tells those two men, quietly and accurately, that the person who ended their cousin was a federal agent and not a chemistry teacher. They turn around in a car park the next afternoon and go and find him."},
      {scene: {set: "office", cast: {hank: "read"}, fx: ["siren"]}, caption: "Eighteen months of physiotherapy.",
       text: "Hank spends four months in a hospital and the rest of the year learning to walk again in his own living room, furious and funny about it in roughly equal measure. Marie never finds out that a phone call decided which of them it would be. Neither does Hank."}
    ]},
    {id: "b", label: "Warn Hank", tag: "Anonymously, from a payphone.",
     effects: {darkness: -10, hank: 20, family: -5}, flags: ["warnedHank"], beats: [
      {scene: {set: "corner", cast: {walt: "phone"}, say: {who: "walt", text: "One minute. You have about one minute."}}, caption: "Nine words, from a payphone, and then he hangs up.",
       text: "Walt does not say who he is and does not stay on the line, and he gets the timing very nearly right. Hank is in a car park with a phone against his ear when two men in grey suits start walking towards him, and being warned turns out to be worth about a minute, which is enough."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "He lives, and he keeps the recording.",
       text: "Hank walks away from it with his hearing damaged and his career restarted, and with a nine-word recording of an unlisted caller that he plays to himself about once a month for the next three years, without ever saying why."},
      {scene: {set: "restaurant", cast: {gus: "stand", walt: "stand"}}, caption: "Gus works out that somebody moved first.",
       text: "Somebody else made that call before Gus could make his, and Gus spends a while establishing who, in the pleasant unhurried way he establishes things. He does not raise it. He simply revises, permanently, what he thinks Walt will do when frightened."}
    ]},
    {id: "c", label: "Tell them himself whose fault it was", tag: "Give them the right name.",
     effects: {darkness: 30, hank: -20, jesse: -5, family: -10}, flags: ["soldHank", "hankShot"], beats: [
      {scene: {set: "corner", cast: {walt: "stand", cousins: "stand"}, say: {who: "walt", text: "It was not me. I can tell you the name."}}, caption: "He walks over to them himself.",
       text: "Walt does not use Gus at all. He walks across a car park to two men who came here for him, says a federal agent's name out loud, and explains where that agent drinks. It takes under a minute and he does not stumble over any of it."},
      {scene: {set: "office", cast: {hank: "read"}, fx: ["siren"]}, caption: "A car park, and a very bad afternoon.",
       text: "Hank survives, because Hank keeps surviving, and spends a year learning to walk again. Walt visits the hospital eleven times, brings good coffee, and is genuinely and completely sincere every single time, which is the part he never understands about himself."},
      {when: "family>=70", scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "Marie stays with them for six weeks.",
       text: "Marie sleeps in their spare room for six weeks while the hospital bills arrive, and Walt pays some of them anonymously, out of money he earned from the same people who drove those two men north. Nobody in the house ever learns any part of this."}
    ]}
  ]
});

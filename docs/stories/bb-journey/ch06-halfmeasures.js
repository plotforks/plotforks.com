/* Journey chapter 6: S3E12 "Half Measures". Content only (Opus pass). Mike chapter.
   Sits between Jane (ch05) and Gale (old ch06.js, now n:7). Gus still needs a replacement cook after this,
   in every branch, so the Gale chapter's premise holds.
   New art used here: set "bar" (a dim bar counter, two stools, one bottle); cast mike "stand" (exists). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 7, canon: "b", id: "halfmeasures", code: "S3E12", episode: "Half Measures", title: "Mike buys a drink",
  setup: {
    kicker: "A bar with no music, mid-afternoon.",
    text: "Jesse is going after two of Gus's dealers, and Gus wants the problem to go away before it costs him a distribution network. Mike buys Walt a drink and tells him a long story about a drunk, a wife and a cop who did half of what was needed. The moral is not subtle.",
    caption: "Two stools, one story, no music.",
    scene: {set: "bar", cast: {mike: "stand", walt: "stand"}},
    variants: [
      /* Jesse can only fall this low by Jane surviving her bedside chapter, so the combined
         variant has to sit above the plain janeAlive one or it would never be shown. */
      {when: "janeAlive && jesse<=30", text: "Jesse is going after two of Gus's dealers and has stopped taking Walt's calls entirely. Jane still answers hers, and the messages she passes on get shorter every week. Mike buys Walt a drink and tells him a long story about a drunk, a wife and a cop who did half of what was needed. The moral is not subtle, and it is aimed at Walt."},
      {when: "janeAlive", text: "Jesse is going after two of Gus's dealers, and Gus wants the problem to go away before it costs him a distribution network. Jane is the only reason Jesse still answers his phone. Mike buys Walt a drink and tells him a long story about a drunk, a wife and a cop who did half of what was needed."}
    ]
  },
  question: "Mike is offering to handle Jesse. What does Walt say?",
  choices: [
    {id: "a", label: "Let Mike handle it", tag: "No half measures, his way.",
     effects: {darkness: 5, jesse: -15}, flags: ["mikeDeal", "mikeRespect"], beats: [
      {scene: {set: "bar", cast: {mike: "stand", walt: "stand"}, say: {who: "mike", text: "Then we understand each other."}}, caption: "A handshake with a receipt.",
       text: "Walt lets Mike do it properly. Mike does not kill anybody. He takes Jesse's phone, his car keys and his cash, drives him four hundred miles and explains what happens next in about nine words."},
      {scene: {set: "rv", cast: {jesse: "stand"}}, caption: "Back within a week, quieter.",
       text: "Jesse is back within a week, sober, furious and no longer under any illusion about who Walt's friends are. He cooks. He does not speak to Walt for a month."}
    ]},
    {id: "b", label: "Get there first", tag: "What the show did.",
     effects: {darkness: 15, jesse: 15}, flags: ["ranThemDown"], beats: [
      {scene: {set: "corner", cast: {walt: "stand"}}, caption: "The car was already moving.",
       text: "Walt gets to the corner before Jesse does and handles both dealers himself with the only tool he has, which is a car. It takes four seconds and he is very calm afterwards, which frightens Jesse more than the crash."},
      {scene: {set: "corner", cast: {walt: "point", jesse: "stand"}, say: {who: "walt", text: "Run."}}, caption: "One word of advice.",
       text: "He tells Jesse to run and means it. Mike hears about it that evening, refills his coffee, and revises his opinion of the chemistry teacher upward and downward at the same time."}
    ]},
    {id: "c", label: "Take it to Gus himself", tag: "Negotiate, like a businessman.",
     effects: {darkness: 5, jesse: 5, hank: 5}, flags: ["mikeWatch", "mikeRespect"], beats: [
      {scene: {set: "restaurant", cast: {walt: "stand", mike: "stand"}}, caption: "A meeting over very good chicken.",
       text: "Walt asks for a meeting and makes a business case: the dealers cost Gus nothing, Jesse costs Gus a cook. He offers Jesse's hands in the lab and Mike's eyes on Jesse, permanently."},
      {scene: {set: "superlab", cast: {jesse: "stand", mike: "stand"}}, caption: "Supervision, in a bad chair.",
       text: "Gus agrees, because it is cheaper. Mike now sits in the lab on a folding chair with a crossword, and Jesse works fourteen-hour days under the eye of a man who has never once blinked first."}
    ]}
  ]
});

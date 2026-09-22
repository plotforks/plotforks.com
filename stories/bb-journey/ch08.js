/* Journey chapter 8: S5E6 "Buyout". Content only (Opus pass).
   New art used here: cast declan "stand". */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 16, canon: "a", id: "buyout", code: "S5E6", episode: "Buyout", title: "Five million each",
  setup: {
    kicker: "A diner, then the desert.",
    text: "Gus is gone, and Walt, Jesse and Mike run their own operation. Mike and Jesse have an offer from a rival named Declan: sell him their supply for five million dollars each and walk away. They want Walt to take it too.",
    caption: "Five million dollars, each.",
    scene: {set: "dinner", cast: {walt: "stand", jesse: "stand", mike: "stand"}},
    variants: [
      {when: "gusArrested", text: "Gus is in federal prison, and his network is up for grabs. Walt, Jesse and Mike run their own operation. Mike and Jesse have an offer from a rival named Declan: sell him their supply for five million dollars each and walk away. They want Walt to take it too."},
      {when: "janeAlive && jesse>=60", text: "Gus is gone, and Walt, Jesse and Mike run their own operation. Declan, a rival, offers five million dollars each for their supply. Jesse wants to take it and leave. Jane has already packed."}
    ]
  },
  question: "Five million each. What does Walt do?",
  choices: [
    {id: "a", label: "Refuse", tag: "He's in the empire business.",
     effects: {darkness: 20, jesse: -15}, beats: [
      {scene: {set: "dinner", cast: {walt: "stand", jesse: "stand"}, say: {who: "walt", text: "Five million? No."}}, caption: "Not in the money business.",
       text: "Walt tells Jesse that five million is not the point. He isn't in the money business. Jesse walks out and doesn't come back."},
      {scene: {set: "storage", cast: {walt: "stand"}}, caption: "The pile begins.",
       text: "Walt cuts his own deal with Declan and keeps cooking. The money starts to pile up faster than anyone can count it."}
    ]},
    {id: "b", label: "Take the buyout", tag: "Enough is enough.",
     exit: "fiveMillion", beats: [
      {scene: {set: "desert", cast: {walt: "stand", mike: "stand", jesse: "stand"}}, caption: "Almost a smile.",
       text: "Walt shakes Mike's hand in the desert and takes his five million. Mike, for the first time since they met, almost smiles."},
      {scene: {set: "dinner", cast: {walt: "stand", skyler: "stand"}, say: {who: "walt", text: "It's enough."}}, caption: "The word nobody expected.",
       text: "Walt comes home with a bag of money and says the word nobody expected from him: enough."}
    ]},
    {id: "c", label: "License the formula to Declan", tag: "Royalties, quarterly.",
     effects: {darkness: 10, hank: 10, jesse: 5}, flags: ["licensed"], beats: [
      {scene: {set: "desert", cast: {walt: "lecture", declan: "stand"}, say: {who: "walt", text: "Royalties. Paid quarterly."}}, caption: "Intellectual property, desert edition.",
       text: "Walt proposes a licensing deal: Declan's crew uses his method and pays him a royalty on every batch. Declan has never heard the word royalty."},
      {scene: {set: "desert", cast: {declan: "stand"}, fx: ["sweat"]}, caption: "Quality control, remote.",
       text: "Declan's crew can't follow the method, and the product comes out cloudy. Walt spends the next month doing quality control by phone, furious."}
    ]}
  ]
});

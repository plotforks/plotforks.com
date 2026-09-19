/* Breaking Bad journey: meta, scores and early exits. Design: JOURNEY-PLAN.md. Content only (Opus pass).
   Chapters live in ch01.js ... ch10.js and push onto .chapters; finale endings live in endings.js.
   In share lines, {meter} is replaced by the final darkness score. */
window.JOURNEYS = window.JOURNEYS || {};
window.JOURNEYS["breaking-bad"] = Object.assign(window.JOURNEYS["breaking-bad"] || {}, {
  id: "breaking-bad",
  title: "The Uncertainty Principle",
  subtitle: "Play the whole series. Eleven decisions, twenty-two endings.",
  start: {darkness: 10, jesse: 50, hank: 0, family: 70},
  scoreLabels: {darkness: "Heisenberg", jesse: "Jesse's trust", hank: "Hank's suspicion", family: "Family"},
  exits: {
    shortest: {name: "The Shortest Series Ever",
      summary: "Jesse is arrested, Walt starts treatment with his family behind him, and the show ends after one episode. Critics call it heartwarming. Nobody remembers it.",
      share: "My timeline: The Shortest Series Ever. Walt told Hank everything in episode one. Heisenberg meter {meter}/100."},
    cornerOffice: {name: "Corner Office",
      summary: "Walt lives to eighty, rich, bored and legal. Jesse is arrested the following spring and never learns who almost made him famous.",
      share: "My timeline: Corner Office. Walt took the Gray Matter job and lived to eighty. Heisenberg meter {meter}/100."},
    fiveMillion: {name: "The Five Million Dollar Man",
      summary: "Walt takes the money and walks away, and for once it is enough. He spends it on the family, the treatment and a very large television, and dies at home with everyone knowing exactly who he was.",
      share: "My timeline: The Five Million Dollar Man. Walt took the buyout and walked away. Heisenberg meter {meter}/100."}
  }
});
window.JOURNEYS["breaking-bad"].chapters = window.JOURNEYS["breaking-bad"].chapters || [];

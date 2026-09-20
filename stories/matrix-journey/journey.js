/* The Matrix trilogy journey: meta, scores and early exits. Design: MATRIX-PLAN.md. Content only (Opus pass).
   Chapters live in ch01.js ... ch08.js plus the aftertaste ch09.js and push onto .chapters; finale endings live in endings.js.
   The meter is the belief score (not darkness): `meterScore` names it, `meterLabel` is its display name.
   In share lines, {meter} is replaced by the final belief score. */
window.JOURNEYS = window.JOURNEYS || {};
window.JOURNEYS["matrix"] = Object.assign(window.JOURNEYS["matrix"] || {}, {
  id: "matrix",
  title: "There Is No Spoiler",
  subtitle: "Play the whole trilogy. Fifteen chapters, twenty-nine endings.",
  start: {belief: 20, trinity: 30, agents: 10, zion: 50},
  scoreLabels: {belief: "Belief", trinity: "Trinity", agents: "Agents on his trail", zion: "Zion's odds"},
  meterScore: "belief",
  meterLabel: "Belief",
  exits: {
    employeeOfMonth: {name: "Thomas Anderson, Employee of the Month",
      summary: "Thomas Anderson takes the blue pill, wakes up in bed and is on time for work for the rest of his life. His plaque hangs by the elevator. A black cat walks past it twice, and he never notices.",
      share: "My timeline: Thomas Anderson, Employee of the Month. Neo took the blue pill. Belief {meter}/100."},
    mediumRare: {name: "Medium Rare",
      summary: "Neo and Cypher are plugged back in rich, famous and remembering nothing. Zion falls some time later. Neither of them notices, because the steaks are excellent.",
      share: "My timeline: Medium Rare. Neo told Cypher he'd go back, and did. Belief {meter}/100."}
  }
});
window.JOURNEYS["matrix"].chapters = window.JOURNEYS["matrix"].chapters || [];

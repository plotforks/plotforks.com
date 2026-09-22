/* Journey chapter 14: after S5E8 "Gliding Over All". Content only (Opus pass).
   Dimos's premise: a rational businessman with this much money would not leave it in a barrel.
   Plays after the cash pile (n:15) and before Hank's bathroom (n:17). Sets portfolio / chainTycoon / barrel.
   Never instructional: no real vehicles, structures or jurisdictions are described, and Skyler's
   spreadsheet does all the actual work, as usual.
   New art used here: fx "chart" (a rising line chart drawn on a wall or a screen). Sets office, storage,
   chainmap and cast skyler "spreadsheet" / "ceo" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 18, canon: "c", id: "portfolio", code: "S5E8", episode: "Gliding Over All", title: "What money does when it sits",
  setup: {
    kicker: "A storage unit, measured in pallets.",
    text: "Walt reads an article about inflation and does the arithmetic on the pile. It is losing value every month it sits in a metal room in the desert, and the man who once recalculated a restaurant bill to the cent cannot live with that. Skyler finds him at the kitchen table at two in the morning with a legal pad and three columns.",
    caption: "Even the pile has an opportunity cost.",
    scene: {set: "storage", cast: {walt: "dig"}, fx: ["chart"]},
    variants: [
      {when: "carwash", text: "Walt reads an article about inflation and does the arithmetic on the pile. Forty-one car washes turn out to be a laundry, not an investment, and the rest of the money is losing value every month it sits in a metal room in the desert. Skyler finds him at the kitchen table at two in the morning with a legal pad and three columns."},
      {when: "licensed", text: "Declan's royalties arrive every month in shoeboxes and go straight into the pile, which is the least efficient thing Walt has ever been part of. He reads an article about inflation, does the arithmetic, and Skyler finds him at the kitchen table at two in the morning with a legal pad and three columns."}
    ]
  },
  question: "He has more money than he can ever spend. What does he do with it?",
  choices: [
    {id: "a", label: "Diversify the portfolio", tag: "Index funds, bonds, property.",
     effects: {darkness: 5, family: 5, hank: 10}, flags: ["portfolio"], beats: [
      {scene: {set: "office", cast: {walt: "suit", skyler: "spreadsheet"}}, caption: "A pie chart with very dull slices.",
       text: "Walt builds the thing he has wanted to build since Gray Matter: a portfolio. Dull holding companies, index funds, bonds, two apartment blocks and a minority stake in a cement business. Skyler does the paperwork and hates every page of it."},
      {scene: {set: "office", cast: {walt: "lecture", skyler: "ceo"}, say: {who: "walt", text: "Compound interest, Skyler. It works while we sleep."}}, caption: "He has never been happier.",
       text: "For three months Walt is the man he was supposed to be: a rich, boring, diversified investor who reads quarterly statements in bed. He is genuinely, visibly happy."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Money that earns is money that files.",
       text: "Money in a barrel is a secret. Money that earns is a filing, and filings are read by exactly the kind of federal department that employs his brother-in-law."}
    ]},
    {id: "b", label: "Buy more car washes", tag: "Scale what already works.",
     effects: {darkness: 5, family: 10, hank: 10}, flags: ["chainTycoon"], beats: [
      {scene: {set: "chainmap", fx: ["pins"]}, caption: "Four states, one very confident logo.",
       text: "Walt doubles down on the only legitimate business he understands: buckets, wax and volume. A1A expands into four states, and Skyler is given a title she did not ask for and a corner office she secretly likes."},
      {when: "carwash", scene: {set: "carwash", cast: {skyler: "ceo"}}, caption: "The laundry became the business.",
       text: "Somewhere around the ninetieth location the laundering stops being the point. The chain makes real money, employs six hundred people, and is audited by professionals with no sense of humor."},
      {when: "!carwash", scene: {set: "carwash", cast: {walt: "suit"}}, caption: "A late start, an aggressive rollout.",
       text: "He starts late and buys aggressively, which is a phrase that attracts attention in a state with this few car washes. The trade press runs a short admiring profile of a former teacher."}
    ]},
    {id: "c", label: "Leave it in the unit", tag: "What the show did.",
     effects: {darkness: 5, family: -5}, flags: ["barrel"], beats: [
      {scene: {set: "storage", cast: {walt: "stand"}}, caption: "Nine hundred kilograms of paper.",
       text: "Walt closes the roller door and leaves it. It is not an investment, it is a monument, and monuments are not supposed to earn anything. He visits it more often than he visits his mother-in-law."},
      {scene: {set: "storage", cast: {walt: "dig"}}, caption: "Mice, damp, and inflation.",
       text: "The pile quietly loses value, gets damp at one corner, and feeds a family of mice. Walt eventually buys a dehumidifier for it, which is the single most Walter White purchase of the entire series."}
    ]}
  ]
});

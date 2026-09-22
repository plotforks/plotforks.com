/* Journey chapter 25: S5E15 "Granite State". Content only (Opus pass). Eight weeks in a cabin in New Hampshire.
   Gated on atLarge, because a man in custody does not get a cabin. Every branch except one sends him back south,
   so the aftertaste pair at n:26 still works: felina needs atLarge && !gaveUp, sentencing is the catch-all.
   Sets wentBack / moneyOnly / gaveUp.
   No new art: sets house, bar, office, dinner; cast walt "stand"/"phone"/"floor"/"suit", elliott "stand"/"shock",
   hank "read", skyler "sit" all exist. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 29, canon: "a", when: "atLarge", id: "granite", code: "S5E15", episode: "Granite State", title: "Eight weeks of snow",
  setup: {
    kicker: "A cabin in New Hampshire, with two rooms and no road.",
    text: "A man who fixes vacuum cleaners drove Walt eighteen hundred miles and left him in a cabin with a barrel of money, a stack of DVDs and no telephone. He comes once a month with groceries and charges ten thousand dollars an hour for company. Walt has been here eight weeks. The cancer is back, he has lost enough weight that the wedding ring slides off, and everything he did all of this for is somewhere he cannot reach.",
    caption: "Two rooms, one barrel, and a great deal of snow.",
    scene: {set: "house", cast: {walt: "stand"}},
    variants: [
      {when: "clearedSkyler", text: "A man who fixes vacuum cleaners drove Walt eighteen hundred miles and left him in a cabin with a barrel of money and no telephone. Eight weeks ago Walt spent eleven minutes on a recorded line being the worst man he could convincingly be, so that his wife would keep her house, and it worked. Now the cancer is back, the wedding ring slides off, and the family he bought that performance for is somewhere he cannot reach.", scene: {set: "house", cast: {walt: "stand"}}},
      {when: "sharedBlame", text: "A man who fixes vacuum cleaners drove Walt eighteen hundred miles and left him in a cabin with a barrel of money and no telephone. Eight weeks ago he said nothing at all about his wife, and the newspapers the vacuum man brings have started printing her name next to his. The cancer is back, the wedding ring slides off, and there is a very long time in which to read those papers again.", scene: {set: "house", cast: {walt: "stand"}}},
      {when: "hankLives", text: "A man who fixes vacuum cleaners drove Walt eighteen hundred miles and left him in a cabin with a barrel of money and no telephone. Hank Schrader is alive, on television twice a week, and describing him to a national audience with a precision only family can manage. The cancer is back, the ring slides off, and every newspaper that arrives has his own face on it."}
    ]
  },
  question: "He walks four miles to a bar with a payphone and a television. What does he do with the evening?",
  choices: [
    {id: "a", label: "Go back and finish it", tag: "What the show did.",
     effects: {darkness: 15, family: -5}, flags: ["wentBack"], beats: [
      {scene: {set: "bar", cast: {walt: "stand"}}, caption: "He calls the DEA, gives his name, and puts the phone down.",
       text: "Walt calls the Albuquerque field office, says his own name slowly enough to be spelled, and leaves the receiver hanging. Then he orders a drink and sits down to wait for them, which is the first genuinely finished decision he has made in a year."},
      {scene: {set: "dinner", cast: {elliott: "stand"}}, caption: "Then the television says he contributed nothing.",
       text: "The television above the bar has two old colleagues on it explaining, kindly and at length, that his contribution to the company amounted to a name. It takes about ninety seconds to undo eight weeks of surrender. When the police arrive the stool is empty and the drink has not been touched."},
      {scene: {set: "desert", cast: {walt: "keys"}}, caption: "Eighteen hundred miles, driven the other way.",
       text: "He steals a car in a town he could not find again on a map and drives south for two days, and by the time he crosses into New Mexico he has stopped rehearsing what he is going to say to anybody. He has a list instead."}
    ]},
    {id: "b", label: "Go back only to make the money arrive", tag: "Nothing else. Just that.",
     effects: {darkness: -5, family: 20, jesse: 5}, flags: ["wentBack", "moneyOnly"], beats: [
      {scene: {set: "bar", cast: {walt: "phone"}, say: {who: "walt", text: "I am not asking you for anything. I am giving you a job."}}, caption: "One call, and it is not to the DEA.",
       text: "Walt does not call the police and does not call his son. He calls two people who have spent twenty years being ashamed of knowing him, and offers them the only arrangement they cannot refuse: a large sum of money, a trust with a date on it, and their own reputations as the collateral."},
      {scene: {set: "house", cast: {walt: "suit", elliott: "shock"}}, caption: "He goes south for one evening, in a jacket that no longer fits.",
       text: "He makes the eighteen-hundred-mile drive for a single conversation in a living room, says almost nothing, and is gone before the coffee is poured. The arrangement holds, because it was designed by somebody who has thought about very little else for eight weeks."},
      {when: "family>=80", scene: {set: "kitchen", cast: {skyler: "sit"}}, caption: "The money arrives on a Tuesday, from strangers.",
       text: "On his son's eighteenth birthday a great deal of money arrives from a charitable foundation with a dull name, and the family spends a long evening deciding whether to keep it. They keep it. Nobody says his name at that table for another four years."}
    ]},
    {id: "c", label: "Finish the call and wait for them", tag: "Eight weeks was enough.",
     effects: {darkness: -25, hank: 20, family: 10}, flags: ["gaveUp"], beats: [
      {scene: {set: "bar", cast: {walt: "floor"}}, caption: "He does not look up when the television comes on.",
       text: "Walt calls the field office, gives his name, and then does the hard part, which is staying on the stool. The television says what it says. He listens to all of it, finds that he agrees with more of it than he expected, and orders nothing else."},
      {scene: {set: "office", cast: {hank: "read", walt: "stand"}}, caption: "Two state troopers, and a very long drive south.",
       text: "Two New Hampshire troopers collect him from a bar with a barrel of money still buried four miles away, and he tells them where it is on the first morning, which nobody can account for. The federal paperwork takes four months and reads like the work of a man helping with his own filing."},
      {scene: {set: "courtroom", cast: {walt: "suit", judge: "sit"}}, caption: "He stops being a manhunt and becomes a docket number.",
       text: "There is no compound, no last drive and no final list. There is a hearing schedule, a great deal of cooperation, and a man who gets steadily smaller in the newspapers until he is a paragraph on page eleven, which is the one punishment he never planned for."}
    ]}
  ]
});

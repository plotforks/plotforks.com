/* Journey chapter 12: S5E7 "Say My Name". Content only (Opus pass). The second Mike chapter.
   Plays after Buyout (n:12) and before the nine men in prison (n:14). Sets mikeLives / mikeDead, used by the endings.
   The killing is stated plainly in one line and never drawn or joked about.
   New art used here: cast mike "sit" (on a bench, forearms on knees, coffee). Set park already exists. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 13, canon: "a", id: "saymyname", code: "S5E7", episode: "Say My Name", title: "Mike's go-bag",
  setup: {
    kicker: "A park by the river. A duffel bag in a car boot.",
    text: "Mike is leaving town this afternoon and for good. The DEA has the names of his nine men, his money is frozen, his granddaughter has a lawyer's letter about a trust fund, and the bag with his passport and his cash is in Walt's boot. He is out of patience generally and out of patience with Walt specifically.",
    caption: "He did not get out of the car for this.",
    scene: {set: "park", cast: {mike: "sit", walt: "stand"}},
    variants: [
      {when: "mikeRespect", text: "Mike is leaving town this afternoon and for good. The DEA has the names of his nine men and his money is frozen. He is out of patience generally, but he still stops the car for Walt, which he would not do for most people, and that is the whole problem with this afternoon."},
      {when: "noSaul", text: "Mike is leaving town this afternoon and for good. The DEA has the names of his nine men, his money is frozen, and the one lawyer in Albuquerque who could quietly unfreeze any of it is a man Walt decided months ago he could do without. The bag with his passport and his cash is in Walt's boot."}
    ]
  },
  question: "Mike is walking away and Walt wants the names of the nine men. What does he do?",
  choices: [
    {id: "a", label: "Demand the names", tag: "What the show did.",
     effects: {darkness: 25, jesse: -10}, flags: ["mikeDead"], beats: [
      {scene: {set: "park", cast: {walt: "point", mike: "sit"}, say: {who: "mike", text: "Shut up and let me die in peace."}}, caption: "The stupidest four minutes of his life.",
       text: "Walt asks for the list, Mike tells him what he thinks of him at length and accurately, and Walt does something unforgivable and completely unnecessary. He works out why it was unnecessary about a minute later."},
      {scene: {set: "park", cast: {walt: "stand"}}, caption: "Lydia had the names all along.",
       text: "Lydia had the list the whole time and would have handed it over for a percentage. Walt sits by the river with that thought for a while, then drives home and cooks dinner for his family."}
    ]},
    {id: "b", label: "Hand over the bag", tag: "Let the man retire.",
     effects: {darkness: -10, jesse: 10}, flags: ["mikeLives"], beats: [
      {scene: {set: "park", cast: {walt: "stand", mike: "sit"}}, caption: "No speech, no handshake.",
       text: "Walt puts the bag on the bench and steps back. Mike checks it, nods once, and drives away without a speech, a handshake or a backward glance, which is the most affectionate goodbye he has ever given anybody."},
      {scene: {set: "storage", cast: {walt: "stand"}}, caption: "Nine men, nine problems.",
       text: "The nine men are still in prison with nine reasons to talk, and nobody is left who is good at solving that kind of problem. Walt now has a fixer-shaped hole in his organization and a lawyer who has noticed it."}
    ]},
    {id: "c", label: "Pay the nine men himself", tag: "Payroll, not a problem.",
     effects: {darkness: -5, family: -5, hank: 5}, flags: ["mikeLives", "ninePaid"], beats: [
      {scene: {set: "park", cast: {walt: "stand", mike: "sit"}, say: {who: "walt", text: "I'll cover them. All nine."}}, caption: "An offer Mike did not expect.",
       text: "Walt hands over the bag and adds a second one: the nine men and their families, paid quarterly, out of his own barrels. Mike looks at him for a long moment and says it is the first sensible thing Walt has ever done."},
      {scene: {set: "storage", cast: {walt: "dig", skyler: "stand"}}, caption: "Payroll comes out of the pile.",
       text: "Nobody talks, because nobody needs to. It costs a fortune every quarter, Skyler builds another spreadsheet, and somewhere in a federal office a bored analyst starts wondering who is feeding nine inmates' families so reliably."}
    ]}
  ]
});

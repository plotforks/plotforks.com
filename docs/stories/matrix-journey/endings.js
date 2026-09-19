/* The Matrix trilogy journey: finale endings. Content only (Opus pass).
   Evaluated in order after the aftertaste (ch09); the first `when` that holds wins. Every finale path has exactly one of
   peaceHold / sequel / wakeAll from ch09, so rules are grouped by those flags; the last three are safety fallbacks and do
   not count in the gallery. Neo dies only with "sacrifice" (ch08 a); "brawl" and "smithTalked" leave him alive and blind.
   Trinity is dead with "trinityLost" (ch06 b) or "crash" (ch07 a); she survives with "trinitySafe" (ch07 c) or
   "defendZion" (ch07 b). {meter} in share lines = final belief score. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).endings = [
  /* "Until the sequel" */
  {id: "smithOwesHim", when: "sequel && smithTalked", name: "Smith Owes Him One",
   summary: "Smith comes back in the sequel with a new face and an old grudge, and then, to everyone's surprise, helps. It turns out being asked how you feel, once, in the rain, goes a long way.",
   share: "My timeline: Smith Owes Him One. Neo talked Smith down, and Smith paid it back. Belief {meter}/100."},
  {id: "thomasTiffany", when: "sequel && trinity>=60 && !trinityLost", name: "Thomas and Tiffany",
   summary: "Neo and Trinity wake up in a new Matrix with new names, at neighboring tables in a coffee shop. It takes them a whole film to remember each other, and she is the one who flies this time.",
   share: "My timeline: Thomas and Tiffany. Neo and Trinity found each other again, sixty years later. Belief {meter}/100."},
  {id: "mandatorySequel", when: "sequel && belief>=85", name: "Mandatory Sequel",
   summary: "The machines rebuild the One because a legend that big is good for business. Thomas Anderson spends the sequel making a game about his own life, under protest, and it sells very well.",
   share: "My timeline: Mandatory Sequel. Neo believed so hard they had to bring him back. Belief {meter}/100."},
  {id: "versionSeven", when: "sequel", name: "Version Seven",
   summary: "The Architect is retired and a friendlier program runs a friendlier Matrix, with more cats. Neo lives in it without knowing, and so, for a while, does everyone else.",
   share: "My timeline: Version Seven. The peace held until somebody rebuilt the Matrix. Belief {meter}/100."},

  /* "Wake everyone up" */
  {id: "breakfast", when: "wakeAll && zion>=80", name: "Breakfast for Billions",
   summary: "Zion survives the siege and then the refugees: a few billion hungry people and one kitchen. The porridge runs out on day three. The machines, to their own surprise, start farming.",
   share: "My timeline: Breakfast for Billions. Neo saved Zion and then everyone moved in. Belief {meter}/100."},
  {id: "nobodyToChase", when: "wakeAll && agents>=60", name: "Nobody Left to Chase",
   summary: "With every human unplugged, the Agents have nobody to chase. They keep patrolling the empty city anyway, in pairs, sunglasses on, and one of them eventually takes up jogging.",
   share: "My timeline: Nobody Left to Chase. Everybody woke up and the Agents were out of a job. Belief {meter}/100."},
  {id: "everybodyOut", when: "wakeAll", name: "Everybody Out",
   summary: "The whole human race wakes up at once, in the dark, hungry and furious about the cables. It is a very hard year. It is also the first one in centuries that is actually theirs.",
   share: "My timeline: Everybody Out. Neo's peace woke up the whole world. Belief {meter}/100."},

  /* "As long as it can" */
  {id: "manager", when: "peaceHold && manager", name: "Speak to the Manager",
   summary: "The peace holds, and the Architect is formally reprimanded by the machines for customer service failures. Neo's complaint is framed and hung in the Source, next to the org chart.",
   share: "My timeline: Speak to the Manager. Neo asked the Architect for a supervisor and got one. Belief {meter}/100."},
  {id: "vase", when: "peaceHold && vase && sacrifice", name: "The Vase",
   summary: "The Oracle bakes cookies for anyone who comes to the door and keeps a new vase in the hall. Children who visit are told not to worry about it. None of them ever breaks it.",
   share: "My timeline: The Vase. Neo cared more about the pottery than the prophecy. Belief {meter}/100."},
  {id: "notTheOne", when: "peaceHold && sacrifice && belief<60", name: "Not the One",
   summary: "Neo never quite believed he was the One, and he saved everybody anyway. The Oracle, asked about it later, says that was always the point, and has another cookie.",
   share: "My timeline: Not the One. Neo never believed it and did it anyway. Belief {meter}/100."},
  {id: "sunrise", when: "peaceHold && sacrifice && crash && belief>=80", name: "The Sunrise",
   summary: "The timeline closest to the films. Neo and Trinity are gone, Zion is saved, and a little girl paints a sunrise for them. Whether we see Neo again is left, pointedly, open.",
   share: "My timeline: The Sunrise. Almost exactly what happened on screen. Belief {meter}/100."},
  {id: "stayed", when: "peaceHold && sacrifice && trinitySafe && !trinityLost", name: "The One Who Stayed",
   summary: "Trinity lives because Neo left her behind, and she never entirely forgives him for it. She flies the first ship out of Zion into open sky, and takes his old coat.",
   share: "My timeline: The One Who Stayed. Neo went alone, and Trinity lived. Belief {meter}/100."},
  {id: "blindChampion", when: "peaceHold && brawl", name: "Blind Champion",
   summary: "Neo beats Smith the hard way and lives, blind in the real world and flawless in the Matrix. He teaches kung fu to the newly freed, and nobody lands a punch on him, ever.",
   share: "My timeline: Blind Champion. Neo refused the ending and won the fight. Belief {meter}/100."},
  {id: "smithRetired", when: "peaceHold && smithTalked", name: "Smith, Retired",
   summary: "The Smith virus is gone, but somewhere in the Matrix a quiet man in a dark suit feeds the pigeons every morning. He has never been happier. Neo visits him on Sundays.",
   share: "My timeline: Smith, Retired. Neo asked Smith what he wanted, and gave it to him. Belief {meter}/100."},
  {id: "rightDoor", when: "peaceHold && trinityLost", name: "The Right Door",
   summary: "Neo chose Zion over Trinity, and Zion lives. They build a statue of him at the dock. He would have hated it, and she would have told him so.",
   share: "My timeline: The Right Door. Neo picked Zion over Trinity. Belief {meter}/100."},
  {id: "forMorpheus", when: "peaceHold && morpheusDead", name: "For Morpheus",
   summary: "The war ends the way Morpheus always said it would, without Morpheus. Zion names its first ship built in peacetime after him, and the crew insist on wearing sunglasses indoors.",
   share: "My timeline: For Morpheus. The prophecy came true without the man who believed it. Belief {meter}/100."},
  {id: "holdTheDock", when: "peaceHold && defendZion", name: "Hold the Dock",
   summary: "Neo fought Smith from a chair on Zion's own dock and died there, with Trinity holding his hand. When the Sentinels turn back, Zion throws its victory party in his name, which, as tradition demands, is mostly drums and dancing in a cave.",
   share: "My timeline: Hold the Dock. Neo stayed to defend Zion. Belief {meter}/100."},
  {id: "truce", when: "peaceHold", name: "The Truce",
   summary: "The machines keep their word, and so do the humans, mostly. Nobody quite trusts the peace, which is probably why it lasts.",
   share: "My timeline: The Truce. Neo won the peace. Belief {meter}/100."},

  {id: "theOne", fallback: true, when: "belief>=80", name: "The One",
   summary: "Whatever else happened, he believed it, and it was true.",
   share: "My timeline: The One. Belief {meter}/100."},
  {id: "neo", fallback: true, when: "belief>=40", name: "Neo",
   summary: "Half hacker, half messiah, and never fully sure which.",
   share: "My timeline: Neo. Belief {meter}/100."},
  {id: "mrAnderson", fallback: true, when: "", name: "Mr. Anderson",
   summary: "In the end he was mostly what Smith always called him: Mr. Anderson.",
   share: "My timeline: Mr. Anderson. Belief {meter}/100."}
];

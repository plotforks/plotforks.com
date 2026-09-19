/* Moment: S5E8 "Gliding Over All". Content only (Opus pass); engine and art live in index.html (Sonnet pass).
   Scene spec: {set, cast:{name:pose}, fx:[...], say:{who, text}}. Schema: see the uncertainty-principle skill. */
(window.MOMENTS = window.MOMENTS || []).push({
  id: "cashpile", code: "S5E8", episode: "Gliding Over All", title: "The cash pile", season: 5, ep: 8,
  setup: {
    kicker: "A storage unit, Albuquerque.",
    text: "Skyler brings Walt to a storage unit and pulls back a tarp. Underneath is a pile of cash so big she has stopped counting it. The car wash could not launder it in a hundred years, and she wants to know how much is enough.",
    caption: "The pile is not to scale. It is bigger.",
    scene: {set: "storage", cast: {skyler: "stand", walt: "stand"}}
  },
  question: "What does Walt do with the pile?",
  aired: {
    beats: [
      {scene: {set: "bathroom", cast: {hank: "read"}}, caption: "The most expensive trip to the bathroom in television.",
       text: "In the episode, Walt tells Skyler he's out. A few weeks later, at a family barbecue, Hank picks up a book in the bathroom and reads a handwritten dedication to W.W."},
      {scene: {set: "desert", cast: {walt: "dig"}}, caption: "The coordinates go on a lottery ticket.",
       text: "Walt packs the money into barrels and buries them in the desert. Most of it is later taken by the men who kill Hank."}
    ],
    ending: {name: "As Aired", meter: 95,
      summary: "Walt quits too late, buries the money and loses almost all of it, along with his family. The pile was never the point, and it takes him until the finale to admit it.",
      share: "I watched it as aired: Walt buried the money and lost it anyway. Heisenberg meter 95/100."}
  },
  choices: [
    {id: "a", label: "Open a chain of car washes", tag: "Scale the laundry.", beats: [
      {scene: {set: "storage", cast: {walt: "point", skyler: "stand"}, say: {who: "walt", text: "We need more car washes."}}, caption: "Walter White discovers operations management.",
       text: "Walt looks at the pile and sees a capacity problem, not a moral one. One car wash can't clean this much money. Forty could."},
      {scene: {set: "chainmap", fx: ["pins"]}, caption: "Forty-one locations. Forty-one very clean cars.",
       text: "Skyler builds the spreadsheet. Within a year, A1A has a car wash in every New Mexico town with a traffic light."},
      {scene: {set: "carwash", cast: {hank: "suspicious", walt: "stand"}, fx: ["bubbles"]}, caption: "Hank, counting car washes.",
       text: "Hank notices. Not the money, the car washes. Every time he drives anywhere there is another one, with his brother-in-law's face on the sign."}
    ],
    checkpoint: {name: "Clean Money", summary: "The pile shrinks for the first time. Forty-one car washes are laundering millions, and Hank has started counting them."},
    next: {question: "The chain works. Where does Walt take it next?", choices: [
      {id: "a1", label: "Franchise it through Saul", tag: "Suds, incorporated.", beats: [
        {scene: {set: "office", cast: {saul: "pitch", walt: "stand"}, say: {who: "saul", text: "Franchise, baby!"}}, caption: "Saul has found his calling.",
         text: "Saul sells franchises to every client he has. Within months, half the dirty money in the Southwest is being washed under Walt's brand, literally."},
        {scene: {set: "carwash", cast: {walt: "stand"}, fx: ["siren", "bubbles"]}, caption: "Live on the evening news.",
         text: "The FBI eventually notices a car wash chain with more locations than customers. The raid is televised."}
      ], ending: {name: "Suds Incorporated", meter: 75, pct: 39,
        summary: "Walt builds the biggest laundering network in American history and gets caught for the dullest reason there is: too many car washes. Saul, naturally, is already in Nebraska.",
        share: "My timeline: Suds Incorporated. Saul franchised the car washes and the FBI counted them. Heisenberg meter 75/100."}},
      {id: "a2", label: "Make Skyler CEO", tag: "Let the professional run it.", beats: [
        {scene: {set: "carwash", cast: {skyler: "ceo", walt: "stand"}, fx: ["bubbles"]}, caption: "Premium wax, now with a loyalty card.",
         text: "Skyler takes over and runs A1A as a real business: loyalty cards, premium wax, a training manual for every location."},
        {scene: {set: "chainmap", cast: {skyler: "spreadsheet"}, fx: ["pins"]}, caption: "Business schools will study this for decades.",
         text: "Within eighteen months the legal profits overtake the meth. Walt stops cooking, not out of conscience but because car washes pay better."}
      ], ending: {name: "Honest Money", meter: 20, pct: 36,
        summary: "The legitimate business outgrows the criminal one, and Walt retires as the car wash king of New Mexico. He never forgives Skyler for proving the car washes were the better business all along.",
        share: "My timeline: Honest Money. Skyler ran the car washes so well that Walt quit cooking. Heisenberg meter 20/100."}},
      {id: "a3", label: "Expand to Europe with Lydia", tag: "Going global.", beats: [
        {scene: {set: "office", cast: {lydia: "stand", walt: "stand"}, say: {who: "lydia", text: "Prague loves a clean car."}}, caption: "International expansion, phase one.",
         text: "Lydia proposes car washes across the Czech Republic, supplied through Madrigal's shipping network. Walt signs off between sips of her chamomile tea."},
        {scene: {set: "office", cast: {lydia: "panic", walt: "stand"}, fx: ["sweat"]}, caption: "Phase one, also the last phase.",
         text: "European anti-money-laundering rules turn out to be tedious and strictly enforced. A compliance officer in Prague flags the first location within six weeks."}
      ], ending: {name: "Lost in Compliance", meter: 80, pct: 25,
        summary: "Walt's international expansion is stopped not by the DEA but by a form. He learns what every multinational learns: the paperwork abroad is worse than the competition.",
        share: "My timeline: Lost in Compliance. Walt took the car washes to Europe and lost to a form. Heisenberg meter 80/100."}}
    ]}},
    {id: "b", label: "Buy back Gray Matter", tag: "A hostile takeover.", beats: [
      {scene: {set: "office", cast: {saul: "pitch", walt: "stand"}}, caption: "Shell companies, all the way down.",
       text: "Through a stack of shell companies that Saul sets up, Walt quietly buys shares in Gray Matter, the company he walked away from."},
      {scene: {set: "office", cast: {walt: "suit", elliott: "shock"}, say: {who: "walt", text: "Good morning, partner."}}, caption: "The board meeting of the decade.",
       text: "One morning Elliott and Gretchen learn that their largest shareholder is a high school chemistry teacher. Walt attends the board meeting in person, just to watch their faces."}
    ],
    checkpoint: {name: "Majority Stake", summary: "Walt owns the company he helped found, bought with money he can't explain. Elliott is sweating. So are the auditors."},
    next: {question: "Walt controls Gray Matter. What does he do with it?", choices: [
      {id: "b1", label: "Rename it White Matter", tag: "Credit, finally.", beats: [
        {scene: {set: "office", cast: {walt: "suit"}, fx: ["confetti"]}, caption: "A visionary founder returns.",
         text: "Walt puts his name on the building. The press release calls him a visionary founder coming home."},
        {scene: {set: "office", cast: {walt: "suit", hank: "suspicious"}, fx: ["sweat"]}, caption: "The press release also went to Hank.",
         text: "The press release also brings reporters, and reporters ask where a teacher found the money."}
      ], ending: {name: "White Matter", meter: 70, pct: 42,
        summary: "Walt finally gets the credit he always wanted, and the credit is exactly what gets him caught. Vanity, it turns out, is harder to launder than cash.",
        share: "My timeline: White Matter. Walt bought his old company, renamed it, and got caught. Heisenberg meter 70/100."}},
      {id: "b2", label: "Humiliate Elliott and Gretchen", tag: "Petty, but satisfying.", beats: [
        {scene: {set: "office", cast: {walt: "suit", elliott: "shock"}, say: {who: "walt", text: "Louder, please."}}, caption: "Quarterly results, presented slowly.",
         text: "Walt moves Elliott to the mailroom and has Gretchen present the quarterly results to him, slowly."},
        {scene: {set: "office", cast: {walt: "stand"}}, caption: "An empty office, a full grudge.",
         text: "It feels wonderful for a week. Then Walt realizes he has nothing left to be angry about, and no idea who he is without it."}
      ], ending: {name: "Hostile Takeover", meter: 85, pct: 33,
        summary: "Walt wins his thirty-year grudge and discovers the grudge was the only thing keeping him going. It was never about the money.",
        share: "My timeline: Hostile Takeover. Walt bought Gray Matter just to humiliate its founders. Heisenberg meter 85/100."}},
      {id: "b3", label: "Run it honestly", tag: "The chemist returns.", beats: [
        {scene: {set: "office", cast: {walt: "suit", elliott: "stand"}, say: {who: "elliott", text: "It's genius, Walt."}}, caption: "Patent pending.",
         text: "Walt turns out to be a brilliant head of research. His first patent is a crystal-clear coating that stops glass from fogging up."},
        {scene: {set: "office", cast: {walt: "suit"}, fx: ["confetti"]}, caption: "Hard to arrest, easy to profile.",
         text: "The share price triples. Hank finds it much harder to investigate a Fortune 500 executive with an excellent legal team."}
      ], ending: {name: "Respectable", meter: 40, pct: 25,
        summary: "Respectability turns out to be the best disguise money can buy. Walt dies rich and on the cover of a business magazine, which Hank frames and hangs in his bathroom.",
        share: "My timeline: Respectable. Walt ran Gray Matter honestly and became untouchable. Heisenberg meter 40/100."}}
    ]}},
    {id: "c", label: "Keep cooking, rent a bigger unit", tag: "More is more.", beats: [
      {scene: {set: "storage", cast: {walt: "point", skyler: "stand"}, say: {who: "skyler", text: "Walt. No."}}, caption: "The problem, as Walt sees it, is storage.",
       text: "Walt looks at the pile and decides the problem is space. He rents the unit next door. Then the one after that."},
      {scene: {set: "storage", cast: {walt: "stand"}, fx: ["sweat"]}, caption: "A very serious collector.",
       text: "By the end of the year Walt rents the entire storage facility. The owner assumes he is a very serious collector of something."}
    ],
    checkpoint: {name: "Storage Wars", summary: "Walt has more cash than he can count, clean or spend. Skyler has stopped speaking to him, and Hank is about to borrow the bathroom."},
    next: {question: "Hank finds the book. What does Walt do?", choices: [
      {id: "c1", label: "Run with the money", tag: "Take it all.", beats: [
        {scene: {set: "desert", cast: {walt: "stand"}, say: {who: "walt", text: "Fifty-five. Maximum."}}, caption: "Three trucks, all of them overloaded.",
         text: "Walt loads the pile into three rental trucks and heads east. The trucks are so heavy they can't go over fifty-five."},
        {scene: {set: "desert", cast: {walt: "stand", hank: "suspicious"}, fx: ["siren"]}, caption: "A weigh station, Oklahoma.",
         text: "Hank catches up with him at a weigh station in Oklahoma. Walt is booked for driving an overweight vehicle, the only charge he ever admits to."}
      ], ending: {name: "Overweight", meter: 90, pct: 38,
        summary: "Walt's empire ends at a truck scale. The money is weighed, not counted, and Walt insists on checking the scale's calibration himself.",
        share: "My timeline: Overweight. Walt fled with the money and got stopped at a weigh station. Heisenberg meter 90/100."}},
      {id: "c2", label: "Bribe Hank", tag: "Everyone has a price.", beats: [
        {scene: {set: "dinner", cast: {walt: "stand", hank: "suspicious"}, say: {who: "walt", text: "Name a number."}}, caption: "The worst offer of Walt's career.",
         text: "Walt offers Hank a storage unit key and a very large number. Hank stares at him for a long time."},
        {scene: {set: "dinner", cast: {hank: "laugh", walt: "stand", skyler: "stand"}, fx: ["sweat"]}, caption: "Thanksgiving, reading aloud.",
         text: "Hank arrests him on the spot, adds bribing a federal agent to the charges, and reads the full list aloud at Thanksgiving."}
      ], ending: {name: "No Sale", meter: 88, pct: 29,
        summary: "For once, something is not for sale. Walt learns it from the one man in his life he always underestimated.",
        share: "My timeline: No Sale. Walt tried to bribe Hank. Hank said no, loudly. Heisenberg meter 88/100."}},
      {id: "c3", label: "Launder it through Walt Jr.'s website", tag: "It worked once.", beats: [
        {scene: {set: "dinner", cast: {walt: "stand", skyler: "stand"}, say: {who: "skyler", text: "How many donations, Walt?"}}, caption: "SaveWalterWhite.com, relaunched.",
         text: "Walt revives the fundraising site Walt Jr. built for his treatment. Overnight it gets so many anonymous donations that the payment company calls to ask whether he is a charity or a country."},
        {scene: {set: "dinner", cast: {hank: "suspicious"}}, caption: "Hank watched it twice.",
         text: "Local news runs a feel-good story about the most generous community in America. Hank watches it twice, then opens a new file."}
      ], ending: {name: "Viral Fundraiser", meter: 80, pct: 33,
        summary: "The trick that worked in Season 2 does not scale to Season 5. Nothing about Walt scales well, except the pile.",
        share: "My timeline: Viral Fundraiser. Walt laundered the pile through his son's website. Heisenberg meter 80/100."}}
    ]}}
  ]
});
